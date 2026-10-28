import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Package, ShieldCheck, Sparkles, Tag, ArrowRight } from "lucide-react";
import { productService } from "../../services/productService";
import { KitBundle } from "../../data/mockData";
import { KitCard } from "../../components/product/KitCard";
import { Breadcrumbs } from "../../components/common/Breadcrumbs";
import { Skeleton } from "../../components/common/Skeleton";
import { LotusDivider } from "../../components/common/LotusDivider";

export const Kits: React.FC = () => {
  const [kits, setKits] = useState<KitBundle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Period Care & Cramp Relief Kits (Bundles) | Femora";
    window.scrollTo(0, 0);

    productService.getKits().then((res) => {
      if (res.success && res.data) {
        setKits(res.data);
      }
      setLoading(false);
    });
  }, []);

  return (
    <div className="min-h-screen bg-cream py-6 md:py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <Breadcrumbs items={[{ label: "Relief Kits & Bundles" }]} />

        {/* Hero Header */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-maroon via-maroon-dark to-maroon text-white p-8 md:p-12 shadow-femora border border-maroon-dark">
          <div className="max-w-2xl space-y-3 relative z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-aqua text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Curated Care Bundles · Save up to ₹500</span>
            </span>
            <h1 className="text-3xl md:text-5xl font-heading font-bold tracking-tight">
              Period Relief Kits & Bundles
            </h1>
            <p className="text-sm md:text-base text-cream/90 leading-relaxed font-normal">
              Everything you need for your menstrual cycle thoughtfully pre-assembled. Combining certified organic pads or tampons with fast-acting herbal cramp relievers, packed in 100% unmarked discreet boxes.
            </p>
            <div className="pt-2 flex flex-wrap gap-4 text-xs text-blush font-medium">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-aqua" />
                <span>Zero brand names on outer box</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Tag className="w-4 h-4 text-teal" />
                <span>Up to 30% bundle savings vs separate items</span>
              </span>
            </div>
          </div>
        </div>

        {/* Kits Grid */}
        <div>
          <div className="mb-6 flex items-center justify-between pb-3 border-b border-maroon/10">
            <h2 className="font-heading font-semibold text-xl text-maroon">
              All 6 Curated Bundles
            </h2>
            <span className="text-xs text-muted">Shipped in plain boxes</span>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-white p-5 rounded-2xl border border-maroon/10 space-y-4">
                  <Skeleton className="w-full h-48 rounded-xl" />
                  <Skeleton className="w-3/4 h-5" />
                  <Skeleton className="w-full h-16" />
                  <Skeleton className="w-1/2 h-6" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {kits.map((kit) => (
                <KitCard key={kit.id} kit={kit} />
              ))}
            </div>
          )}
        </div>

        <LotusDivider />

        {/* Why Bundles Callout */}
        <div className="bg-white rounded-2xl border border-maroon/10 p-8 shadow-femora text-center max-w-3xl mx-auto space-y-4">
          <h3 className="font-heading font-semibold text-2xl text-maroon">
            Why choose a curated Femora Relief Kit?
          </h3>
          <p className="text-xs sm:text-sm text-muted leading-relaxed">
            Instead of juggling multiple orders or running to pharmacies at midnight, our kits keep your cupboard stocked with hygiene essentials and thermal cramp relievers in one economical delivery.
          </p>
          <div className="pt-2">
            <Link to="/shop">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-button hover:underline">
                <span>Want to shop individual items instead? Browse catalog</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
