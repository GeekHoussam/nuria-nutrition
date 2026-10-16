import { createHash, createHmac, randomUUID } from "node:crypto";
import { OrderStatus, PaymentStatus, Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import type { CheckoutInput } from "@/lib/validations";

const accessSecret = process.env.AUTH_SECRET || "development-order-secret";

export class OrderError extends Error {
  constructor(message: string, public code: "STOCK" | "PRODUCT" | "DUPLICATE" | "PAYMENT" = "PRODUCT") {
    super(message);
  }
}

export function orderAccessToken(idempotencyKey: string) {
  return createHmac("sha256", accessSecret).update(idempotencyKey).digest("hex");
}

export function hashOrderAccessToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

export async function createOrder(input: CheckoutInput, userId?: string) {
  const distinctIds = new Set(input.items.map((item) => item.productId));
  if (distinctIds.size !== input.items.length) throw new OrderError("Le panier contient des lignes dupliquées.", "DUPLICATE");

  const existing = await prisma.order.findUnique({ where: { idempotencyKey: input.idempotencyKey } });
  if (existing) return { order: existing, accessToken: orderAccessToken(input.idempotencyKey), repeated: true };

  const accessToken = orderAccessToken(input.idempotencyKey);
  const reference = `NUR-${new Date().getFullYear()}-${randomUUID().slice(0, 8).toUpperCase()}`;

  const order = await prisma.$transaction(async (tx) => {
    const products = await tx.product.findMany({
      where: { id: { in: [...distinctIds] }, status: "ACTIVE" },
      include: { inventory: true },
    });
    if (products.length !== input.items.length) throw new OrderError("Un produit n’est plus disponible.", "PRODUCT");

    const byId = new Map(products.map((product) => [product.id, product]));
    let subtotalMinor = 0;
    const orderItems = input.items.map((item) => {
      const product = byId.get(item.productId)!;
      const available = (product.inventory?.quantity ?? 0) - (product.inventory?.reserved ?? 0);
      if (available < item.quantity) throw new OrderError(`Stock insuffisant pour ${product.name}.`, "STOCK");
      subtotalMinor += product.priceMinor * item.quantity;
      return { productId: product.id, productName: product.name, sku: product.sku, quantity: item.quantity, unitPriceMinor: product.priceMinor, totalMinor: product.priceMinor * item.quantity };
    });

    for (const item of input.items) {
      const updated = await tx.inventory.updateMany({
        where: { productId: item.productId, quantity: { gte: item.quantity } },
        data: { quantity: { decrement: item.quantity } },
      });
      if (updated.count !== 1) throw new OrderError("Le stock vient de changer. Vérifiez votre panier.", "STOCK");
    }

    const paymentStatus = input.paymentMethod === "MOCK_ONLINE" ? PaymentStatus.AUTHORIZED : PaymentStatus.PENDING;
    return tx.order.create({
      data: {
        reference,
        idempotencyKey: input.idempotencyKey,
        guestAccessTokenHash: hashOrderAccessToken(accessToken),
        userId,
        customerName: input.customer.fullName,
        customerEmail: input.customer.email,
        customerPhone: input.customer.phone,
        addressLine1: input.delivery.addressLine1,
        addressLine2: input.delivery.addressLine2 || null,
        city: input.delivery.city,
        postalCode: input.delivery.postalCode || null,
        deliveryInstructions: input.delivery.instructions || null,
        subtotalMinor,
        deliveryMinor: 0,
        totalMinor: subtotalMinor,
        status: OrderStatus.CONFIRMED,
        paymentMethod: input.paymentMethod,
        items: { create: orderItems },
        payment: { create: { method: input.paymentMethod, status: paymentStatus, amountMinor: subtotalMinor } },
        shipment: { create: {} },
      },
      include: { items: true, payment: true },
    });
  }, { isolationLevel: Prisma.TransactionIsolationLevel.Serializable });

  return { order, accessToken, repeated: false };
}

export async function getAccessibleOrder(orderId: string, token: string | undefined, userId?: string, isAdmin = false) {
  const order = await prisma.order.findUnique({ where: { id: orderId }, include: { items: true, payment: true, shipment: true } });
  if (!order) return null;
  if (isAdmin || (userId && order.userId === userId)) return order;
  if (!token || !order.guestAccessTokenHash) return null;
  return hashOrderAccessToken(token) === order.guestAccessTokenHash ? order : null;
}
