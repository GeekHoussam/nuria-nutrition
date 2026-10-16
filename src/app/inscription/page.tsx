import type { Metadata } from "next";
import Link from "next/link";
import { CircleSlash2 } from "lucide-react";

export const metadata: Metadata = { title: "Créer un compte", robots: { index: false } };
export default function RegisterPage() { return <section className="section-space"><div className="container-shell"><div className="mx-auto max-w-lg rounded-[2rem] border border-[#173e36]/10 bg-white/55 p-8 text-center shadow-[var(--shadow-soft)] md:p-10"><CircleSlash2 className="mx-auto text-[#c2a16a]" size={38} /><span className="eyebrow mt-7 inline-block">Démo GitHub Pages</span><h1 className="editorial mt-5 text-5xl text-[#173e36]">Création de compte désactivée.</h1><p className="mt-5 text-sm leading-7 text-[#69736c]">Cette vitrine statique ne collecte ni e-mail ni mot de passe. Vous pouvez parcourir tout le catalogue sans compte.</p><Link href="/boutique" className="button-primary mt-7">Explorer la collection</Link></div></div></section>; }
