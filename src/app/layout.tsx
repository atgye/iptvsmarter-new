import type { Metadata } from "next";
import Script from "next/script";
import { Plus_Jakarta_Sans, Manrope, Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { CartProvider } from "@/context/CartContext";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-headline",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const manrope = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-label",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "IPTV Smarters – Abonnements Streaming & IPTV Premium au Sénégal",
  description:
    "Le premier fournisseur d'abonnements digitaux premium au Sénégal. Netflix 4K, Spotify, Disney+, IPTV et VPN à des tarifs locaux. Livraison instantanée.",
  keywords: [
    "IPTV",
    "Netflix Sénégal",
    "Spotify Premium",
    "streaming",
    "abonnement",
    "FCFA",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${plusJakarta.variable} ${manrope.variable} ${inter.variable}`}
    >
      <head>
      </head>
      <body className="min-h-screen flex flex-col">
        <CartProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <WhatsAppButton />
        </CartProvider>
      </body>
    </html>
  );
}
