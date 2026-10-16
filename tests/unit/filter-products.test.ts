import { describe, expect, it } from "vitest";
import { filterProducts } from "@/features/products/filter-products";
import type { ProductDTO } from "@/types/product";

const product = (name: string, category: string, priceMinor: number, stock = 5): ProductDTO => ({ id: name, name, slug: name.toLowerCase(), sku: name, brand: "NŪRIA", format: "60 gélules", shortDescription: "Produit de démonstration", description: "Description", composition: null, nutritionInfo: null, usageInfo: null, precautions: null, priceMinor, currency: "MAD", isDemo: true, featured: name === "Magnésium", category: { name: category, slug: category.toLowerCase() }, images: [], stock });
const products = [product("Magnésium", "Minéraux", 19900), product("Vitamine D3", "Vitamines", 15900, 0)];

describe("recherche et filtres catalogue", () => {
  it("filtre par recherche et catégorie", () => expect(filterProducts(products, { query: "magné", category: "minéraux", maxPrice: 300, inStock: false, sort: "featured" }).map((p) => p.name)).toEqual(["Magnésium"]));
  it("filtre les ruptures et trie par prix", () => expect(filterProducts(products, { query: "", category: "all", maxPrice: 300, inStock: true, sort: "price-asc" }).map((p) => p.name)).toEqual(["Magnésium"]));
});
