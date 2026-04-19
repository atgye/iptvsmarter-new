"use client";

import { useSearchParams } from "next/navigation";
import { useState, useMemo, Suspense } from "react";
import { products, categories } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";

function CatalogueContent() {
  const searchParams = useSearchParams();
  const initialCat = searchParams.get("cat") || "all";
  const [activeCategory, setActiveCategory] = useState(initialCat);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = useMemo(() => {
    let filtered = products;
    if (activeCategory !== "all") {
      filtered = filtered.filter((p) => p.categorySlug === activeCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.shortDescription.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }
    return filtered;
  }, [activeCategory, searchQuery]);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden py-16 sm:py-24">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-10">
          <div className="max-w-2xl glass p-8 sm:p-12 mb-10 shadow-lg border-white/60 hover:bg-white/40 transition-colors">
            <h1 className="font-[var(--font-headline)] text-3xl font-extrabold text-gray-900 sm:text-4xl lg:text-5xl drop-shadow-sm">
              Le Catalogue{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Illimité.
              </span>
            </h1>
            <p className="mt-4 text-base font-medium text-gray-700 sm:text-lg">
              De la sécurité VPN ultra-robuste au meilleur du divertissement
              streaming. Tout IPTVSmarters dans une seule interface fluide.
            </p>
          </div>

          {/* Search bar */}
          <div className="max-w-xl">
            <div className="relative glass rounded-2xl overflow-hidden border-white/60 shadow-sm focus-within:shadow-md transition-shadow">
              <svg
                className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
              <input
                type="search"
                placeholder="Rechercher un service…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent py-4 pl-14 pr-4 text-sm font-medium text-gray-900 placeholder:text-gray-500 outline-none"
                id="catalogue-search"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Category Chips + Products */}
      <section className="py-12 sm:py-16 relative z-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Category chips */}
          <div className="flex flex-wrap gap-3 mb-12">
            <button
              onClick={() => setActiveCategory("all")}
              className={`rounded-full px-6 py-3 text-sm font-bold shadow-sm transition-all duration-300 hover:-translate-y-0.5 ${
                activeCategory === "all"
                  ? "bg-blue-600 text-white shadow-blue-600/30"
                  : "glass text-gray-700 hover:bg-white/60 border-white/50"
              }`}
            >
              Tout
            </button>
            {categories.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => setActiveCategory(cat.slug)}
                className={`rounded-full px-6 py-3 text-sm font-bold shadow-sm transition-all duration-300 hover:-translate-y-0.5 flex items-center gap-2 ${
                  activeCategory === cat.slug
                    ? "bg-blue-600 text-white shadow-blue-600/30"
                    : "glass text-gray-700 hover:bg-white/60 border-white/50"
                }`}
              >
                <span className="text-lg leading-none scale-125">{cat.icon}</span>{" "}
                <span>{cat.name}</span>
              </button>
            ))}
          </div>

          {/* Results count */}
          <p className="mb-6 text-sm font-bold text-gray-500 uppercase tracking-wider">
            {filteredProducts.length} produit
            {filteredProducts.length !== 1 && "s"} trouvé
            {filteredProducts.length !== 1 && "s"}
          </p>

          {/* Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="py-24 text-center glass border-white/50 max-w-2xl mx-auto rounded-3xl">
              <p className="text-6xl mb-6 opacity-70">🔍</p>
              <p className="text-gray-700 font-medium text-lg">
                Aucun produit trouvé pour cette recherche.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default function CataloguePage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
        </div>
      }
    >
      <CatalogueContent />
    </Suspense>
  );
}
