import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { registrationSchema } from "@/lib/validations";
import { prisma } from "@/lib/prisma";
import { rateLimit } from "@/lib/rate-limit";

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0] || "local";
  if (!rateLimit(`register:${ip}`, 5, 10 * 60_000).allowed) return NextResponse.json({ error: "Trop de tentatives. Réessayez plus tard." }, { status: 429 });
  const parsed = registrationSchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0]?.message || "Données invalides." }, { status: 400 });
  const exists = await prisma.user.findUnique({ where: { email: parsed.data.email } });
  if (exists) return NextResponse.json({ error: "Un compte existe déjà pour cette adresse." }, { status: 409 });
  await prisma.user.create({ data: { name: parsed.data.name, email: parsed.data.email, passwordHash: await hash(parsed.data.password, 12) } });
  return NextResponse.json({ ok: true }, { status: 201 });
}
