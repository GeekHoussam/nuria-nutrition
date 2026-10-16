import Link from "next/link";
import { LayoutDashboard, Package, ShoppingCart, Users } from "lucide-react";
import { requireAdmin } from "@/lib/access";

const links = [[LayoutDashboard, "Tableau de bord", "/admin"], [Package, "Produits", "/admin/produits"], [ShoppingCart, "Commandes", "/admin/commandes"], [Users, "Clients", "/admin/clients"]] as const;

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin();
  return <section className="container-shell section-space"><div className="mb-10 rounded-2xl bg-[#173e36] p-5 text-white"><p className="text-xs font-bold tracking-widest text-[#c2a16a] uppercase">Administration sécurisée</p><nav className="mt-4 flex flex-wrap gap-2">{links.map(([Icon, label, href]) => <Link key={href} href={href} className="flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm hover:bg-white/10"><Icon size={15} />{label}</Link>)}</nav></div>{children}</section>;
}
