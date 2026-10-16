import type { Metadata } from "next";
import { Checkout } from "@/components/checkout/checkout";

export const metadata: Metadata = { title: "Commande sécurisée — prototype", robots: { index: false, follow: false } };

export default function CheckoutPage() {
  return <><section className="page-hero pb-10"><div className="container-shell"><span className="eyebrow">Paiement test</span><h1 className="editorial mt-5 text-6xl text-[#173e36] md:text-8xl">Finaliser votre commande.</h1><p className="mt-5 max-w-2xl text-[#69736c]">Parcours de démonstration : aucune transaction bancaire réelle ne sera effectuée.</p></div></section><Checkout paymentOptions={{ cash: process.env.ENABLE_CASH_ON_DELIVERY !== "false", bank: process.env.ENABLE_BANK_TRANSFER !== "false", mock: process.env.ENABLE_MOCK_PAYMENT !== "false" }} /></>;
}
