import Link from "next/link";
import { Logo } from "@/components/ui/logo";
import { HeaderActions } from "@/components/layout/header-actions";

const links = [
  ["Accueil", "/"],
  ["Boutique", "/boutique"],
  ["Nos ingrédients", "/nos-ingredients"],
  ["Notre philosophie", "/notre-philosophie"],
  ["Conseils", "/conseils"],
  ["Contact", "/contact"],
];

export function Header() {
  return (
    <>
      <div className="bg-[#173e36] px-4 py-2 text-center text-[0.72rem] font-semibold tracking-[0.12em] text-white uppercase">
        Démo statique — commandes et comptes désactivés
      </div>
      <header className="sticky top-0 z-50 border-b border-[#173e36]/10 bg-[#f8f5ee]/88 backdrop-blur-xl">
        <div className="container-shell flex h-[74px] items-center justify-between gap-5">
          <Logo />
          <nav className="hidden items-center gap-6 xl:flex" aria-label="Navigation principale">
            {links.map(([label, href]) => (
              <Link key={href} href={href} className="text-[0.78rem] font-semibold text-[#33453d] transition-colors hover:text-[#c2a16a]">
                {label}
              </Link>
            ))}
          </nav>
          <HeaderActions links={links} />
        </div>
      </header>
    </>
  );
}
