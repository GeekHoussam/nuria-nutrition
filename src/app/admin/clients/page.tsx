import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";
export default async function AdminCustomersPage() {
  const customers = await prisma.user.findMany({ where: { role: "CUSTOMER" }, include: { _count: { select: { orders: true, addresses: true } } }, orderBy: { createdAt: "desc" } });
  return <div><span className="eyebrow">Lecture seule</span><h1 className="editorial mt-5 text-6xl text-[#173e36]">Clients.</h1><p className="mt-4 text-sm text-[#69736c]">Accès réservé à l’administration. Les informations personnelles ne sont pas exposées publiquement.</p><div className="mt-8 overflow-x-auto rounded-2xl border border-[#173e36]/10 bg-white/55"><table className="w-full text-left text-sm"><thead className="bg-[#dde7d8]"><tr><th className="p-4">Nom</th><th className="p-4">E-mail</th><th className="p-4">Commandes</th><th className="p-4">Adresses</th></tr></thead><tbody>{customers.map((customer) => <tr key={customer.id} className="border-t border-[#173e36]/10"><td className="p-4 font-serif text-lg">{customer.name}</td><td className="p-4">{customer.email}</td><td className="p-4">{customer._count.orders}</td><td className="p-4">{customer._count.addresses}</td></tr>)}</tbody></table></div></div>;
}
