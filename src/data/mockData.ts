import { OrderStatus } from "../utils/constants";

export type { OrderStatus };

export interface ProductVariant {
  id: string;
  name: string;
  priceModifier?: number;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: string;
  categorySlug: string;
  price: number;
  mrp: number;
  variants: ProductVariant[];
  selectedVariant?: string;
  stock: number;
  rating: number;
  reviewCount: number;
  shortDescription: string;
  description: string;
  ingredients: string;
  howToUse: string;
  isOrganic: boolean;
  isBestseller: boolean;
  isFeatured: boolean;
  imageTheme: "pads" | "tampons" | "cups" | "patches" | "rollon" | "waterbag" | "kit";
  kitContents?: string[];
  reviews: Review[];
  active?: boolean;
}

export interface KitBundle {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  bundlePrice: number;
  separatePrice: number;
  savings: number;
  stock: number;
  rating: number;
  reviewCount: number;
  contents: string[];
  shortDescription: string;
  description: string;
  isBestseller?: boolean;
  imageTheme: "kit";
}

export interface Address {
  id: string;
  fullName: string;
  phone: string;
  pincode: string;
  addressLine: string;
  locality: string;
  city: string;
  state: string;
  isDefault: boolean;
  type: "Home" | "Work" | "Other";
}

export interface OrderItem {
  productId: string;
  name: string;
  slug: string;
  price: number;
  mrp: number;
  quantity: number;
  variant?: string;
  imageTheme?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status: "Placed" | "Packed" | "Shipped" | "Out for delivery" | "Delivered" | "Cancelled";
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  discreetPackaging: boolean;
  deliverySpeed: "Standard" | "Express";
  paymentMethod: "UPI" | "Credit/Debit Card" | "Cash on Delivery";
  shippingAddress: Address;
  deliveryInstructions?: string;
  trackingNumber?: string;
  estimatedDelivery: string;
  timeline: {
    status: string;
    timestamp: string;
    note: string;
    completed: boolean;
  }[];
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  readTime: string;
  publishedDate: string;
  category: string;
  content: string[];
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  joinedDate: string;
  totalOrders: number;
  totalSpent: number;
}

// 36 Comprehensive Products across 7 Categories
export const MOCK_PRODUCTS: Product[] = [
  // Category 1: Sanitary Pads (6 products)
  {
    id: "pad-101",
    slug: "gentleflow-organic-cotton-regular-pads",
    name: "GentleFlow Organic Cotton Pads (Regular)",
    category: "Sanitary Pads",
    categorySlug: "sanitary-pads",
    price: 299,
    mrp: 379,
    variants: [
      { id: "reg-10", name: "Pack of 10" },
      { id: "reg-20", name: "Pack of 20 (Value)", priceModifier: 250 },
    ],
    stock: 45,
    rating: 4.8,
    reviewCount: 142,
    shortDescription: "Ultra-thin certified 100% GOTS organic cotton pads designed for moderate flow days with zero synthetic fragrances.",
    description: "GentleFlow pads are crafted from handpicked 100% GOTS certified organic cotton topsheet that breathes naturally against intimate skin. Free from chlorine bleaching, plastics, toxic adhesives, and artificial perfumes to eliminate friction and moisture rashes completely.",
    ingredients: "100% Certified Organic Cotton Topsheet, Perforated Bamboo Pulp Core, Plant-derived Non-toxic Polyethylene Backing, Hypoallergenic Food-grade Adhesive.",
    howToUse: "Unwrap the biodegradable wrapper. Peel off the adhesive paper and firmly press the pad onto underwear gusset. Wrap the wings snugly under the sides. Change every 4 to 6 hours.",
    isOrganic: true,
    isBestseller: true,
    isFeatured: true,
    imageTheme: "pads",
    reviews: [
      { id: "r1", author: "Ananya S.", rating: 5, date: "2026-09-12", title: "Zero chafing at last", comment: "I usually get bad rashes by day two. These organic cotton pads are so gentle and soft.", verified: true },
      { id: "r2", author: "Pooja V.", rating: 5, date: "2026-08-28", title: "Soft and very quiet", comment: "Love that there is no synthetic plastic crinkle sound or synthetic perfume smell.", verified: true },
    ],
  },
  {
    id: "pad-102",
    slug: "gentleflow-organic-heavy-flow-xl-pads",
    name: "GentleFlow Heavy Flow XL Pads",
    category: "Sanitary Pads",
    categorySlug: "sanitary-pads",
    price: 349,
    mrp: 449,
    variants: [
      { id: "xl-12", name: "Pack of 12" },
      { id: "xl-24", name: "Pack of 24 (Value)", priceModifier: 290 },
    ],
    stock: 38,
    rating: 4.9,
    reviewCount: 98,
    shortDescription: "Extra-long 320mm wingspan pads with rapid Japanese SAP absorption core for heavy cycle days and restful sleep.",
    description: "Designed for day 1 and 2 heavy bleeding. The elongated back prevents overflow while the soft organic cotton prevents friction during long commutes or sleep. Naturally breathable to eliminate dampness.",
    ingredients: "GOTS Organic Cotton Topsheet, FSC Certified Wood Pulp, Japanese Super Absorbent Polymer (non-toxic), Cornstarch-based Breathable Backing.",
    howToUse: "Position the wider wing section toward the rear of underwear for maximum coverage during sleep or sitting.",
    isOrganic: true,
    isBestseller: true,
    isFeatured: false,
    imageTheme: "pads",
    reviews: [
      { id: "r3", author: "Divya M.", rating: 5, date: "2026-10-02", title: "Saved my bedsheets", comment: "No leaks overnight! The wings adhere securely without leaving gummy residue.", verified: true },
    ],
  },
  {
    id: "pad-103",
    slug: "purebamboo-overnight-xxl-maxi-pads",
    name: "PureBamboo Overnight XXL Maxi Pads",
    category: "Sanitary Pads",
    categorySlug: "sanitary-pads",
    price: 399,
    mrp: 499,
    variants: [
      { id: "xxl-8", name: "Pack of 8" },
      { id: "xxl-16", name: "Pack of 16", priceModifier: 320 },
    ],
    stock: 24,
    rating: 4.7,
    reviewCount: 64,
    shortDescription: "360mm ultra-wide overnight pad with anti-leak barrier channels made with silky bamboo fiber.",
    description: "PureBamboo overnight maxi pads feature an extended flare tail, deep contour channels, and natural antibacterial bamboo properties that curb odor without any added perfume.",
    ingredients: "Organic Bamboo Viscose Core, Organic Cotton Topsheet, Biodegradable Starch Backsheet.",
    howToUse: "Peel protective backing and position squarely. Fold side wings underneath the panty line.",
    isOrganic: true,
    isBestseller: false,
    isFeatured: false,
    imageTheme: "pads",
    reviews: [],
  },
  {
    id: "pad-104",
    slug: "featherlight-organic-panty-liners",
    name: "FeatherLight Organic Cotton Panty Liners",
    category: "Sanitary Pads",
    categorySlug: "sanitary-pads",
    price: 219,
    mrp: 279,
    variants: [
      { id: "pl-20", name: "Pack of 20" },
      { id: "pl-40", name: "Pack of 40", priceModifier: 180 },
    ],
    stock: 52,
    rating: 4.6,
    reviewCount: 88,
    shortDescription: "Barely-there organic breathable liners for spotting days, discharge, or cup backup.",
    description: "Thin as a whisper yet dependable. FeatherLight panty liners are made with 100% natural organic cotton for daily freshness without trapping heat or humidity.",
    ingredients: "100% GOTS Certified Cotton Topsheet, Airlaid Cellulose Paper, Starch-based Adhesion Layer.",
    howToUse: "Press lightly into the center of your underwear for daily discharge or light flow security.",
    isOrganic: true,
    isBestseller: false,
    isFeatured: false,
    imageTheme: "pads",
    reviews: [],
  },
  {
    id: "pad-105",
    slug: "sensitive-skin-maternity-postpartum-pads",
    name: "GentleCrest Postpartum & Maternity Pads",
    category: "Sanitary Pads",
    categorySlug: "sanitary-pads",
    price: 499,
    mrp: 649,
    variants: [{ id: "mat-10", name: "Pack of 10 Extra Cushioned" }],
    stock: 19,
    rating: 4.9,
    reviewCount: 52,
    shortDescription: "Cushioned extra-soft organic pads engineered for postpartum lochia and sensitive pelvic recovery.",
    description: "Thick, cloud-soft organic cotton cushioning crafted specifically for tender post-birth healing. Free from dyes, chlorine, phthalates, and fragrances.",
    ingredients: "Multi-layered Organic Cotton Wadding, Breathable Bamboo Outer Sheet, Plant Film Barrier.",
    howToUse: "Designed to fit comfortable high-waist maternity or postpartum mesh briefs.",
    isOrganic: true,
    isBestseller: false,
    isFeatured: false,
    imageTheme: "pads",
    reviews: [],
  },
  {
    id: "pad-106",
    slug: "gentleflow-teen-first-period-pads",
    name: "GentleFlow Petite & Teen Care Pads",
    category: "Sanitary Pads",
    categorySlug: "sanitary-pads",
    price: 249,
    mrp: 329,
    variants: [{ id: "teen-12", name: "Pack of 12 Petite" }],
    stock: 31,
    rating: 4.8,
    reviewCount: 41,
    shortDescription: "Specially proportioned narrower cotton pads created for younger teenagers and smaller frames.",
    description: "Comfortable, irritation-free design proportioned for school days and active teenagers with narrower hips and lighter initial cycles.",
    ingredients: "100% Organic Cotton Topsheet, Biodegradable Wood Pulp Core.",
    howToUse: "Center in teen underwear and affix wings underneath.",
    isOrganic: true,
    isBestseller: false,
    isFeatured: false,
    imageTheme: "pads",
    reviews: [],
  },

  // Category 2: Organic Tampons (5 products)
  {
    id: "tamp-201",
    slug: "purecotton-regular-absorbency-tampons",
    name: "PureCotton Organic Tampons (Regular)",
    category: "Organic Tampons",
    categorySlug: "tampons",
    price: 349,
    mrp: 429,
    variants: [
      { id: "reg-16", name: "Pack of 16 (With Applicator)" },
      { id: "reg-16-noapp", name: "Pack of 16 (Digital / Non-applicator)", priceModifier: -60 },
    ],
    stock: 40,
    rating: 4.8,
    reviewCount: 79,
    shortDescription: "GOTS-certified 100% organic cotton tampons with silky smooth biodegradable cardboard applicators.",
    description: "Zero chlorine, zero rayon, and zero synthetic pesticides. PureCotton tampons expand gently in width to adapt smoothly to your internal anatomy for total comfort and confidence.",
    ingredients: "100% GOTS Certified Organic Cotton Core & String, Plant-based Wax Thread, Recycled Paper Applicator.",
    howToUse: "Wash hands. Gently glide the applicator into the vagina pointing slightly toward the lower back, push inner tube, then discard applicator in bin.",
    isOrganic: true,
    isBestseller: true,
    isFeatured: true,
    imageTheme: "tampons",
    reviews: [
      { id: "r4", author: "Kritika R.", rating: 5, date: "2026-09-18", title: "No rayon dryness", comment: "Much softer on insertion than standard commercial tampons. No toxic bleaching smell.", verified: true },
    ],
  },
  {
    id: "tamp-202",
    slug: "purecotton-super-absorbency-tampons",
    name: "PureCotton Organic Tampons (Super)",
    category: "Organic Tampons",
    categorySlug: "tampons",
    price: 379,
    mrp: 469,
    variants: [
      { id: "sup-16", name: "Pack of 16" },
      { id: "sup-32", name: "Pack of 32 (Value)", priceModifier: 320 },
    ],
    stock: 33,
    rating: 4.7,
    reviewCount: 58,
    shortDescription: "Enhanced absorption organic tampons for heavy flow days, sports, and swim workouts.",
    description: "Engineered with dense organic long-staple cotton fibers that prevent bypass leaks during workouts and active days while remaining completely hypoallergenic.",
    ingredients: "100% Organic Cotton Core and Woven Veil, 100% Cotton Removal Cord.",
    howToUse: "Change every 4 to 8 hours. Never leave in for longer than 8 hours.",
    isOrganic: true,
    isBestseller: false,
    isFeatured: false,
    imageTheme: "tampons",
    reviews: [],
  },
  {
    id: "tamp-203",
    slug: "purecotton-super-plus-heavy-tampons",
    name: "PureCotton Organic Tampons (Super Plus)",
    category: "Organic Tampons",
    categorySlug: "tampons",
    price: 399,
    mrp: 499,
    variants: [{ id: "sp-14", name: "Pack of 14" }],
    stock: 22,
    rating: 4.8,
    reviewCount: 37,
    shortDescription: "High-volume organic cotton tampons for your heaviest menstrual days.",
    description: "Provides dependable multi-layer absorption without the use of chemical gels or bleach. Certified hypoallergenic for sensitive mucous membranes.",
    ingredients: "100% GOTS Organic Cotton.",
    howToUse: "Insert using gentle guidance. Discard used tampon in dustbin, do not flush.",
    isOrganic: true,
    isBestseller: false,
    isFeatured: false,
    imageTheme: "tampons",
    reviews: [],
  },
  {
    id: "tamp-204",
    slug: "purecotton-multi-pack-trio-tampons",
    name: "PureCotton Multi-Pack Variety Box",
    category: "Organic Tampons",
    categorySlug: "tampons",
    price: 449,
    mrp: 549,
    variants: [{ id: "multi-20", name: "20 Tampons (6 Light, 8 Regular, 6 Super)" }],
    stock: 28,
    rating: 4.9,
    reviewCount: 84,
    shortDescription: "All-in-one variety box containing Light, Regular, and Super sizes for your changing flow through the week.",
    description: "The ideal pack for an entire cycle. Easily pick the exact absorbency level you need each day of your period without over-drying.",
    ingredients: "100% GOTS Certified Organic Cotton.",
    howToUse: "Match the absorbency to your current daily flow level.",
    isOrganic: true,
    isBestseller: true,
    isFeatured: false,
    imageTheme: "tampons",
    reviews: [],
  },
  {
    id: "tamp-205",
    slug: "purecotton-digital-pocket-tampons",
    name: "PureCotton Eco Pocket Tampons (Digital)",
    category: "Organic Tampons",
    categorySlug: "tampons",
    price: 289,
    mrp: 359,
    variants: [{ id: "dig-18", name: "Pack of 18 (No Applicator)" }],
    stock: 35,
    rating: 4.6,
    reviewCount: 46,
    shortDescription: "Zero-plastic compact tampons designed for simple finger insertion with minimal environmental footprint.",
    description: "Our most sustainable tampon. Tiny enough to slide into a discreet pocket or coin purse, wrapped in quiet compostable parchment.",
    ingredients: "100% GOTS Organic Cotton, Protective Organic Cotton Veil.",
    howToUse: "Use index finger to guide tampon into position following your natural vaginal incline.",
    isOrganic: true,
    isBestseller: false,
    isFeatured: false,
    imageTheme: "tampons",
    reviews: [],
  },

  // Category 3: Menstrual Cups (5 products)
  {
    id: "cup-301",
    slug: "femora-featherform-menstrual-cup-medium",
    name: "Femora FeatherForm Medical Silicone Cup",
    category: "Menstrual Cups",
    categorySlug: "menstrual-cups",
    price: 599,
    mrp: 899,
    variants: [
      { id: "cup-s", name: "Small (Pre-childbirth / Under 25)" },
      { id: "cup-m", name: "Medium (Most Popular)" },
      { id: "cup-l", name: "Large (Post-childbirth / Heavy flow)", priceModifier: 50 },
    ],
    stock: 50,
    rating: 4.9,
    reviewCount: 215,
    shortDescription: "Velvety-soft 100% medical-grade German silicone cup offering 10 hours of leak-proof protection.",
    description: "FeatherForm has a gently rounded rim, flexible grip ring base, and soft angled stem for pain-free insertion and effortless removal. Reusable for up to 10 years, saving money and reducing waste to zero.",
    ingredients: "100% USP Class VI Medical Grade German Silicone. Biocompatible, BPA-free, Latex-free, Phthalate-free.",
    howToUse: "Sterilize in boiling water for 5 minutes prior to first use. Fold into a C-fold or Punch-down fold, gently insert, and ensure it fully pops open to create a gentle seal.",
    isOrganic: false,
    isBestseller: true,
    isFeatured: true,
    imageTheme: "cups",
    reviews: [
      { id: "r5", author: "Shruti P.", rating: 5, date: "2026-10-05", title: "Game changer for travel", comment: "No leaks, can empty it twice a day and forget I am even on my period. The silicone is so velvety.", verified: true },
      { id: "r6", author: "Meera K.", rating: 5, date: "2026-09-20", title: "Very easy to fold", comment: "I was intimidated at first, but the punch-down fold worked on my first attempt.", verified: true },
    ],
  },
  {
    id: "cup-302",
    slug: "femora-cup-sterilizer-travel-steamer",
    name: "Femora Compact Silicone Steam & Wash Pod",
    category: "Menstrual Cups",
    categorySlug: "menstrual-cups",
    price: 349,
    mrp: 499,
    variants: [{ id: "pod-std", name: "Foldable Travel Pod (Rose Pink)" }],
    stock: 42,
    rating: 4.8,
    reviewCount: 93,
    shortDescription: "Collapsible food-grade silicone microwave sterilizer cup and discrete storage case.",
    description: "Discreetly sanitize your cup anywhere. Just add water, place your cup inside, and microwave for 3 minutes or pour freshly boiled kettle water inside with lid closed.",
    ingredients: "100% Food-grade Heat Resistant Silicone (up to 230°C).",
    howToUse: "Fill 2/3 with clean water, submerge cup, leave lid slightly cracked if microwaving for 2–3 minutes.",
    isOrganic: false,
    isBestseller: true,
    isFeatured: false,
    imageTheme: "cups",
    reviews: [],
  },
  {
    id: "cup-303",
    slug: "femora-gentle-foaming-cup-wash",
    name: "PureWash pH-Balanced Menstrual Cup Wash",
    category: "Menstrual Cups",
    categorySlug: "menstrual-cups",
    price: 299,
    mrp: 399,
    variants: [{ id: "wash-100", name: "100 ml Foaming Bottle" }],
    stock: 36,
    rating: 4.7,
    reviewCount: 61,
    shortDescription: "Gentle plant-based cleansing foam formulated specifically for medical silicone integrity and vaginal pH.",
    description: "Rinses completely clean without leaving oils, synthetic perfumes, or film on silicone that could disrupt your natural vaginal microbiome.",
    ingredients: "Purified Aqua, Decyl Glucoside, Aloe Vera Leaf Juice, Lactic Acid, Vegetable Glycerin, Tea Tree Leaf Extract.",
    howToUse: "Pump once onto wet cup, lather gently for 15 seconds, and rinse thoroughly with clean water before reinsertion.",
    isOrganic: true,
    isBestseller: false,
    isFeatured: false,
    imageTheme: "cups",
    reviews: [],
  },
  {
    id: "cup-304",
    slug: "femora-starter-cup-combo-kit",
    name: "Femora Cup Starter Care Kit",
    category: "Menstrual Cups",
    categorySlug: "menstrual-cups",
    price: 849,
    mrp: 1299,
    variants: [{ id: "cup-set", name: "Cup + Wash + Steamer Pod" }],
    stock: 25,
    rating: 4.9,
    reviewCount: 77,
    shortDescription: "Complete beginner starter pack: Medical silicone cup, collapsible steamer container, and pH cleanser.",
    description: "Everything a first-time cup user needs in one discreet box. Includes detailed illustrated beginner troubleshooting guide.",
    ingredients: "Medical Silicone Cup, Silicone Steamer, 100ml PureWash cleanser.",
    howToUse: "Follow the included 3-step beginner insert and sterilizing manual.",
    isOrganic: false,
    isBestseller: true,
    isFeatured: false,
    imageTheme: "cups",
    reviews: [],
  },
  {
    id: "cup-305",
    slug: "femora-petite-soft-flex-teen-cup",
    name: "Femora SoftFlex Petite Cup (Extra Gentle)",
    category: "Menstrual Cups",
    categorySlug: "menstrual-cups",
    price: 549,
    mrp: 799,
    variants: [{ id: "cup-mini", name: "Extra Soft Petite (18 ml capacity)" }],
    stock: 18,
    rating: 4.6,
    reviewCount: 33,
    shortDescription: "Ultra-pliable, smaller diameter cup designed for teenagers, low cervix, or pelvic tension.",
    description: "Features a softer durometer silicone that flexes easily without exerting painful pressure on the bladder or sensitive pelvic floor muscles.",
    ingredients: "100% Medical Grade Platinum Silicone.",
    howToUse: "Pinch base and slide in slowly. Rotate 360 degrees to verify full seal.",
    isOrganic: false,
    isBestseller: false,
    isFeatured: false,
    imageTheme: "cups",
    reviews: [],
  },

  // Category 4: Heating Patches (5 products)
  {
    id: "patch-401",
    slug: "femora-herbal-cramp-comfort-heat-patches",
    name: "HerbalHeat Cramp Comfort Patches",
    category: "Heating Patches",
    categorySlug: "heating-patches",
    price: 349,
    mrp: 449,
    variants: [
      { id: "pat-5", name: "Pack of 5 Patches" },
      { id: "pat-10", name: "Pack of 10 (Value)", priceModifier: 280 },
    ],
    stock: 60,
    rating: 4.9,
    reviewCount: 184,
    shortDescription: "Air-activated self-heating adhesive patches providing 8 continuous hours of therapeutic 40°C warmth.",
    description: "HerbalHeat sticks securely to your underwear (not directly on bare skin) to radiate gentle, constant soothing heat deep into lower abdomen or lumbar muscles. Infused with subtle aroma of dried chamomile and peppermint.",
    ingredients: "Natural Iron Powder, Activated Carbon, Vermiculite, Himalayan Mineral Salt, Chamomile Essential Oil extract.",
    howToUse: "Tear open packet when ready to use. Peel adhesive paper and stick patch on the OUTSIDE of your underwear or inner vest over the cramping area. Do not stick directly on bare skin.",
    isOrganic: true,
    isBestseller: true,
    isFeatured: true,
    imageTheme: "patches",
    reviews: [
      { id: "r7", author: "Sneha G.", rating: 5, date: "2026-10-10", title: "Lifesaver at the office", comment: "No one knows I am wearing it under my trousers. It stayed warm from 9 AM till 5 PM!", verified: true },
      { id: "r8", author: "Tanvi S.", rating: 5, date: "2026-09-04", title: "Warmth is so consistent", comment: "Much easier than carrying a bulky hot water bottle to college.", verified: true },
    ],
  },
  {
    id: "patch-402",
    slug: "femora-back-lumbar-relief-heat-patches",
    name: "LumbarEase Lower Back Period Heat Patches",
    category: "Heating Patches",
    categorySlug: "heating-patches",
    price: 379,
    mrp: 479,
    variants: [{ id: "lb-5", name: "Pack of 5 Wide Patches" }],
    stock: 44,
    rating: 4.8,
    reviewCount: 72,
    shortDescription: "Extra-wide curved patches formulated specifically for radiating lower back and sacrum cycle pain.",
    description: "Spans across the entire lumbar region to loosen tight lower back tendons and reduce muscular spasms during menstrual cycles.",
    ingredients: "Iron Powder, Bamboo Charcoal, Water, Mineral Salt, Ginger Extract.",
    howToUse: "Stick on the inside of pajama back or outer briefs over the lower back.",
    isOrganic: true,
    isBestseller: false,
    isFeatured: false,
    imageTheme: "patches",
    reviews: [],
  },
  {
    id: "patch-403",
    slug: "femora-cooling-menthol-cramp-sheets",
    name: "FrostCalm Menthol Soothing Gel Sheets",
    category: "Heating Patches",
    categorySlug: "heating-patches",
    price: 299,
    mrp: 389,
    variants: [{ id: "gel-4", name: "Pack of 4 Cooling Hydrogel Sheets" }],
    stock: 29,
    rating: 4.6,
    reviewCount: 39,
    shortDescription: "Refreshing water-gel cooling strips for period inflammation, pelvic burning, and hot flashes.",
    description: "For cycles where heat feels too intense. Provides immediate, gentle cooling sensation with natural menthol and aloe gel.",
    ingredients: "Hydrogel Matrix, Pure Menthol, Aloe Barbadensis Leaf Juice, Purified Water.",
    howToUse: "Peel clear film and adhere directly to lower abdomen skin for up to 4 hours of cool calming relief.",
    isOrganic: true,
    isBestseller: false,
    isFeatured: false,
    imageTheme: "patches",
    reviews: [],
  },
  {
    id: "patch-404",
    slug: "femora-overnight-8hr-deep-heat-wrap",
    name: "Overnight Sustained Warmth Wraps",
    category: "Heating Patches",
    categorySlug: "heating-patches",
    price: 429,
    mrp: 529,
    variants: [{ id: "ovn-4", name: "Pack of 4 Wraps" }],
    stock: 31,
    rating: 4.7,
    reviewCount: 51,
    shortDescription: "Long-duration warming wraps with gentle adhesive wings designed for undisturbed overnight sleep.",
    description: "Engineered to deliver moderate, consistent warmth through the entire 8-hour sleeping cycle to prevent nighttime cramping wakeups.",
    ingredients: "Iron powder, Activated Carbon, Eucalyptus and Lavender oil essences.",
    howToUse: "Affix to nightwear waistband 15 minutes before sleep.",
    isOrganic: true,
    isBestseller: false,
    isFeatured: false,
    imageTheme: "patches",
    reviews: [],
  },
  {
    id: "patch-405",
    slug: "femora-pocket-mini-heat-discs",
    name: "PocketHeat On-the-Go Mini Warmers",
    category: "Heating Patches",
    categorySlug: "heating-patches",
    price: 249,
    mrp: 329,
    variants: [{ id: "mini-6", name: "Pack of 6 Mini Discs" }],
    stock: 45,
    rating: 4.7,
    reviewCount: 43,
    shortDescription: "Discreet pocket-sized heat discs for subtle relief during exams, presentations, or travel.",
    description: "Compact circular heating pads that fit undetectable inside high-waist jeans or trouser pockets.",
    ingredients: "Natural Iron Compound, Minerals, Essential Herbal Essence.",
    howToUse: "Expose to air for 60 seconds and adhere to inner garment lining.",
    isOrganic: true,
    isBestseller: false,
    isFeatured: false,
    imageTheme: "patches",
    reviews: [],
  },

  // Category 5: Cramp Roll-ons (5 products)
  {
    id: "roll-501",
    slug: "femora-ayurvedic-herbal-cramp-roll-on",
    name: "Femora Herbal Rescue Cramp Roll-on",
    category: "Cramp Roll-ons",
    categorySlug: "cramp-roll-ons",
    price: 279,
    mrp: 349,
    variants: [
      { id: "ro-10ml", name: "10 ml Roller (Pocket Friendly)" },
      { id: "ro-20ml", name: "20 ml Roller (Value Pack)", priceModifier: 170 },
    ],
    stock: 55,
    rating: 4.9,
    reviewCount: 167,
    shortDescription: "Fast-absorbing, non-staining herbal oil blend with cooling peppermint, wintergreen, and eucalyptus.",
    description: "Femora Herbal Rescue provides fast topical comfort for tight, knotted muscles during periods. The roll-on metal ball delivers a cooling micro-massage, absorbing in under 45 seconds without staining clothes or leaving a greasy film.",
    ingredients: "Mentha Piperita (Peppermint) Oil, Gaultheria Procumbens (Wintergreen) Oil, Eucalyptus Globulus Leaf Oil, Cymbopogon Citratus (Lemongrass) Extract, Caprylic/Capric Triglyceride (Coconut derived).",
    howToUse: "Roll gently 3 to 4 times across lower abdomen, thighs, or lower back. Massage lightly with fingertips in a clockwise circular motion.",
    isOrganic: true,
    isBestseller: true,
    isFeatured: true,
    imageTheme: "rollon",
    reviews: [
      { id: "r9", author: "Aishwarya N.", rating: 5, date: "2026-10-14", title: "Smells divine and works fast", comment: "The cooling sensation kicks in right away. Does not stain my white pants at all.", verified: true },
      { id: "r10", author: "Rhea D.", rating: 5, date: "2026-08-19", title: "Love the metal roller", comment: "The ball is cool on the skin. Very discreet to keep in my college backpack.", verified: true },
    ],
  },
  {
    id: "roll-502",
    slug: "femora-calm-lavender-bedtime-roll-on",
    name: "Femora Bedtime Lavender Calming Roll-on",
    category: "Cramp Roll-ons",
    categorySlug: "cramp-roll-ons",
    price: 299,
    mrp: 379,
    variants: [{ id: "ro-lav-15", name: "15 ml Amber Glass Roller" }],
    stock: 37,
    rating: 4.8,
    reviewCount: 63,
    shortDescription: "French lavender, Roman chamomile, and clary sage blend designed to soothe mood and menstrual tension.",
    description: "Promotes deep, restful sleep during cycle days while soothing pelvic spasms. Apply to temples, wrists, and abdomen before lights out.",
    ingredients: "Pure French Lavender Oil, Roman Chamomile Oil, Clary Sage Oil, Golden Jojoba Carrier Base.",
    howToUse: "Apply onto wrists, chest, and lower tummy. Inhale slowly for 3 cycles.",
    isOrganic: true,
    isBestseller: false,
    isFeatured: false,
    imageTheme: "rollon",
    reviews: [],
  },
  {
    id: "roll-503",
    slug: "femora-warming-ginger-clove-roll-on",
    name: "Femora WarmTherapy Ginger-Clove Roll-on",
    category: "Cramp Roll-ons",
    categorySlug: "cramp-roll-ons",
    price: 289,
    mrp: 369,
    variants: [{ id: "ro-wrm-15", name: "15 ml Roller" }],
    stock: 26,
    rating: 4.7,
    reviewCount: 48,
    shortDescription: "A gentle warming formulation with black pepper, clove, and ginger for dull, deep throbbing aches.",
    description: "Encourages healthy local blood circulation and relieves sluggish stagnation in the pelvic area with comforting spice botanicals.",
    ingredients: "Zingiber Officinale (Ginger) Root Oil, Syzygium Aromaticum (Clove) Oil, Sesame Seed Oil, Vitamin E.",
    howToUse: "Apply over lower abdomen with firm, rhythmic strokes.",
    isOrganic: true,
    isBestseller: false,
    isFeatured: false,
    imageTheme: "rollon",
    reviews: [],
  },
  {
    id: "roll-504",
    slug: "femora-migraine-temple-cycle-roll-on",
    name: "Femora Hormonal Headache & Temple Roll-on",
    category: "Cramp Roll-ons",
    categorySlug: "cramp-roll-ons",
    price: 259,
    mrp: 329,
    variants: [{ id: "ro-hd-10", name: "10 ml Metal Roller" }],
    stock: 34,
    rating: 4.7,
    reviewCount: 52,
    shortDescription: "Cooling botanical roll-on formulated for pre-menstrual tension, migraines, and neck stiffness.",
    description: "Targeted soothing for the pounding brow and neck tension that frequently accompanies estrogen drops during period onset.",
    ingredients: "Camphor, Menthol, Rosemary Leaf Oil, Frankincense Oil in Fractionated Coconut Oil.",
    howToUse: "Glide across temples, hairline, and nape of neck. Keep away from eyes.",
    isOrganic: true,
    isBestseller: false,
    isFeatured: false,
    imageTheme: "rollon",
    reviews: [],
  },
  {
    id: "roll-505",
    slug: "femora-duo-cramp-roll-on-pack",
    name: "Femora Day & Night Roll-on Duo",
    category: "Cramp Roll-ons",
    categorySlug: "cramp-roll-ons",
    price: 499,
    mrp: 649,
    variants: [{ id: "ro-duo", name: "Set of 2 (Rescue Cool + Bedtime Lavender)" }],
    stock: 28,
    rating: 4.9,
    reviewCount: 89,
    shortDescription: "Twin set: Cooling peppermint for daytime focus and calming lavender for night-time comfort.",
    description: "Keep one in your purse for work or university and one on your nightstand for uninterrupted sleep.",
    ingredients: "Dual 100% pure botanical essential oil formulations.",
    howToUse: "Use Cool Rescue during active hours; switch to Bedtime Lavender 30 minutes before sleep.",
    isOrganic: true,
    isBestseller: true,
    isFeatured: false,
    imageTheme: "rollon",
    reviews: [],
  },

  // Category 6: Hot Water Bags (5 products)
  {
    id: "bag-601",
    slug: "femora-plush-fleece-hot-water-bottle-blush",
    name: "Femora Plush Velvet Hot Water Bottle (Rose)",
    category: "Hot Water Bags",
    categorySlug: "hot-water-bags",
    price: 649,
    mrp: 899,
    variants: [
      { id: "hwb-rose", name: "Blush Rose Velvet" },
      { id: "hwb-teal", name: "Sage Teal Velvet", priceModifier: 0 },
    ],
    stock: 35,
    rating: 4.9,
    reviewCount: 112,
    shortDescription: "1.8L natural rubber leak-proof hot water bottle with an ultra-soft, machine-washable quilted fleece cover.",
    description: "Nothing comforts cramps quite like warm, tactile weight. Femora's hot water bag is made with high-density vulcanized rubber that stays soothingly warm for up to 6 hours. The plush velvet cover protects sensitive skin from accidental scalding.",
    ingredients: "100% Pure Natural High-density Rubber Inner, Anti-leak Threaded Brass Stopper, Ultra-soft Microfiber Velvet Outer Case.",
    howToUse: "Fill 2/3 full with hot water (recommended temperature 70°C–80°C, do not use 100°C boiling water). Expel remaining air slowly before tightening the stopper securely. Slip into velvet cover.",
    isOrganic: false,
    isBestseller: true,
    isFeatured: true,
    imageTheme: "waterbag",
    reviews: [
      { id: "r11", author: "Priyanka T.", rating: 5, date: "2026-09-29", title: "So snuggly and zero smell", comment: "Traditional rubber bags stink of sulfur. This one has no foul rubber smell and the cover is super luxurious.", verified: true },
    ],
  },
  {
    id: "bag-602",
    slug: "femora-wearable-belt-hot-water-bag",
    name: "Femora Hands-Free Wearable Heating Belt",
    category: "Hot Water Bags",
    categorySlug: "hot-water-bags",
    price: 899,
    mrp: 1199,
    variants: [{ id: "belt-std", name: "Adjustable Waistband (24–42 inches)" }],
    stock: 25,
    rating: 4.8,
    reviewCount: 94,
    shortDescription: "Ergonomic waist strap with insulated thermal pocket holding a hot water bag hands-free while you work.",
    description: "Move freely while soothing period pains. Features a wide, supportive hook-and-loop waistband that keeps warm weight pressed comfortably against your lower tummy or back.",
    ingredients: "High-grade Rubber Bottle, Neoprene and Coral Fleece Belt Strap.",
    howToUse: "Fill bottle 2/3 with warm water, insert into the belt's front insulated sleeve, and wrap securely around your waist.",
    isOrganic: false,
    isBestseller: true,
    isFeatured: false,
    imageTheme: "waterbag",
    reviews: [],
  },
  {
    id: "bag-603",
    slug: "femora-compact-travel-mini-hot-bottle",
    name: "Femora PocketMini 800ml Hot Water Bag",
    category: "Hot Water Bags",
    categorySlug: "hot-water-bags",
    price: 449,
    mrp: 599,
    variants: [{ id: "hwb-mini", name: "800 ml Compact" }],
    stock: 40,
    rating: 4.7,
    reviewCount: 46,
    shortDescription: "Lightweight, space-saving mini thermal bottle ideal for hostel rooms, travel bags, and car rides.",
    description: "Compact yet effective. Weighs less when full, making it gentle on tender abdomens without feeling overly heavy.",
    ingredients: "Natural Vulcanized Rubber, Ribbed Heat Dissipating Surface.",
    howToUse: "Fill with warm water from a kettle or geyser, screw plug tightly, and rest on abdomen.",
    isOrganic: false,
    isBestseller: false,
    isFeatured: false,
    imageTheme: "waterbag",
    reviews: [],
  },
  {
    id: "bag-604",
    slug: "femora-knitted-sweater-cover-bag",
    name: "Femora CozyKnit Herbal Hot Water Bag",
    category: "Hot Water Bags",
    categorySlug: "hot-water-bags",
    price: 699,
    mrp: 949,
    variants: [{ id: "hwb-knit", name: "Oatmeal Cream Knit" }],
    stock: 22,
    rating: 4.8,
    reviewCount: 57,
    shortDescription: "Chunky cable-knit cotton cover with an herbal infusion pouch for aromatic cramp relaxation.",
    description: "Classic cable knit design in gentle oat cream. Includes an internal pocket for an included lavender and flaxseed sachet that warms with the bottle.",
    ingredients: "Cotton Knit Outer, Natural Rubber Inner, Dried French Lavender Sachet.",
    howToUse: "Insert warm bottle into knit sleeve. Enjoy subtle warmth and calming lavender scent.",
    isOrganic: true,
    isBestseller: false,
    isFeatured: false,
    imageTheme: "waterbag",
    reviews: [],
  },
  {
    id: "bag-605",
    slug: "femora-dual-sided-cooling-heat-gel-bag",
    name: "Femora Dual-Action Hot & Cold Gel Pack",
    category: "Hot Water Bags",
    categorySlug: "hot-water-bags",
    price: 499,
    mrp: 699,
    variants: [{ id: "gel-dual", name: "Large Reusable Gel Pack with Sleeve" }],
    stock: 33,
    rating: 4.6,
    reviewCount: 38,
    shortDescription: "Microwaveable for deep heat or freezable for cooling inflammation relief with soft plush backing.",
    description: "Flexible non-toxic gel remains pliable even when frozen or heated. Perfect for versatile relief across different phases of your cycle.",
    ingredients: "Non-toxic Carboxymethylcellulose Sodium Gel, Medical Grade TPU pouch, Velour Cover.",
    howToUse: "Microwave in 20-second bursts for heat therapy, or chill in freezer for 1 hour for cold therapy.",
    isOrganic: false,
    isBestseller: false,
    isFeatured: false,
    imageTheme: "waterbag",
    reviews: [],
  },

  // Category 7: Relief Kits & Bundles (6 products)
  {
    id: "kit-701",
    slug: "femora-complete-cycle-rescue-bundle",
    name: "The Complete Cycle Rescue Box",
    category: "Relief Kits & Bundles",
    categorySlug: "relief-kits",
    price: 1199,
    mrp: 1699,
    variants: [{ id: "kit-rescue", name: "Curated Bundle (Save ₹500)" }],
    stock: 30,
    rating: 4.9,
    reviewCount: 176,
    shortDescription: "Our signature cramp and period emergency kit: Regular pads, Herbal Cramp Roll-on, and 5 Heat Patches.",
    description: "The ultimate cycle defense kit delivered in our 100% discreet unmarked box. Packed with organic sanitary essentials and fast-acting herbal cramp relievers to help you breeze through cycle days with zero stress.",
    ingredients: "Certified Organic Cotton Pads, Herbal Essential Oil Blend, Therapeutic Heat Patches.",
    howToUse: "Keep ready in your cupboard before day 1 arrives.",
    isOrganic: true,
    isBestseller: true,
    isFeatured: true,
    imageTheme: "kit",
    kitContents: [
      "1x GentleFlow Organic Regular Cotton Pads (Pack of 10)",
      "1x Femora Herbal Rescue Cramp Roll-on (10 ml)",
      "1x HerbalHeat Cramp Comfort Heat Patches (Pack of 5)",
      "1x Discreet Travel Velvet Storage Pouch",
    ],
    reviews: [
      { id: "r12", author: "Neha G.", rating: 5, date: "2026-10-12", title: "Best gift for myself", comment: "Bought this ahead of my exams. The heat patches and roll-on together are pure magic for pain.", verified: true },
    ],
  },
  {
    id: "kit-702",
    slug: "femora-night-comfort-sleep-bundle",
    name: "Sweet Dreams Overnight Relief Kit",
    category: "Relief Kits & Bundles",
    categorySlug: "relief-kits",
    price: 1299,
    mrp: 1799,
    variants: [{ id: "kit-sleep", name: "Overnight Care Set" }],
    stock: 22,
    rating: 4.8,
    reviewCount: 88,
    shortDescription: "PureBamboo XXL overnight pads, Plush Velvet Hot Water Bottle, and Lavender Bedtime Roll-on.",
    description: "Designed specifically for peaceful, pain-free sleep. Wake up refreshed without middle-of-the-night cramping or bedsheet worries.",
    ingredients: "Organic Bamboo Pads, Pure Rubber Bottle with Velvet Cover, French Lavender Botanical Oil.",
    howToUse: "Fill the bottle, roll on lavender, and rest comfortably on pure bamboo cotton.",
    isOrganic: true,
    isBestseller: true,
    isFeatured: false,
    imageTheme: "kit",
    kitContents: [
      "1x PureBamboo Overnight XXL Maxi Pads (Pack of 8)",
      "1x Femora Plush Velvet Hot Water Bottle (1.8L)",
      "1x Femora Bedtime Lavender Calming Roll-on (15 ml)",
    ],
    reviews: [],
  },
  {
    id: "kit-703",
    slug: "femora-first-period-starter-treasure-box",
    name: "First Period Gentle Starter Kit",
    category: "Relief Kits & Bundles",
    categorySlug: "relief-kits",
    price: 999,
    mrp: 1399,
    variants: [{ id: "kit-first", name: "Teen Starter Treasure Box" }],
    stock: 25,
    rating: 5.0,
    reviewCount: 92,
    shortDescription: "A loving, shame-free introduction to periods with petite pads, soothing roll-on, and an illustrated guide.",
    description: "Curated with warmth and reassurance for young girls beginning their period journey. Packaged in a beautiful neutral box with no embarrassing text outside.",
    ingredients: "Gentle organic cotton, plant-based roll-on, soft carry pouch.",
    howToUse: "Includes an uplifting educational pocket booklet answering every question simply and factually.",
    isOrganic: true,
    isBestseller: false,
    isFeatured: true,
    imageTheme: "kit",
    kitContents: [
      "1x GentleFlow Petite & Teen Care Pads (Pack of 12)",
      "1x FeatherLight Organic Panty Liners (Pack of 20)",
      "1x Femora Herbal Rescue Cramp Roll-on (10 ml)",
      "1x The Period Handbook (No-shame educational illustrated guide)",
      "1x Water-resistant Pink Canvas Pencil-case Pouch",
    ],
    reviews: [
      { id: "r13", author: "Shalini S.", rating: 5, date: "2026-09-15", title: "Bought for my 13-year-old daughter", comment: "So gentle and informative. She felt calm and prepared instead of scared.", verified: true },
    ],
  },
  {
    id: "kit-704",
    slug: "femora-travel-commute-cramp-defense-kit",
    name: "On-The-Move Travel Defense Pouch",
    category: "Relief Kits & Bundles",
    categorySlug: "relief-kits",
    price: 799,
    mrp: 1099,
    variants: [{ id: "kit-travel", name: "Travel Defense Pack" }],
    stock: 35,
    rating: 4.8,
    reviewCount: 65,
    shortDescription: "Ultra-compact travel kit: 5 Heat Patches, Mini Pocket Roll-on, and Biodegradable disposal bags.",
    description: "Slides into any handbag, work tote, or carry-on. Instant cramp and hygiene relief during flights, train journeys, and long days out.",
    ingredients: "Air-activated warming patches, 100% essential botanical oil, oxo-biodegradable cornstarch bags.",
    howToUse: "Slip discreetly into your everyday bag for on-demand relief anytime anywhere.",
    isOrganic: true,
    isBestseller: false,
    isFeatured: false,
    imageTheme: "kit",
    kitContents: [
      "1x HerbalHeat Cramp Comfort Patches (Pack of 5)",
      "1x Femora Herbal Rescue Cramp Roll-on (10 ml)",
      "10x Discreet Odor-lock Biodegradable Disposal Pouches",
      "1x Compact Matte Cosmetic Pouch",
    ],
    reviews: [],
  },
  {
    id: "kit-705",
    slug: "femora-zero-waste-cup-duo-kit",
    name: "Zero-Waste Sustainable Switch Kit",
    category: "Relief Kits & Bundles",
    categorySlug: "relief-kits",
    price: 999,
    mrp: 1499,
    variants: [{ id: "kit-eco", name: "Eco Cup Transition Set" }],
    stock: 20,
    rating: 4.9,
    reviewCount: 54,
    shortDescription: "Medical-grade FeatherForm Cup, Foldable Travel Steamer Pod, and 100ml PureWash foam.",
    description: "Everything you need to switch permanently from single-use plastics to sustainable menstrual care with complete confidence.",
    ingredients: "German Medical Silicone, Food-grade Silicone Steamer, Natural Cleanser.",
    howToUse: "Follow the included sterilization and insertion guide.",
    isOrganic: false,
    isBestseller: false,
    isFeatured: false,
    imageTheme: "kit",
    kitContents: [
      "1x Femora FeatherForm Medical Silicone Cup (Choice of size)",
      "1x Foldable Travel Steam & Sterilizing Pod",
      "1x PureWash pH-Balanced Menstrual Cup Cleanser (100 ml)",
      "1x Cotton Breathable Storage Pouch",
    ],
    reviews: [],
  },
  {
    id: "kit-706",
    slug: "femora-tampon-and-heat-active-trio",
    name: "Active Comfort Tampon & Heat Trio",
    category: "Relief Kits & Bundles",
    categorySlug: "relief-kits",
    price: 899,
    mrp: 1249,
    variants: [{ id: "kit-act", name: "Active Trio Pack" }],
    stock: 28,
    rating: 4.7,
    reviewCount: 49,
    shortDescription: "PureCotton Regular Tampons, Variety Box, and HerbalHeat Patches for unhindered workouts.",
    description: "Don't let cramps or bleeding hold back your run, swim, or dance classes. Freedom of movement combined with constant warming muscle relief.",
    ingredients: "GOTS Organic Cotton Tampons, Therapeutic Air-activated Patches.",
    howToUse: "Insert tampon for active movement; apply patch onto workout tights or briefs.",
    isOrganic: true,
    isBestseller: false,
    isFeatured: false,
    imageTheme: "kit",
    kitContents: [
      "1x PureCotton Organic Tampons (Regular, Pack of 16)",
      "1x HerbalHeat Cramp Comfort Heat Patches (Pack of 5)",
      "1x FeatherLight Organic Panty Liners (Pack of 20)",
    ],
    reviews: [],
  },
];

// 6 Relief Kits for the dedicated /kits page
export const MOCK_KITS: KitBundle[] = [
  {
    id: "kit-701",
    slug: "femora-complete-cycle-rescue-bundle",
    name: "The Complete Cycle Rescue Box",
    tagline: "Pads + Cramp Roll-on + Heat Patches in one box",
    bundlePrice: 1199,
    separatePrice: 1699,
    savings: 500,
    stock: 30,
    rating: 4.9,
    reviewCount: 176,
    contents: [
      "GentleFlow Organic Regular Cotton Pads (Pack of 10)",
      "Femora Herbal Rescue Cramp Roll-on (10 ml)",
      "HerbalHeat Cramp Comfort Heat Patches (Pack of 5)",
      "Discreet Travel Velvet Storage Pouch",
    ],
    shortDescription: "Our best-selling cycle care bundle offering comprehensive relief from day one through the entire cycle.",
    description: "Saves ₹500 compared to buying individually. Shipped in our 100% discreet unmarked box with plain packaging guarantee.",
    isBestseller: true,
    imageTheme: "kit",
  },
  {
    id: "kit-702",
    slug: "femora-night-comfort-sleep-bundle",
    name: "Sweet Dreams Overnight Relief Kit",
    tagline: "Overnight pads + Hot water bottle + Lavender oil",
    bundlePrice: 1299,
    separatePrice: 1799,
    savings: 500,
    stock: 22,
    rating: 4.8,
    reviewCount: 88,
    contents: [
      "PureBamboo Overnight XXL Maxi Pads (Pack of 8)",
      "Femora Plush Velvet Hot Water Bottle (1.8L)",
      "Femora Bedtime Lavender Calming Roll-on (15 ml)",
    ],
    shortDescription: "Engineered for deep, restful sleep free from cramps and midnight sheet stains.",
    description: "Combines heavyweight thermal comfort with calming aroma therapy and maximum nocturnal pad coverage.",
    isBestseller: true,
    imageTheme: "kit",
  },
  {
    id: "kit-703",
    slug: "femora-first-period-starter-treasure-box",
    name: "First Period Gentle Starter Kit",
    tagline: "Gentle teen pads, liners, roll-on, and guide",
    bundlePrice: 999,
    separatePrice: 1399,
    savings: 400,
    stock: 25,
    rating: 5.0,
    reviewCount: 92,
    contents: [
      "GentleFlow Petite & Teen Care Pads (Pack of 12)",
      "FeatherLight Organic Panty Liners (Pack of 20)",
      "Femora Herbal Rescue Cramp Roll-on (10 ml)",
      "The Period Handbook (No-shame educational illustrated guide)",
      "Water-resistant Pink Canvas Pencil-case Pouch",
    ],
    shortDescription: "Thoughtful, gentle gift for girls beginning their period journey with calm and confidence.",
    description: "Replaces myths and fear with gentle guidance, soft organic cotton, and natural cramp relief.",
    imageTheme: "kit",
  },
  {
    id: "kit-704",
    slug: "femora-travel-commute-cramp-defense-kit",
    name: "On-The-Move Travel Defense Pouch",
    tagline: "Heat patches, pocket roller, and disposal pouches",
    bundlePrice: 799,
    separatePrice: 1099,
    savings: 300,
    stock: 35,
    rating: 4.8,
    reviewCount: 65,
    contents: [
      "HerbalHeat Cramp Comfort Patches (Pack of 5)",
      "Femora Herbal Rescue Cramp Roll-on (10 ml)",
      "10x Discreet Odor-lock Biodegradable Disposal Pouches",
      "Compact Matte Cosmetic Pouch",
    ],
    shortDescription: "Pocket-sized emergency defense for busy work days, flights, and long commutes.",
    description: "Keep one permanently in your bag. Zero bulk, maximum peace of mind.",
    imageTheme: "kit",
  },
  {
    id: "kit-705",
    slug: "femora-zero-waste-cup-duo-kit",
    name: "Zero-Waste Sustainable Switch Kit",
    tagline: "Medical-grade cup, steamer pod, and pH cleanser",
    bundlePrice: 999,
    separatePrice: 1499,
    savings: 500,
    stock: 20,
    rating: 4.9,
    reviewCount: 54,
    contents: [
      "Femora FeatherForm Medical Silicone Cup (Choice of size)",
      "Foldable Travel Steam & Sterilizing Pod",
      "PureWash pH-Balanced Menstrual Cup Cleanser (100 ml)",
      "Cotton Breathable Storage Pouch",
    ],
    shortDescription: "Complete kit for switching seamlessly to menstrual cups for 10 years of leak-free protection.",
    description: "Includes silicone steamer pod for discreet boiling without kitchen pots.",
    imageTheme: "kit",
  },
  {
    id: "kit-706",
    slug: "femora-tampon-and-heat-active-trio",
    name: "Active Comfort Tampon & Heat Trio",
    tagline: "Organic tampons, panty liners, and heat patches",
    bundlePrice: 899,
    separatePrice: 1249,
    savings: 350,
    stock: 28,
    rating: 4.7,
    reviewCount: 49,
    contents: [
      "PureCotton Organic Tampons (Regular, Pack of 16)",
      "HerbalHeat Cramp Comfort Heat Patches (Pack of 5)",
      "FeatherLight Organic Panty Liners (Pack of 20)",
    ],
    shortDescription: "Formulated for active fitness, swimming, and workout days during your cycle.",
    description: "No shifting, no chafing, and continuous soothing heat across tight pelvic muscles.",
    imageTheme: "kit",
  },
];

// FAQs grouped by 4 sections as specified:
// Ordering, Delivery & Privacy, Returns, Products
export interface FAQItem {
  id: string;
  category: "Ordering" | "Delivery & Privacy" | "Returns" | "Products";
  question: string;
  answer: string;
}

export const MOCK_FAQS: FAQItem[] = [
  {
    id: "faq-1",
    category: "Delivery & Privacy",
    question: "What does 'Discreet Delivery' mean? What is printed on the box?",
    answer: "Every order from Femora is shipped in a sturdy, unbranded, plain brown or neutral carton. There are zero product names, brand logos, period care mentions, or item descriptions anywhere on the outside shipping label or courier slip. The sender name is listed as a neutral fulfillment entity (e.g. 'FM Logistics'). No courier delivery person, family member, roommate, or neighbor can guess what is inside.",
  },
  {
    id: "faq-2",
    category: "Delivery & Privacy",
    question: "How fast do you dispatch orders?",
    answer: "Orders placed before 2:00 PM Monday through Saturday are dispatched the very same day. Standard delivery takes 2 to 4 business days across major Indian metros, and 3 to 6 days for Tier-2 and Tier-3 cities. We also offer Express Delivery in select metro pincodes for next-day arrival.",
  },
  {
    id: "faq-3",
    category: "Products",
    question: "Are Femora pads really 100% organic cotton and rash-free?",
    answer: "Yes. Our pad topsheets use 100% GOTS-certified organic cotton without synthetic chlorine bleaching, fragrance additives, artificial dyes, or plastic covers. Most period rashes are caused by synthetic plastic friction and moisture entrapment; our breathable plant fibers eliminate these irritants completely.",
  },
  {
    id: "faq-4",
    category: "Products",
    question: "How long do the HerbalHeat patches stay warm?",
    answer: "Our heating patches provide continuous, soothing 40°C–45°C therapeutic heat for up to 8 hours once unwrapped. They are air-activated within 5 minutes of opening and adhere directly to your underwear or inner slip.",
  },
  {
    id: "faq-5",
    category: "Ordering",
    question: "What payment methods are supported?",
    answer: "We support instant UPI (Google Pay, PhonePe, Paytm, BHIM), all major Credit/Debit cards (Visa, Mastercard, RuPay), Net Banking, and Cash on Delivery (COD) across eligible Indian pincodes.",
  },
  {
    id: "faq-6",
    category: "Ordering",
    question: "What is the threshold for free shipping?",
    answer: "All orders above ₹499 qualify for Free Standard Delivery anywhere in India. For orders below ₹499, a flat nominal delivery charge of ₹49 applies.",
  },
  {
    id: "faq-7",
    category: "Returns",
    question: "Can I return hygiene products after opening the box?",
    answer: "For health, sanitary, and hygiene compliance reasons, we cannot accept returns or exchanges for opened intimate wellness products (sanitary pads, cups, tampons, roll-ons). However, if your package arrived damaged, defective, or incorrect, reach out to our team within 48 hours for an instant replacement or full refund.",
  },
  {
    id: "faq-8",
    category: "Returns",
    question: "Can I cancel an order once placed?",
    answer: "You can cancel any order directly from your 'My Orders' account page as long as the status is 'Placed' or 'Packed'. Once dispatched with the courier, cancellation is not possible, but you may refuse delivery upon arrival.",
  },
];

// 4 Articles on Period Health topics for /learn
export const MOCK_ARTICLES: Article[] = [
  {
    id: "art-1",
    slug: "why-organic-cotton-prevents-period-rashes",
    title: "Understanding Period Rashes: Why Organic Cotton Makes a Difference",
    excerpt: "Learn how conventional plastic topsheets trap heat and friction, and how breathable organic fibers soothe sensitive skin.",
    readTime: "4 min read",
    publishedDate: "October 14, 2026",
    category: "Skin Health",
    content: [
      "For decades, commercial menstrual pads have relied on petroleum-derived synthetic plastic topsheets and chlorine-bleached pulp. While they absorb liquid, they create an occlusive, non-breathable microclimate around your intimate vulvar skin.",
      "When sweat, moisture, and synthetic materials rub against skin for 5 to 7 days every month, micro-tears and contact dermatitis frequently follow. This results in the itching, stinging, and redness many women mistake for an inevitable part of menstruating.",
      "Certified 100% organic cotton fibers are naturally porous and hypoallergenic. They permit natural airflow while maintaining high absorbent integrity, keeping the skin barrier dry and calm without synthetic perfume masks.",
    ],
  },
  {
    id: "art-2",
    slug: "science-of-heat-therapy-for-menstrual-cramps",
    title: "The Physiology of Cramps: How Constant Heat Relaxes Pelvic Muscles",
    excerpt: "Why localized 40°C warmth is clinically shown to match the relief of over-the-counter painkillers without side effects.",
    readTime: "5 min read",
    publishedDate: "October 20, 2026",
    category: "Pain Relief",
    content: [
      "Menstrual cramps (dysmenorrhea) are triggered when the uterine lining releases prostaglandins—chemical messengers that signal the muscular walls of the uterus to contract and shed.",
      "High concentrations of prostaglandins cause blood vessels to constrict, momentarily depriving uterine muscle tissue of oxygen (local ischemia), which triggers acute pain signals to the brain.",
      "Applying sustained 40°C topical heat dilates pelvic blood vessels, restores oxygenated blood flow, and deactivates local pain receptors. Portable air-activated heat patches make this hospital-grade thermal relief accessible during busy work or university days.",
    ],
  },
  {
    id: "art-3",
    slug: "menstrual-cup-guide-finding-your-fold-and-fit",
    title: "First Time with a Menstrual Cup: A Gentle Step-by-Step Guide",
    excerpt: "Demystifying insertion, suction seals, and hassle-free removal with medical-grade silicone.",
    readTime: "6 min read",
    publishedDate: "October 22, 2026",
    category: "Sustainable Living",
    content: [
      "Making the switch to a menstrual cup can feel daunting at first, but with a little anatomical awareness and patience, it quickly becomes second nature.",
      "The most common beginner obstacle is pelvic floor tension. Relaxing your jaw and breathing out drops pelvic tension naturally. Experiment with the 'Punch-Down' fold, which creates the smallest insertion tip possible.",
      "Unlike tampons that absorb your natural vaginal moisture and lubrication, medical silicone simply collects fluid without altering your natural pH. It can safely remain in place for up to 8 to 10 hours.",
    ],
  },
  {
    id: "art-4",
    slug: "ayurvedic-botanicals-for-hormonal-balance",
    title: "Herbal Botanicals: Peppermint, Wintergreen & Lavender in Cycle Care",
    excerpt: "How traditional plant essential oils provide transdermal relief and mental clarity during difficult cycle days.",
    readTime: "4 min read",
    publishedDate: "October 25, 2026",
    category: "Herbal Wellness",
    content: [
      "Essential oils are not just pleasant scents—botanicals like wintergreen contain natural methyl salicylate, a compound closely related to aspirin that delivers targeted transdermal soothing.",
      "When blended with natural menthol from peppermint, it provides a cooling counter-irritant effect that interrupts pain signaling along sensory nerves, soothing muscular tension within minutes.",
      "Aromatically, inhaling clary sage and true lavender decreases cortisol levels, helping ease the irritability and restlessness common in the luteal and early menstrual phases.",
    ],
  },
];

export const MOCK_ADMIN_STATS = {
  todayOrders: 0,
  todayRevenue: 0,
  pendingOrders: 0,
  lowStockItems: 3,
  salesTrend7Days: [],
};

