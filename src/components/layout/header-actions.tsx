"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, Search, ShoppingBag, UserRound, X } from "lucide-react";
import { useCartStore } from "@/stores/cart";
import { useHydrated } from "@/hooks/use-hydrated";
import { withBasePath } from "@/lib/site";

export function HeaderActions({ links }: { links: string[][] }) {
  const mounted = useHydrated();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const quantity = useCartStore((state) => state.totalQuantity());
  const openCart = useCartStore((state) => state.openDrawer);

  return (
    <div className="flex items-center gap-1">
      <button className="button-ghost" type="button" aria-label="Rechercher" onClick={() => setSearchOpen(true)}><Search size={19} /></button>
      <Link className="button-ghost hidden sm:inline-flex" href="/mon-compte" aria-label="Mon compte"><UserRound size={19} /></Link>
      <button className="button-ghost relative" type="button" aria-label={`Ouvrir le panier${mounted ? `, ${quantity} article(s)` : ""}`} onClick={openCart}>
        <ShoppingBag size={20} />
        {mounted && quantity > 0 && <span className="absolute top-1 right-1 grid min-h-5 min-w-5 place-items-center rounded-full bg-[#c2a16a] px-1 text-[0.65rem] font-extrabold text-[#173e36]">{quantity}</span>}
      </button>
      <button className="button-ghost xl:hidden" type="button" aria-label="Ouvrir le menu" onClick={() => setMobileOpen(true)}><Menu size={21} /></button>

      {mobileOpen && (
        <div className="fixed inset-0 z-[80] bg-[#173e36] p-6 text-white xl:hidden">
          <div className="flex items-center justify-between"><span className="text-xl tracking-[.2em]">NŪRIA</span><button type="button" aria-label="Fermer le menu" onClick={() => setMobileOpen(false)}><X /></button></div>
          <nav className="mt-20 flex flex-col" aria-label="Navigation mobile">
            {links.map(([label, href], index) => <Link key={href} href={href} onClick={() => setMobileOpen(false)} className="border-b border-white/15 py-5 font-serif text-3xl">{String(index + 1).padStart(2, "0")} <span className="ml-4">{label}</span></Link>)}
            <Link href="/mon-compte" onClick={() => setMobileOpen(false)} className="mt-8 text-sm font-bold tracking-widest uppercase">Mon compte</Link>
          </nav>
        </div>
      )}

      {searchOpen && (
        <div className="fixed inset-0 z-[90] bg-[#f8f5ee]/98 p-5 backdrop-blur-xl">
          <button className="absolute top-7 right-7" type="button" aria-label="Fermer la recherche" onClick={() => setSearchOpen(false)}><X size={28} /></button>
          <form action={withBasePath("/boutique/")} className="mx-auto mt-[22vh] max-w-3xl">
            <label htmlFor="site-search" className="eyebrow">Rechercher dans la collection</label>
            <div className="mt-5 flex items-center gap-4 border-b-2 border-[#173e36] pb-3">
              <Search size={28} />
              <input id="site-search" name="q" autoFocus className="w-full bg-transparent font-serif text-3xl outline-none md:text-5xl" placeholder="Magnésium, vitamines…" />
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
