"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Eye, Heart, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import type { ProductDTO } from "@/types/product";
import { formatMoney } from "@/lib/utils";
import { withBasePath } from "@/lib/site";
import { AddToCartButton } from "./add-to-cart-button";

export function ProductCard({ product }: { product: ProductDTO }) {
  const [quickView, setQuickView] = useState(false);
  const [wished, setWished] = useState(false);
  return <>
    <article className="group">
      <div className="relative overflow-hidden rounded-[1.75rem] bg-[#e8ede4]">
        <Link href={`/produits/${product.slug}`} className="block aspect-[4/5]"><Image src={product.images[0]?.url || withBasePath("/images/magnesium-front.svg")} alt={product.images[0]?.alt || product.name} width={900} height={1100} className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]" /></Link>
        <span className="absolute top-4 left-4 rounded-full bg-[#f8f5ee]/90 px-3 py-1.5 text-[0.62rem] font-bold tracking-wider text-[#173e36] uppercase backdrop-blur">Produit démo</span>
        <button type="button" aria-pressed={wished} onClick={() => setWished(!wished)} className="absolute top-4 right-4 grid h-10 w-10 place-items-center rounded-full bg-white/90 text-[#173e36]" aria-label="Ajouter aux favoris"><Heart size={17} fill={wished ? "currentColor" : "none"} /></button>
        <div className="absolute right-4 bottom-4 left-4 flex translate-y-3 gap-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 focus-within:translate-y-0 focus-within:opacity-100"><AddToCartButton product={product} className="min-h-12 flex-1 text-xs" label="Ajouter" /><button type="button" onClick={() => setQuickView(true)} className="grid h-12 w-12 place-items-center rounded-full bg-white text-[#173e36]" aria-label="Aperçu rapide"><Eye size={17} /></button></div>
      </div>
      <div className="mt-5 flex items-start justify-between gap-4"><div><p className="text-[0.67rem] font-bold tracking-[.15em] text-[#718078] uppercase">{product.category?.name} · {product.format}</p><h3 className="mt-2 font-serif text-xl text-[#173e36]"><Link href={`/produits/${product.slug}`}>{product.name}</Link></h3><p className="mt-2 line-clamp-2 text-sm leading-6 text-[#69736c]">{product.shortDescription}</p></div><Link href={`/produits/${product.slug}`} className="mt-7 text-[#173e36]" aria-label={`Voir ${product.name}`}><ArrowUpRight size={19} /></Link></div>
      <p className="mt-3 text-sm font-extrabold text-[#173e36]">{formatMoney(product.priceMinor, product.currency)}</p>
    </article>
    <AnimatePresence>{quickView && <><motion.button type="button" aria-label="Fermer l’aperçu" onClick={() => setQuickView(false)} className="fixed inset-0 z-[80] bg-[#102d26]/55 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} /><motion.div role="dialog" aria-modal="true" aria-label={`Aperçu de ${product.name}`} className="fixed top-1/2 left-1/2 z-[81] grid max-h-[88vh] w-[min(92vw,850px)] -translate-x-1/2 -translate-y-1/2 overflow-auto rounded-[2rem] bg-[#f8f5ee] shadow-2xl md:grid-cols-2" initial={{ opacity: 0, y: 20, x: "-50%" }} animate={{ opacity: 1, y: "-50%", x: "-50%" }} exit={{ opacity: 0, y: 20, x: "-50%" }}><button className="absolute top-5 right-5 z-10 grid h-10 w-10 place-items-center rounded-full bg-white" type="button" aria-label="Fermer" onClick={() => setQuickView(false)}><X size={18} /></button><div className="bg-[#e4eade]"><Image src={product.images[0]?.url || withBasePath("/images/magnesium-front.svg")} alt={product.name} width={900} height={1100} className="h-full min-h-[360px] w-full object-cover" /></div><div className="flex flex-col justify-center p-8 md:p-10"><span className="eyebrow">{product.category?.name}</span><h2 className="editorial mt-5 text-4xl text-[#173e36]">{product.name}</h2><p className="mt-4 text-sm leading-7 text-[#69736c]">{product.shortDescription}</p><p className="mt-5 text-xl font-bold">{formatMoney(product.priceMinor)}</p><AddToCartButton product={product} className="mt-7 w-full" /><Link href={`/produits/${product.slug}`} onClick={() => setQuickView(false)} className="mt-4 text-center text-sm font-bold underline underline-offset-4">Voir la fiche complète</Link></div></motion.div></>}</AnimatePresence>
  </>;
}
