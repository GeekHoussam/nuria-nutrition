"use client";

import { ShoppingBag } from "lucide-react";
import { useCartStore } from "@/stores/cart";
import type { ProductDTO } from "@/types/product";
import { cn } from "@/lib/utils";
import { useHydrated } from "@/hooks/use-hydrated";

export function AddToCartButton({ product, quantity = 1, className, label = "Ajouter au panier" }: { product: ProductDTO; quantity?: number; className?: string; label?: string }) {
  const addItem = useCartStore((state) => state.addItem);
  const hydrated = useHydrated();
  const disabled = product.stock < 1;
  return <button type="button" disabled={disabled || !hydrated} aria-busy={!hydrated} className={cn("button-primary", className)} onClick={() => addItem({ productId: product.id, slug: product.slug, sku: product.sku, name: product.name, format: product.format, image: product.images[0]?.url || "/images/magnesium-front.svg", priceMinor: product.priceMinor, currency: product.currency, stock: product.stock }, quantity)}><ShoppingBag size={17} />{disabled ? "Indisponible" : label}</button>;
}
