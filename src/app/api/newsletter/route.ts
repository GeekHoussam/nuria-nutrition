import { NextResponse } from "next/server";
import { newsletterSchema } from "@/lib/validations";
import { prisma } from "@/lib/prisma";
import { rateLimit } from "@/lib/rate-limit";

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0] || "local";
  if (!rateLimit(`newsletter:${ip}`, 5, 60_000).allowed) return NextResponse.json({ error: "Veuillez patienter avant de réessayer." }, { status: 429 });
  const parsed = newsletterSchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0]?.message || "Formulaire invalide." }, { status: 400 });
  await prisma.newsletterSubscriber.upsert({
    where: { email: parsed.data.email.toLowerCase() },
    update: { consent: true, consentedAt: new Date() },
    create: { email: parsed.data.email.toLowerCase(), consent: true, consentedAt: new Date() },
  });
  return NextResponse.json({ message: "Merci. Votre inscription a bien été enregistrée." });
}
