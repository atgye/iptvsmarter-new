import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Comment ça marche – SunuStream",
  description:
    "Découvrez comment obtenir vos abonnements premium en 3 étapes simples. Paiement mobile, livraison instantanée.",
};

const steps = [
  {
    number: "01",
    icon: "🎯",
    title: "Choisissez votre service",
    description:
      "Explorez notre catalogue et sélectionnez l'offre qui vous correspond. Netflix, Spotify, Disney+ ou vos outils de travail préférés.",
  },
  {
    number: "02",
    icon: "📱",
    title: "Payez via Mobile",
    description:
      "Utilisez vos moyens de paiement locaux préférés pour une transaction sécurisée et sans friction.",
  },
  {
    number: "03",
    icon: "🚀",
    title: "Recevez vos accès en moins de 5 min.",
    description:
      "Dès la confirmation de votre paiement, vos identifiants ou votre lien d'activation vous sont envoyés automatiquement par SMS ou WhatsApp.",
  },
];

const promises = [
  {
    icon: "⚡",
    title: "Activation Flash",
    description: "Système automatisé pour une livraison quasi instantanée.",
  },
  {
    icon: "🛡️",
    title: "Garantie Totale",
    description:
      "Accès officiels garantis pour toute la durée de l'abonnement.",
  },
  {
    icon: "💬",
    title: "Support 24/7",
    description: "Une équipe disponible à tout moment via WhatsApp.",
  },
];

export default function CommentCaMarchePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden py-20 sm:py-28">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center z-10">
          <div className="glass max-w-3xl mx-auto p-10 sm:p-14 rounded-[3rem] shadow-xl border-white/60">
            <h1 className="font-[var(--font-headline)] text-4xl font-extrabold text-gray-900 sm:text-5xl lg:text-6xl drop-shadow-sm leading-tight">
              Votre abonnement en{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                trois étapes.
              </span>
            </h1>
            <p className="mt-8 mx-auto max-w-2xl text-base font-medium text-gray-700 sm:text-lg">
              Plus besoin d&apos;attendre des heures. Notre processus est conçu pour
              vous offrir vos accès premium instantanément, en toute sécurité.
            </p>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-20 sm:py-28 relative z-10">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="relative space-y-16 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-12">
            {/* Connector line (desktop) */}
            <div className="hidden lg:block absolute top-[4.5rem] left-[16.66%] right-[16.66%] h-[2px] bg-gradient-to-r from-transparent via-white to-transparent" />

            {steps.map((step, i) => (
              <div key={step.number} className="relative flex flex-col items-center text-center">
                {/* Number circle */}
                <div className="relative z-10 flex h-24 w-24 items-center justify-center rounded-3xl bg-white shadow-xl border border-white/60 text-5xl transition-transform duration-500 hover:scale-110 hover:shadow-cyan-500/20">
                  {step.icon}
                </div>

                {/* Step number */}
                <span className="mt-8 inline-block rounded-full px-4 py-1.5 glass border-white/60 font-bold text-xs uppercase tracking-widest text-blue-600 shadow-sm">
                  Étape {step.number}
                </span>

                <h3 className="mt-6 font-[var(--font-headline)] text-xl font-bold text-gray-900 drop-shadow-sm">
                  {step.title}
                </h3>

                <p className="mt-4 text-sm font-medium leading-relaxed text-gray-700 max-w-xs">
                  {step.description}
                </p>
              </div>
            ))}
          </div>

          {/* Demo notification */}
          <div className="mt-24 mx-auto max-w-md">
            <div className="rounded-[2rem] glass p-8 shadow-2xl border-white/60 transition-all hover:bg-white/60 hover:-translate-y-1">
              <div className="flex items-center gap-4 mb-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 border border-emerald-200 text-emerald-600 shadow-sm">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900 uppercase tracking-widest">
                    Livraison effectuée
                  </p>
                  <p className="text-xs font-semibold text-gray-500 mt-1">
                    Il y a quelques secondes
                  </p>
                </div>
              </div>
              <div className="rounded-2xl bg-white/70 border border-white/60 p-4 shadow-sm">
                <p className="font-mono text-sm font-semibold text-gray-800">
                  user: premium_access_72
                  <br />
                  <span className="text-gray-500 mt-2 block">pass: ••••••••••••</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Promises */}
      <section className="py-20 sm:py-28 relative z-10 border-t border-white/30 bg-white/10 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center font-[var(--font-headline)] text-3xl font-bold text-gray-900 sm:text-4xl mb-16 drop-shadow-sm">
            La promesse de l&apos;immédiat.
          </h2>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            {promises.map((promise) => (
              <div
                key={promise.title}
                className="group flex flex-col items-center rounded-3xl glass p-10 text-center shadow-lg border-white/60 transition-all duration-500 hover:bg-white/60 hover:-translate-y-2"
              >
                <div className="flex items-center justify-center h-20 w-20 rounded-2xl bg-white shadow-sm border border-white/60 mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                  <span className="text-4xl">
                    {promise.icon}
                  </span>
                </div>
                <h3 className="font-[var(--font-headline)] text-lg font-bold text-gray-900 drop-shadow-sm">
                  {promise.title}
                </h3>
                <p className="mt-4 text-sm font-medium text-gray-700 leading-relaxed">
                  {promise.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden py-24 sm:py-32 z-10 text-center">
        <div className="relative mx-auto max-w-3xl px-4">
          <div className="glass p-12 sm:p-16 rounded-[3rem] shadow-2xl border-white/60">
            <h2 className="font-[var(--font-headline)] text-3xl font-black text-gray-900 sm:text-5xl drop-shadow-sm">
              Prêt à passer au Premium ?
            </h2>
            <p className="mt-6 text-lg font-medium text-gray-700">
              Explorez notre catalogue et commencez à profiter dès maintenant.
            </p>
            <Link
              href="/catalogue"
              className="mt-10 inline-block rounded-full px-12 py-5 text-lg font-bold gradient-cta shadow-xl transition-all duration-300 hover:scale-105"
            >
              Explorer le catalogue
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
