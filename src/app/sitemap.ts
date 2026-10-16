import type { MetadataRoute } from "next";
import { articles } from "@/content/articles";
import { categories, products } from "@/server/products";
import { absoluteSiteUrl } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/boutique", "/nos-ingredients", "/notre-philosophie", "/conseils", "/contact", "/faq"];
  return [
    ...staticRoutes.map((route) => ({ url: absoluteSiteUrl(route || "/"), changeFrequency: route === "" ? "weekly" as const : "monthly" as const, priority: route === "" ? 1 : .7 })),
    ...products.map((item) => ({ url: absoluteSiteUrl(`/produits/${item.slug}`), changeFrequency: "weekly" as const, priority: .8 })),
    ...categories.map((item) => ({ url: absoluteSiteUrl(`/categories/${item.slug}`), changeFrequency: "monthly" as const, priority: .6 })),
    ...articles.map((item) => ({ url: absoluteSiteUrl(`/conseils/${item.slug}`), changeFrequency: "monthly" as const, priority: .5 })),
  ];
}
