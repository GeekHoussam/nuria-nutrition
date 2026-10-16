import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { CookieBanner } from "@/components/layout/cookie-banner";
import { siteUrl } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "NŪRIA Nutrition — Compléments alimentaires", template: "%s | NŪRIA Nutrition" },
  description: "Une approche moderne, transparente et élégante de la complémentation alimentaire au Maroc.",
  openGraph: {
    type: "website",
    locale: "fr_MA",
    siteName: "NŪRIA Nutrition",
    title: "NŪRIA Nutrition",
    description: "Une approche moderne de la complémentation alimentaire.",
    images: [{ url: `${siteUrl}/images/magnesium-lifestyle-v2.png`, width: 1122, height: 1402 }],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr-MA" data-scroll-behavior="smooth">
      <body>
        <a className="sr-only focus:not-sr-only focus:fixed focus:z-[100] focus:bg-white focus:p-4" href="#contenu">
          Aller au contenu
        </a>
        <Header />
        <main id="contenu">{children}</main>
        <Footer />
        <CartDrawer />
        <CookieBanner />
      </body>
    </html>
  );
}
