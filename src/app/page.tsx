"use client";

import { useState, useEffect } from "react";
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
  const [activeIndex, setActiveIndex] = useState(0);
  const allFeatured = products.slice(0, 8);
  const heroCarouselItems = products.slice(0, 5);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % heroCarouselItems.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [heroCarouselItems.length]);

  return (
    <>
      {/* ═══════════════ HERO ═══════════════ */}
      <section className="relative overflow-hidden min-h-[90vh] flex flex-col items-center pt-32 pb-20">
        {/* Background image & Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1593359677879-a4bb92f4834c?w=1600&q=80" 
            alt="Séries & Cinéma" 
            className="object-cover h-full w-full opacity-60" 
          />
        </div>
        <div className="absolute inset-0 z-10 bg-white/50 backdrop-blur-[6px]" />

        <div className="relative z-20 w-full max-w-7xl px-4 sm:px-6 lg:px-8 mt-4 flex flex-col items-center">
          
          {/* Barre de recherche */}
          <div className="w-full max-w-xl mb-12">
            <div className="flex items-center bg-white rounded-full shadow-md p-2 hover:shadow-lg transition-shadow border border-gray-100">
              <input 
                type="text"
                placeholder="Rechercher un produit..."
                className="flex-1 bg-transparent border-none outline-none px-5 text-sm sm:text-base text-gray-700 placeholder:text-gray-400 focus:ring-0"
              />
              <button 
                type="button"
                className="flex shrink-0 items-center justify-center bg-blue-600 hover:bg-blue-700 text-white rounded-full h-12 w-12 sm:h-14 sm:w-14 transition-colors"
                aria-label="Rechercher"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Textes Hero */}
          <div className="text-center mb-16">
            <span className="inline-block mb-4 text-orange-600 font-semibold text-sm bg-orange-100/80 px-4 py-1.5 rounded-full border border-orange-200">
              Livraison instantanée ⚡
            </span>
            <h1 className="font-[var(--font-headline)] text-4xl font-bold text-blue-600 md:text-5xl drop-shadow-sm mb-6">
              Paiement sécurisé 🔒
            </h1>
            <p className="text-gray-600 max-w-lg mx-auto text-center font-medium leading-relaxed">
              Abonnements IPTV livrés instantanément après paiement. 
              Profitez de vos contenus préférés sans attendre.
            </p>
          </div>

          {/* Carrousel de cartes en éventail (Animé) */}
          <div className="relative flex justify-center items-center mb-20 h-56 sm:h-64 w-full max-w-3xl mx-auto">
            {heroCarouselItems.map((product, index) => {
              const positionIndex = (index - activeIndex + heroCarouselItems.length) % heroCarouselItems.length;
              
              const transforms = [
                // 0 : Extrême gauche
                "-rotate-12 -translate-x-28 sm:-translate-x-48 -translate-y-2 z-10 opacity-70",
                // 1 : Centre gauche
                "-rotate-6 -translate-x-14 sm:-translate-x-24 translate-y-1 z-20 opacity-90",
                // 2 : Centre (Focus)
                "rotate-0 translate-y-2 z-30 scale-110 shadow-2xl opacity-100",
                // 3 : Centre droite
                "rotate-6 translate-x-14 sm:translate-x-24 translate-y-1 z-20 opacity-90",
                // 4 : Extrême droite
                "rotate-12 translate-x-28 sm:translate-x-48 -translate-y-2 z-10 opacity-70"
              ];
              const transform = transforms[positionIndex];
              
              return (
                <div 
                  key={product.id}
                  className={`absolute w-36 sm:w-40 rounded-2xl shadow-xl bg-white p-3 border border-gray-100 transition-all duration-700 ease-in-out hover:z-40 hover:-translate-y-4 ${transform}`}
                >
                  <div className="h-20 sm:h-24 w-full rounded-xl bg-gray-100 overflow-hidden mb-3 relative">
                    <img src={product.image} alt={product.name} className="object-cover h-full w-full" />
                  </div>
                  <h3 className="text-[11px] sm:text-xs font-bold text-gray-900 line-clamp-1 text-center mb-1">
                    {product.name}
                  </h3>
                  <div className="text-center font-black text-xs sm:text-sm bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">
                    {product.price.toLocaleString("fr-FR")} FCFA
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bouton CTA */}
          <Link
            href="/catalogue"
            className="rounded-full bg-gradient-to-r from-orange-500 to-orange-600 px-8 py-3 text-white font-bold text-base sm:text-lg shadow-lg hover:scale-105 hover:shadow-orange-500/30 transition-all duration-300"
          >
            Découvrir les offres
          </Link>
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

          {/* Horizontal Snap Carousel */}
          <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 pt-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {allFeatured.map((product) => (
              <div key={product.id} className="min-w-[280px] sm:min-w-[320px] snap-center">
                <ProductCard product={product} />
              </div>
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
