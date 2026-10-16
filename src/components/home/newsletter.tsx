import { CircleSlash2 } from "lucide-react";

export function Newsletter() {
  return <section className="bg-[#c2a16a] py-20 text-[#173e36]"><div className="container-shell grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-end"><div><span className="text-xs font-bold tracking-[.18em] uppercase">La lettre NŪRIA</span><h2 className="editorial mt-4 text-5xl md:text-6xl">Le bien-être<br />commence ici.</h2><p className="mt-5 text-sm text-[#173e36]/75">Une future lettre éditoriale pensée avec clarté et consentement.</p></div><div className="flex min-h-40 items-center gap-4 rounded-3xl bg-[#f8f5ee]/85 p-7"><CircleSlash2 className="shrink-0" size={30} /><div><p className="font-serif text-2xl">Inscription désactivée sur la démo.</p><p className="mt-2 text-sm text-[#59655e]">Aucune adresse e-mail n’est collectée par cette publication statique.</p></div></div></div></section>;
}
