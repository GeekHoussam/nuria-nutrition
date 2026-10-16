"use client";

import type { ProductDTO } from "@/types/product";
import { formatMoney } from "@/lib/utils";
import { AddToCartButton } from "./add-to-cart-button";

export function MobileStickyPurchase({ product }: { product: ProductDTO }) {
  return <div className="sticky bottom-0 z-30 border-t border-[#173e36]/10 bg-[#f8f5ee]/95 p-3 backdrop-blur lg:hidden"><div className="mx-auto flex max-w-lg items-center gap-4"><div className="min-w-0 flex-1"><p className="truncate text-xs font-bold text-[#173e36]">{product.name}</p><p className="mt-1 font-serif text-xl text-[#173e36]">{formatMoney(product.priceMinor)}</p></div><AddToCartButton product={product} className="min-h-12 shrink-0 px-5 text-xs" label="Ajouter" /></div></div>;
}
