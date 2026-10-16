import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/product/product-card";
import { getCategoryProducts } from "@/server/products";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const category = await prisma.category.findUnique({ where: { slug: (await params).slug } }); return category ? { title: category.name, description: category.description || `Collection ${category.name}` } : {}; }
export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) { const slug = (await params).slug; const [category, products] = await Promise.all([prisma.category.findUnique({ where: { slug } }), getCategoryProducts(slug)]); if (!category) notFound(); return <><section className="page-hero"><div className="container-shell"><span className="eyebrow">Catégorie</span><h1 className="editorial mt-6 text-7xl text-[#173e36]">{category.name}</h1><p className="mt-5 text-[#69736c]">{category.description}</p></div></section><section className="container-shell section-space"><div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">{products.map((product) => <ProductCard key={product.id} product={product} />)}</div></section></>; }
