import Link from "next/link";

export default function SuccessPage() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center p-6 bg-surface">
      <div className="max-w-md w-full bg-surface-container rounded-3xl p-8 shadow-ambient text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-success/20 mb-6">
          <svg className="h-10 w-10 text-success" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        
        <h1 className="text-2xl font-bold font-[var(--font-headline)] text-on-surface mb-2">
          Paiement réussi !
        </h1>
        <p className="text-on-surface-variant mb-6">
          Merci pour votre achat. Votre commande a été traitée avec succès.
        </p>

        <div className="bg-surface-container-low rounded-xl p-4 text-left mb-8">
          <h2 className="font-semibold text-on-surface mb-2">Prochaines étapes :</h2>
          <ul className="text-sm text-on-surface-variant space-y-2 list-disc pl-4">
            <li>Vous recevrez bientôt un email avec vos identifiants.</li>
            <li>Si vous avez pris un abonnement streaming, l'activation est immédiate.</li>
            <li>En cas de problème, contactez notre support sur WhatsApp.</li>
          </ul>
        </div>

        <Link
          href="/"
          className="block w-full py-3 px-4 bg-primary text-on-primary rounded-xl font-bold hover:opacity-90 transition-opacity"
        >
          Retour à l'accueil
        </Link>
      </div>
    </div>
  );
}
