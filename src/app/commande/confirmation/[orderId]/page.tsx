import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { auth } from "@/auth";
import { getAccessibleOrder } from "@/server/orders";
import { formatMoney } from "@/lib/utils";

export const metadata: Metadata = { title: "Confirmation de commande", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

const paymentLabels = { CASH_ON_DELIVERY: "Paiement à la livraison", BANK_TRANSFER: "Virement bancaire", MOCK_ONLINE: "Paiement en ligne test" } as const;

export default async function ConfirmationPage({ params, searchParams }: { params: Promise<{ orderId: string }>; searchParams: Promise<{ token?: string }> }) {
  const [{ orderId }, { token }, session] = await Promise.all([params, searchParams, auth()]);
  const order = await getAccessibleOrder(orderId, token, session?.user?.id, session?.user?.role === "ADMIN");
  if (!order) notFound();
  return <section className="container-shell section-space"><div className="mx-auto max-w-3xl"><div className="text-center"><CheckCircle2 className="mx-auto text-[#3f755f]" size={60} /><span className="eyebrow mt-6">Commande confirmée</span><h1 className="editorial mt-5 text-6xl text-[#173e36]">Merci, {order.customerName.split(" ")[0]}.</h1><p className="mt-5 text-[#69736c]">Votre commande test <strong>{order.reference}</strong> a bien été enregistrée.</p></div><div className="mt-12 rounded-[2rem] border border-[#173e36]/10 bg-white/60 p-7 md:p-10"><div className="grid gap-6 border-b border-[#173e36]/10 pb-7 sm:grid-cols-2"><div><p className="text-xs font-bold tracking-wider text-[#69736c] uppercase">Livraison</p><p className="mt-2 leading-7">{order.customerName}<br />{order.addressLine1}{order.addressLine2 && <><br />{order.addressLine2}</>}<br />{order.postalCode} {order.city}<br />Maroc</p></div><div><p className="text-xs font-bold tracking-wider text-[#69736c] uppercase">Paiement</p><p className="mt-2">{paymentLabels[order.paymentMethod]}</p><p className="mt-2 text-xs text-[#69736c]">Statut : {order.payment?.status.toLowerCase()}</p></div></div><ul className="divide-y divide-[#173e36]/10">{order.items.map((item) => <li key={item.id} className="flex justify-between gap-5 py-5"><div><p className="font-serif text-xl">{item.productName}</p><p className="text-xs text-[#69736c]">{item.sku} · quantité {item.quantity}</p></div><strong>{formatMoney(item.totalMinor)}</strong></li>)}</ul><div className="flex justify-between border-t border-[#173e36]/10 pt-6"><span className="font-bold">Total</span><strong className="font-serif text-3xl text-[#173e36]">{formatMoney(order.totalMinor)}</strong></div></div><div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row"><Link href="/boutique" className="button-primary">Continuer mes achats</Link>{session?.user && <Link href="/mon-compte/commandes" className="button-secondary">Voir mes commandes</Link>}</div><p className="mt-8 text-center text-xs text-[#69736c]">Confirmation de prototype. Aucun e-mail ni paiement réel n’a été déclenché.</p></div></section>;
}
