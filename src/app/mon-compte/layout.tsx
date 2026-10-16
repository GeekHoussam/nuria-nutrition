import Link from "next/link";
import { redirect } from "next/navigation";
import { signOut } from "@/auth";
import { auth } from "@/auth";

export default async function AccountLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user) redirect("/connexion");
  return <section className="container-shell section-space"><div className="grid gap-10 lg:grid-cols-[240px_1fr]"><aside><p className="text-xs font-bold tracking-widest text-[#69736c] uppercase">Bonjour</p><p className="mt-2 font-serif text-2xl text-[#173e36]">{session.user.name}</p><nav className="mt-8 flex flex-col gap-2"><Link className="rounded-xl px-4 py-3 hover:bg-[#dde7d8]" href="/mon-compte">Vue d’ensemble</Link><Link className="rounded-xl px-4 py-3 hover:bg-[#dde7d8]" href="/mon-compte/commandes">Mes commandes</Link><Link className="rounded-xl px-4 py-3 hover:bg-[#dde7d8]" href="/mon-compte/adresses">Mes adresses</Link></nav><form action={async () => { "use server"; await signOut({ redirectTo: "/" }); }}><button className="mt-6 px-4 text-sm font-bold underline underline-offset-4">Se déconnecter</button></form></aside><div>{children}</div></div></section>;
}
