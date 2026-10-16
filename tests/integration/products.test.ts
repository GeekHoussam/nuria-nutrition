import { describe, expect, it } from "vitest";
import { getProductBySlug, getProducts } from "@/server/products";

describe("catalogue statique", () => {
  it("retourne les six produits de démonstration", async () => { const products = await getProducts(); expect(products).toHaveLength(6); expect(products.every((product) => product.isDemo)).toBe(true); });
  it("retourne la fiche Magnésium avec son stock et ses images", async () => { const product = await getProductBySlug("magnesium-bisglycinate-60-gelules"); expect(product?.sku).toBe("NUR-MAG-001"); expect(product?.images.length).toBe(4); expect(product?.stock).toBeGreaterThan(0); });
});
