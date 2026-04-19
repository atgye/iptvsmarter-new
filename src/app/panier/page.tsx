"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { formatPrice, products } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";

export default function PanierPage() {
  const { items, removeItem, updateQuantity, totalPrice, clearCart } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const suggestions = products
    .filter((p) => !items.find((item) => item.product.id === p.id))
    .slice(0, 3);

  const handleCheckout = async () => {
    try {
      setIsCheckingOut(true);
      const ref_command = `CMD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

      const payload = {
        item_name: `Commande SunuStream - ${items.length} article(s)`,
        item_price: totalPrice,
        ref_command: ref_command,
        custom_field: { items: items.map(i => ({ id: i.product.id, qty: i.quantity })) }
      };

      const res = await fetch("/api/paydunya", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await res.json();

      if (data.success === 1 && data.redirect_url) {
        // Redirection vers PayDunya
        window.location.href = data.redirect_url;
      } else {
        alert("Erreur PayDunya: " + JSON.stringify(data.error || data));
      }
    } catch (e) {
      console.error("Erreur Checkout:", e);
      alert("Erreur réseau ou système lors du paiement.");
    } finally {
      setIsCheckingOut(false);
    }
  };

  return (
    <>
      {/* Header */}
      <section className="relative z-10 py-10 sm:py-14 bg-white/20 backdrop-blur-md border-b border-white/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="font-[var(--font-headline)] text-3xl font-extrabold text-gray-900 sm:text-4xl drop-shadow-sm">
            Mon Panier
          </h1>
          <p className="mt-2 text-sm font-medium text-gray-700">
            Reste cool avec SunuStream.
          </p>
        </div>
      </section>

      <section className="py-12 sm:py-16 relative z-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center glass max-w-2xl mx-auto rounded-3xl mt-8">
              <div className="text-6xl mb-6 opacity-80">🛒</div>
              <h2 className="font-[var(--font-headline)] text-2xl font-bold text-gray-900 drop-shadow-sm">
                Votre panier est vide
              </h2>
              <p className="mt-4 text-base font-medium text-gray-700">
                Explorez notre catalogue pour trouver votre bonheur.
              </p>
              <Link
                href="/catalogue"
                className="mt-8 rounded-2xl px-10 py-4 font-bold gradient-cta shadow-md transition-all duration-300 hover:scale-105"
              >
                Explorer le catalogue
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-6">
                {items.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex gap-6 rounded-2xl glass p-6 transition-colors hover:bg-white/60 shadow-sm border border-white/60"
                  >
                    {/* Icon */}
                    <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl bg-white border border-white/60 text-5xl shadow-sm">
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

                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="font-[var(--font-headline)] text-lg font-bold text-gray-900 drop-shadow-sm">
                            {item.product.name}
                          </h3>
                          <p className="text-sm font-semibold text-gray-600 mt-2">
                            Abonnement {item.selectedDuration} •{" "}
                            {item.product.shortDescription}
                          </p>
                        </div>
                        <button
                          onClick={() => removeItem(item.product.id)}
                          className="shrink-0 rounded-lg p-2.5 text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all border border-transparent hover:border-red-100"
                          aria-label="Retirer"
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
                              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                            />
                          </svg>
                        </button>
                      </div>

                      <div className="mt-4 flex items-center justify-between">
                        {/* Quantity */}
                        <div className="flex items-center gap-1 rounded-xl bg-white/70 border border-white/60 shadow-sm">
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.product.id,
                                item.quantity - 1
                              )
                            }
                            className="px-4 py-2.5 text-sm font-bold text-gray-700 hover:text-blue-600 transition-colors"
                          >
                            −
                          </button>
                          <span className="px-2 py-2.5 text-sm font-bold text-gray-900 min-w-[2.5rem] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.product.id,
                                item.quantity + 1
                              )
                            }
                            className="px-4 py-2.5 text-sm font-bold text-gray-700 hover:text-blue-600 transition-colors"
                          >
                            +
                          </button>
                        </div>

                        <span className="font-[var(--font-headline)] text-xl font-black text-blue-600 drop-shadow-sm">
                          {formatPrice(item.product.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Clear cart */}
                <button
                  onClick={clearCart}
                  className="mt-2 text-sm font-bold text-gray-500 hover:text-red-500 transition-colors"
                >
                  Vider le panier
                </button>
              </div>

              {/* Sidebar: Summary */}
              <div className="lg:col-span-1">
                <div className="sticky top-28 rounded-3xl glass p-8 space-y-6 shadow-xl border-white/60">
                  <h2 className="font-[var(--font-headline)] text-xl font-bold text-gray-900 drop-shadow-sm">
                    Récapitulatif
                  </h2>

                  <div className="space-y-4">
                    {items.map((item) => (
                      <div
                        key={item.product.id}
                        className="flex items-center justify-between text-sm font-medium"
                      >
                        <span className="text-gray-700 truncate max-w-[65%]">
                          {item.product.name} <span className="text-gray-500 block text-xs">x{item.quantity}</span>
                        </span>
                        <span className="text-gray-900 font-bold">
                          {formatPrice(item.product.price * item.quantity)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-white/40 pt-6">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-gray-700 uppercase tracking-wider">
                        Total
                      </span>
                      <span className="font-[var(--font-headline)] text-2xl font-black text-gray-900 drop-shadow-sm">
                        {formatPrice(totalPrice)}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={handleCheckout}
                    disabled={isCheckingOut}
                    className="w-full rounded-2xl py-4.5 text-center text-lg font-bold gradient-cta shadow-md transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                    id="checkout-button"
                  >
                    {isCheckingOut ? "Initialisation..." : "Procéder au paiement"}
                  </button>

                  <div className="flex items-center gap-3 rounded-xl bg-white/50 border border-white/60 p-4 shadow-sm">
                    <span className="text-lg">🔒</span>
                    <p className="text-xs font-semibold text-gray-700 leading-relaxed">
                      Paiement sécurisé via Wave, Orange Money et Free Money
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Suggestions */}
      {items.length > 0 && suggestions.length > 0 && (
        <section className="py-16 sm:py-24 relative z-10 border-t border-white/30 bg-white/10 backdrop-blur-sm">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-[var(--font-headline)] text-2xl font-bold text-gray-900 sm:text-3xl drop-shadow-sm mb-10">
              Complétez votre expérience
            </h2>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {suggestions.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
