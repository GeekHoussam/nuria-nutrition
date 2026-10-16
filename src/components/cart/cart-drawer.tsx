"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCartStore } from "@/stores/cart";
import { formatMoney } from "@/lib/utils";

export function CartDrawer() {
  const { items, drawerOpen, closeDrawer, setQuantity, removeItem, subtotal } = useCartStore();
  return (
    <AnimatePresence>
      {drawerOpen && <><motion.button type="button" aria-label="Fermer le panier" className="fixed inset-0 z-[70] bg-[#0f2923]/45 backdrop-blur-[2px]" onClick={closeDrawer} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} /><motion.aside role="dialog" aria-modal="true" aria-label="Votre panier" className="fixed top-0 right-0 z-[71] flex h-dvh w-full max-w-md flex-col bg-[#f8f5ee] shadow-2xl" initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", stiffness: 280, damping: 30 }}>
        <div className="flex items-center justify-between border-b border-[#173e36]/10 px-6 py-5"><div className="flex items-center gap-3"><ShoppingBag size={19} /><h2 className="font-serif text-2xl">Votre panier</h2></div><button type="button" aria-label="Fermer" onClick={closeDrawer}><X /></button></div>
        <div className="flex-1 overflow-y-auto p-6">{items.length === 0 ? <div className="grid h-full place-content-center text-center"><div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-[#dde7d8]"><ShoppingBag /></div><p className="mt-5 font-serif text-2xl">Votre sélection vous attend.</p><Link href="/boutique" onClick={closeDrawer} className="button-primary mt-6">Découvrir la boutique</Link></div> : <ul className="space-y-6">{items.map((item) => <li key={item.productId} className="grid grid-cols-[84px_1fr] gap-4"><Link href={`/produits/${item.slug}`} onClick={closeDrawer} className="overflow-hidden rounded-2xl bg-[#e9eee4]"><Image src={item.image} alt="" width={168} height={200} className="h-full w-full object-cover" /></Link><div><div className="flex justify-between gap-3"><div><Link href={`/produits/${item.slug}`} onClick={closeDrawer} className="font-serif text-lg leading-tight">{item.name}</Link><p className="mt-1 text-xs text-[#69736c]">{item.format}</p></div><button type="button" onClick={() => removeItem(item.productId)} aria-label={`Retirer ${item.name}`} className="self-start text-[#69736c] hover:text-red-700"><Trash2 size={16} /></button></div><div className="mt-4 flex items-center justify-between"><div className="flex items-center rounded-full border border-[#173e36]/15"><button type="button" className="p-2" aria-label="Diminuer" onClick={() => setQuantity(item.productId, item.quantity - 1)}><Minus size={14} /></button><span className="min-w-7 text-center text-sm">{item.quantity}</span><button type="button" className="p-2" aria-label="Augmenter" onClick={() => setQuantity(item.productId, item.quantity + 1)}><Plus size={14} /></button></div><span className="text-sm font-bold">{formatMoney(item.priceMinor * item.quantity, item.currency)}</span></div></div></li>)}</ul>}</div>
        {items.length > 0 && <div className="border-t border-[#173e36]/10 bg-white/60 p-6"><div className="flex items-center justify-between"><span className="text-sm text-[#69736c]">Sous-total démo</span><strong className="font-serif text-2xl">{formatMoney(subtotal())}</strong></div><p className="mt-2 text-xs text-[#69736c]">Panier stocké uniquement dans ce navigateur.</p><Link href="/commande" onClick={closeDrawer} className="button-primary mt-5 w-full">Voir la démo de commande</Link><Link href="/panier" onClick={closeDrawer} className="mt-3 block text-center text-sm font-bold underline underline-offset-4">Voir le panier</Link></div>}
      </motion.aside></>}
    </AnimatePresence>
  );
}
