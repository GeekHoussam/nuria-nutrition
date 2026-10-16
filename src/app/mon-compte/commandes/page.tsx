import Link from "next/link";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { formatMoney } from "@/lib/utils";

export default async function AccountOrdersPage() {
  const session = await auth();
  const orders = await prisma.order.findMany({ where: { userId: session!.user.id }, include: { items: true }, orderBy: { createdAt: "desc" } });
  return <div><span className="eyebrow">Historique</span><h1 className="editorial mt-5 text-6xl text-[#173e36]">Mes commandes.</h1>{orders.length ? <div className="mt-9 overflow-hidden rounded-2xl border border-[#173e36]/10"><table className="w-full text-left text-sm"><thead className="bg-[#dde7d8]"><tr><th className="p-4">Référence</th><th className="hidden p-4 sm:table-cell">Date</th><th className="p-4">Total</th><th className="p-4">Statut</th></tr></thead><tbody>{orders.map((order) => <tr key={order.id} className="border-t border-[#173e36]/10"><td className="p-4 font-bold"><Link href={`/commande/confirmation/${order.id}`}>{order.reference}</Link></td><td className="hidden p-4 sm:table-cell">{order.createdAt.toLocaleDateString("fr-MA")}</td><td className="p-4">{formatMoney(order.totalMinor)}</td><td className="p-4">{order.status.toLowerCase()}</td></tr>)}</tbody></table></div> : <div className="mt-9 rounded-2xl bg-[#dde7d8]/50 p-8"><p>Vous n’avez pas encore de commande associée à ce compte.</p><Link href="/boutique" className="button-primary mt-5">Découvrir la boutique</Link></div>}</div>;
}
