import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Comment ça marche – IPTVSmarters",
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
      <section className="relative overflow-hidden bg-surface-container-lowest py-20 sm:py-28">
        <div className="absolute -top-40 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-primary-container/8 blur-[120px]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-[var(--font-headline)] text-3xl font-extrabold text-on-surface sm:text-4xl lg:text-5xl">
            Votre abonnement en{" "}
            <span className="bg-gradient-to-r from-primary to-primary-container bg-clip-text text-transparent">
              trois étapes.
            </span>
          </h1>
          <p className="mt-6 mx-auto max-w-2xl text-base text-on-surface-variant sm:text-lg">
            Plus besoin d&apos;attendre des heures. Notre processus est conçu pour
            vous offrir vos accès premium instantanément, en toute sécurité.
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="bg-surface py-20 sm:py-28">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="relative space-y-12 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-8">
            {/* Connector line (desktop) */}
            <div className="hidden lg:block absolute top-16 left-[16.66%] right-[16.66%] h-0.5 bg-gradient-to-r from-primary/30 via-primary to-primary/30" />

            {steps.map((step, i) => (
              <div key={step.number} className="relative flex flex-col items-center text-center">
                {/* Number circle */}
                <div className="relative z-10 flex h-20 w-20 items-center justify-center rounded-2xl bg-surface-container-highest text-4xl transition-transform duration-300 hover:scale-110 animate-glow-pulse">
                  {step.icon}
                </div>

                {/* Step number */}
                <span className="mt-4 font-[var(--font-label)] text-xs font-bold uppercase tracking-widest text-primary-container">
                  Étape {step.number}
                </span>

                <h3 className="mt-3 font-[var(--font-headline)] text-lg font-bold text-on-surface">
                  {step.title}
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-on-surface-variant max-w-xs">
                  {step.description}
                </p>
              </div>
            ))}
          </div>

          {/* Demo notification */}
          <div className="mt-16 mx-auto max-w-md">
            <div className="rounded-2xl bg-surface-container-high p-6 transition-all hover:bg-surface-container-highest">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#25D366]/20 text-[#25D366] text-sm">
                  ✓
                </div>
                <div>
                  <p className="text-xs font-bold text-on-surface">
                    Livraison effectuée
                  </p>
                  <p className="text-[10px] text-on-surface-variant">
                    Il y a quelques secondes
                  </p>
                </div>
              </div>
              <div className="rounded-xl bg-surface-container-low p-3">
                <p className="font-mono text-xs text-on-surface-variant">
                  user: premium_access_72
                  <br />
                  pass: ••••••••••••
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Promises */}
      <section className="bg-surface-container-low py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center font-[var(--font-headline)] text-2xl font-bold text-on-surface sm:text-3xl mb-12">
            La promesse de l&apos;immédiat.
          </h2>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {promises.map((promise) => (
              <div
                key={promise.title}
                className="group flex flex-col items-center rounded-2xl bg-surface-container p-8 text-center transition-all duration-300 hover:bg-surface-container-high hover:scale-[1.02]"
              >
                <span className="text-4xl mb-4 transition-transform duration-300 group-hover:scale-125">
                  {promise.icon}
                </span>
                <h3 className="font-[var(--font-headline)] text-base font-bold text-on-surface">
                  {promise.title}
                </h3>
                <p className="mt-2 text-sm text-on-surface-variant leading-relaxed">
                  {promise.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden py-20 sm:py-28">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-container/15 via-surface to-secondary/10" />
        <div className="relative mx-auto max-w-3xl px-4 text-center">
          <h2 className="font-[var(--font-headline)] text-2xl font-bold text-on-surface sm:text-4xl">
            Prêt à passer au Premium ?
          </h2>
          <p className="mt-4 text-base text-on-surface-variant">
            Explorez notre catalogue et commencez à profiter dès maintenant.
          </p>
          <Link
            href="/catalogue"
            className="mt-8 inline-block rounded-2xl px-10 py-4 font-bold gradient-cta transition-all duration-300 hover:scale-105 hover:shadow-glow-primary"
          >
            Explorer le catalogue
          </Link>
        </div>
      </section>
    </>
  );
}
