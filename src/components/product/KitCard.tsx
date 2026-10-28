import React from "react";
import { Link } from "react-router-dom";
import { ShoppingBag, Check, ShieldCheck, Sparkles } from "lucide-react";
import { KitBundle } from "../../data/mockData";
import { formatPrice } from "../../utils/formatPrice";
import { useCart } from "../../context/CartContext";
import { Rating } from "../ui/Rating";
import { Badge } from "../ui/Badge";
import { ProductArtwork } from "../common/ProductArtwork";

export interface KitCardProps {
  kit: KitBundle;
}

export const KitCard: React.FC<KitCardProps> = ({ kit }) => {
  const { addItem, items } = useCart();
  const inCart = items.some((i) => i.product.id === kit.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Adapter to product shape for cart
    addItem(
      {
        id: kit.id,
        slug: kit.slug,
        name: kit.name,
        category: "Relief Kits & Bundles",
        categorySlug: "relief-kits",
        price: kit.bundlePrice,
        mrp: kit.separatePrice,
        variants: [{ id: "std", name: "Curated Bundle" }],
        stock: kit.stock,
        rating: kit.rating,
        reviewCount: kit.reviewCount,
        shortDescription: kit.shortDescription,
        description: kit.description,
        ingredients: "Includes organic cotton, herbal extracts, and thermal relief elements.",
        howToUse: "Use kit components in sequence as needed during your cycle.",
        isOrganic: true,
        isBestseller: kit.isBestseller ?? true,
        isFeatured: true,
        imageTheme: "kit",
        kitContents: kit.contents,
        reviews: [],
      },
      1
    );
  };

  return (
    <div className="bg-white rounded-xl border border-maroon/10 shadow-femora hover:shadow-femora-hover transition-all duration-200 hover:-translate-y-0.5 flex flex-col justify-between overflow-hidden">
      {/* Top Graphic */}
      <div className="relative bg-cream/50 overflow-hidden">
        <Link to={`/product/${kit.slug}`} className="block">
          <ProductArtwork theme="kit" aspectRatio="wide" className="h-48 md:h-52" />
        </Link>
        <div className="absolute top-3 left-3 flex gap-2">
          <Badge variant="discount">SAVE {formatPrice(kit.savings)}</Badge>
          {kit.isBestseller && <Badge variant="bestseller">Top Bundle</Badge>}
        </div>
      </div>

      {/* Body Details */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-xs text-muted mb-2">
            <span className="font-semibold text-rose uppercase tracking-wider text-[11px]">
              Complete Care Set
            </span>
            <Rating score={kit.rating} count={kit.reviewCount} size="sm" />
          </div>

          <Link to={`/product/${kit.slug}`} className="hover:text-maroon transition-colors block">
            <h3 className="font-heading font-semibold text-lg text-ink mb-1.5 leading-snug">
              {kit.name}
            </h3>
          </Link>

          <p className="text-xs text-muted mb-4">{kit.shortDescription}</p>

          {/* Kit Contents List */}
          <div className="bg-blush-bg/60 rounded-xl p-3 mb-4 border border-blush/30">
            <p className="text-[11px] font-bold text-maroon uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-rose" />
              <span>What&apos;s Inside this Bundle:</span>
            </p>
            <ul className="space-y-1.5 text-xs text-ink/80">
              {kit.contents.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-teal-deep font-bold text-sm leading-none">•</span>
                  <span className="leading-snug">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Pricing, Discreet Guarantee & Add to Cart */}
        <div className="pt-3 border-t border-maroon/10">
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-bold text-maroon tabular-nums">
                  {formatPrice(kit.bundlePrice)}
                </span>
                <span className="text-xs text-muted line-through tabular-nums">
                  {formatPrice(kit.separatePrice)}
                </span>
              </div>
              <p className="text-[11px] text-teal-deep font-semibold">
                You save {formatPrice(kit.savings)}
              </p>
            </div>

            <button
              onClick={handleAddToCart}
              className={`px-4 py-2 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all duration-200 cursor-pointer shadow-sm active:scale-95 ${
                inCart
                  ? "bg-teal-deep text-white hover:bg-teal"
                  : "bg-rose-button text-white hover:bg-rose"
              }`}
            >
              {inCart ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Added</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add Bundle to Cart</span>
                </>
              )}
            </button>
          </div>

          <div className="flex items-center gap-1 text-[11px] text-muted">
            <ShieldCheck className="w-3.5 h-3.5 text-teal" />
            <span>Delivered in 100% plain packaging with neutral label</span>
          </div>
        </div>
      </div>
    </div>
  );
};
