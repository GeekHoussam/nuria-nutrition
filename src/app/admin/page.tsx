import { AlertTriangle, Banknote, Package, ShoppingCart } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { formatMoney } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const [products, orders, revenue, lowStock, recent] = await Promise.all([
    prisma.product.count({ where: { status: "ACTIVE" } }),
    prisma.order.count(),
    prisma.order.aggregate({ where: { status: { not: "CANCELLED" } }, _sum: { totalMinor: true } }),
    prisma.inventory.count({ where: { quantity: { lte: 10 } } }),
    prisma.order.findMany({ take: 5, orderBy: { createdAt: "desc" } }),
  ]);
  const stats = [[Package, "Produits actifs", products.toString()], [ShoppingCart, "Commandes", orders.toString()], [Banknote, "CA démo", formatMoney(revenue._sum.totalMinor || 0)], [AlertTriangle, "Stocks faibles", lowStock.toString()]] as const;
  return <div><span className="eyebrow">Pilotage</span><h1 className="editorial mt-5 text-6xl text-[#173e36]">Tableau de bord.</h1><div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{stats.map(([Icon, label, value]) => <article key={label} className="rounded-2xl border border-[#173e36]/10 bg-white/55 p-6"><Icon className="text-[#c2a16a]" size={21} /><p className="mt-8 text-xs font-bold text-[#69736c] uppercase">{label}</p><p className="mt-2 font-serif text-3xl text-[#173e36]">{value}</p></article>)}</div><section className="mt-10 rounded-2xl border border-[#173e36]/10 bg-white/55 p-6"><h2 className="font-serif text-3xl text-[#173e36]">Commandes récentes</h2><div className="mt-6 overflow-x-auto"><table className="w-full text-left text-sm"><thead><tr className="text-[#69736c]"><th className="pb-3">Référence</th><th className="pb-3">Client</th><th className="pb-3">Total</th><th className="pb-3">Statut</th></tr></thead><tbody>{recent.map((order) => <tr key={order.id} className="border-t border-[#173e36]/10"><td className="py-4 font-bold">{order.reference}</td><td className="py-4">{order.customerName}</td><td className="py-4">{formatMoney(order.totalMinor)}</td><td className="py-4">{order.status.toLowerCase()}</td></tr>)}</tbody></table></div></section></div>;
}
