"use client";

import Link from "next/link";
import { formatPrice, type Product } from "@/data/products";
import { useCart } from "@/context/CartContext";

const categoryEmojis: Record<string, string> = {
  streaming: "🎬",
  iptv: "📺",
  musique: "🎵",
  vpn: "🔒",
  "cartes-cadeaux": "🎁",
};

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();

  return (
    <div className="group relative flex flex-col rounded-2xl bg-surface-container-highest/60 p-5 transition-all duration-300 hover:bg-surface-container-highest hover:scale-[1.02] hover:shadow-ambient">
      {/* Badge */}
      {product.badge && (
        <span className="absolute -top-2 right-4 z-10 rounded-full bg-tertiary-container px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-on-tertiary">
          {product.badge}
        </span>
      )}

      {/* Icon area */}
      <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-surface-container-low text-4xl transition-transform duration-300 group-hover:scale-110">
        {categoryEmojis[product.categorySlug] || "📦"}
      </div>

      {/* Category chip */}
      <span className="mb-2 inline-block w-fit rounded-full bg-surface-container-high px-3 py-1 font-[var(--font-label)] text-[10px] font-medium uppercase tracking-wider text-on-surface-variant">
        {product.category}
      </span>

      {/* Title */}
      <h3 className="font-[var(--font-headline)] text-base font-bold text-on-surface">
        {product.name}
      </h3>

      {/* Description */}
      <p className="mt-1.5 text-xs leading-relaxed text-on-surface-variant line-clamp-2">
        {product.shortDescription}
      </p>

      {/* Price */}
      <div className="mt-auto pt-4">
        <div className="flex items-baseline gap-1">
          <span className="font-[var(--font-headline)] text-lg font-bold text-primary">
            {formatPrice(product.price)}
          </span>
          {product.priceMax && (
            <span className="text-xs text-on-surface-variant">
              – {formatPrice(product.priceMax)}
            </span>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="mt-4 flex gap-2">
        <Link
          href={`/produit/${product.slug}`}
          className="flex-1 rounded-xl py-2.5 text-center text-xs font-semibold text-on-surface-variant bg-surface-container-high transition-colors hover:bg-surface-bright hover:text-primary"
        >
          Détails
        </Link>
        <button
          onClick={() => addItem(product)}
          className="flex-1 rounded-xl py-2.5 text-center text-xs font-bold gradient-cta transition-all duration-300 hover:scale-105"
        >
          Ajouter
        </button>
      </div>
    </div>
  );
}
