import type { Metadata } from "next";
import { CartPageClient } from "@/components/cart/cart-page";

export const metadata: Metadata = { title: "Panier", robots: { index: false, follow: false } };

export default function CartPage() {
  return <><section className="page-hero pb-10"><div className="container-shell"><span className="eyebrow">Votre sélection</span><h1 className="editorial mt-5 text-6xl text-[#173e36] md:text-8xl">Panier.</h1></div></section><CartPageClient /></>;
}
