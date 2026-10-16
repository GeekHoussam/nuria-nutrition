"use client";

import { useMemo, useState } from "react";
import { Filter, Search, SlidersHorizontal } from "lucide-react";
import type { ProductDTO } from "@/types/product";
import { ProductCard } from "@/components/product/product-card";
import { filterProducts } from "@/features/products/filter-products";

export function Catalog({ products, initialQuery = "" }: { products: ProductDTO[]; initialQuery?: string }) {
  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState("all");
  const [maxPrice, setMaxPrice] = useState(300);
  const [inStock, setInStock] = useState(false);
  const [sort, setSort] = useState("featured");
  const [visible, setVisible] = useState(6);
  const categories = useMemo(() => [...new Map(products.filter((p) => p.category).map((p) => [p.category!.slug, p.category!])).values()], [products]);
  const filtered = useMemo(
    () => filterProducts(products, { query, category, maxPrice, inStock, sort }),
    [products, query, category, maxPrice, inStock, sort],
  );
  return <div>
    <div id="filtres" className="rounded-[1.75rem] border border-[#173e36]/10 bg-white/60 p-5"><div className="grid gap-4 lg:grid-cols-[1.4fr_repeat(3,1fr)]"><label className="relative"><span className="sr-only">Rechercher</span><Search className="absolute top-1/2 left-4 -translate-y-1/2 text-[#69736c]" size={18} /><input className="input-field pl-11" value={query} onChange={(e) => { setQuery(e.target.value); setVisible(6); }} placeholder="Rechercher un produit…" /></label><label><span className="sr-only">Catégorie</span><select className="select-field" value={category} onChange={(e) => { setCategory(e.target.value); setVisible(6); }}><option value="all">Toutes les catégories</option>{categories.map((item) => <option key={item.slug} value={item.slug}>{item.name}</option>)}</select></label><label><span className="sr-only">Trier</span><select className="select-field" value={sort} onChange={(e) => setSort(e.target.value)}><option value="featured">Sélection NŪRIA</option><option value="price-asc">Prix croissant</option><option value="price-desc">Prix décroissant</option><option value="name">Nom A–Z</option></select></label><label className="flex min-h-[3.25rem] items-center gap-3 rounded-2xl border border-[#173e36]/10 bg-white/70 px-4 text-sm"><input type="checkbox" checked={inStock} onChange={(e) => setInStock(e.target.checked)} className="accent-[#173e36]" /> En stock uniquement</label></div><div className="mt-5 flex flex-col gap-2 border-t border-[#173e36]/10 pt-5 sm:flex-row sm:items-center"><SlidersHorizontal size={17} /><label htmlFor="max-price" className="text-sm font-semibold">Prix maximum : {maxPrice} MAD</label><input id="max-price" type="range" min="100" max="300" step="10" value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} className="w-full accent-[#173e36] sm:ml-4 sm:max-w-xs" /><span className="sm:ml-auto text-xs text-[#69736c]">{filtered.length} résultat{filtered.length !== 1 ? "s" : ""}</span></div></div>
    {filtered.length ? <><div className="mt-12 grid gap-x-7 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">{filtered.slice(0, visible).map((product) => <ProductCard key={product.id} product={product} />)}</div>{visible < filtered.length && <div className="mt-12 text-center"><button className="button-secondary" type="button" onClick={() => setVisible((n) => n + 6)}>Afficher plus</button></div>}</> : <div className="my-24 text-center"><Filter className="mx-auto text-[#c2a16a]" size={36} /><h2 className="editorial mt-5 text-4xl text-[#173e36]">Aucun produit trouvé.</h2><p className="mt-3 text-[#69736c]">Essayez d’élargir vos critères de recherche.</p><button type="button" className="button-secondary mt-6" onClick={() => { setQuery(""); setCategory("all"); setMaxPrice(300); setInStock(false); }}>Réinitialiser les filtres</button></div>}
  </div>;
}
