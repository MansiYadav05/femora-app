import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, Leaf,  Clock,  ArrowRight, ChevronRight,
} from "lucide-react";
import { CATEGORIES } from "../../utils/constants";
import { productService } from "../../services/productService";
import { KitBundle, Product } from "../../data/mockData";
import { ProductCard } from "../../components/product/ProductCard";
import { KitCard } from "../../components/product/KitCard";
import { LotusDivider } from "../../components/common/LotusDivider";
import { Accordion } from "../../components/ui/Accordion";
import { Button } from "../../components/ui/Button";
import { formatPrice } from "../../utils/formatPrice";
import { THEME_IMAGES } from "../../components/common/ProductArtwork";
import kitsHeroImg from "../../assets/images/bundle_kit.png";

const CATEGORY_THEME_MAP: Record<string, string> = {
  "sanitary-pads": "pads",
  "tampons": "tampons",
  "menstrual-cups": "cups",
  "heating-patches": "patches",
  "cramp-roll-ons": "rollon",
  "hot-water-bags": "waterbag",
  "relief-kits": "kit",
};

export const Home: React.FC = () => {
  const [bestsellers, setBestsellers] = useState<Product[]>([]);
  const [kits, setKits] = useState<KitBundle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Femora | Discreet Organic Period Care & Cramp Relief India";
    window.scrollTo(0, 0);

    Promise.all([
      productService.getProducts({ sort: "bestseller", limit: 4 }),
      productService.getKits(),
    ]).then(([prodRes, kitRes]) => {
      if (prodRes.success && prodRes.data) {
        setBestsellers(prodRes.data.items);
      }
      if (kitRes.success && kitRes.data) {
        setKits(kitRes.data.slice(0, 3));
      }
      setLoading(false);
    });
  }, []);

  const homeFaqs = [
    {
      id: "f1",
      title: "How discreet is the shipping? Will my family or roommates know what is inside?",
      content:
        "Every Femora order is dispatched in an unmarked, plain brown cardboard parcel with a generic logistics label. There are zero mentions of sanitary pads, cups, period care, or our brand name on the outside of the box.",
    },
    {
      id: "f2",
      title: "Why are organic cotton pads better than commercial plastic pads?",
      content:
        "Conventional commercial pads use synthetic plastic topsheets and chemical bleaching that trap sweat and moisture, causing itching and rashes. Our 100% GOTS organic cotton allows your intimate skin to breathe naturally, eliminating friction rashes.",
    },
    {
      id: "f3",
      title: "How do the HerbalHeat cramp patches work?",
      content:
        "HerbalHeat patches contain natural iron minerals and activated charcoal that warm up to 40°C upon contact with air. Simply adhere the patch to your underwear for 8 hours of soothing, targeted muscle warmth.",
    },
  ];

  return (
    <div className="min-h-screen bg-cream">
      {/* 1. HERO SECTION - Kits & Bundles Showcase */}
      <section className="relative overflow-hidden bg-cream border-b border-maroon/10">
        <div className="relative w-full min-h-[460px] sm:min-h-[520px] lg:min-h-[580px] flex items-center">
          {/* Full section Kits & Bundles Image */}
          <img
            src={kitsHeroImg}
            alt="Femora Curated Period Care Relief Kits & Bundles"
            className="absolute inset-0 w-full h-full object-cover object-center lg:object-[center_35%]"
          />
          {/* Soft cream gradient overlay ensuring clear text readability while showcasing the image */}
          <div className="absolute inset-0 bg-gradient-to-r from-cream/95 via-cream/85 to-transparent lg:via-cream/70 lg:max-w-3xl pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-maroon/15 via-transparent to-transparent pointer-events-none" />

          {/* Hero Content */}
          <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 md:py-16">
            <div className="max-w-xl text-left space-y-5 bg-white/75 sm:bg-transparent backdrop-blur-xs sm:backdrop-blur-none p-5 sm:p-0 rounded-2xl border sm:border-0 border-maroon/10 shadow-sm sm:shadow-none">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 border border-maroon/15 text-xs font-semibold text-maroon shadow-xs">
                <ShieldCheck className="w-4 h-4 text-teal-deep" />
                <span>100% Discreet Packaging · India-Wide Dispatch</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-maroon tracking-tight leading-tight">
                Gentle on your body. <br />
                <span className="text-rose italic">Completely discreet</span> at your door.
              </h1>

              <p className="text-sm sm:text-base text-ink/85 max-w-lg font-normal leading-relaxed">
                Experience irritation-free cycles with curated Kits & Bundles featuring certified 100% organic cotton pads, medical-grade silicone cups, and herbal cramp relief essentials.
              </p>

              {/* CTAs */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                <Link to="/kits">
                  <Button
                    variant="primary"
                    size="lg"
                    rightIcon={<ArrowRight className="w-4 h-4" />}
                    className="w-full sm:w-auto shadow-sm hover:shadow-md"
                  >
                    Build a Relief Kit
                  </Button>
                </Link>
                <Link to="/shop">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full sm:w-auto text-maroon border-maroon/30 bg-white/80 hover:bg-white"
                  >
                    Shop All Products
                  </Button>
                </Link>
              </div>

              {/* 3 Core Guarantees Micro-Strip */}
              <div className="pt-4 grid grid-cols-3 gap-3 border-t border-maroon/15 max-w-md text-left">
                <div>
                  <p className="text-xs font-bold text-maroon uppercase tracking-wider">Unmarked</p>
                  <p className="text-[11px] text-muted mt-0.5">Plain packaging</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-teal-deep uppercase tracking-wider">100% GOTS</p>
                  <p className="text-[11px] text-muted mt-0.5">Organic Cotton</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-rose uppercase tracking-wider">Fast 24H</p>
                  <p className="text-[11px] text-muted mt-0.5">Same-day dispatch</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THREE BRAND PROMISES ("Why Femora" Row) */}
      <section className="py-12 bg-white border-b border-maroon/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Promise 1 */}
            <div className="p-6 rounded-2xl bg-cream/60 border border-maroon/10 shadow-femora space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-maroon text-white flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-aqua" />
              </div>
              <h3 className="font-heading font-semibold text-lg text-maroon">1. Discreet Delivery</h3>
              <p className="text-xs sm:text-sm text-muted leading-relaxed">
                Plain cardboard parcel with a neutral shipping label. No brand logos, no period product words, and zero curious glances from delivery couriers or neighbors.
              </p>
            </div>

            {/* Promise 2 */}
            <div className="p-6 rounded-2xl bg-cream/60 border border-maroon/10 shadow-femora space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-teal-deep text-white flex items-center justify-center">
                <Leaf className="w-6 h-6 text-aqua" />
              </div>
              <h3 className="font-heading font-semibold text-lg text-maroon">2. Organic & Gentle</h3>
              <p className="text-xs sm:text-sm text-muted leading-relaxed">
                100% certified organic cotton topsheets and pure Ayurvedic botanical oils. Absolutely zero chlorine bleach, synthetic perfumes, or harsh plastics against intimate skin.
              </p>
            </div>

            {/* Promise 3 */}
            <div className="p-6 rounded-2xl bg-cream/60 border border-maroon/10 shadow-femora space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-rose-button text-white flex items-center justify-center">
                <Clock className="w-6 h-6 text-blush" />
              </div>
              <h3 className="font-heading font-semibold text-lg text-maroon">3. Fast Dispatch</h3>
              <p className="text-xs sm:text-sm text-muted leading-relaxed">
                Periods don&apos;t wait. Orders placed before 2:00 PM are packed and handed over to express delivery couriers on the very same day.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Lotus Divider */}
      <LotusDivider />

      {/* 3. SHOP BY CATEGORY TILES (All 7 groups) */}
      <section className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-bold text-rose uppercase tracking-widest">
            Care Tailored to Every Need
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-maroon">
            Explore Period & Cramp Care
          </h2>
          <p className="text-sm text-muted">
            Thoughtfully engineered wellness products spanning all stages of your monthly cycle.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              to={`/category/${cat.slug}`}
              className="group bg-white p-5 rounded-2xl border border-maroon/10 shadow-femora hover:shadow-femora-hover transition-all duration-200 hover:-translate-y-1 flex flex-col justify-between"
            >
              <div>
                <div className="relative w-full h-32 rounded-xl overflow-hidden mb-3.5 bg-cream/50 border border-maroon/5">
                  <img
                    src={THEME_IMAGES[CATEGORY_THEME_MAP[cat.slug] || "pads"]}
                    alt={cat.name}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-maroon/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <h3 className="font-heading font-semibold text-base text-ink group-hover:text-maroon transition-colors mb-1">
                  {cat.name}
                </h3>
                <p className="text-xs text-muted line-clamp-2 leading-relaxed">
                  {cat.tagline}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-maroon/5 flex items-center justify-between text-xs font-semibold text-rose-button group-hover:text-maroon">
                <span>{cat.itemCount} Products</span>
                <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Lotus Divider */}
      <LotusDivider />

      {/* 4. BEST-SELLERS STRIP / CAROUSEL */}
      <section className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold text-teal-deep uppercase tracking-widest">
              Most Loved by Menstruators
            </span>
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-maroon">
              Best-Selling Essentials
            </h2>
          </div>
          <Link to="/shop">
            <Button variant="outline" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
              View All Products
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestsellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Lotus Divider */}
      <LotusDivider />

      {/* 5. RELIEF KITS STRIP */}
      <section className="py-12 bg-blush-bg/50 border-y border-maroon/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-bold text-rose uppercase tracking-widest">
                Curated Period Defense
              </span>
              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-maroon">
                Relief Kits & Bundles
              </h2>
              <p className="text-xs text-muted mt-1">
                Save up to ₹500 on all-in-one cycle emergency care boxes.
              </p>
            </div>
            <Link to="/kits">
              <Button variant="primary" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                Explore All 6 Kits
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {kits.map((kit) => (
              <KitCard key={kit.id} kit={kit} />
            ))}
          </div>
        </div>
      </section>

      {/* 6. HOW IT WORKS IN 3 STEPS */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-bold text-maroon uppercase tracking-widest">
            Effortless Comfort
          </span>
          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-maroon">
            How Femora Works
          </h2>
          <p className="text-sm text-muted">Three simple steps to peaceful, private cycle care.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          <div className="bg-white p-6 rounded-2xl border border-maroon/10 shadow-femora text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-maroon text-white font-heading font-bold text-lg flex items-center justify-center mx-auto shadow-sm">
              1
            </div>
            <h3 className="font-heading font-semibold text-lg text-ink">Select Gentle Care</h3>
            <p className="text-xs text-muted leading-relaxed">
              Pick your preferred pad sizes, tampons, reusable cups, or soothing cramp-relief roll-ons and patches.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-maroon/10 shadow-femora text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-rose-button text-white font-heading font-bold text-lg flex items-center justify-center mx-auto shadow-sm">
              2
            </div>
            <h3 className="font-heading font-semibold text-lg text-ink">Discreet Packing</h3>
            <p className="text-xs text-muted leading-relaxed">
              Every item is inspected and sealed inside an unbranded outer box with a neutral shipping slip.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-maroon/10 shadow-femora text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-teal-deep text-white font-heading font-bold text-lg flex items-center justify-center mx-auto shadow-sm">
              3
            </div>
            <h3 className="font-heading font-semibold text-lg text-ink">Swift Doorstep Arrival</h3>
            <p className="text-xs text-muted leading-relaxed">
              Fast courier dispatch delivers right to your doorstep or apartment security with complete peace of mind.
            </p>
          </div>
        </div>
      </section>

      {/* Lotus Divider */}
      <LotusDivider />

      {/* 7. CUSTOMER STORIES (Shame-Free Community Voices) */}
      <section className="py-12 bg-white border-y border-maroon/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
            <span className="text-xs font-bold text-teal-deep uppercase tracking-widest">
              Real Experiences
            </span>
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-maroon">
              Loved by Thousands Across India
            </h2>
            <p className="text-sm text-muted">Shame-free menstrual comfort and privacy.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-cream/70 border border-maroon/10 shadow-xs space-y-3">
              <div className="flex items-center gap-1 text-amber-500 text-sm">
                {"★★★★★"}
              </div>
              <p className="text-xs text-ink/80 leading-relaxed italic">
                &ldquo;Living in a joint family, ordering sanitary products used to feel awkward. Femora&apos;s plain brown box has zero branding outside. Plus, no rashes for the first time in years.&rdquo;
              </p>
              <div className="pt-2 border-t border-maroon/10 flex items-center justify-between text-xs">
                <span className="font-semibold text-maroon">Aarohi M.</span>
                <span className="text-muted text-[11px]">Bengaluru</span>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-cream/70 border border-maroon/10 shadow-xs space-y-3">
              <div className="flex items-center gap-1 text-amber-500 text-sm">
                {"★★★★★"}
              </div>
              <p className="text-xs text-ink/80 leading-relaxed italic">
                &ldquo;The HerbalHeat patches are my secret weapon during college presentation days. Eight hours of uninterrupted warmth under my clothes with zero bulk.&rdquo;
              </p>
              <div className="pt-2 border-t border-maroon/10 flex items-center justify-between text-xs">
                <span className="font-semibold text-maroon">Sneha V.</span>
                <span className="text-muted text-[11px]">Pune</span>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-cream/70 border border-maroon/10 shadow-xs space-y-3">
              <div className="flex items-center gap-1 text-amber-500 text-sm">
                {"★★★★★"}
              </div>
              <p className="text-xs text-ink/80 leading-relaxed italic">
                &ldquo;The Complete Cycle Rescue Box is the best gift I gave myself. The cramp roll-on has a lovely natural mint aroma and works in minutes.&rdquo;
              </p>
              <div className="pt-2 border-t border-maroon/10 flex items-center justify-between text-xs">
                <span className="font-semibold text-maroon">Kavita S.</span>
                <span className="text-muted text-[11px]">New Delhi</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. SHORT FAQ ACCORDION */}
      <section className="py-16 max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 space-y-2">
          <span className="text-xs font-bold text-rose uppercase tracking-widest">
            Clear Answers
          </span>
          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-maroon">
            Frequently Asked Questions
          </h2>
          <p className="text-xs text-muted">
            Have questions about delivery privacy or organic materials?
          </p>
        </div>

        <Accordion items={homeFaqs} defaultOpenId="f1" />

        <div className="text-center mt-6">
          <Link to="/faq" className="text-xs font-semibold text-maroon hover:underline">
            View all frequently asked questions &rarr;
          </Link>
        </div>
      </section>
    </div>
  );
};
