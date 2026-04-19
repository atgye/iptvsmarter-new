"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { CartDrawer } from "./CartDrawer";

const navLinks = [
  { href: "/", label: "Accueil" },
  { href: "/catalogue", label: "Catalogue" },
  { href: "/comment-ca-marche", label: "Comment ça marche" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { totalItems, setIsOpen } = useCart();

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 glass-nav">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 font-[var(--font-headline)] text-xl font-bold tracking-tight"
          >
            <span className="inline-block h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600" />
            <span className="text-gray-900 drop-shadow-sm">
              IPTV<span className="text-blue-600">Smarters</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="rounded-lg px-4 py-2 text-sm font-semibold text-gray-700 transition-colors hover:text-blue-600 hover:bg-white/40"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {/* Cart */}
            <button
              onClick={() => setIsOpen(true)}
              className="relative rounded-xl p-2.5 text-gray-700 transition-colors hover:bg-white/50 hover:text-blue-600"
              aria-label="Panier"
              id="cart-button"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                />
              </svg>
              {totalItems > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 shadow-md text-[10px] font-bold text-white">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Auth */}
            <Link
              href="/connexion"
              className="hidden sm:inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold gradient-cta shadow-sm transition-all duration-300 hover:scale-105"
              id="login-button"
            >
              Connexion
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden rounded-xl p-2.5 text-gray-700 hover:bg-white/50"
              aria-label="Menu"
              id="mobile-menu-button"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                {mobileOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                )}
              </svg>
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-white/40 bg-white/60 backdrop-blur-xl animate-slide-up">
            <ul className="flex flex-col gap-1 px-4 py-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block rounded-lg px-4 py-3 text-sm font-semibold text-gray-700 transition-colors hover:bg-white/50 hover:text-blue-600"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/connexion"
                  onClick={() => setMobileOpen(false)}
                  className="mt-2 block rounded-xl px-4 py-3 text-center text-sm font-semibold gradient-cta shadow-sm"
                >
                  Connexion
                </Link>
              </li>
            </ul>
          </div>
        )}
      </header>

      {/* Spacer */}
      <div className="h-16" />

      <CartDrawer />
    </>
  );
}
