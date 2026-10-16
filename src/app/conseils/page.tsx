import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { articles } from "@/content/articles";

export const metadata: Metadata = { title: "Conseils", description: "Guides de lecture et conseils responsables NŪRIA Nutrition." };
export default function AdvicePage() { return <><section className="page-hero"><div className="container-shell"><span className="eyebrow">Le journal NŪRIA</span><h1 className="editorial mt-6 text-6xl text-[#173e36] md:text-8xl">Mieux comprendre,<br />choisir sereinement.</h1></div></section><section className="container-shell section-space"><div className="grid gap-6 md:grid-cols-2">{articles.map((article, index) => <Link href={`/conseils/${article.slug}`} key={article.slug} className="group rounded-[2rem] border border-[#173e36]/10 bg-white/50 p-8 transition hover:-translate-y-1 hover:shadow-[var(--shadow-soft)]"><span className="text-xs font-bold tracking-widest text-[#c2a16a] uppercase">Guide 0{index + 1} · {article.readTime}</span><h2 className="editorial mt-8 text-4xl text-[#173e36]">{article.title}</h2><p className="mt-5 text-sm leading-7 text-[#69736c]">{article.excerpt}</p><ArrowRight className="mt-10 transition-transform group-hover:translate-x-1" /></Link>)}</div></section></>; }
