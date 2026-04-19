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
      <div className="flex min-h-[60vh] flex-col items-center justify-center text-center px-4 relative z-10">
        <div className="glass p-12 max-w-lg">
          <p className="text-6xl mb-6 opacity-80">😕</p>
          <h1 className="font-[var(--font-headline)] text-3xl font-bold text-gray-900 drop-shadow-sm">
            Produit introuvable
          </h1>
          <p className="mt-4 text-gray-700 font-medium">
            Ce produit n&apos;existe pas ou a été retiré.
          </p>
          <Link
            href="/catalogue"
            className="mt-8 inline-block rounded-2xl px-8 py-4 text-sm font-bold gradient-cta shadow-md hover:scale-105 transition-transform"
          >
            Retour au catalogue
          </Link>
        </div>
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
      <div className="relative z-10 border-b border-white/30 bg-white/20 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-3 text-xs font-bold uppercase tracking-wider text-gray-500">
            <Link href="/" className="hover:text-blue-600 transition-colors">
              Accueil
            </Link>
            <span className="text-gray-400">/</span>
            <Link
              href="/catalogue"
              className="hover:text-blue-600 transition-colors"
            >
              Catalogue
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-blue-600 truncate max-w-[200px]">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Product Detail */}
      <section className="py-12 sm:py-20 relative z-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            {/* Left: Product Visual */}
            <div className="flex flex-col items-center justify-center">
              <div className="relative flex h-72 w-72 sm:h-96 sm:w-96 items-center justify-center rounded-[3rem] glass shadow-2xl border-white/60 text-9xl animate-float">
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
                <div className="absolute inset-0 rounded-[3rem] bg-blue-400/10 blur-2xl -z-10" />
              </div>

              {/* Quick badges below visual */}
              <div className="mt-10 flex flex-wrap justify-center gap-4">
                <div className="flex items-center gap-2 rounded-full glass px-5 py-2.5 shadow-sm hover:scale-105 transition-transform">
                  <span className="text-lg">⚡</span>
                  <span className="text-xs font-bold text-gray-800 uppercase tracking-wider">
                    Livraison Instantanée
                  </span>
                </div>
                <div className="flex items-center gap-2 rounded-full glass px-5 py-2.5 shadow-sm hover:scale-105 transition-transform">
                  <span className="text-lg">🛡️</span>
                  <span className="text-xs font-bold text-gray-800 uppercase tracking-wider">
                    Garantie Totale
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Info */}
            <div className="flex flex-col glass p-8 sm:p-12 border-white/60 shadow-xl relative overflow-hidden">
              {/* Badge */}
              {product.badge && (
                <span className="mb-6 inline-block w-fit rounded-full bg-blue-600 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white shadow-md">
                  {product.badge}
                </span>
              )}

              <h1 className="font-[var(--font-headline)] text-4xl font-extrabold text-gray-900 sm:text-5xl leading-tight drop-shadow-sm">
                {product.name}
              </h1>

              {/* Price */}
              <div className="mt-6 flex items-baseline gap-3 pb-6 border-b border-white/40">
                <span className="font-[var(--font-headline)] text-3xl font-black text-blue-600 sm:text-4xl drop-shadow-sm">
                  {formatPrice(product.price)}
                </span>
                {product.priceMax && (
                  <span className="text-base font-semibold text-gray-500 line-through">
                    {formatPrice(product.priceMax)}
                  </span>
                )}
              </div>

              {/* Description */}
              <div className="mt-8">
                <h2 className="font-[var(--font-headline)] text-xl font-bold text-gray-900 drop-shadow-sm">
                  L&apos;expérience Ultime
                </h2>
                <p className="mt-4 text-base font-medium leading-relaxed text-gray-700">
                  {product.description}
                </p>
              </div>

              {/* Features */}
              <ul className="mt-8 space-y-4">
                {product.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 text-sm shadow-sm">
                      ✓
                    </span>
                    <span className="text-base font-medium text-gray-700">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <div className="mt-10 flex flex-col gap-4 sm:flex-row pt-8 border-t border-white/40">
                <button
                  onClick={() => addItem(product)}
                  className="flex-1 rounded-2xl py-4.5 text-center text-lg font-bold gradient-cta shadow-lg transition-all duration-300 hover:scale-[1.02]"
                  id="add-to-cart-button"
                >
                  Ajouter au panier
                </button>
                <a
                  href="https://wa.me/221000000000"
                  className="flex items-center justify-center gap-2 rounded-2xl glass border border-white/60 px-8 py-4.5 text-base font-bold text-gray-800 shadow-sm transition-all hover:bg-white/60 hover:text-blue-600"
                >
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z"
                    />
                  </svg>
                  Contact
                </a>
              </div>

              {/* Support info */}
              <div className="mt-8 rounded-2xl bg-white/40 border border-white/50 p-6 shadow-sm">
                <p className="text-sm font-medium text-gray-700 leading-relaxed text-center">
                  💬 Recevez vos accès par email et WhatsApp immédiatement après
                  paiement. Support technique disponible 24/7.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Similar Products */}
      {similarProducts.length > 0 && (
        <section className="py-16 sm:py-24 relative z-10 border-t border-white/30">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="font-[var(--font-headline)] text-2xl font-bold text-gray-900 sm:text-3xl drop-shadow-sm">
                  Produits similaires
                </h2>
                <p className="mt-2 text-gray-700 font-medium">Vous pourriez aussi aimer ceux-ci</p>
              </div>
              <Link
                href="/catalogue"
                className="inline-flex glass rounded-full px-6 py-2 border-white/60 items-center gap-2 text-sm font-bold text-blue-600 hover:bg-white/50 transition-colors"
              >
                VOIR TOUT
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
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

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
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
