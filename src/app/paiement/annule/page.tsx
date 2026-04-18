import Link from "next/link";

export default function CancelPage() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center p-6 bg-surface">
      <div className="max-w-md w-full bg-surface-container rounded-3xl p-8 shadow-ambient text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-error/20 mb-6">
          <svg className="h-10 w-10 text-error" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        
        <h1 className="text-2xl font-bold font-[var(--font-headline)] text-on-surface mb-2">
          Paiement annulé
        </h1>
        <p className="text-on-surface-variant mb-8">
          Votre paiement a été annulé ou une erreur est survenue pendant la transaction.
        </p>

        <Link
          href="/panier"
          className="block w-full py-3 px-4 bg-primary text-on-primary rounded-xl font-bold hover:opacity-90 transition-opacity mb-3"
        >
          Retour au panier
        </Link>
        <Link
          href="/"
          className="block w-full py-3 px-4 bg-surface-container-high text-on-surface rounded-xl font-medium hover:bg-surface-container-highest transition-colors"
        >
          Retour à l'accueil
        </Link>
      </div>
    </div>
  );
}
