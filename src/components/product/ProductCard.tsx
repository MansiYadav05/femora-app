import React from "react";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { Product } from "../../data/mockData";
import { formatPrice, calculateDiscount } from "../../utils/formatPrice";
import { useWishlist } from "../../context/WishlistContext";
import { useCart } from "../../context/CartContext";
import { Rating } from "../ui/Rating";
import { Badge } from "../ui/Badge";
import { ProductArtwork } from "../common/ProductArtwork";

export interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addItem, items } = useCart();

  const isFavorited = isInWishlist(product.id);
  const discountPercent = calculateDiscount(product.price, product.mrp);
  const inCart = items.some((i) => i.product.id === product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id, product.name);
  };

  return (
    <div className="group relative bg-white rounded-xl border border-maroon/10 shadow-femora hover:shadow-femora-hover transition-all duration-200 hover:-translate-y-0.5 flex flex-col justify-between overflow-hidden">
      {/* Top Image & Floating Badges */}
      <div className="relative w-full overflow-hidden bg-cream/40">
        <Link to={`/product/${product.slug}`} className="block overflow-hidden">
          <ProductArtwork
            theme={product.imageTheme || "pads"}
            alt={product.name}
            aspectRatio="4/3"
          />
        </Link>

        {/* Floating Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 items-start z-10">
          {product.isOrganic && (
            <Badge variant="organic">Organic</Badge>
          )}
          {product.isBestseller && (
            <Badge variant="bestseller">Bestseller</Badge>
          )}
          {discountPercent > 0 && (
            <Badge variant="discount">{discountPercent}% OFF</Badge>
          )}
        </div>

        {/* Wishlist Heart Button */}
        <button
          type="button"
          onClick={handleToggleWishlist}
          aria-label={isFavorited ? "Remove from wishlist" : "Add to wishlist"}
          className={`absolute top-2.5 right-2.5 p-2 rounded-full transition-all duration-200 cursor-pointer z-10 ${
            isFavorited
              ? "bg-rose text-white shadow-sm"
              : "bg-white/90 text-muted hover:text-rose hover:bg-white shadow-xs"
          }`}
        >
          <Heart className={`w-4 h-4 ${isFavorited ? "fill-current" : ""}`} />
        </button>
      </div>

      {/* Product Details */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-xs text-muted mb-1.5">
            <span className="uppercase tracking-wider font-medium text-[11px] truncate max-w-[140px]">
              {product.category}
            </span>
            <Rating score={product.rating} count={product.reviewCount} size="sm" />
          </div>

          {/* Product Name */}
          <Link to={`/product/${product.slug}`} className="block group-hover:text-maroon transition-colors">
            <h3 className="font-heading font-semibold text-base text-ink line-clamp-1 mb-1 leading-snug">
              {product.name}
            </h3>
          </Link>

          {/* Short Description */}
          <p className="text-xs text-muted line-clamp-2 leading-relaxed mb-3">
            {product.shortDescription}
          </p>
        </div>

        {/* Pricing & Add to Cart */}
        <div className="pt-3 border-t border-maroon/5 flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-bold text-maroon tabular-nums">
                {formatPrice(product.price)}
              </span>
              {product.mrp > product.price && (
                <span className="text-xs text-muted line-through tabular-nums">
                  {formatPrice(product.mrp)}
                </span>
              )}
            </div>
            {product.stock <= 5 && product.stock > 0 && (
              <span className="text-[10px] text-rose font-medium">Only {product.stock} left!</span>
            )}
          </div>

          <button
            type="button"
            onClick={handleAddToCart}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer active:scale-95 ${
              inCart
                ? "bg-teal-deep text-white shadow-xs hover:bg-teal"
                : "bg-rose-button text-white shadow-xs hover:bg-rose"
            }`}
          >
            {inCart ? "In Cart" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
};
