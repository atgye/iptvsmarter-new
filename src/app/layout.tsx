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
  title: "SunuStream – Le Meilleur du Streaming & IPTV au Sénégal",
  description:
    "SunuStream est votre portail premium pour le divertissement au Sénégal. Profitez d'abonnements Netflix, Spotify, Disney+ et IPTV avec une livraison instantanée et un support 24/7.",
  keywords: [
    "SunuStream",
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
      <body className="min-h-screen flex flex-col relative overflow-x-hidden">
        {/* Decorative Blurred Shapes */}
        <div className="pointer-events-none fixed -top-[20%] -left-[10%] h-[500px] w-[500px] rounded-full bg-blue-400/20 blur-[120px]" />
        <div className="pointer-events-none fixed top-[20%] -right-[10%] h-[600px] w-[600px] rounded-full bg-indigo-400/20 blur-[120px]" />
        <div className="pointer-events-none fixed -bottom-[10%] left-[20%] h-[500px] w-[500px] rounded-full bg-purple-400/20 blur-[120px]" />
        
        <CartProvider>
          <Navbar />
          <main className="flex-1 relative z-10">{children}</main>
          <Footer />
          <WhatsAppButton />
        </CartProvider>
      </body>
    </html>
  );
}
