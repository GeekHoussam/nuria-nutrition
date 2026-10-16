import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { checkoutSchema } from "@/lib/validations";
import { rateLimit } from "@/lib/rate-limit";
import { createOrder, OrderError } from "@/server/orders";

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0] || "local";
  if (!rateLimit(`orders:${ip}`, 10, 10 * 60_000).allowed) return NextResponse.json({ error: "Trop de tentatives. Réessayez plus tard." }, { status: 429 });

  try {
    const parsed = checkoutSchema.safeParse(await request.json());
    if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0]?.message || "Données invalides." }, { status: 400 });

    const enabled = {
      CASH_ON_DELIVERY: process.env.ENABLE_CASH_ON_DELIVERY !== "false",
      BANK_TRANSFER: process.env.ENABLE_BANK_TRANSFER !== "false",
      MOCK_ONLINE: process.env.ENABLE_MOCK_PAYMENT !== "false",
    };
    if (!enabled[parsed.data.paymentMethod]) return NextResponse.json({ error: "Ce moyen de paiement n’est pas activé." }, { status: 400 });

    const session = await auth();
    const result = await createOrder(parsed.data, session?.user?.id);
    return NextResponse.json({ orderId: result.order.id, reference: result.order.reference, token: result.accessToken });
  } catch (error) {
    if (error instanceof OrderError) return NextResponse.json({ error: error.message, code: error.code }, { status: error.code === "DUPLICATE" ? 409 : 400 });
    console.error("Order creation failed", error);
    return NextResponse.json({ error: "La commande n’a pas pu être créée. Aucun paiement réel n’a été effectué." }, { status: 500 });
  }
}
