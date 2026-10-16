"use client";

import { FormEvent, useState } from "react";
import { CheckCircle2 } from "lucide-react";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  async function submit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); setStatus("loading"); const data = new FormData(event.currentTarget); const response = await fetch("/api/contact", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(Object.fromEntries(data)) }); const result = await response.json(); setMessage(result.message || result.error); setStatus(response.ok ? "success" : "error"); if (response.ok) event.currentTarget.reset(); }
  if (status === "success") return <div className="rounded-[2rem] bg-[#dde7d8] p-10"><CheckCircle2 size={36} /><h2 className="mt-5 font-serif text-3xl">Message enregistré.</h2><p className="mt-3 text-sm leading-7 text-[#59655e]">{message}</p></div>;
  return <form onSubmit={submit} className="rounded-[2rem] border border-[#173e36]/10 bg-white/55 p-7 md:p-9"><div className="grid gap-5 sm:grid-cols-2"><label><span className="label-text">Nom</span><input className="input-field" name="name" required /></label><label><span className="label-text">E-mail</span><input className="input-field" name="email" type="email" required /></label><label className="sm:col-span-2"><span className="label-text">Sujet</span><input className="input-field" name="subject" required /></label><label className="sm:col-span-2"><span className="label-text">Votre message</span><textarea className="textarea-field" name="message" rows={6} required /></label></div>{status === "error" && <p role="alert" className="mt-4 text-sm text-red-700">{message}</p>}<button className="button-primary mt-6" disabled={status === "loading"}>{status === "loading" ? "Enregistrement…" : "Envoyer le message"}</button></form>;
}
