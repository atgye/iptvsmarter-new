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
      <section className="relative overflow-hidden bg-surface-container-lowest py-16 sm:py-20">
        <div className="absolute -top-32 -right-32 h-[400px] w-[400px] rounded-full bg-primary-container/8 blur-[100px]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h1 className="font-[var(--font-headline)] text-3xl font-extrabold text-on-surface sm:text-4xl lg:text-5xl">
              Le Catalogue{" "}
              <span className="bg-gradient-to-r from-primary to-primary-container bg-clip-text text-transparent">
                Illimité.
              </span>
            </h1>
            <p className="mt-4 text-base text-on-surface-variant sm:text-lg">
              De la sécurité VPN ultra-robuste au meilleur du divertissement
              streaming. Tout IPTVSmarters dans une seule interface fluide.
            </p>
          </div>

          {/* Search bar */}
          <div className="mt-8 max-w-lg">
            <div className="relative">
              <svg
                className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-on-surface-variant/50"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
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
                className="w-full rounded-2xl bg-surface-container-low py-3.5 pl-12 pr-4 text-sm text-on-surface placeholder:text-on-surface-variant/50 outline-none transition-all focus:bg-surface-container focus:ring-2 focus:ring-primary/30"
                id="catalogue-search"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Category Chips + Products */}
      <section className="bg-surface py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Category chips */}
          <div className="flex flex-wrap gap-2 mb-10">
            <button
              onClick={() => setActiveCategory("all")}
              className={`rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-200 ${
                activeCategory === "all"
                  ? "bg-primary text-on-primary"
                  : "bg-surface-container-high text-on-surface-variant hover:bg-surface-bright"
              }`}
            >
              Tout
            </button>
            {categories.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => setActiveCategory(cat.slug)}
                className={`rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-200 ${
                  activeCategory === cat.slug
                    ? "bg-primary text-on-primary"
                    : "bg-surface-container-high text-on-surface-variant hover:bg-surface-bright"
                }`}
              >
                {cat.icon} {cat.name}
              </button>
            ))}
          </div>

          {/* Results count */}
          <p className="mb-6 text-xs text-on-surface-variant">
            {filteredProducts.length} produit
            {filteredProducts.length !== 1 && "s"} trouvé
            {filteredProducts.length !== 1 && "s"}
          </p>

          {/* Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center">
              <p className="text-4xl mb-4">🔍</p>
              <p className="text-on-surface-variant">
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
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        </div>
      }
    >
      <CatalogueContent />
    </Suspense>
  );
}
