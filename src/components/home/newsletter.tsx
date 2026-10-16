"use client";

import { FormEvent, useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export function Newsletter() {
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setState("loading"); setMessage("");
    const data = new FormData(event.currentTarget);
    const response = await fetch("/api/newsletter", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ email: data.get("email"), consent: data.get("consent") === "on" }) });
    const result = await response.json();
    if (response.ok) { setState("success"); setMessage(result.message); event.currentTarget.reset(); } else { setState("error"); setMessage(result.error || "Une erreur est survenue."); }
  }
  return <section className="bg-[#c2a16a] py-20 text-[#173e36]"><div className="container-shell grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-end"><div><span className="text-xs font-bold tracking-[.18em] uppercase">La lettre NŪRIA</span><h2 className="editorial mt-4 text-5xl md:text-6xl">Le bien-être<br />commence ici.</h2><p className="mt-5 text-sm text-[#173e36]/75">Recevez nos actualités et conseils. Aucun envoi ne sera effectué sans votre consentement.</p></div>{state === "success" ? <div className="flex min-h-40 items-center gap-4 rounded-3xl bg-[#f8f5ee]/85 p-7"><CheckCircle2 size={30} /><p className="font-serif text-2xl">{message}</p></div> : <form onSubmit={submit} className="rounded-[2rem] bg-[#f8f5ee] p-6 md:p-8"><div className="flex flex-col gap-3 sm:flex-row"><label className="sr-only" htmlFor="newsletter-email">Votre adresse e-mail</label><input id="newsletter-email" name="email" type="email" required className="input-field flex-1" placeholder="votre@email.com" /><button disabled={state === "loading"} className="button-primary" type="submit">{state === "loading" ? "Envoi…" : <>S’inscrire <ArrowRight size={16} /></>}</button></div><label className="mt-4 flex items-start gap-3 text-xs leading-5 text-[#59655e]"><input type="checkbox" name="consent" required className="mt-1 accent-[#173e36]" />J’accepte que NŪRIA conserve mon e-mail pour m’envoyer ses actualités. Je peux retirer mon consentement à tout moment.</label>{state === "error" && <p role="alert" className="mt-3 text-sm font-semibold text-red-700">{message}</p>}</form>}</div></section>;
}
