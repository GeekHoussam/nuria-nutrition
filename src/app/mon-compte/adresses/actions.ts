"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { addressSchema } from "@/lib/validations";

export async function saveAddress(formData: FormData) {
  const session = await auth();
  if (!session?.user) throw new Error("Non autorisé");
  const parsed = addressSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) throw new Error(parsed.error.issues[0]?.message || "Adresse invalide");
  const count = await prisma.address.count({ where: { userId: session.user.id } });
  await prisma.address.create({ data: { ...parsed.data, line2: parsed.data.line2 || null, postalCode: parsed.data.postalCode || null, userId: session.user.id, isDefault: count === 0 } });
  revalidatePath("/mon-compte/adresses");
}

export async function deleteAddress(formData: FormData) {
  const session = await auth();
  if (!session?.user) throw new Error("Non autorisé");
  const id = String(formData.get("id") || "");
  await prisma.address.deleteMany({ where: { id, userId: session.user.id } });
  revalidatePath("/mon-compte/adresses");
}
