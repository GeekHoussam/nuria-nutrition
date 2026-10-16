import Link from "next/link";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export default async function AccountPage() {
  const session = await auth();
  const [orders, addresses] = await Promise.all([prisma.order.count({ where: { userId: session!.user.id } }), prisma.address.count({ where: { userId: session!.user.id } })]);
  return <div><span className="eyebrow">Mon compte</span><h1 className="editorial mt-5 text-6xl text-[#173e36]">Votre espace NŪRIA.</h1><div className="mt-10 grid gap-5 sm:grid-cols-2"><Link href="/mon-compte/commandes" className="rounded-[1.75rem] bg-[#dde7d8] p-7"><span className="text-4xl font-serif">{orders}</span><h2 className="mt-8 font-serif text-2xl">Commandes</h2><p className="mt-2 text-sm text-[#69736c]">Consulter votre historique.</p></Link><Link href="/mon-compte/adresses" className="rounded-[1.75rem] bg-[#ece7dc] p-7"><span className="text-4xl font-serif">{addresses}</span><h2 className="mt-8 font-serif text-2xl">Adresses</h2><p className="mt-2 text-sm text-[#69736c]">Gérer vos adresses enregistrées.</p></Link></div></div>;
}
