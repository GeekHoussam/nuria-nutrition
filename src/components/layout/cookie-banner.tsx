"use client";

import Link from "next/link";
import { useState } from "react";
import { useHydrated } from "@/hooks/use-hydrated";

export function CookieBanner() {
  const hydrated = useHydrated();
  const [dismissed, setDismissed] = useState(false);
  const visible = hydrated && !dismissed && localStorage.getItem("nuria-cookie-choice") === null;
  if (!visible) return null;
  function choose(value: "essential" | "all") { localStorage.setItem("nuria-cookie-choice", value); setDismissed(true); }
  return <aside className="fixed right-4 bottom-4 left-4 z-[60] mx-auto max-w-2xl rounded-2xl border border-[#173e36]/15 bg-[#f8f5ee]/96 p-5 shadow-2xl backdrop-blur md:right-6 md:bottom-6 md:left-auto"><p className="font-serif text-xl text-[#173e36]">Votre confidentialité, sans détour.</p><p className="mt-2 text-xs leading-5 text-[#69736c]">Ce prototype utilise uniquement le stockage essentiel pour le panier et vos préférences. Aucun outil publicitaire n’est installé. <Link href="/legal/cookies" className="underline">En savoir plus</Link>.</p><div className="mt-4 flex flex-wrap gap-2"><button type="button" onClick={() => choose("essential")} className="button-secondary !min-h-10 !px-4 text-xs">Essentiels uniquement</button><button type="button" onClick={() => choose("all")} className="button-primary !min-h-10 !px-4 text-xs">Accepter</button></div></aside>;
}
