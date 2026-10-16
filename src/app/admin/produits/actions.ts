"use server";

import { randomUUID } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/access";
import { prisma } from "@/lib/prisma";
import { productAdminSchema } from "@/lib/validations";

const allowedImages = new Map([["image/jpeg", "jpg"], ["image/png", "png"], ["image/webp", "webp"]]);

async function resolveImage(formData: FormData, fallback: string) {
  const file = formData.get("image");
  if (!(file instanceof File) || file.size === 0) return fallback;
  const extension = allowedImages.get(file.type);
  if (!extension || file.size > 2_000_000) throw new Error("Image refusée : JPG, PNG ou WebP, 2 Mo maximum.");
  const directory = path.join(process.cwd(), "public", "uploads");
  await mkdir(directory, { recursive: true });
  const filename = `${randomUUID()}.${extension}`;
  await writeFile(path.join(directory, filename), Buffer.from(await file.arrayBuffer()));
  return `/uploads/${filename}`;
}

export async function createProduct(formData: FormData) {
  await requireAdmin();
  const imageUrl = await resolveImage(formData, String(formData.get("imageUrl") || "/images/magnesium-front.svg"));
  const parsed = productAdminSchema.safeParse({ ...Object.fromEntries(formData), imageUrl });
  if (!parsed.success) throw new Error(parsed.error.issues[0]?.message || "Produit invalide");
  const category = await prisma.category.findUnique({ where: { slug: parsed.data.categorySlug } });
  if (!category) throw new Error("Catégorie inconnue");
  await prisma.product.create({ data: { name: parsed.data.name, slug: parsed.data.slug, sku: parsed.data.sku, format: parsed.data.format, shortDescription: parsed.data.shortDescription, description: parsed.data.description, priceMinor: parsed.data.priceMad * 100, isDemo: true, status: "ACTIVE", composition: "Données fournisseur à intégrer.", nutritionInfo: "Données fournisseur à intégrer.", usageInfo: "Données fournisseur à intégrer.", precautions: "Données fournisseur à intégrer.", inventory: { create: { quantity: parsed.data.stock } }, images: { create: { url: parsed.data.imageUrl, alt: `Concept de démonstration ${parsed.data.name}` } }, categories: { create: { categoryId: category.id } } } });
  revalidatePath("/admin/produits"); revalidatePath("/boutique");
}

export async function updateProduct(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || "");
  const priceMad = Number(formData.get("priceMad"));
  const stock = Number(formData.get("stock"));
  const status = String(formData.get("status"));
  if (!id || !Number.isInteger(priceMad) || priceMad < 1 || !Number.isInteger(stock) || stock < 0 || !["ACTIVE", "DRAFT", "ARCHIVED"].includes(status)) throw new Error("Mise à jour invalide");
  await prisma.$transaction([prisma.product.update({ where: { id }, data: { priceMinor: priceMad * 100, status: status as "ACTIVE" | "DRAFT" | "ARCHIVED" } }), prisma.inventory.upsert({ where: { productId: id }, update: { quantity: stock }, create: { productId: id, quantity: stock } })]);
  revalidatePath("/admin/produits"); revalidatePath("/boutique");
}

export async function archiveProduct(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || "");
  await prisma.product.update({ where: { id }, data: { status: "ARCHIVED" } });
  revalidatePath("/admin/produits"); revalidatePath("/boutique");
}
