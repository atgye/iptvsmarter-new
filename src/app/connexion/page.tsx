"use client";

import { useState } from "react";
import Link from "next/link";

export default function ConnexionPage() {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(
      mode === "login"
        ? "Connexion réussie !"
        : "Inscription réussie ! Vérifiez votre WhatsApp."
    );
  };

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-surface-container-lowest py-16 px-4">
      {/* Background effects */}
      <div className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-primary-container/8 blur-[120px]" />
      <div className="absolute -bottom-40 -right-40 h-[400px] w-[400px] rounded-full bg-secondary/8 blur-[120px]" />

      <div className="relative w-full max-w-md">
        {/* Back to home */}
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm text-on-surface-variant hover:text-primary transition-colors"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
            />
          </svg>
          Retour à l&apos;accueil
        </Link>

        {/* Card */}
        <div className="rounded-3xl bg-surface-container p-8 sm:p-10">
          {/* Logo */}
          <div className="flex items-center gap-2 mb-8">
            <span className="inline-block h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-primary-container" />
            <span className="font-[var(--font-headline)] text-lg font-bold text-on-surface">
              IPTV<span className="text-primary-container">Smarters</span>
            </span>
          </div>

          {/* Mode Toggle */}
          <div className="flex rounded-xl bg-surface-container-low p-1 mb-8">
            <button
              onClick={() => setMode("login")}
              className={`flex-1 rounded-lg py-2.5 text-sm font-semibold transition-all ${
                mode === "login"
                  ? "bg-surface-container-highest text-on-surface shadow-sm"
                  : "text-on-surface-variant hover:text-on-surface"
              }`}
            >
              Se connecter
            </button>
            <button
              onClick={() => setMode("register")}
              className={`flex-1 rounded-lg py-2.5 text-sm font-semibold transition-all ${
                mode === "register"
                  ? "bg-surface-container-highest text-on-surface shadow-sm"
                  : "text-on-surface-variant hover:text-on-surface"
              }`}
            >
              S&apos;inscrire
            </button>
          </div>

          <h1 className="font-[var(--font-headline)] text-xl font-bold text-on-surface">
            {mode === "login" ? "Se connecter" : "S'inscrire"}
          </h1>
          <p className="mt-1 text-sm text-on-surface-variant">
            {mode === "login"
              ? "Bon retour parmi nous sur IPTVSmarters."
              : "Rejoignez la communauté et profitez du meilleur du stream."}
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            {mode === "register" && (
              <div>
                <label
                  htmlFor="auth-name"
                  className="block text-xs font-medium text-on-surface-variant mb-1.5"
                >
                  Nom complet
                </label>
                <input
                  id="auth-name"
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) =>
                    setForm({ ...form, name: e.target.value })
                  }
                  className="w-full rounded-xl bg-surface-container-low py-3 px-4 text-sm text-on-surface placeholder:text-on-surface-variant/40 outline-none transition-all focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary/30"
                  placeholder="Votre nom"
                />
              </div>
            )}

            <div>
              <label
                htmlFor="auth-email"
                className="block text-xs font-medium text-on-surface-variant mb-1.5"
              >
                Email ou téléphone
              </label>
              <input
                id="auth-email"
                type="text"
                required
                value={form.email}
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
                className="w-full rounded-xl bg-surface-container-low py-3 px-4 text-sm text-on-surface placeholder:text-on-surface-variant/40 outline-none transition-all focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary/30"
                placeholder="email@exemple.com"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label
                  htmlFor="auth-password"
                  className="text-xs font-medium text-on-surface-variant"
                >
                  Mot de passe
                </label>
                {mode === "login" && (
                  <button
                    type="button"
                    className="text-xs text-primary hover:underline"
                  >
                    Oublié ?
                  </button>
                )}
              </div>
              <input
                id="auth-password"
                type="password"
                required
                value={form.password}
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
                className="w-full rounded-xl bg-surface-container-low py-3 px-4 text-sm text-on-surface placeholder:text-on-surface-variant/40 outline-none transition-all focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary/30"
                placeholder="••••••••"
              />
            </div>

            {mode === "register" && (
              <div>
                <label
                  htmlFor="auth-confirm"
                  className="block text-xs font-medium text-on-surface-variant mb-1.5"
                >
                  Confirmer le mot de passe
                </label>
                <input
                  id="auth-confirm"
                  type="password"
                  required
                  value={form.confirmPassword}
                  onChange={(e) =>
                    setForm({ ...form, confirmPassword: e.target.value })
                  }
                  className="w-full rounded-xl bg-surface-container-low py-3 px-4 text-sm text-on-surface placeholder:text-on-surface-variant/40 outline-none transition-all focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary/30"
                  placeholder="••••••••"
                />
              </div>
            )}

            <button
              type="submit"
              className="w-full rounded-2xl py-3.5 text-center font-bold gradient-cta transition-all duration-300 hover:scale-[1.02] hover:shadow-glow-primary mt-2"
              id="auth-submit"
            >
              {mode === "login" ? "Se connecter" : "Créer un compte"}
            </button>
          </form>

          {/* Security badge */}
          <div className="mt-6 flex items-center gap-2 rounded-xl bg-surface-container-low p-3">
            <span className="text-sm">🔒</span>
            <p className="text-[11px] text-on-surface-variant">
              Paiement Sécurisé – Vos transactions via Wave et Orange Money sont
              100% sécurisées.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
