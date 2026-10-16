"use client";

import Image from "next/image";
import { Box, ZoomIn } from "lucide-react";
import { useState } from "react";
import { Product3DViewer } from "@/components/three/product-3d-viewer";
import type { ProductDTO } from "@/types/product";

export function ProductGallery({ product }: { product: ProductDTO }) {
  const [selected, setSelected] = useState(0);
  const [view3d, setView3d] = useState(false);
  const [zoom, setZoom] = useState(false);
  const image = product.images[selected] || product.images[0];
  return <div><div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-[#e6ece2]">{view3d ? <Product3DViewer className="h-full" productSlug={product.slug} productName={product.name} fallbackImage={product.images[0]?.url} /> : image && <button type="button" className="relative h-full w-full cursor-zoom-in" onClick={() => setZoom(true)} aria-label="Agrandir l’image"><Image src={image.url} alt={image.alt} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" priority /></button>}<button type="button" className="absolute right-5 bottom-5 flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-xs font-bold text-[#173e36] shadow-sm" onClick={() => setView3d(!view3d)}>{view3d ? <ZoomIn size={15} /> : <Box size={15} />}{view3d ? "Voir les photos" : "Vue 3D"}</button></div><div className="mt-4 flex gap-3 overflow-x-auto pb-2">{product.images.map((item, index) => <button type="button" onClick={() => { setSelected(index); setView3d(false); }} key={item.url} className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border-2 ${!view3d && selected === index ? "border-[#173e36]" : "border-transparent"}`} aria-label={`Afficher l’image ${index + 1}`}><Image src={item.url} alt="" fill className="object-cover" /></button>)}<button type="button" onClick={() => setView3d(true)} className={`grid h-20 w-20 shrink-0 place-items-center rounded-xl border-2 bg-[#dde7d8] ${view3d ? "border-[#173e36]" : "border-transparent"}`} aria-label={`Afficher la vue 3D de ${product.name}`}><Box /></button></div>{zoom && image && <button type="button" className="fixed inset-0 z-[100] grid cursor-zoom-out place-items-center bg-[#102d26]/90 p-4" aria-label="Fermer l’image agrandie" onClick={() => setZoom(false)}><Image src={image.url} alt={image.alt} width={1000} height={1200} className="max-h-[94vh] w-auto rounded-2xl object-contain" /></button>}</div>;
}
