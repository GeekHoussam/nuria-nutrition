import { prisma } from "@/lib/prisma";
import { formatMoney } from "@/lib/utils";
import { updateOrderStatus } from "./actions";

export const dynamic = "force-dynamic";
export default async function AdminOrdersPage({ searchParams }: { searchParams: Promise<{ statut?: string }> }) {
  const statut = (await searchParams).statut;
  const allowed = ["PENDING", "CONFIRMED", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"];
  const orders = await prisma.order.findMany({ where: allowed.includes(statut || "") ? { status: statut as "PENDING" } : {}, include: { items: true }, orderBy: { createdAt: "desc" } });
  return <div><span className="eyebrow">Suivi</span><h1 className="editorial mt-5 text-6xl text-[#173e36]">Commandes.</h1><form className="mt-7"><select className="select-field max-w-xs" name="statut" defaultValue={statut || ""}><option value="">Tous les statuts</option>{allowed.map((status) => <option key={status}>{status}</option>)}</select><button className="button-secondary ml-2">Filtrer</button></form><div className="mt-8 space-y-4">{orders.map((order) => <article key={order.id} className="rounded-2xl border border-[#173e36]/10 bg-white/55 p-6"><div className="flex flex-col justify-between gap-4 sm:flex-row"><div><p className="text-xs font-bold text-[#69736c]">{order.reference} · {order.createdAt.toLocaleDateString("fr-MA")}</p><h2 className="mt-2 font-serif text-2xl">{order.customerName}</h2><p className="mt-1 text-sm text-[#69736c]">{order.customerEmail} · {order.city}</p></div><div className="text-right"><strong className="font-serif text-2xl">{formatMoney(order.totalMinor)}</strong><p className="text-xs text-[#69736c]">{order.items.length} ligne(s)</p></div></div><form action={updateOrderStatus} className="mt-5 flex items-center gap-3 border-t border-[#173e36]/10 pt-5"><input type="hidden" name="id" value={order.id} /><select name="status" className="select-field max-w-xs" defaultValue={order.status}>{allowed.map((status) => <option key={status}>{status}</option>)}</select><button className="button-primary">Mettre à jour</button></form></article>)}</div></div>;
}
