import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { legalPages } from "@/content/legal";

export function generateStaticParams() { return Object.keys(legalPages).map((slug) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const page = legalPages[(await params).slug]; return page ? { title: page.title, robots: { index: false } } : {}; }
export default async function LegalPage({ params }: { params: Promise<{ slug: string }> }) { const page = legalPages[(await params).slug]; if (!page) notFound(); return <><section className="page-hero"><div className="container-shell max-w-4xl"><span className="eyebrow">Document de travail</span><h1 className="editorial mt-6 text-6xl text-[#173e36] md:text-8xl">{page.title}</h1><p className="mt-6 rounded-2xl border border-[#c2a16a]/35 bg-[#c2a16a]/10 p-5 text-sm leading-7 text-[#59655e]">{page.intro} Ce texte doit être revu par un conseil juridique qualifié avant publication commerciale.</p></div></section><article className="container-shell prose-legal section-space max-w-4xl">{page.sections.map(([title, content]) => <section key={title}><h2>{title}</h2><p>{content}</p></section>)}</article></>; }
