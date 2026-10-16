"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { AddToCartButton } from "./add-to-cart-button";
import type { ProductDTO } from "@/types/product";
import { formatMoney } from "@/lib/utils";
import { useCartStore } from "@/stores/cart";
import { withBasePath } from "@/lib/site";

export function ProductPurchase({ product }: { product: ProductDTO }) {
  const [quantity, setQuantity] = useState(1);
  const router = useRouter();
  const addItem = useCartStore((state) => state.addItem);
  const cartItem = { productId: product.id, slug: product.slug, sku: product.sku, name: product.name, format: product.format, image: product.images[0]?.url || withBasePath("/images/magnesium-front.svg"), priceMinor: product.priceMinor, currency: product.currency, stock: product.stock };
  function buyNow() { addItem(cartItem, quantity); router.push("/commande"); }
  return <div><p className="font-serif text-3xl text-[#173e36]">{formatMoney(product.priceMinor)}</p><p className="mt-3 text-sm font-semibold text-[#3f6b59]">{product.stock > 0 ? `En stock — ${product.stock} unités démo` : "Actuellement indisponible"}</p><div className="mt-7 flex items-center gap-3"><div className="flex h-[3.25rem] items-center rounded-full border border-[#173e36]/15"><button type="button" onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-4" aria-label="Diminuer la quantité"><Minus size={16} /></button><output className="w-8 text-center text-sm font-bold" aria-live="polite">{quantity}</output><button type="button" onClick={() => setQuantity(Math.min(product.stock, quantity + 1))} className="p-4" aria-label="Augmenter la quantité"><Plus size={16} /></button></div><AddToCartButton product={product} quantity={quantity} className="flex-1" /></div><button type="button" onClick={buyNow} disabled={product.stock < 1} className="button-secondary mt-3 w-full">Voir la démo de commande</button><p className="mt-5 rounded-2xl bg-[#dde7d8]/60 p-4 text-xs leading-5 text-[#59655e]">Panier local de démonstration. Aucune commande, livraison ou transaction réelle n’est traitée sur GitHub Pages.</p></div>;
}
