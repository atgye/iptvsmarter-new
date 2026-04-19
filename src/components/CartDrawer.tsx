"use client";

import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/data/products";
import Link from "next/link";

export function CartDrawer() {
  const { items, removeItem, updateQuantity, totalPrice, isOpen, setIsOpen } =
    useCart();

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-50 bg-blue-900/20 backdrop-blur-sm transition-opacity"
        onClick={() => setIsOpen(false)}
      />

      {/* Drawer */}
      <aside className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col glass border-l border-white/60 shadow-2xl animate-slide-up sm:animate-fade-in rounded-none sm:rounded-l-3xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/40">
          <h2 className="font-[var(--font-headline)] text-xl font-bold text-gray-900 drop-shadow-sm">
            Mon Panier
          </h2>
          <button
            onClick={() => setIsOpen(false)}
            className="rounded-lg p-2 text-gray-700 hover:bg-white/50 transition-colors"
            aria-label="Fermer le panier"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="text-6xl mb-4 opacity-80">🛒</div>
              <p className="text-gray-700 font-medium text-base">
                Votre panier est vide
              </p>
              <button
                onClick={() => setIsOpen(false)}
                className="mt-6 text-sm font-bold text-blue-600 hover:text-blue-700 hover:underline"
              >
                Continuer vos achats
              </button>
            </div>
          ) : (
            <ul className="space-y-4">
              {items.map((item) => (
                <li
                  key={item.product.id}
                  className="flex gap-4 rounded-2xl bg-white/40 p-4 transition-colors hover:bg-white/60 border border-white/50 shadow-sm"
                >
                  {/* Product icon */}
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-white border border-white/60 text-2xl shadow-sm">
                    {item.product.categorySlug === "streaming"
                      ? "🎬"
                      : item.product.categorySlug === "iptv"
                      ? "📺"
                      : item.product.categorySlug === "musique"
                      ? "🎵"
                      : item.product.categorySlug === "vpn"
                      ? "🔒"
                      : "🎁"}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-sm text-gray-900 truncate">
                      {item.product.name}
                    </h3>
                    <p className="text-xs font-semibold text-gray-600 mt-0.5">
                      {item.selectedDuration}
                    </p>

                    <div className="mt-3 flex items-center justify-between">
                      {/* Quantity */}
                      <div className="flex items-center gap-2 rounded-lg bg-white/70 border border-white/50 px-1 shadow-sm">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.quantity - 1
                            )
                          }
                          className="p-1.5 text-gray-700 hover:text-blue-600 text-xs font-bold"
                        >
                          −
                        </button>
                        <span className="text-xs font-bold text-gray-900 w-4 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.quantity + 1
                            )
                          }
                          className="p-1.5 text-gray-700 hover:text-blue-600 text-xs font-bold"
                        >
                          +
                        </button>
                      </div>

                      <span className="text-base font-black text-blue-600 drop-shadow-sm">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>
                    </div>
                  </div>

                  {/* Remove */}
                  <button
                    onClick={() => removeItem(item.product.id)}
                    className="shrink-0 self-start p-1.5 rounded-md text-gray-500 hover:bg-red-50 hover:text-red-500 transition-colors"
                    aria-label="Retirer du panier"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-white/40 bg-white/30 backdrop-blur-md px-6 py-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-gray-700">Total</span>
              <span className="text-2xl font-black text-gray-900 drop-shadow-sm font-[var(--font-headline)]">
                {formatPrice(totalPrice)}
              </span>
            </div>
            <Link
              href="/panier"
              onClick={() => setIsOpen(false)}
              className="block w-full rounded-xl py-3.5 text-center text-sm font-bold gradient-cta shadow-md transition-all duration-300 hover:scale-[1.02]"
            >
              Voir le panier complet
            </Link>
            <button
              onClick={() => setIsOpen(false)}
              className="block w-full text-center text-xs font-bold text-gray-600 hover:text-blue-600 transition-colors"
            >
              Continuer les achats
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
