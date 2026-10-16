import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { rateLimit } from "@/lib/rate-limit";

const schema = z.object({ name: z.string().trim().min(2).max(100), email: z.string().trim().email().max(254), subject: z.string().trim().min(2).max(150), message: z.string().trim().min(10).max(3000) });

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0] || "local";
  if (!rateLimit(`contact:${ip}`, 4, 10 * 60_000).allowed) return NextResponse.json({ error: "Trop de messages. Réessayez plus tard." }, { status: 429 });
  const parsed = schema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0]?.message || "Formulaire invalide." }, { status: 400 });
  await prisma.contactMessage.create({ data: parsed.data });
  return NextResponse.json({ message: "Votre message a bien été enregistré. L’envoi d’e-mail sera activé avec le futur fournisseur transactionnel." });
}
