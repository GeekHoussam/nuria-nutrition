import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, Heart, Info } from "lucide-react";
import { ProductGallery } from "@/components/product/product-gallery";
import { ProductPurchase } from "@/components/product/product-purchase";
import { MobileStickyPurchase } from "@/components/product/mobile-sticky-purchase";
import { ProductCard } from "@/components/product/product-card";
import { getProductBySlug, getProducts } from "@/server/products";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const product = await getProductBySlug((await params).slug);
  if (!product) return {};
  return { title: product.name, description: product.shortDescription, alternates: { canonical: `/produits/${product.slug}` }, openGraph: { title: product.name, description: product.shortDescription, images: product.images[0] ? [product.images[0].url] : [] } };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug;
  const [product, products] = await Promise.all([getProductBySlug(slug), getProducts()]);
  if (!product) notFound();
  const related = products.filter((item) => item.id !== product.id && item.category?.slug === product.category?.slug).slice(0, 3);
  const info = [["Description", product.description], ["Composition", product.composition], ["Informations nutritionnelles", product.nutritionInfo], ["Conseils d’utilisation", product.usageInfo], ["Précautions", product.precautions], ["Livraison et retours", "Livraison au Maroc. Délais, frais et conditions de retour à configurer et à faire valider avant lancement."]];
  const productJsonLd = { "@context": "https://schema.org", "@type": "Product", name: product.name, description: product.shortDescription, sku: product.sku, brand: { "@type": "Brand", name: product.brand }, image: product.images.map((image) => image.url), offers: { "@type": "Offer", priceCurrency: product.currency, price: (product.priceMinor / 100).toFixed(2), availability: product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock", url: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/produits/${product.slug}` } };
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }} /><div className="container-shell py-8"><nav aria-label="Fil d’Ariane" className="flex flex-wrap items-center gap-2 text-xs text-[#69736c]"><Link href="/">Accueil</Link><ChevronRight size={13} /><Link href="/boutique">Boutique</Link><ChevronRight size={13} /><span aria-current="page">{product.name}</span></nav><div className="mt-8 grid gap-12 lg:grid-cols-[1.08fr_.92fr]"><ProductGallery product={product} /><div className="lg:sticky lg:top-28 lg:self-start"><div className="flex items-center justify-between"><span className="eyebrow">{product.category?.name}</span><button type="button" className="grid h-11 w-11 place-items-center rounded-full border border-[#173e36]/12" aria-label="Ajouter aux favoris"><Heart size={18} /></button></div><p className="mt-7 text-xs font-bold tracking-[.16em] text-[#69736c] uppercase">{product.brand} · {product.format}</p><h1 className="editorial mt-3 text-6xl leading-[.96] text-[#173e36] md:text-7xl">{product.name}</h1><p className="mt-6 text-base leading-8 text-[#59655e]">{product.shortDescription}</p><div className="mt-8"><ProductPurchase product={product} /></div><div className="mt-8 flex gap-3 rounded-2xl border border-[#c2a16a]/35 bg-[#c2a16a]/10 p-4 text-xs leading-5 text-[#59655e]"><Info className="mt-0.5 shrink-0 text-[#9b793f]" size={17} /><p>Produit fictif de démonstration. Les informations réglementées restent à vérifier auprès du fournisseur avant toute vente réelle.</p></div></div></div><section className="section-space"><div className="grid gap-4 lg:grid-cols-2">{info.map(([title, content], index) => <details key={title} className="group rounded-2xl border border-[#173e36]/10 bg-white/45 p-6" open={index === 0}><summary className="cursor-pointer list-none font-serif text-xl text-[#173e36] marker:hidden">{title}<span className="float-right text-sm">+</span></summary><p className="mt-5 text-sm leading-7 text-[#69736c]">{content || "Données fournisseur à intégrer et à vérifier avant commercialisation."}</p></details>)}</div></section>{related.length > 0 && <section className="section-space border-t border-[#173e36]/10"><h2 className="editorial text-5xl text-[#173e36]">Vous pourriez aussi explorer</h2><div className="mt-10 grid gap-7 md:grid-cols-3">{related.map((item) => <ProductCard key={item.id} product={item} />)}</div></section>}</div><MobileStickyPurchase product={product} /></>;
}
