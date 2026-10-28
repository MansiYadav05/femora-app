// Femora Store Constants & Configuration

export const APP_NAME = "Femora";
export const BRAND_TAGLINE = "Discreet Organic Period Care & Cramp Relief";
export const PLAIN_PACKAGING_NOTE = "Plain packaging. No product names outside.";
export const DISCREET_PROMISE = "100% Discreet Delivery: Shipped in plain outer boxes with zero brand or product labels outside.";

export const FREE_SHIPPING_THRESHOLD = 499;
export const STANDARD_SHIPPING_FEE = 49;
export const EXPRESS_SHIPPING_FEE = 99;

export const ORDER_STATUSES = [
  "Placed",
  "Packed",
  "Shipped",
  "Out for delivery",
  "Delivered",
  "Cancelled",
] as const;

export type OrderStatus = (typeof ORDER_STATUSES)[number];

export interface Category {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  iconName: string;
  itemCount: number;
  bgGradient: string;
}

export const CATEGORIES: Category[] = [
  {
    id: "cat-1",
    slug: "sanitary-pads",
    name: "Sanitary Pads",
    tagline: "Ultra-thin, 100% certified organic cotton pads",
    description: "Rash-free, chlorine-free and toxin-free organic cotton pads with bamboo fiber core for breathable, superior absorption.",
    iconName: "Feather",
    itemCount: 6,
    bgGradient: "from-rose/10 to-blush/20",
  },
  {
    id: "cat-2",
    slug: "tampons",
    name: "Organic Tampons",
    tagline: "Chlorine-free organic cotton with plant-based applicators",
    description: "Certified organic tampons engineered with expandable leak-lock cotton fibers and silky-smooth cardboard or bio-plastic applicators.",
    iconName: "ShieldCheck",
    itemCount: 5,
    bgGradient: "from-teal/10 to-aqua/20",
  },
  {
    id: "cat-3",
    slug: "menstrual-cups",
    name: "Menstrual Cups",
    tagline: "Medical-grade silicone with 10-year durability",
    description: "FDA-compliant 100% medical grade silicone cups designed for 8–10 hours of leak-free freedom, zero odor, and eco-friendly comfort.",
    iconName: "Sparkles",
    itemCount: 5,
    bgGradient: "from-rose/10 to-blush/20",
  },
  {
    id: "cat-4",
    slug: "heating-patches",
    name: "Heating Patches",
    tagline: "Air-activated herbal warmth lasting up to 8 hours",
    description: "Self-heating herbal patches infused with eucalyptus, menthol, and iron powder providing targeted, soothing heat for period cramps.",
    iconName: "Flame",
    itemCount: 5,
    bgGradient: "from-amber-100 to-rose/10",
  },
  {
    id: "cat-5",
    slug: "cramp-roll-ons",
    name: "Cramp Roll-ons",
    tagline: "Ayurvedic essential oils for natural pain easing",
    description: "Non-greasy roll-ons formulated with wintergreen, rosemary, and peppermint essential oils for instant topical cooling and muscle relaxation.",
    iconName: "Droplets",
    itemCount: 5,
    bgGradient: "from-teal/10 to-emerald-100",
  },
  {
    id: "cat-6",
    slug: "hot-water-bags",
    name: "Hot Water Bags",
    tagline: "Plush fabric covers and leak-proof thermal design",
    description: "Premium vulcanized rubber hot water bottles with washable quilted fleece covers for gentle, continuous heat therapy during severe cramping.",
    iconName: "HeartHandshake",
    itemCount: 5,
    bgGradient: "from-blush-bg to-rose/15",
  },
  {
    id: "cat-7",
    slug: "relief-kits",
    name: "Relief Kits & Bundles",
    tagline: "Curated period care and cramp rescue packs at bundled savings",
    description: "Thoughtfully assembled cycle emergency packs, first-period starter bundles, and travel-ready cramp defense kits with high bundle savings.",
    iconName: "PackageCheck",
    itemCount: 6,
    bgGradient: "from-rose/15 to-teal/15",
  },
];
