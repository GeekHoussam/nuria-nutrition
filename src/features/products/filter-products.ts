import type { ProductDTO } from "@/types/product";

export type ProductFilters = {
  query: string;
  category: string;
  maxPrice: number;
  inStock: boolean;
  sort: "featured" | "price-asc" | "price-desc" | "name" | string;
};

export function filterProducts(products: ProductDTO[], filters: ProductFilters) {
  const normalized = filters.query.trim().toLocaleLowerCase("fr");
  return products
    .filter(
      (product) =>
        (filters.category === "all" || product.category?.slug === filters.category) &&
        product.priceMinor <= filters.maxPrice * 100 &&
        (!filters.inStock || product.stock > 0) &&
        (!normalized || `${product.name} ${product.shortDescription} ${product.category?.name}`.toLocaleLowerCase("fr").includes(normalized)),
    )
    .sort((a, b) =>
      filters.sort === "price-asc"
        ? a.priceMinor - b.priceMinor
        : filters.sort === "price-desc"
          ? b.priceMinor - a.priceMinor
          : filters.sort === "name"
            ? a.name.localeCompare(b.name, "fr")
            : Number(b.featured) - Number(a.featured),
    );
}
