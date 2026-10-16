"use client";

import Link from "next/link";
import { ArrowDownRight, ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { Product3DViewer } from "@/components/three/product-3d-viewer";

export function Hero() {
  return <section className="relative min-h-[calc(100svh-106px)] overflow-hidden bg-[#dde7d8]">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_28%,rgba(255,255,255,.75),transparent_27%),linear-gradient(110deg,#e7ecdf_0%,#d6e0d2_60%,#c9d6c6_100%)]" />
    <div className="absolute top-[18%] -left-32 h-80 w-80 rounded-full border border-[#173e36]/10" /><div className="absolute -right-28 bottom-20 h-96 w-96 rounded-full border border-[#c2a16a]/35" />
    <div className="container-shell relative grid min-h-[calc(100svh-106px)] items-center gap-2 py-12 lg:grid-cols-[.92fr_1.08fr] lg:py-4">
      <div className="relative z-10 pt-8 lg:pt-0">
        <motion.p className="eyebrow" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .65 }}>Bien-être · Clarté · Exigence</motion.p>
        <motion.h1 className="editorial mt-7 max-w-2xl text-[clamp(3.7rem,7.3vw,7.7rem)] leading-[.88] text-[#173e36]" initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .85, delay: .08 }}>Votre bien-être,<br /><em className="font-normal text-[#6b7f70]">notre essentiel.</em></motion.h1>
        <motion.p className="mt-8 max-w-lg text-base leading-7 text-[#45554d] md:text-lg" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7, delay: .2 }}>Découvrez une approche moderne de la complémentation alimentaire — pensée avec transparence, simplicité et élégance.</motion.p>
        <motion.div className="mt-9 flex flex-col gap-3 sm:flex-row" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7, delay: .32 }}><Link href="/boutique" className="button-primary">Découvrir la collection <ArrowRight size={17} /></Link><Link href="/notre-philosophie" className="button-secondary">Notre philosophie</Link></motion.div>
      </div>
      <motion.div className="relative h-[55svh] min-h-[470px] lg:h-[78svh]" initial={{ opacity: 0, scale: .9, rotate: 2 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ duration: 1.2, delay: .12, ease: [0.22, 1, 0.36, 1] }}><Product3DViewer className="h-full w-full" /><div className="absolute top-1/2 right-1 text-right"><span className="block text-[.62rem] font-bold tracking-[.17em] text-[#173e36]/55 uppercase">Prototype 01</span><span className="mt-1 block font-serif text-lg text-[#173e36]">Magnésium</span></div></motion.div>
      <a href="#essentiels" className="absolute bottom-6 left-0 hidden items-center gap-3 text-[.68rem] font-bold tracking-[.15em] text-[#173e36] uppercase lg:flex">Explorer <span className="grid h-10 w-10 place-items-center rounded-full border border-[#173e36]/20"><ArrowDownRight size={16} /></span></a>
    </div>
  </section>;
}
