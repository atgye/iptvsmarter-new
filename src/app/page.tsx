"use client";

import Link from "next/link";
import { products, categories, formatPrice } from "@/data/products";
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
  const featuredProducts = products.filter((p) => p.badge).slice(0, 4);
  const allFeatured = products.slice(0, 8);

  return (
    <>
      {/* ═══════════════ HERO ═══════════════ */}
      <section className="relative overflow-hidden bg-surface-container-lowest py-20 sm:py-28 lg:py-36">
        {/* Background gradient orbs */}
        <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-primary-container/10 blur-[120px]" />
        <div className="absolute -bottom-40 -left-40 h-[400px] w-[400px] rounded-full bg-secondary/10 blur-[120px]" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            {/* Chip */}
            <span className="inline-flex items-center gap-2 rounded-full bg-primary-container/10 px-4 py-1.5 text-xs font-medium text-primary-container mb-8">
              <span className="h-1.5 w-1.5 rounded-full bg-primary-container animate-glow-pulse" />
              Nouveau : IPTVSmarters 2025
            </span>

            <h1 className="font-[var(--font-headline)] text-4xl font-extrabold leading-tight tracking-tight text-on-surface sm:text-5xl lg:text-6xl">
              Vivez vos vacances{" "}
              <span className="bg-gradient-to-r from-primary to-primary-container bg-clip-text text-transparent">
                à fond.
              </span>
            </h1>

            <p className="mt-6 text-base leading-relaxed text-on-surface-variant sm:text-lg lg:text-xl max-w-2xl mx-auto">
              Accès immédiat aux meilleures plateformes mondiales. Netflix,
              Spotify, IPTV et bien plus à des tarifs locaux.
            </p>

            {/* CTA */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/catalogue"
                className="w-full sm:w-auto rounded-2xl px-8 py-4 text-center font-bold gradient-cta transition-all duration-300 hover:scale-105 hover:shadow-glow-primary"
                id="hero-cta"
              >
                Explorer le catalogue
              </Link>
              <Link
                href="/comment-ca-marche"
                className="w-full sm:w-auto rounded-2xl px-8 py-4 text-center font-medium text-on-surface-variant ghost-border transition-all hover:bg-surface-container-high hover:text-primary"
              >
                Comment ça marche
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ TRUST BADGES ═══════════════ */}
      <section className="bg-surface py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {trustBadges.map((badge) => (
              <div
                key={badge.title}
                className="group flex flex-col items-center rounded-2xl bg-surface-container p-8 text-center transition-all duration-300 hover:bg-surface-container-high"
              >
                <span className="text-4xl mb-4 transition-transform duration-300 group-hover:scale-125">
                  {badge.icon}
                </span>
                <h3 className="font-[var(--font-headline)] text-base font-bold text-on-surface">
                  {badge.title}
                </h3>
                <p className="mt-2 text-sm text-on-surface-variant leading-relaxed">
                  {badge.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ FEATURED PRODUCTS ═══════════════ */}
      <section className="bg-surface-container-low py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-12">
            <div>
              <h2 className="font-[var(--font-headline)] text-2xl font-bold text-on-surface sm:text-3xl">
                Les Incontournables
              </h2>
              <p className="mt-2 text-sm text-on-surface-variant">
                Nos produits les plus populaires
              </p>
            </div>
            <Link
              href="/catalogue"
              className="mt-4 sm:mt-0 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
            >
              Voir tout le catalogue
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {allFeatured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ CATEGORIES ═══════════════ */}
      <section className="bg-surface py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-[var(--font-headline)] text-2xl font-bold text-on-surface sm:text-3xl">
              Explorez par catégorie
            </h2>
            <p className="mt-2 text-sm text-on-surface-variant">
              Trouvez exactement ce qu&apos;il vous faut
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/catalogue?cat=${cat.slug}`}
                className="group flex flex-col items-center gap-3 rounded-2xl bg-surface-container p-6 transition-all duration-300 hover:bg-surface-container-high hover:scale-105"
              >
                <span className="text-3xl transition-transform duration-300 group-hover:scale-125">
                  {cat.icon}
                </span>
                <span className="text-sm font-semibold text-on-surface">
                  {cat.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ STATS ═══════════════ */}
      <section className="bg-surface-container-lowest py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-[var(--font-headline)] text-2xl font-bold text-on-surface sm:text-3xl">
              Experts en loisirs numériques{" "}
              <span className="text-secondary">depuis 2021</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-[var(--font-headline)] text-3xl font-extrabold text-primary sm:text-4xl">
                  {stat.value}
                </div>
                <div className="mt-2 text-sm text-on-surface-variant">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="rounded-2xl bg-surface-container p-8">
              <h3 className="font-[var(--font-headline)] text-lg font-bold text-on-surface">
                Fiabilité Exceptionnelle
              </h3>
              <p className="mt-3 text-sm text-on-surface-variant leading-relaxed">
                99.9% de temps de fonctionnement sur tous nos services premium.
                Nous garantissons une qualité irréprochable.
              </p>
            </div>
            <div className="rounded-2xl bg-surface-container p-8">
              <h3 className="font-[var(--font-headline)] text-lg font-bold text-on-surface">
                Support Local &amp; Réactif
              </h3>
              <p className="mt-3 text-sm text-on-surface-variant leading-relaxed">
                Une équipe sénégalaise à votre écoute via WhatsApp jour et nuit.
                Réponse garantie en moins de 2 heures.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ CTA BANNER ═══════════════ */}
      <section className="relative overflow-hidden py-20 sm:py-28">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-container/20 via-surface to-secondary/10" />
        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 className="font-[var(--font-headline)] text-2xl font-bold text-on-surface sm:text-4xl">
            Prêt à passer au Premium ?
          </h2>
          <p className="mt-4 text-base text-on-surface-variant">
            Rejoignez des milliers de clients satisfaits au Sénégal
          </p>
          <Link
            href="/catalogue"
            className="mt-8 inline-block rounded-2xl px-10 py-4 font-bold gradient-cta transition-all duration-300 hover:scale-105 hover:shadow-glow-primary"
          >
            Commencer maintenant
          </Link>
        </div>
      </section>
    </>
  );
}
