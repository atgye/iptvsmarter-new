export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  categorySlug: string;
  shortDescription: string;
  description: string;
  price: number;
  priceMax?: number;
  image: string;
  badge?: string;
  features: string[];
  duration: string;
}

export const categories = [
  { name: "Streaming", slug: "streaming", icon: "🎬" },
  { name: "IPTV", slug: "iptv", icon: "📺" },
  { name: "Musique", slug: "musique", icon: "🎵" },
  { name: "VPN & Sécurité", slug: "vpn", icon: "🔒" },
  { name: "Cartes Cadeaux", slug: "cartes-cadeaux", icon: "🎁" },
];

export const products: Product[] = [
  {
    id: "netflix-4k",
    name: "Netflix 4K Premium",
    slug: "netflix-4k-premium",
    category: "Streaming",
    categorySlug: "streaming",
    shortDescription: "Compte UHD Premium privé",
    description:
      "Profitez de Netflix dans sa meilleure qualité possible. Notre offre Netflix 4K Premium vous permet d'accéder à tout le catalogue mondial avec une résolution Ultra HD (4K) et un son immersif Dolby Atmos.",
    price: 2500,
    priceMax: 12000,
    image: "/images/netflix.svg",
    badge: "Populaire",
    features: [
      "Qualité Ultra HD (4K) et HDR10+",
      "Utilisation sur Smart TV, Console, PC et Mobile",
      "Pas d'interruptions ni de coupures publicitaires",
    ],
    duration: "1 mois",
  },
  {
    id: "iptv-pro-max",
    name: "IPTV Pro Max",
    slug: "iptv-pro-max",
    category: "IPTV",
    categorySlug: "iptv",
    shortDescription: "15 000+ Chaînes HD/4K",
    description:
      "L'offre IPTV la plus complète du marché. Plus de 15 000 chaînes en HD et 4K, avec un EPG complet et un support multi-appareils.",
    price: 5000,
    priceMax: 25000,
    image: "/images/iptv.svg",
    badge: "Best-seller",
    features: [
      "15 000+ chaînes internationales",
      "VOD avec 50 000+ films & séries",
      "Compatible tous appareils",
    ],
    duration: "1 mois",
  },
  {
    id: "spotify-premium",
    name: "Spotify Premium",
    slug: "spotify-premium",
    category: "Musique",
    categorySlug: "musique",
    shortDescription: "Musique illimitée sans pubs",
    description:
      "Écoutez vos artistes préférés sans interruption publicitaire, en qualité haute définition, avec téléchargement hors-ligne.",
    price: 1500,
    priceMax: 6000,
    image: "/images/spotify.svg",
    features: [
      "Musique sans publicité",
      "Téléchargement hors-ligne",
      "Qualité audio haute définition",
    ],
    duration: "1 mois",
  },
  {
    id: "disney-plus",
    name: "Disney+ Premium",
    slug: "disney-plus-premium",
    category: "Streaming",
    categorySlug: "streaming",
    shortDescription: "Marvel, Pixar & Star Wars",
    description:
      "Accédez à l'univers Disney, Marvel, Pixar, Star Wars et National Geographic en qualité 4K HDR.",
    price: 3500,
    priceMax: 15000,
    image: "/images/disney.svg",
    features: [
      "Catalogue Disney, Marvel, Star Wars",
      "Qualité 4K HDR Dolby Vision",
      "4 écrans simultanés",
    ],
    duration: "1 mois",
  },
  {
    id: "prime-video",
    name: "Prime Video",
    slug: "prime-video",
    category: "Streaming",
    categorySlug: "streaming",
    shortDescription: "Films & séries exclusives",
    description:
      "Amazon Prime Video avec accès aux contenus exclusifs Amazon Original et un large catalogue de films.",
    price: 2000,
    priceMax: 8000,
    image: "/images/prime.svg",
    features: [
      "Contenus Amazon Original",
      "Qualité 4K UHD",
      "Téléchargement hors-ligne",
    ],
    duration: "1 mois",
  },
  {
    id: "nordvpn",
    name: "NordVPN",
    slug: "nordvpn",
    category: "VPN & Sécurité",
    categorySlug: "vpn",
    shortDescription: "Navigation cryptée et anonyme",
    description:
      "La solution VPN la plus fiable au monde. Navigation sécurisée, accès aux contenus géo-restreints et protection de votre vie privée.",
    price: 3000,
    priceMax: 15000,
    image: "/images/nordvpn.svg",
    features: [
      "Serveurs dans 60+ pays",
      "Chiffrement AES-256",
      "Jusqu'à 6 appareils simultanés",
    ],
    duration: "1 mois",
  },
  {
    id: "expressvpn",
    name: "ExpressVPN",
    slug: "expressvpn",
    category: "VPN & Sécurité",
    categorySlug: "vpn",
    shortDescription: "Vitesse ultra-rapide",
    description: "VPN premium avec les vitesses les plus rapides du marché.",
    price: 3500,
    priceMax: 18000,
    image: "/images/expressvpn.svg",
    features: [
      "Protocole Lightway ultra-rapide",
      "94 pays couverts",
      "Split tunneling intelligent",
    ],
    duration: "1 mois",
  },
  {
    id: "carte-google-play",
    name: "Carte Google Play",
    slug: "carte-google-play",
    category: "Cartes Cadeaux",
    categorySlug: "cartes-cadeaux",
    shortDescription: "Rechargez votre compte Google",
    description:
      "Carte cadeau Google Play pour acheter des apps, jeux, films et livres sur le Play Store.",
    price: 5000,
    priceMax: 50000,
    image: "/images/google-play.svg",
    features: [
      "Utilisable sur le Play Store",
      "Valable sans expiration",
      "Activation instantanée",
    ],
    duration: "Permanent",
  },
  {
    id: "carte-apple",
    name: "Carte Apple",
    slug: "carte-apple",
    category: "Cartes Cadeaux",
    categorySlug: "cartes-cadeaux",
    shortDescription: "Crédit App Store & iTunes",
    description:
      "Carte cadeau Apple pour acheter des apps, musique, films et abonnements sur l'App Store et iTunes.",
    price: 5000,
    priceMax: 50000,
    image: "/images/apple.svg",
    features: [
      "Valable App Store & iTunes",
      "Achat d'abonnements Apple",
      "Code envoyé par WhatsApp",
    ],
    duration: "Permanent",
  },
  {
    id: "deezer-premium",
    name: "Deezer Premium",
    slug: "deezer-premium",
    category: "Musique",
    categorySlug: "musique",
    shortDescription: "90M+ titres en HiFi",
    description:
      "Deezer Premium avec accès à plus de 90 millions de titres en qualité HiFi sans publicité.",
    price: 1500,
    priceMax: 6000,
    image: "/images/deezer.svg",
    features: [
      "90M+ titres disponibles",
      "Qualité audio HiFi (FLAC)",
      "Écoute hors-ligne illimitée",
    ],
    duration: "1 mois",
  },
  {
    id: "sunu-iptv-luxe",
    name: "SUNU IPTV LUXE",
    slug: "sunu-iptv-luxe",
    category: "IPTV",
    categorySlug: "iptv",
    shortDescription: "L'offre premium ultime",
    description:
      "Notre offre IPTV la plus complète avec toutes les chaînes africaines, européennes et mondiales.",
    price: 8000,
    priceMax: 35000,
    image: "/images/iptv-luxe.svg",
    badge: "Premium",
    features: [
      "20 000+ chaînes mondiales",
      "VOD illimitée",
      "Support VIP prioritaire 24/7",
    ],
    duration: "1 mois",
  },
  {
    id: "surfshark",
    name: "Surfshark",
    slug: "surfshark",
    category: "VPN & Sécurité",
    categorySlug: "vpn",
    shortDescription: "Appareils illimités",
    description:
      "VPN économique permettant de connecter un nombre illimité d'appareils simultanément.",
    price: 2000,
    priceMax: 10000,
    image: "/images/surfshark.svg",
    features: [
      "Appareils illimités",
      "CleanWeb (bloque pubs & malwares)",
      "Mode Camouflage",
    ],
    duration: "1 mois",
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return products.filter((p) => p.categorySlug === categorySlug);
}

export function formatPrice(price: number): string {
  return price.toLocaleString("fr-FR") + " FCFA";
}
