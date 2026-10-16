import { afterAll, describe, expect, it } from "vitest";
import { prisma } from "@/lib/prisma";
import { getProductBySlug, getProducts } from "@/server/products";

describe("catalogue MySQL", () => {
  afterAll(() => prisma.$disconnect());
  it("retourne les produits actifs issus de la base", async () => { const products = await getProducts(); expect(products.length).toBeGreaterThanOrEqual(6); expect(products.every((product) => product.isDemo)).toBe(true); });
  it("retourne la fiche Magnésium avec son stock et ses images", async () => { const product = await getProductBySlug("magnesium-bisglycinate-60-gelules"); expect(product?.sku).toBe("NUR-MAG-001"); expect(product?.images.length).toBe(4); expect(product?.stock).toBeGreaterThan(0); });
});
