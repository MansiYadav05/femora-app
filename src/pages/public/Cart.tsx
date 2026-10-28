import React from "react";
import { Link } from "react-router-dom";
import { ShoppingBag, ArrowRight, ShieldCheck, Sparkles, Plus } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { CartItem } from "../../components/cart/CartItem";
import { PriceSummary } from "../../components/cart/PriceSummary";
import { Breadcrumbs } from "../../components/common/Breadcrumbs";
import { EmptyState } from "../../components/common/EmptyState";
import { MOCK_PRODUCTS } from "../../data/mockData";
import { formatPrice } from "../../utils/formatPrice";

export const Cart: React.FC = () => {
  const {
    items,
    subtotal,
    deliveryFee,
    total,
    discreetPackaging,
    toggleDiscreetPackaging,
    updateQuantity,
    removeItem,
    itemCount,
    addItem,
  } = useCart();

  // Recommendations
  const crossSellSuggestions = MOCK_PRODUCTS.filter(
    (p) => !items.some((i) => i.product.id === p.id)
  ).slice(0, 4);

  return (
    <div className="min-h-screen bg-cream py-6 md:py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <Breadcrumbs items={[{ label: "Shopping Bag" }]} />

        <div className="flex items-center justify-between pb-4 border-b border-maroon/10">
          <h1 className="text-2xl md:text-3xl font-heading font-bold text-maroon flex items-center gap-3">
            <ShoppingBag className="w-7 h-7 text-rose" />
            <span>Shopping Bag ({itemCount} {itemCount === 1 ? "item" : "items"})</span>
          </h1>
          <Link to="/shop" className="text-xs font-semibold text-rose-button hover:underline">
            Continue Shopping &rarr;
          </Link>
        </div>

        {items.length === 0 ? (
          <EmptyState
            icon={<ShoppingBag className="w-8 h-8" />}
            title="Your bag is empty"
            description="You don't have any period care products or relief kits in your bag yet. Browse our rash-free pads, medical cups, and cramp patches."
            actionLabel="Explore Organic Products"
            actionTo="/shop"
          />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Items Column */}
            <div className="lg:col-span-8 space-y-6">
              {/* Items Card */}
              <div className="bg-white rounded-2xl border border-maroon/10 shadow-femora p-6">
                <div className="divide-y divide-maroon/10">
                  {items.map((item) => (
                    <CartItem
                      key={`${item.product.id}-${item.selectedVariant || "std"}`}
                      item={item}
                      onUpdateQuantity={(q) =>
                        updateQuantity(item.product.id, q, item.selectedVariant)
                      }
                      onRemove={() =>
                        removeItem(item.product.id, item.selectedVariant)
                      }
                    />
                  ))}
                </div>
              </div>

              {/* Discreet Packaging Note Banner */}
              <div className="p-4 bg-blush-bg/60 rounded-2xl border border-blush/40 flex items-start gap-3 text-xs text-maroon">
                <ShieldCheck className="w-5 h-5 text-teal-deep shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-sm">Discreet Packaging Promise Included</h4>
                  <p className="text-xs text-muted mt-0.5 leading-relaxed">
                    We ship in unmarked brown corrugated boxes. The sender name on the courier label is a neutral fulfillment entity with no mention of Femora, pads, or menstrual care.
                  </p>
                </div>
              </div>

              {/* "You may also need" cross-sell row */}
              {crossSellSuggestions.length > 0 && (
                <div className="bg-white rounded-2xl border border-maroon/10 shadow-femora p-6 space-y-4">
                  <h3 className="font-heading font-semibold text-base text-maroon flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-rose" />
                    <span>You may also need:</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {crossSellSuggestions.map((prod) => (
                      <div
                        key={prod.id}
                        className="p-3 rounded-xl border border-maroon/10 bg-cream/40 flex items-center justify-between gap-3 text-xs"
                      >
                        <div className="truncate">
                          <p className="font-semibold text-ink truncate">{prod.name}</p>
                          <p className="text-muted text-[11px]">{prod.category}</p>
                          <span className="font-bold text-maroon tabular-nums">
                            {formatPrice(prod.price)}
                          </span>
                        </div>
                        <button
                          onClick={() => addItem(prod, 1)}
                          className="px-3 py-1.5 rounded-full bg-rose-button text-white hover:bg-rose font-medium text-xs flex items-center gap-1 shrink-0 cursor-pointer shadow-xs"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Sticky Order Summary */}
            <div className="lg:col-span-4 lg:sticky lg:top-24">
              <PriceSummary
                subtotal={subtotal}
                deliveryFee={deliveryFee}
                total={total}
                discreetPackaging={discreetPackaging}
                onToggleDiscreet={toggleDiscreetPackaging}
                showCheckoutButton={true}
                checkoutText="Proceed to Checkout"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
