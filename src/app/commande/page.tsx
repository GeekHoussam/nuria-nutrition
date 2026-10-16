import type { Metadata } from "next";
import Link from "next/link";
import { CircleSlash2 } from "lucide-react";

export const metadata: Metadata = { title: "Commande sécurisée — prototype", robots: { index: false, follow: false } };

export default function CheckoutPage() {
  return <section className="section-space"><div className="container-shell"><div className="mx-auto max-w-2xl rounded-[2rem] border border-[#173e36]/10 bg-white/60 p-8 text-center shadow-[var(--shadow-soft)] md:p-12"><CircleSlash2 className="mx-auto text-[#c2a16a]" size={42} /><span className="eyebrow mt-7 inline-block">Démo GitHub Pages</span><h1 className="editorial mt-5 text-5xl text-[#173e36] md:text-7xl">Commande désactivée.</h1><p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-[#69736c]">Cette publication est une vitrine statique. Le panier reste disponible dans votre navigateur pour explorer l’expérience, mais aucune commande, donnée personnelle ou transaction n’est envoyée.</p><Link href="/boutique" className="button-primary mt-8">Continuer l’exploration</Link></div></div></section>;
}
