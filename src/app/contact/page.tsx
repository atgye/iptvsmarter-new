"use client";

import { useState } from "react";
import type { Metadata } from "next";

const faqItems = [
  {
    question: "Comment recevoir mes accès après le paiement ?",
    answer:
      "Vos accès vous seront envoyés automatiquement par WhatsApp et email dans les 5 minutes suivant la confirmation du paiement.",
  },
  {
    question: "Quels moyens de paiement acceptez-vous ?",
    answer:
      "Nous acceptons Wave, Orange Money, Free Money et les virements bancaires. Tous les paiements sont 100% sécurisés.",
  },
  {
    question: "Que se passe-t-il si mon abonnement ne fonctionne pas ?",
    answer:
      "Nous offrons une garantie totale. Si votre abonnement ne fonctionne pas, nous le remplaçons immédiatement sans frais supplémentaires.",
  },
  {
    question: "Les abonnements sont-ils renouvelables automatiquement ?",
    answer:
      "Non, aucun renouvellement automatique. Vous êtes libre de renouveler manuellement quand vous le souhaitez.",
  },
  {
    question: "Combien d'appareils puis-je utiliser simultanément ?",
    answer:
      "Cela dépend du service choisi. Les détails sont indiqués sur chaque fiche produit. En général, entre 1 et 6 appareils simultanés.",
  },
];

function FAQItem({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-2xl bg-surface-container transition-colors hover:bg-surface-container-high">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between px-6 py-5 text-left"
      >
        <span className="text-sm font-semibold text-on-surface pr-4">
          {question}
        </span>
        <svg
          className={`h-5 w-5 shrink-0 text-on-surface-variant transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m19.5 8.25-7.5 7.5-7.5-7.5"
          />
        </svg>
      </button>
      {open && (
        <div className="px-6 pb-5">
          <p className="text-sm leading-relaxed text-on-surface-variant">
            {answer}
          </p>
        </div>
      )}
    </div>
  );
}

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Would integrate with backend
    alert("Message envoyé ! Nous vous répondrons dans les 2 heures.");
    setFormState({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-surface-container-lowest py-16 sm:py-20">
        <div className="absolute -top-40 right-0 h-[400px] w-[400px] rounded-full bg-secondary/8 blur-[120px]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-[var(--font-headline)] text-3xl font-extrabold text-on-surface sm:text-4xl lg:text-5xl">
            Besoin d&apos;aide ?{" "}
            <span className="bg-gradient-to-r from-primary to-primary-container bg-clip-text text-transparent">
              Nous sommes là.
            </span>
          </h1>
          <p className="mt-4 mx-auto max-w-2xl text-base text-on-surface-variant">
            Notre équipe de conciergerie premium est disponible pour répondre à
            toutes vos questions sur vos abonnements et services.
          </p>
        </div>
      </section>

      {/* Contact + Assistance */}
      <section className="bg-surface py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            {/* Contact Form */}
            <div>
              <h2 className="font-[var(--font-headline)] text-xl font-bold text-on-surface mb-2">
                Envoyez un message
              </h2>
              <p className="text-sm text-on-surface-variant mb-8">
                Réponse garantie sous 2 heures ouvrées.
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-xs font-medium text-on-surface-variant mb-2"
                    >
                      Nom complet
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) =>
                        setFormState({ ...formState, name: e.target.value })
                      }
                      className="w-full rounded-xl bg-surface-container-low py-3 px-4 text-sm text-on-surface placeholder:text-on-surface-variant/40 outline-none transition-all focus:bg-surface-container focus:ring-2 focus:ring-primary/30"
                      placeholder="Votre nom"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-xs font-medium text-on-surface-variant mb-2"
                    >
                      Email
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) =>
                        setFormState({ ...formState, email: e.target.value })
                      }
                      className="w-full rounded-xl bg-surface-container-low py-3 px-4 text-sm text-on-surface placeholder:text-on-surface-variant/40 outline-none transition-all focus:bg-surface-container focus:ring-2 focus:ring-primary/30"
                      placeholder="votre@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-subject"
                    className="block text-xs font-medium text-on-surface-variant mb-2"
                  >
                    Sujet
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    required
                    value={formState.subject}
                    onChange={(e) =>
                      setFormState({ ...formState, subject: e.target.value })
                    }
                    className="w-full rounded-xl bg-surface-container-low py-3 px-4 text-sm text-on-surface placeholder:text-on-surface-variant/40 outline-none transition-all focus:bg-surface-container focus:ring-2 focus:ring-primary/30"
                    placeholder="Sujet de votre message"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-xs font-medium text-on-surface-variant mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    rows={5}
                    required
                    value={formState.message}
                    onChange={(e) =>
                      setFormState({ ...formState, message: e.target.value })
                    }
                    className="w-full rounded-xl bg-surface-container-low py-3 px-4 text-sm text-on-surface placeholder:text-on-surface-variant/40 outline-none transition-all focus:bg-surface-container focus:ring-2 focus:ring-primary/30 resize-none"
                    placeholder="Décrivez votre demande…"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-2xl py-4 text-center font-bold gradient-cta transition-all duration-300 hover:scale-[1.02] hover:shadow-glow-primary"
                  id="contact-submit"
                >
                  Envoyer le message
                </button>
              </form>
            </div>

            {/* Assistance */}
            <div className="space-y-6">
              <div className="rounded-2xl bg-surface-container p-8">
                <h3 className="font-[var(--font-headline)] text-lg font-bold text-on-surface mb-3">
                  Assistance Directe
                </h3>
                <p className="text-sm text-on-surface-variant leading-relaxed mb-6">
                  Discutez instantanément avec l&apos;un de nos conseillers sur
                  WhatsApp pour une activation rapide.
                </p>
                <a
                  href="https://wa.me/221000000000"
                  className="inline-flex items-center gap-3 rounded-xl bg-[#25D366]/10 px-6 py-3.5 text-sm font-semibold text-[#25D366] transition-all hover:bg-[#25D366]/20 hover:scale-105"
                >
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
                  </svg>
                  Contacter sur WhatsApp
                </a>
              </div>

              <div className="rounded-2xl bg-surface-container p-8">
                <h3 className="font-[var(--font-headline)] text-lg font-bold text-on-surface mb-4">
                  Rejoignez la communauté
                </h3>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { name: "Instagram", icon: "📸", color: "bg-pink-500/10 text-pink-400" },
                    { name: "Facebook", icon: "👥", color: "bg-blue-500/10 text-blue-400" },
                    { name: "TikTok", icon: "🎬", color: "bg-purple-500/10 text-purple-400" },
                  ].map((social) => (
                    <a
                      key={social.name}
                      href="#"
                      className={`flex flex-col items-center gap-2 rounded-xl ${social.color} p-4 transition-all hover:scale-105`}
                    >
                      <span className="text-2xl">{social.icon}</span>
                      <span className="text-xs font-medium">{social.name}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-surface-container-low py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center font-[var(--font-headline)] text-2xl font-bold text-on-surface mb-3">
            Foire aux questions
          </h2>
          <p className="text-center text-sm text-on-surface-variant mb-10">
            Tout ce que vous devez savoir sur nos services et abonnements.
          </p>

          <div className="space-y-3">
            {faqItems.map((item) => (
              <FAQItem key={item.question} {...item} />
            ))}
          </div>

          <div className="mt-10 text-center">
            <a
              href="https://wa.me/221000000000"
              className="inline-flex items-center gap-2 rounded-xl bg-surface-container px-6 py-3.5 text-sm font-medium text-on-surface-variant transition-all hover:bg-surface-container-high hover:text-primary"
            >
              💬 Une question ? Chattez avec nous !
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
