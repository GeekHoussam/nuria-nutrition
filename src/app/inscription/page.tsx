import type { Metadata } from "next";
import { RegisterForm } from "@/components/auth/auth-forms";

export const metadata: Metadata = { title: "Créer un compte", robots: { index: false } };
export default function RegisterPage() { return <section className="section-space"><div className="container-shell"><div className="mx-auto max-w-md rounded-[2rem] border border-[#173e36]/10 bg-white/55 p-7 shadow-[var(--shadow-soft)] md:p-10"><span className="eyebrow">Bienvenue chez NŪRIA</span><h1 className="editorial mt-5 text-5xl text-[#173e36]">Créer votre espace.</h1><p className="mt-4 text-sm leading-6 text-[#69736c]">Vos données restent privées et ne sont utilisées que pour votre expérience d’achat.</p><RegisterForm /></div></div></section>; }
