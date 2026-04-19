import Link from "next/link";

export default function CancelPage() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center p-6 relative z-10">
      <div className="max-w-md w-full glass rounded-[2.5rem] p-10 shadow-2xl border-white/60 text-center">
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-3xl bg-red-100 border border-red-200 mb-8 shadow-sm">
          <svg className="h-12 w-12 text-red-600" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        
        <h1 className="text-3xl font-extrabold font-[var(--font-headline)] text-gray-900 mb-4 drop-shadow-sm">
          Paiement annulé
        </h1>
        <p className="text-gray-700 font-medium mb-10 leading-relaxed">
          Votre paiement a été annulé ou une erreur est survenue pendant la transaction.
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
          Retour à l'accueil
        </Link>
      </div>
    </div>
  );
}
