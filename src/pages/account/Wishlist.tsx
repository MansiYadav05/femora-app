import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Heart, ShoppingBag, Trash2 } from "lucide-react";
import { useWishlist } from "../../context/WishlistContext";
import { useCart } from "../../context/CartContext";
import { productService } from "../../services/productService";
import { Product } from "../../data/mockData";
import { Breadcrumbs } from "../../components/common/Breadcrumbs";
import { EmptyState } from "../../components/common/EmptyState";
import { formatPrice } from "../../utils/formatPrice";
import { ProductArtwork } from "../../components/common/ProductArtwork";
import { Button } from "../../components/ui/Button";

export const Wishlist: React.FC = () => {
  const { wishlistIds, toggleWishlist } = useWishlist();
  const { addItem } = useCart();

  const [wishlistProducts, setWishlistProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Femora | My Wishlist";
    window.scrollTo(0, 0);

    productService.getProducts({ limit: 100 }).then((res) => {
      if (res.success && res.data) {
        const filtered = res.data.items.filter((p) => wishlistIds.includes(p.id));
        setWishlistProducts(filtered);
      }
      setLoading(false);
    });
  }, [wishlistIds]);

  const handleMoveToCart = (product: Product) => {
    addItem(product, 1);
    toggleWishlist(product.id);
  };

  return (
    <div className="min-h-screen bg-cream py-6 md:py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <Breadcrumbs items={[{ label: "My Account" }, { label: "My Wishlist" }]} />

        <div className="pb-4 border-b border-maroon/10">
          <h1 className="text-2xl md:text-3xl font-heading font-bold text-maroon flex items-center gap-2.5">
            <Heart className="w-6 h-6 text-rose fill-rose" />
            <span>My Saved Wishlist ({wishlistProducts.length})</span>
          </h1>
          <p className="text-xs text-muted mt-1">
            Personal period care favorites and planned re-orders.
          </p>
        </div>

        {wishlistProducts.length === 0 ? (
          <EmptyState
            icon={<Heart className="w-8 h-8" />}
            title="Your wishlist is empty"
            description="Tap the heart icon on any sanitary pads, relief kits, or cramp roll-ons to save them here for later."
            actionLabel="Discover Products"
            actionTo="/shop"
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {wishlistProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl border border-maroon/10 shadow-femora p-4 flex flex-col justify-between overflow-hidden"
              >
                <div>
                  <Link to={`/product/${product.slug}`} className="block relative bg-cream/50 rounded-xl overflow-hidden mb-3">
                    <ProductArtwork theme={product.imageTheme || "pads"} aspectRatio="4/3" />
                  </Link>

                  <p className="text-[11px] font-semibold text-rose uppercase tracking-wider">
                    {product.category}
                  </p>

                  <Link to={`/product/${product.slug}`} className="block hover:text-maroon transition-colors">
                    <h3 className="font-heading font-semibold text-sm text-ink line-clamp-1 mt-1">
                      {product.name}
                    </h3>
                  </Link>

                  <div className="mt-2 flex items-baseline gap-1.5">
                    <span className="text-base font-bold text-maroon tabular-nums">
                      {formatPrice(product.price)}
                    </span>
                    {product.mrp > product.price && (
                      <span className="text-xs text-muted line-through tabular-nums">
                        {formatPrice(product.mrp)}
                      </span>
                    )}
                  </div>
                </div>

                <div className="pt-4 border-t border-maroon/5 mt-4 space-y-2">
                  <Button
                    variant="primary"
                    size="sm"
                    className="w-full"
                    onClick={() => handleMoveToCart(product)}
                    leftIcon={<ShoppingBag className="w-3.5 h-3.5" />}
                  >
                    Move to Cart
                  </Button>

                  <button
                    onClick={() => toggleWishlist(product.id, product.name)}
                    className="w-full text-center text-xs text-muted hover:text-rose transition-colors py-1 cursor-pointer flex items-center justify-center gap-1"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>Remove</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
