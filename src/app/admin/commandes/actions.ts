"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/access";
import { prisma } from "@/lib/prisma";

export async function updateOrderStatus(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || "");
  const status = String(formData.get("status") || "");
  if (!["PENDING", "CONFIRMED", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"].includes(status)) throw new Error("Statut invalide");
  await prisma.order.update({ where: { id }, data: { status: status as "PENDING" | "CONFIRMED" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED" } });
  revalidatePath("/admin/commandes");
}
