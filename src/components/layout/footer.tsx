import Link from "next/link";
import { Instagram, Linkedin } from "lucide-react";
import { Logo } from "@/components/ui/logo";

const columns = [
  ["Boutique", [["Tous les produits", "/boutique"], ["Nouveautés", "/boutique?tri=nouveautes"], ["Catégories", "/boutique#filtres"]]],
  ["Informations", [["Notre histoire", "/notre-philosophie"], ["Nos ingrédients", "/nos-ingredients"], ["Conseils", "/conseils"]]],
  ["Service client", [["Livraison", "/legal/livraison"], ["Retours", "/legal/retours"], ["FAQ", "/faq"], ["Contact", "/contact"]]],
  ["Légal", [["Mentions légales", "/legal/mentions-legales"], ["Conditions générales", "/legal/cgv"], ["Confidentialité", "/legal/confidentialite"], ["Cookies", "/legal/cookies"]]],
] as const;

export function Footer() {
  return (
    <footer className="bg-[#173e36] text-white">
      <div className="container-shell grid gap-14 py-20 lg:grid-cols-[1.4fr_3fr]">
        <div><Logo light /><p className="mt-7 max-w-xs text-sm leading-7 text-white/65">Une lecture plus claire, plus belle et plus responsable de la complémentation alimentaire.</p><div className="mt-7 flex gap-4"><a href="#" aria-label="Instagram" className="rounded-full border border-white/20 p-3"><Instagram size={17} /></a><a href="#" aria-label="LinkedIn" className="rounded-full border border-white/20 p-3"><Linkedin size={17} /></a></div></div>
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4">{columns.map(([title, links]) => <div key={title}><h2 className="text-xs font-bold tracking-[.16em] text-[#c2a16a] uppercase">{title}</h2><ul className="mt-5 space-y-3">{links.map(([label, href]) => <li key={href}><Link href={href} className="text-sm text-white/68 transition-colors hover:text-white">{label}</Link></li>)}</ul></div>)}</div>
      </div>
      <div className="border-t border-white/10"><div className="container-shell flex flex-col gap-4 py-6 text-xs leading-6 text-white/55 md:flex-row md:items-center md:justify-between"><p>Les compléments alimentaires ne se substituent pas à une alimentation variée et équilibrée ni à un mode de vie sain.</p><p>© {new Date().getFullYear()} NŪRIA Nutrition — Prototype.</p></div></div>
    </footer>
  );
}
