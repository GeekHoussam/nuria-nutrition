import type { Metadata } from "next";
import { LoginForm } from "@/components/auth/auth-forms";

export const metadata: Metadata = { title: "Connexion", robots: { index: false } };
export default function LoginPage() { return <section className="section-space"><div className="container-shell"><div className="mx-auto max-w-md rounded-[2rem] border border-[#173e36]/10 bg-white/55 p-7 shadow-[var(--shadow-soft)] md:p-10"><span className="eyebrow">Espace personnel</span><h1 className="editorial mt-5 text-5xl text-[#173e36]">Heureux de vous revoir.</h1><p className="mt-4 text-sm leading-6 text-[#69736c]">Retrouvez vos commandes, adresses et favoris.</p><LoginForm /></div></div></section>; }
