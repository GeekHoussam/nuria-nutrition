import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ light = false, compact = false }: { light?: boolean; compact?: boolean }) {
  return (
    <Link href="/" className={cn("inline-flex flex-col leading-none", light ? "text-white" : "text-[#173e36]")} aria-label="NŪRIA Nutrition — Accueil">
      <span className={cn("font-semibold tracking-[0.24em]", compact ? "text-lg" : "text-[1.35rem]")}>NŪRIA</span>
      {!compact && <span className="mt-1 text-[0.54rem] font-bold tracking-[0.35em] opacity-65">NUTRITION</span>}
    </Link>
  );
}
