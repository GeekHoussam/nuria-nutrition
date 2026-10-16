import { randomUUID } from "node:crypto";
import { afterAll, describe, expect, it } from "vitest";
import { prisma } from "@/lib/prisma";
import { createOrder, getAccessibleOrder, OrderError } from "@/server/orders";

describe("création de commande transactionnelle", () => {
  afterAll(() => prisma.$disconnect());
  it("revalide le prix, décrémente le stock et protège la confirmation", async () => {
    const product = await prisma.product.findUniqueOrThrow({ where: { sku: "NUR-MAG-001" }, include: { inventory: true } });
    const before = product.inventory!.quantity;
    const key = randomUUID();
    let orderId = "";
    try {
      const result = await createOrder({ idempotencyKey: key, customer: { fullName: "Test Intégration", email: "integration@example.com", phone: "+212600000000" }, delivery: { addressLine1: "10 rue de test", addressLine2: "", city: "Rabat", postalCode: "10000", instructions: "", method: "standard" }, paymentMethod: "MOCK_ONLINE", items: [{ productId: product.id, quantity: 1 }] });
      orderId = result.order.id;
      expect(result.order.totalMinor).toBe(product.priceMinor);
      const inventory = await prisma.inventory.findUniqueOrThrow({ where: { productId: product.id } });
      expect(inventory.quantity).toBe(before - 1);
      expect(await getAccessibleOrder(orderId, "mauvais-token")).toBeNull();
      expect((await getAccessibleOrder(orderId, result.accessToken))?.reference).toBe(result.order.reference);
    } finally {
      if (orderId) await prisma.order.delete({ where: { id: orderId } });
      await prisma.inventory.update({ where: { productId: product.id }, data: { quantity: before } });
    }
  });

  it("refuse une commande quand le stock serveur est nul", async () => {
    const product = await prisma.product.findUniqueOrThrow({ where: { sku: "NUR-D3-002" }, include: { inventory: true } });
    const before = product.inventory!.quantity;
    await prisma.inventory.update({ where: { productId: product.id }, data: { quantity: 0 } });
    try {
      await expect(createOrder({ idempotencyKey: randomUUID(), customer: { fullName: "Test Stock", email: "stock@example.com", phone: "+212600000000" }, delivery: { addressLine1: "10 rue de test", addressLine2: "", city: "Rabat", postalCode: "", instructions: "", method: "standard" }, paymentMethod: "CASH_ON_DELIVERY", items: [{ productId: product.id, quantity: 1 }] })).rejects.toBeInstanceOf(OrderError);
    } finally {
      await prisma.inventory.update({ where: { productId: product.id }, data: { quantity: before } });
    }
  });
});
