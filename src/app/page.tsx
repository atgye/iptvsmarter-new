"use client";

import Link from "next/link";
import Image from "next/image";
import { products } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";

const trustBadges = [
  {
    icon: "⚡",
    title: "Ultra Rapide",
    description: "Réception de vos codes entre 15 minutes et 24h maximum.",
  },
  {
    icon: "💰",
    title: "Économique",
    description: "Des prix adaptés pour que tout le monde profite du premium.",
  },
  {
    icon: "🛡️",
    title: "Sûr & Garanti",
    description: "Assistance 24/7. Si ça ne marche pas, on remplace !",
  },
];

const stats = [
  { value: "99.9%", label: "Fiabilité" },
  { value: "24/7", label: "Support" },
  { value: "15 000+", label: "Chaînes" },
  { value: "5 min", label: "Livraison" },
];

export default function HomePage() {
  const allFeatured = products.slice(0, 8);

  return (
    <>
      {/* ═══════════════ HERO ═══════════════ */}
      <section className="relative overflow-hidden min-h-[90vh] flex items-center justify-center py-20">
        {/* Background Collage */}
        <div className="absolute inset-0 z-0 grid grid-cols-3">
          <div className="relative h-full w-full">
            <img src="https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800" alt="Football bg" className="object-cover h-full w-full" />
          </div>
          <div className="relative h-full w-full">
            <img src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800" alt="Cinéma bg" className="object-cover h-full w-full" />
          </div>
          <div className="relative h-full w-full">
            <img src="https://images.unsplash.com/photo-1593359677879-a4bb92f4834c?w=800" alt="Série bg" className="object-cover h-full w-full" />
          </div>
        </div>
        
        {/* Glassmorphism Overlay */}
        <div className="absolute inset-0 z-10 bg-white/40 backdrop-blur-[8px]" />

        <div className="relative z-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center glass p-10 sm:p-14 border border-white/60 shadow-2xl">
            {/* Chip */}
            <span className="inline-flex items-center gap-2 rounded-full bg-white/60 border border-white/50 px-4 py-1.5 text-xs font-semibold text-primary mb-8 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-primary animate-glow-pulse" />
              Nouveau : IPTVSmarters 2025
            </span>

            <h1 className="font-[var(--font-headline)] text-4xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-5xl lg:text-6xl drop-shadow-sm">
              Vivez vos loisirs{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                à fond.
              </span>
            </h1>

            <p className="mt-6 text-base leading-relaxed text-gray-700 font-medium sm:text-lg lg:text-xl max-w-2xl mx-auto">
              Accès immédiat aux meilleures plateformes mondiales. Netflix,
              Spotify, IPTV et bien plus à des tarifs locaux.
            </p>

            {/* CTA */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/catalogue"
                className="w-full sm:w-auto rounded-2xl px-8 py-4 text-center font-bold glass transition-all hover:bg-white/50 hover:scale-105 border-white/60 text-gray-900 shadow-lg"
              >
                Voir le catalogue
              </Link>
              <Link
                href="/catalogue"
                className="w-full sm:w-auto rounded-2xl px-8 py-4 text-center font-bold gradient-cta transition-all hover:scale-105 shadow-glow-primary"
              >
                S'abonner
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ TRUST BADGES ═══════════════ */}
      <section className="relative z-20 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {trustBadges.map((badge) => (
              <div
                key={badge.title}
                className="group flex flex-col items-center glass p-8 text-center transition-all duration-300 hover:bg-white/40 hover:scale-105"
              >
                <span className="text-4xl mb-4 transition-transform duration-300 group-hover:scale-125">
                  {badge.icon}
                </span>
                <h3 className="font-[var(--font-headline)] text-lg font-bold text-gray-900">
                  {badge.title}
                </h3>
                <p className="mt-2 text-sm text-gray-700 font-medium leading-relaxed">
                  {badge.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ FEATURED PRODUCTS ═══════════════ */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-12">
            <div>
              <h2 className="font-[var(--font-headline)] text-3xl font-bold text-gray-900 drop-shadow-sm">
                Nouveautés & Incontournables
              </h2>
              <p className="mt-2 text-base font-medium text-gray-700">
                Découvrez nos meilleures sélections premium
              </p>
            </div>
            <Link
              href="/catalogue"
              className="mt-4 sm:mt-0 px-6 py-2 glass rounded-full inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:bg-white/50 transition-colors"
            >
              Voir tout le catalogue
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {allFeatured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ CATEGORIES (Image Cards) ═══════════════ */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="font-[var(--font-headline)] text-3xl font-bold text-gray-900 drop-shadow-sm">
              Explorez nos univers
            </h2>
            <p className="mt-2 text-base font-medium text-gray-700">
              Des abonnements adaptés à chaque passion
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {/* Card 1: Football Live */}
            <Link href="/catalogue?cat=iptv" className="group relative h-80 rounded-2xl overflow-hidden glass hover:scale-105 transition-all duration-300">
              <img src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800" alt="Football Live" className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="glass px-6 py-3 border-white/30 backdrop-blur-md">
                  <h3 className="font-[var(--font-headline)] text-2xl font-bold text-white drop-shadow-lg">Football Live</h3>
                </div>
              </div>
            </Link>
            
            {/* Card 2: Films & Cinéma */}
            <Link href="/catalogue?cat=streaming" className="group relative h-80 rounded-2xl overflow-hidden glass hover:scale-105 transition-all duration-300">
              <img src="https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800" alt="Films & Cinéma" className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="glass px-6 py-3 border-white/30 backdrop-blur-md">
                  <h3 className="font-[var(--font-headline)] text-2xl font-bold text-white drop-shadow-lg">Films & Cinéma</h3>
                </div>
              </div>
            </Link>

            {/* Card 3: Séries TV */}
            <Link href="/catalogue?cat=streaming" className="group relative h-80 rounded-2xl overflow-hidden glass hover:scale-105 transition-all duration-300">
              <img src="https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=800" alt="Séries TV" className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="glass px-6 py-3 border-white/30 backdrop-blur-md">
                  <h3 className="font-[var(--font-headline)] text-2xl font-bold text-white drop-shadow-lg">Séries TV</h3>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════ STATS ═══════════════ */}
      <section className="py-20 sm:py-28 relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-20">
          <div className="text-center mb-16">
            <h2 className="font-[var(--font-headline)] text-3xl font-bold text-gray-900 drop-shadow-sm">
              Experts en loisirs numériques{" "}
              <span className="text-blue-600">depuis 2021</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center glass p-6 hover:bg-white/40 transition-colors duration-300">
                <div className="font-[var(--font-headline)] text-3xl font-extrabold text-blue-600 sm:text-4xl drop-shadow-md">
                  {stat.value}
                </div>
                <div className="mt-2 text-sm font-bold text-gray-700 uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="glass p-8 sm:p-10 hover:bg-white/40 transition-colors duration-300">
              <h3 className="font-[var(--font-headline)] text-xl font-bold text-gray-900">
                Fiabilité Exceptionnelle
              </h3>
              <p className="mt-3 text-base text-gray-700 font-medium leading-relaxed">
                99.9% de temps de fonctionnement sur tous nos services premium.
                Nous garantissons une qualité irréprochable.
              </p>
            </div>
            <div className="glass p-8 sm:p-10 hover:bg-white/40 transition-colors duration-300">
              <h3 className="font-[var(--font-headline)] text-xl font-bold text-gray-900">
                Support Local &amp; Réactif
              </h3>
              <p className="mt-3 text-base text-gray-700 font-medium leading-relaxed">
                Une équipe sénégalaise à votre écoute via WhatsApp jour et nuit.
                Réponse garantie en moins de 2 heures.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ CTA BANNER ═══════════════ */}
      <section className="relative py-20 sm:py-28 overflow-hidden">
        <div className="absolute inset-0 z-0 bg-blue-600/5 backdrop-blur-2xl" />
        <div className="relative z-10 glass mx-auto max-w-4xl px-8 py-16 text-center shadow-2xl border border-white/60 scale-100 hover:scale-[1.01] transition-transform duration-500">
          <h2 className="font-[var(--font-headline)] text-3xl font-bold text-gray-900 sm:text-4xl drop-shadow-sm">
            Prêt à passer au Premium ?
          </h2>
          <p className="mt-4 text-lg font-medium text-gray-700">
            Rejoignez des milliers de clients satisfaits au Sénégal
          </p>
          <Link
            href="/catalogue"
            className="mt-8 inline-block rounded-2xl px-12 py-4 font-bold text-lg gradient-cta transition-all duration-300 hover:scale-105 shadow-glow-primary"
          >
            Commencer maintenant
          </Link>
        </div>
      </section>
    </>
  );
}
