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

  // Badge mapping for "Football 🔵 / Films 🟣 / Séries 🟢" style requirements 
  let badgeClasses = "bg-gray-100 text-gray-800";
  if (product.categorySlug === "iptv") badgeClasses = "bg-blue-100 text-blue-800";
  else if (product.categorySlug === "streaming") badgeClasses = "bg-purple-100 text-purple-800";
  else if (product.categorySlug === "vpn") badgeClasses = "bg-emerald-100 text-emerald-800";

  return (
    <div className="group relative flex flex-col glass p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:bg-white/40">
      {/* Badge */}
      {product.badge && (
        <span className="absolute -top-3 right-4 z-10 rounded-full bg-blue-600 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white shadow-md">
          {product.badge}
        </span>
      )}

      {/* Icon area */}
      <div className="mb-5 mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-white/50 border border-white/60 text-5xl transition-transform duration-300 group-hover:scale-110 shadow-sm">
        {categoryEmojis[product.categorySlug] || "📦"}
      </div>

      {/* Category chip */}
      <span className={`mb-3 inline-block w-fit rounded-full px-3 py-1 font-[var(--font-label)] text-[10px] font-bold uppercase tracking-wider ${badgeClasses}`}>
        {product.category}
      </span>

      {/* Title */}
      <h3 className="font-[var(--font-headline)] text-lg font-bold text-gray-900 drop-shadow-sm">
        {product.name}
      </h3>

      {/* Description */}
      <p className="mt-2 text-sm leading-relaxed text-gray-700 font-medium line-clamp-2">
        {product.shortDescription}
      </p>

      {/* Price */}
      <div className="mt-auto pt-5">
        <div className="flex items-baseline gap-2">
          <span className="font-[var(--font-headline)] text-2xl font-black text-blue-600 drop-shadow-sm">
            {formatPrice(product.price)}
          </span>
          {product.priceMax && (
            <span className="text-sm font-semibold text-gray-500 line-through">
              {formatPrice(product.priceMax)}
            </span>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="mt-5 flex gap-3 flex-col sm:flex-row">
        <Link
          href={`/produit/${product.slug}`}
          className="flex-1 rounded-xl py-3 text-center text-sm font-bold text-gray-800 glass transition-all hover:bg-white/60 shadow-sm"
        >
          Détails
        </Link>
        <button
          onClick={() => addItem(product)}
          className="flex-1 rounded-xl py-3 text-center text-sm font-bold gradient-cta shadow-md transition-all duration-300 hover:scale-[1.03]"
        >
          Ajouter au panier
        </button>
      </div>
    </div>
  );
}
