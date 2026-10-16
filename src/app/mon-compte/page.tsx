import Link from "next/link";
import { CircleSlash2 } from "lucide-react";

export default function AccountPage() {
  return <section className="section-space"><div className="container-shell"><div className="mx-auto max-w-2xl rounded-[2rem] bg-[#dde7d8]/65 p-9 text-center md:p-12"><CircleSlash2 className="mx-auto text-[#9b793f]" size={42} /><span className="eyebrow mt-7 inline-block">Démo statique</span><h1 className="editorial mt-5 text-5xl text-[#173e36] md:text-7xl">Espace compte indisponible.</h1><p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-[#59655e]">GitHub Pages ne fournit pas le serveur ni la base de données nécessaires aux comptes clients. Aucun renseignement personnel n’est collecté ici.</p><Link href="/boutique" className="button-primary mt-8">Retour à la boutique</Link></div></div></section>;
}
