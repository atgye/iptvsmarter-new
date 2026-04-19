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
    <div className="rounded-2xl glass border border-white/50 transition-colors shadow-sm hover:bg-white/60">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between px-6 py-5 text-left"
      >
        <span className="text-base font-bold text-gray-900 pr-4">
          {question}
        </span>
        <svg
          className={`h-5 w-5 shrink-0 text-gray-500 transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
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
        <div className="px-6 pb-5 pt-2">
          <p className="text-sm font-medium leading-relaxed text-gray-700">
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
      <section className="relative overflow-hidden py-16 sm:py-24 z-10">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="glass max-w-3xl mx-auto p-10 sm:p-14 rounded-[3rem] shadow-xl border-white/60">
            <h1 className="font-[var(--font-headline)] text-4xl font-extrabold text-gray-900 sm:text-5xl lg:text-6xl drop-shadow-sm">
              Besoin d&apos;aide ?{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Nous sommes là.
              </span>
            </h1>
            <p className="mt-6 mx-auto max-w-2xl text-base font-medium text-gray-700 sm:text-lg">
              Notre équipe de conciergerie premium est disponible pour répondre à
              toutes vos questions sur vos abonnements et services.
            </p>
          </div>
        </div>
      </section>

      {/* Contact + Assistance */}
      <section className="py-16 sm:py-20 relative z-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            {/* Contact Form */}
            <div className="glass p-8 sm:p-10 rounded-[2.5rem] shadow-xl border-white/60">
              <h2 className="font-[var(--font-headline)] text-2xl font-bold text-gray-900 mb-2 drop-shadow-sm">
                Envoyez un message
              </h2>
              <p className="text-sm font-semibold text-gray-600 mb-8">
                Réponse garantie sous 2 heures ouvrées.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-xs font-bold uppercase tracking-widest text-gray-700 mb-2"
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
                      className="w-full rounded-2xl bg-white/60 py-4 px-5 text-sm font-medium text-gray-900 placeholder:text-gray-400 border border-white/50 outline-none transition-all focus:bg-white focus:ring-2 focus:ring-blue-500/50 shadow-sm"
                      placeholder="Votre nom"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-xs font-bold uppercase tracking-widest text-gray-700 mb-2"
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
                      className="w-full rounded-2xl bg-white/60 py-4 px-5 text-sm font-medium text-gray-900 placeholder:text-gray-400 border border-white/50 outline-none transition-all focus:bg-white focus:ring-2 focus:ring-blue-500/50 shadow-sm"
                      placeholder="votre@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-subject"
                    className="block text-xs font-bold uppercase tracking-widest text-gray-700 mb-2"
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
                    className="w-full rounded-2xl bg-white/60 py-4 px-5 text-sm font-medium text-gray-900 placeholder:text-gray-400 border border-white/50 outline-none transition-all focus:bg-white focus:ring-2 focus:ring-blue-500/50 shadow-sm"
                    placeholder="Sujet de votre message"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-xs font-bold uppercase tracking-widest text-gray-700 mb-2"
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
                    className="w-full rounded-2xl bg-white/60 py-4 px-5 text-sm font-medium text-gray-900 placeholder:text-gray-400 border border-white/50 outline-none transition-all focus:bg-white focus:ring-2 focus:ring-blue-500/50 resize-none shadow-sm"
                    placeholder="Décrivez votre demande…"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-2xl py-4 text-center text-lg font-bold gradient-cta shadow-lg transition-all duration-300 hover:scale-[1.02]"
                  id="contact-submit"
                >
                  Envoyer le message
                </button>
              </form>
            </div>

            {/* Assistance */}
            <div className="space-y-8">
              <div className="rounded-[2.5rem] glass border-white/60 p-8 sm:p-10 shadow-xl">
                <h3 className="font-[var(--font-headline)] text-xl font-bold text-gray-900 mb-4 drop-shadow-sm">
                  Assistance Directe
                </h3>
                <p className="text-sm font-medium text-gray-700 leading-relaxed mb-8">
                  Discutez instantanément avec l&apos;un de nos conseillers sur
                  WhatsApp pour une activation rapide.
                </p>
                <a
                  href="https://wa.me/221000000000"
                  className="inline-flex items-center gap-3 rounded-2xl bg-emerald-100 px-8 py-4 text-sm font-bold text-emerald-600 transition-all hover:bg-emerald-200 hover:scale-105 shadow-sm"
                >
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
                  </svg>
                  Contacter sur WhatsApp
                </a>
              </div>

              <div className="rounded-[2.5rem] glass border-white/60 p-8 sm:p-10 shadow-xl">
                <h3 className="font-[var(--font-headline)] text-xl font-bold text-gray-900 mb-6 drop-shadow-sm">
                  Rejoignez la communauté
                </h3>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { name: "Instagram", icon: "📸", color: "bg-pink-100 text-pink-600" },
                    { name: "Facebook", icon: "👥", color: "bg-blue-100 text-blue-600" },
                    { name: "TikTok", icon: "🎬", color: "bg-purple-100 text-purple-600" },
                  ].map((social) => (
                    <a
                      key={social.name}
                      href="#"
                      className={`flex flex-col items-center justify-center gap-3 rounded-2xl ${social.color} p-5 transition-all hover:scale-105 shadow-sm border border-white/50`}
                    >
                      <span className="text-3xl">{social.icon}</span>
                      <span className="text-xs font-bold uppercase tracking-wider">{social.name}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 sm:py-28 relative z-10 border-t border-white/30 bg-white/10 backdrop-blur-sm">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center font-[var(--font-headline)] text-3xl font-bold text-gray-900 mb-4 drop-shadow-sm">
            Foire aux questions
          </h2>
          <p className="text-center text-base font-medium text-gray-700 mb-12">
            Tout ce que vous devez savoir sur nos services et abonnements.
          </p>

          <div className="space-y-4">
            {faqItems.map((item) => (
              <FAQItem key={item.question} {...item} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <a
              href="https://wa.me/221000000000"
              className="inline-flex glass border-white/60 items-center justify-center gap-3 rounded-2xl px-8 py-4 text-sm font-bold text-gray-800 transition-all hover:bg-white/60 hover:text-blue-600 shadow-md"
            >
              <span className="text-lg">💬</span> Une question ? Chattez avec nous !
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
