import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  Heart,
  ShoppingBag,
  ShieldCheck,
  Truck,
  Leaf,
  CheckCircle2,
  Clock,
  ArrowRight,
  ChevronRight,
  MapPin,
} from "lucide-react";
import { productService } from "../../services/productService";
import { Product } from "../../data/mockData";
import { formatPrice, calculateDiscount } from "../../utils/formatPrice";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { ProductGallery } from "../../components/product/ProductGallery";
import { VariantSelector } from "../../components/product/VariantSelector";
import { ReviewList } from "../../components/product/ReviewList";
import { ProductCard } from "../../components/product/ProductCard";
import { Breadcrumbs } from "../../components/common/Breadcrumbs";
import { Rating } from "../../components/ui/Rating";
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";
import { QuantitySelector } from "../../components/ui/QuantitySelector";
import { Tabs } from "../../components/ui/Tabs";
import { EmptyState } from "../../components/common/EmptyState";
import { isValidPincode } from "../../utils/validators";
import toast from "react-hot-toast";

export const ProductDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const { addItem } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedVariant, setSelectedVariant] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");

  // Pincode checker state
  const [pincodeInput, setPincodeInput] = useState("");
  const [pincodeResult, setPincodeResult] = useState<{
    checked: boolean;
    valid: boolean;
    message: string;
  }>({ checked: false, valid: false, message: "" });

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);

    if (slug) {
      productService.getProduct(slug).then((res) => {
        if (res.success && res.data) {
          const prod = res.data;
          setProduct(prod);
          document.title = `${prod.name} | Femora`;
          setSelectedVariant(prod.variants?.[0]?.name || "");

          // Load related items
          productService
            .getRelatedProducts(prod.slug, prod.categorySlug)
            .then((relRes) => {
              if (relRes.success && relRes.data) {
                setRelated(relRes.data);
              }
            });
        }
        setLoading(false);
      });
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto py-16 px-4 text-center">
        <div className="animate-pulse space-y-4 max-w-xl mx-auto">
          <div className="h-64 bg-maroon/10 rounded-2xl" />
          <div className="h-6 bg-maroon/10 rounded w-3/4 mx-auto" />
          <div className="h-4 bg-maroon/10 rounded w-1/2 mx-auto" />
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto py-16 px-4">
        <EmptyState
          title="Product Not Found"
          description="The product you are looking for does not exist or may have been unlisted."
          actionLabel="Browse Catalog"
          actionTo="/shop"
        />
      </div>
    );
  }

  // Calculate price with variant
  let currentPrice = product.price;
  if (selectedVariant && product.variants) {
    const v = product.variants.find((vr) => vr.name === selectedVariant);
    if (v?.priceModifier) {
      currentPrice += v.priceModifier;
    }
  }

  const discountPercent = calculateDiscount(currentPrice, product.mrp);
  const isFavorited = isInWishlist(product.id);

  const handleAddToCart = () => {
    addItem(product, quantity, selectedVariant);
  };

  const handleBuyNow = () => {
    addItem(product, quantity, selectedVariant);
    navigate("/checkout");
  };

  const handleCheckPincode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidPincode(pincodeInput)) {
      setPincodeResult({
        checked: true,
        valid: false,
        message: "Please enter a valid 6-digit Indian PIN code.",
      });
      return;
    }

    // In India metro pincodes: fast delivery
    const isFastCity = ["11", "40", "56", "50", "60", "70", "38"].some((prefix) =>
      pincodeInput.startsWith(prefix)
    );

    setPincodeResult({
      checked: true,
      valid: true,
      message: isFastCity
        ? "Express Delivery available! Order arrives in 24 to 48 hours."
        : "Standard Discreet Delivery available (3 to 5 business days).",
    });
  };

  const tabs = [
    { id: "description", label: "Description" },
    { id: "ingredients", label: "Ingredients & Materials" },
    { id: "howToUse", label: "How to Use" },
    { id: "faqs", label: "Care FAQs" },
  ];

  return (
    <div className="min-h-screen bg-cream py-6 md:py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: "Shop", path: "/shop" },
            { label: product.category, path: `/category/${product.categorySlug}` },
            { label: product.name },
          ]}
        />

        {/* 2-Column Contiguous Purchase Module */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left: Gallery */}
          <div className="lg:col-span-6 lg:sticky lg:top-24">
            <ProductGallery
              theme={product.imageTheme || "pads"}
              name={product.name}
            />
          </div>

          {/* Right: Contiguous Purchase Information */}
          <div className="lg:col-span-6 space-y-6">
            {/* Category, Badges & Rating */}
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs uppercase tracking-wider font-semibold text-rose">
                  {product.category}
                </span>
                {product.isOrganic && <Badge variant="organic">100% Organic</Badge>}
                {product.isBestseller && <Badge variant="bestseller">Bestseller</Badge>}
                {discountPercent > 0 && (
                  <Badge variant="discount">{discountPercent}% OFF</Badge>
                )}
              </div>

              <h1 className="text-2xl sm:text-3xl font-heading font-bold text-ink leading-snug">
                {product.name}
              </h1>

              <div className="flex items-center gap-3">
                <Rating score={product.rating} count={product.reviewCount} size="sm" />
                <span className="text-xs text-muted">·</span>
                <span className="text-xs text-teal-deep font-medium flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Dermatologist Approved</span>
                </span>
              </div>
            </div>

            {/* Price Row */}
            <div className="p-4 bg-white rounded-2xl border border-maroon/10 shadow-femora flex items-baseline justify-between">
              <div>
                <div className="flex items-baseline gap-2.5">
                  <span className="text-2xl sm:text-3xl font-bold text-maroon tabular-nums">
                    {formatPrice(currentPrice)}
                  </span>
                  {product.mrp > currentPrice && (
                    <span className="text-sm text-muted line-through tabular-nums">
                      {formatPrice(product.mrp)}
                    </span>
                  )}
                  {discountPercent > 0 && (
                    <span className="text-xs font-bold text-rose">
                      Save {formatPrice(product.mrp - currentPrice)}
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-muted mt-0.5">Inclusive of all taxes</p>
              </div>

              {/* Stock indicator */}
              <div className="text-right">
                {product.stock > 0 ? (
                  <span className="text-xs font-semibold text-teal-deep bg-teal/10 px-2.5 py-1 rounded-full">
                    In Stock ({product.stock} available)
                  </span>
                ) : (
                  <span className="text-xs font-semibold text-rose bg-rose/10 px-2.5 py-1 rounded-full">
                    Out of Stock
                  </span>
                )}
              </div>
            </div>

            {/* Plain Packaging Privacy Note */}
            <div className="p-3.5 bg-blush-bg/60 rounded-xl border border-blush/40 flex items-start gap-2.5 text-xs text-maroon">
              <ShieldCheck className="w-4 h-4 text-teal-deep shrink-0 mt-0.5" />
              <p className="leading-snug">
                <strong>Plain Packaging Guaranteed:</strong> Sent in an unmarked outer box. No product name, category, or brand displayed on the exterior shipping label.
              </p>
            </div>

            {/* Variants Selector */}
            <VariantSelector
              variants={product.variants}
              selectedVariant={selectedVariant}
              onSelect={setSelectedVariant}
              basePrice={product.price}
            />

            {/* Quantity & Buy Buttons */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-ink/80">
                  Quantity:
                </span>
                <QuantitySelector
                  quantity={quantity}
                  max={product.stock || 20}
                  onChange={setQuantity}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={handleAddToCart}
                  leftIcon={<ShoppingBag className="w-4 h-4" />}
                  className="w-full"
                >
                  Add to Cart
                </Button>

                <Button
                  variant="maroon"
                  size="lg"
                  onClick={handleBuyNow}
                  className="w-full"
                >
                  Buy Now
                </Button>
              </div>

              {/* Wishlist Button */}
              <button
                type="button"
                onClick={() => toggleWishlist(product.id, product.name)}
                className="w-full py-2 flex items-center justify-center gap-2 text-xs font-semibold text-muted hover:text-rose transition-colors cursor-pointer"
              >
                <Heart className={`w-4 h-4 ${isFavorited ? "fill-rose text-rose" : ""}`} />
                <span>{isFavorited ? "Saved in your Wishlist" : "Save to Wishlist"}</span>
              </button>
            </div>

            {/* Pincode Delivery Check */}
            <div className="p-4 bg-white rounded-2xl border border-maroon/10 shadow-xs space-y-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-ink/80 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-rose" />
                <span>Check Delivery & Dispatch to your Pincode</span>
              </label>
              <form onSubmit={handleCheckPincode} className="flex gap-2">
                <input
                  type="text"
                  maxLength={6}
                  placeholder="Enter 6-digit Pincode (e.g. 560034)"
                  value={pincodeInput}
                  onChange={(e) => setPincodeInput(e.target.value.replace(/\D/g, ""))}
                  className="flex-1 text-xs px-3.5 py-2.5 rounded-xl border border-maroon/20 focus:outline-none focus:ring-2 focus:ring-aqua"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 text-xs font-semibold rounded-xl bg-teal-deep text-white hover:bg-teal transition-colors cursor-pointer"
                >
                  Check
                </button>
              </form>

              {pincodeResult.checked && (
                <p
                  className={`text-xs font-medium flex items-center gap-1.5 pt-1 ${
                    pincodeResult.valid ? "text-teal-deep" : "text-rose"
                  }`}
                >
                  {pincodeResult.valid ? (
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  ) : (
                    <span>•</span>
                  )}
                  <span>{pincodeResult.message}</span>
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Informational Tabs: Description, Ingredients, How to Use, FAQs */}
        <div className="bg-white rounded-2xl border border-maroon/10 shadow-femora p-6 md:p-8 space-y-6">
          <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

          <div className="pt-2 text-sm leading-relaxed text-ink/85">
            {activeTab === "description" && (
              <div className="space-y-4">
                <h3 className="font-heading font-semibold text-lg text-maroon">Product Overview</h3>
                <p>{product.description}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3">
                  <div className="p-3.5 rounded-xl bg-cream border border-maroon/10 space-y-1">
                    <h5 className="font-semibold text-xs text-maroon uppercase tracking-wider">Absorption & Comfort</h5>
                    <p className="text-xs text-muted">Engineered for breathable micro-climate without friction or damp heat.</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-cream border border-maroon/10 space-y-1">
                    <h5 className="font-semibold text-xs text-maroon uppercase tracking-wider">Discreet Packaging</h5>
                    <p className="text-xs text-muted">Sealed in plain outer boxes with neutral shipping sender information.</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "ingredients" && (
              <div className="space-y-4">
                <h3 className="font-heading font-semibold text-lg text-maroon">Materials & Composition</h3>
                <p>{product.ingredients}</p>
                <div className="p-3.5 rounded-xl bg-blush-bg/50 border border-blush/40 text-xs text-maroon">
                  <strong>Zero Irritants Promise:</strong> Free from chlorine, synthetic fragrances, chemical dyes, latex, and parabens.
                </div>
              </div>
            )}

            {activeTab === "howToUse" && (
              <div className="space-y-4">
                <h3 className="font-heading font-semibold text-lg text-maroon">Recommended Usage</h3>
                <p>{product.howToUse}</p>
              </div>
            )}

            {activeTab === "faqs" && (
              <div className="space-y-3">
                <h3 className="font-heading font-semibold text-lg text-maroon">Common Questions</h3>
                <div className="space-y-3">
                  <div className="p-3 rounded-xl bg-cream border border-maroon/10">
                    <p className="font-semibold text-xs text-maroon">Is this safe for sensitive, rash-prone skin?</p>
                    <p className="text-xs text-muted mt-1">Yes, all our organic products are specifically tested to prevent contact rashes and chafing.</p>
                  </div>
                  <div className="p-3 rounded-xl bg-cream border border-maroon/10">
                    <p className="font-semibold text-xs text-maroon">Will the delivery driver know what is in the package?</p>
                    <p className="text-xs text-muted mt-1">No. The parcel has zero product names and looks like a generic e-commerce package.</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Reviews Section */}
        <div className="space-y-6">
          <h2 className="text-2xl font-heading font-bold text-maroon">Customer Experiences</h2>
          <ReviewList
            reviews={product.reviews || []}
            overallRating={product.rating}
            totalCount={product.reviewCount}
          />
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div className="space-y-6 pt-6">
            <h2 className="text-2xl font-heading font-bold text-maroon">You May Also Need</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Sticky Mobile Add-to-Cart Bar as specified in prompt */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-maroon/15 p-3 shadow-2xl flex items-center justify-between gap-3">
        <div>
          <span className="text-xs text-muted block truncate max-w-[120px]">{product.name}</span>
          <span className="text-base font-bold text-maroon tabular-nums">
            {formatPrice(currentPrice)}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="primary"
            size="md"
            onClick={handleAddToCart}
            leftIcon={<ShoppingBag className="w-4 h-4" />}
          >
            Add
          </Button>
          <Button
            variant="maroon"
            size="md"
            onClick={handleBuyNow}
          >
            Buy Now
          </Button>
        </div>
      </div>
    </div>
  );
};
