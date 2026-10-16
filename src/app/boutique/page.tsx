import type { Metadata } from "next";
import { Catalog } from "@/components/shop/catalog";
import { getProducts } from "@/server/products";

export const metadata: Metadata = { title: "Boutique", description: "Découvrez la collection de compléments alimentaires NŪRIA Nutrition. Produits de démonstration." };
export const dynamic = "force-dynamic";

export default async function ShopPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const [products, params] = await Promise.all([getProducts(), searchParams]);
  return <><section className="page-hero"><div className="container-shell"><span className="eyebrow">La collection NŪRIA</span><h1 className="editorial mt-6 max-w-4xl text-6xl leading-[.95] text-[#173e36] md:text-8xl">Des essentiels choisis avec discernement.</h1><p className="mt-7 max-w-2xl text-base leading-8 text-[#59655e]">Catalogue de démonstration : toutes les informations réglementaires doivent être vérifiées avant commercialisation.</p></div></section><section className="section-space pt-10"><div className="container-shell"><Catalog products={products} initialQuery={params.q || ""} /></div></section></>;
}
