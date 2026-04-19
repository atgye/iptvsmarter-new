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
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden py-16 px-4 z-10">
      {/* Background effects (extra bright spots for connection page) */}
      <div className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-blue-400/20 blur-[120px] pointer-events-none -z-10" />
      <div className="absolute -bottom-40 -right-40 h-[400px] w-[400px] rounded-full bg-purple-400/20 blur-[120px] pointer-events-none -z-10" />

      <div className="relative w-full max-w-md">
        {/* Back to home */}
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-blue-600 transition-colors uppercase tracking-wider"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
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
        <div className="rounded-[2.5rem] glass p-8 sm:p-12 shadow-2xl border-white/60">
          {/* Logo */}
          <div className="flex items-center justify-center gap-3 mb-10">
            <span className="inline-block h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-md" />
            <span className="font-[var(--font-headline)] text-2xl font-bold text-gray-900 drop-shadow-sm">
              IPTV<span className="text-blue-600">Smarters</span>
            </span>
          </div>

          {/* Mode Toggle */}
          <div className="flex rounded-2xl bg-white/40 p-1.5 mb-10 border border-white/50 shadow-sm">
            <button
              onClick={() => setMode("login")}
              className={`flex-1 rounded-xl py-3 text-sm font-bold transition-all shadow-sm ${
                mode === "login"
                  ? "bg-white text-gray-900 shadow-md"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Se connecter
            </button>
            <button
              onClick={() => setMode("register")}
              className={`flex-1 rounded-xl py-3 text-sm font-bold transition-all shadow-sm ${
                mode === "register"
                  ? "bg-white text-gray-900 shadow-md"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              S&apos;inscrire
            </button>
          </div>

          <h1 className="font-[var(--font-headline)] text-2xl font-extrabold text-gray-900 text-center drop-shadow-sm">
            {mode === "login" ? "Se connecter" : "S'inscrire"}
          </h1>
          <p className="mt-2 text-sm font-medium text-gray-600 text-center px-4">
            {mode === "login"
              ? "Bon retour parmi nous sur IPTVSmarters."
              : "Rejoignez la communauté et profitez du meilleur du stream."}
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            {mode === "register" && (
              <div>
                <label
                  htmlFor="auth-name"
                  className="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-2"
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
                  className="w-full rounded-2xl bg-white/60 py-4 px-5 text-sm font-medium text-gray-900 placeholder:text-gray-400 border border-white/50 outline-none transition-all focus:bg-white focus:ring-2 focus:ring-blue-500/50 shadow-sm"
                  placeholder="Votre nom"
                />
              </div>
            )}

            <div>
              <label
               htmlFor="auth-email"
               className="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-2"
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
                className="w-full rounded-2xl bg-white/60 py-4 px-5 text-sm font-medium text-gray-900 placeholder:text-gray-400 border border-white/50 outline-none transition-all focus:bg-white focus:ring-2 focus:ring-blue-500/50 shadow-sm"
                placeholder="email@exemple.com"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label
                  htmlFor="auth-password"
                  className="text-xs font-bold text-gray-700 uppercase tracking-widest"
                >
                  Mot de passe
                </label>
                {mode === "login" && (
                  <button
                    type="button"
                    className="text-xs font-bold text-blue-600 hover:underline"
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
                className="w-full rounded-2xl bg-white/60 py-4 px-5 text-sm font-medium text-gray-900 placeholder:text-gray-400 border border-white/50 outline-none transition-all focus:bg-white focus:ring-2 focus:ring-blue-500/50 shadow-sm"
                placeholder="••••••••"
              />
            </div>

            {mode === "register" && (
              <div>
                <label
                  htmlFor="auth-confirm"
                  className="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-2"
                >
                  Confirmer
                </label>
                <input
                  id="auth-confirm"
                  type="password"
                  required
                  value={form.confirmPassword}
                  onChange={(e) =>
                    setForm({ ...form, confirmPassword: e.target.value })
                  }
                  className="w-full rounded-2xl bg-white/60 py-4 px-5 text-sm font-medium text-gray-900 placeholder:text-gray-400 border border-white/50 outline-none transition-all focus:bg-white focus:ring-2 focus:ring-blue-500/50 shadow-sm"
                  placeholder="••••••••"
                />
              </div>
            )}

            <button
              type="submit"
              className="w-full rounded-2xl py-4.5 text-center text-lg font-bold gradient-cta shadow-lg transition-all duration-300 hover:scale-[1.02] mt-4"
              id="auth-submit"
            >
              {mode === "login" ? "Se connecter" : "Créer un compte"}
            </button>
          </form>

          {/* Security badge */}
          <div className="mt-8 flex items-center gap-4 rounded-2xl bg-white/40 border border-white/50 p-4 shadow-sm">
            <span className="text-2xl">🔒</span>
            <p className="text-[11px] font-semibold text-gray-600 leading-relaxed">
              Paiement Sécurisé – Vos transactions via Wave et Orange Money sont
              100% sécurisées.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
