"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

type PaymentStatus = "loading" | "completed" | "pending" | "canceled" | "fail" | "error";

interface VerifyData {
  status: PaymentStatus;
  customer?: { name?: string; phone?: string; email?: string };
  receipt?: string;
  amount?: number;
  currency?: string;
  error?: string;
}

export default function SuccessPage() {
  const params = useSearchParams();
  const token  = params.get("token");

  const [state, setState] = useState<{ status: PaymentStatus; data?: VerifyData }>({
    status: "loading",
  });

  useEffect(() => {
    if (!token) {
      // Pas de token → arrive sur la page directement sans passer par PayDunya
      setState({ status: "completed" });
      return;
    }

    fetch(`/api/paydunya?token=${token}`)
      .then((r) => r.json())
      .then((data: VerifyData) => {
        setState({
          status: (data.status as PaymentStatus) || "error",
          data,
        });
      })
      .catch(() => setState({ status: "error" }));
  }, [token]);

  /* ── UI selon le statut ── */
  if (state.status === "loading") {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center gap-6 relative z-10">
        <div className="h-16 w-16 rounded-full border-4 border-blue-600 border-t-transparent animate-spin drop-shadow-md" />
        <p className="text-gray-700 font-bold text-base tracking-wider uppercase">Vérification du paiement…</p>
      </div>
    );
  }

  if (state.status === "completed") {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center p-6 relative z-10">
        <div className="max-w-md w-full glass rounded-[2.5rem] p-10 shadow-2xl border-white/60 text-center relative overflow-hidden">
          {/* Icon */}
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-3xl bg-emerald-100 border border-emerald-200 mb-8 shadow-sm animate-[scale-in_0.5s_ease-out]">
            <svg className="h-12 w-12 text-emerald-600" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>

          <h1 className="text-3xl font-extrabold font-[var(--font-headline)] text-gray-900 mb-2 drop-shadow-sm">
            Paiement réussi !
          </h1>

          {state.data?.customer?.name && (
            <p className="text-gray-700 font-medium mb-1">
              Merci, <span className="text-gray-900 font-bold">{state.data.customer.name}</span> 🎉
            </p>
          )}

          {state.data?.amount && (
            <p className="text-gray-600 text-sm mb-8 font-medium">
              Montant payé :{" "}
              <span className="text-blue-600 font-black text-base drop-shadow-sm">
                {state.data.amount.toLocaleString("fr-FR")} {state.data.currency || "XOF"}
              </span>
            </p>
          )}

          {!state.data?.amount && (
            <p className="text-gray-600 font-medium mb-8">
              Votre commande a été traitée avec succès.
            </p>
          )}

          {/* Prochaines étapes */}
          <div className="bg-white/60 border border-white/50 rounded-2xl p-6 text-left mb-8 shadow-sm">
            <h2 className="font-bold text-gray-900 mb-3">Prochaines étapes :</h2>
            <ul className="text-sm font-medium text-gray-700 space-y-2 list-disc pl-4 marker:text-emerald-500">
              <li>Vous recevrez bientôt un email avec vos identifiants.</li>
              <li>Si vous avez pris un abonnement streaming, l&apos;activation est immédiate.</li>
              <li>En cas de problème, contactez notre support sur WhatsApp.</li>
            </ul>
          </div>

          {/* Reçu PDF */}
          {state.data?.receipt && (
            <a
              href={state.data.receipt}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full py-4 px-4 mb-4 glass border border-white/60 text-gray-800 rounded-2xl font-bold text-sm hover:bg-white/60 hover:text-blue-600 transition-all shadow-sm"
            >
              📄 Télécharger le reçu PDF
            </a>
          )}

          <Link
            href="/"
            className="block w-full py-4.5 px-4 gradient-cta shadow-md rounded-2xl font-bold transition-transform hover:scale-[1.02] text-center"
          >
            Retour à l&apos;accueil
          </Link>
        </div>
      </div>
    );
  }

  if (state.status === "pending") {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center p-6 relative z-10">
        <div className="max-w-md w-full glass rounded-[2.5rem] p-10 shadow-2xl border-white/60 text-center">
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-3xl bg-amber-100 border border-amber-200 mb-8 shadow-sm">
            <svg className="h-12 w-12 text-amber-600" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-3xl font-extrabold font-[var(--font-headline)] text-gray-900 mb-4 drop-shadow-sm">
            Paiement en attente
          </h1>
          <p className="text-gray-700 font-medium mb-10 leading-relaxed">
            Votre paiement est en cours de traitement. Vous recevrez une confirmation dès qu&apos;il sera validé.
          </p>
          <Link
            href="/"
            className="block w-full py-4.5 px-4 gradient-cta shadow-md rounded-2xl font-bold transition-transform hover:scale-[1.02] text-center"
          >
            Retour à l&apos;accueil
          </Link>
        </div>
      </div>
    );
  }

  // canceled | fail | error
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center p-6 relative z-10">
      <div className="max-w-md w-full glass rounded-[2.5rem] p-10 shadow-2xl border-white/60 text-center">
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-3xl bg-red-100 border border-red-200 mb-8 shadow-sm">
          <svg className="h-12 w-12 text-red-600" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h1 className="text-3xl font-extrabold font-[var(--font-headline)] text-gray-900 mb-4 drop-shadow-sm">
          {state.status === "canceled" ? "Paiement annulé" : "Paiement échoué"}
        </h1>
        <p className="text-gray-700 font-medium mb-10 leading-relaxed">
          {state.status === "canceled"
            ? "Vous avez annulé le paiement. Votre panier est toujours disponible."
            : "Une erreur est survenue. Veuillez réessayer ou contacter le support."}
        </p>
        <Link
          href="/panier"
          className="block w-full py-4 px-4 bg-blue-600 text-white shadow-md rounded-2xl font-bold hover:bg-blue-700 transition-colors mb-4 text-center"
        >
          Retour au panier
        </Link>
        <Link
          href="/"
          className="block w-full py-4 px-4 glass border border-white/60 text-gray-800 rounded-2xl font-bold hover:bg-white/60 hover:text-blue-600 transition-all shadow-sm text-center"
        >
          Retour à l&apos;accueil
        </Link>
      </div>
    </div>
  );
}
