"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";

export function LoginForm() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setLoading(true); setError("");
    const data = new FormData(event.currentTarget);
    const result = await signIn("credentials", { email: data.get("email"), password: data.get("password"), redirect: false });
    if (result?.error) { setError("E-mail ou mot de passe incorrect."); setLoading(false); return; }
    router.push("/mon-compte"); router.refresh();
  }
  return <form onSubmit={submit} className="mt-8 space-y-5"><label><span className="label-text">Adresse e-mail</span><input className="input-field" name="email" type="email" autoComplete="email" required /></label><label><span className="label-text">Mot de passe</span><input className="input-field" name="password" type="password" autoComplete="current-password" required /></label><div className="flex items-center justify-between text-xs"><label className="flex items-center gap-2"><input type="checkbox" className="accent-[#173e36]" /> Se souvenir de moi</label><Link href="/mot-de-passe-oublie" className="font-bold underline underline-offset-4">Mot de passe oublié ?</Link></div>{error && <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}<button className="button-primary w-full" disabled={loading}>{loading ? "Connexion…" : "Se connecter"}</button><p className="text-center text-sm text-[#69736c]">Pas encore de compte ? <Link href="/inscription" className="font-bold text-[#173e36] underline underline-offset-4">Créer un compte</Link></p></form>;
}

export function RegisterForm() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setLoading(true); setError("");
    const data = new FormData(event.currentTarget);
    const payload = { name: data.get("name"), email: data.get("email"), password: data.get("password") };
    const response = await fetch("/api/register", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(payload) });
    const result = await response.json();
    if (!response.ok) { setError(result.error || "Inscription impossible."); setLoading(false); return; }
    const login = await signIn("credentials", { email: payload.email, password: payload.password, redirect: false });
    if (login?.error) { router.push("/connexion"); return; }
    router.push("/mon-compte"); router.refresh();
  }
  return <form onSubmit={submit} className="mt-8 space-y-5"><label><span className="label-text">Nom complet</span><input className="input-field" name="name" autoComplete="name" required /></label><label><span className="label-text">Adresse e-mail</span><input className="input-field" name="email" type="email" autoComplete="email" required /></label><label><span className="label-text">Mot de passe</span><input className="input-field" name="password" type="password" autoComplete="new-password" minLength={10} required /><small className="mt-2 block text-[#69736c]">10 caractères minimum, avec majuscule, minuscule et chiffre.</small></label><label className="flex items-start gap-3 text-xs leading-5"><input type="checkbox" required className="mt-1 accent-[#173e36]" />J’accepte les conditions et la politique de confidentialité du prototype.</label>{error && <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}<button className="button-primary w-full" disabled={loading}>{loading ? "Création…" : "Créer mon compte"}</button><p className="text-center text-sm text-[#69736c]">Déjà inscrit ? <Link href="/connexion" className="font-bold text-[#173e36] underline underline-offset-4">Se connecter</Link></p></form>;
}
