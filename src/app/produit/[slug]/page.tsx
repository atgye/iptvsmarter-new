"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { getProductBySlug, products, formatPrice } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { ProductCard } from "@/components/ProductCard";

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const product = getProductBySlug(slug);
  const { addItem } = useCart();

  if (!product) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center text-center px-4">
        <p className="text-5xl mb-4">😕</p>
        <h1 className="font-[var(--font-headline)] text-2xl font-bold text-on-surface">
          Produit introuvable
        </h1>
        <p className="mt-2 text-on-surface-variant">
          Ce produit n&apos;existe pas ou a été retiré.
        </p>
        <Link
          href="/catalogue"
          className="mt-6 rounded-xl px-6 py-3 text-sm font-semibold gradient-cta"
        >
          Retour au catalogue
        </Link>
      </div>
    );
  }

  const similarProducts = products
    .filter(
      (p) => p.categorySlug === product.categorySlug && p.id !== product.id
    )
    .slice(0, 4);

  return (
    <>
      {/* Breadcrumb */}
      <div className="bg-surface-container-lowest">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-xs text-on-surface-variant">
            <Link href="/" className="hover:text-primary transition-colors">
              Accueil
            </Link>
            <span>/</span>
            <Link
              href="/catalogue"
              className="hover:text-primary transition-colors"
            >
              Catalogue
            </Link>
            <span>/</span>
            <span className="text-on-surface font-medium">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Product Detail */}
      <section className="bg-surface-container-lowest py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            {/* Left: Product Visual */}
            <div className="flex flex-col items-center justify-center">
              <div className="relative flex h-64 w-64 items-center justify-center rounded-3xl bg-surface-container text-8xl sm:h-80 sm:w-80 animate-float">
                {product.categorySlug === "streaming"
                  ? "🎬"
                  : product.categorySlug === "iptv"
                  ? "📺"
                  : product.categorySlug === "musique"
                  ? "🎵"
                  : product.categorySlug === "vpn"
                  ? "🔒"
                  : "🎁"}
                {/* Glow behind */}
                <div className="absolute inset-0 rounded-3xl bg-primary-container/10 blur-2xl" />
              </div>

              {/* Quick badges below visual */}
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <div className="flex items-center gap-2 rounded-full bg-surface-container px-4 py-2">
                  <span className="text-sm">⚡</span>
                  <span className="text-xs font-medium text-on-surface-variant">
                    Livraison Instantanée
                  </span>
                </div>
                <div className="flex items-center gap-2 rounded-full bg-surface-container px-4 py-2">
                  <span className="text-sm">🛡️</span>
                  <span className="text-xs font-medium text-on-surface-variant">
                    Garantie Totale
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Info */}
            <div className="flex flex-col">
              {/* Badge */}
              {product.badge && (
                <span className="mb-4 inline-block w-fit rounded-full bg-tertiary-container px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-on-tertiary">
                  {product.badge}
                </span>
              )}

              <h1 className="font-[var(--font-headline)] text-3xl font-extrabold text-on-surface sm:text-4xl">
                {product.name}
              </h1>

              {/* Price */}
              <div className="mt-4 flex items-baseline gap-2">
                <span className="font-[var(--font-headline)] text-2xl font-bold text-primary sm:text-3xl">
                  {formatPrice(product.price)}
                </span>
                {product.priceMax && (
                  <span className="text-sm text-on-surface-variant">
                    – {formatPrice(product.priceMax)}
                  </span>
                )}
              </div>

              {/* Description */}
              <div className="mt-6">
                <h2 className="font-[var(--font-headline)] text-lg font-bold text-on-surface">
                  L&apos;expérience Ultime
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-on-surface-variant">
                  {product.description}
                </p>
              </div>

              {/* Features */}
              <ul className="mt-6 space-y-3">
                {product.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary-container/20 text-primary-container text-xs">
                      ✓
                    </span>
                    <span className="text-sm text-on-surface-variant">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <button
                  onClick={() => addItem(product)}
                  className="flex-1 rounded-2xl py-4 text-center font-bold gradient-cta transition-all duration-300 hover:scale-105 hover:shadow-glow-primary"
                  id="add-to-cart-button"
                >
                  Ajouter au panier
                </button>
                <a
                  href="https://wa.me/221000000000"
                  className="flex items-center justify-center gap-2 rounded-2xl bg-surface-container-high px-6 py-4 text-sm font-medium text-on-surface-variant transition-all hover:bg-surface-bright hover:text-primary"
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z"
                    />
                  </svg>
                  Besoin d&apos;aide ?
                </a>
              </div>

              {/* Support info */}
              <div className="mt-6 rounded-2xl bg-surface-container p-5">
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  💬 Recevez vos accès par email et WhatsApp immédiatement après
                  paiement. Support technique disponible 24/7 pendant toute la
                  durée de l&apos;abonnement.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Similar Products */}
      {similarProducts.length > 0 && (
        <section className="bg-surface py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-10">
              <h2 className="font-[var(--font-headline)] text-xl font-bold text-on-surface sm:text-2xl">
                Produits similaires
              </h2>
              <Link
                href="/catalogue"
                className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
              >
                VOIR TOUT
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                  />
                </svg>
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {similarProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
