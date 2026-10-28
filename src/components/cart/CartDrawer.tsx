import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingBag, ArrowRight, ShieldCheck, Plus, Sparkles } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { Drawer } from "../ui/Drawer";
import { CartItem } from "./CartItem";
import { formatPrice } from "../../utils/formatPrice";
import { FREE_SHIPPING_THRESHOLD, STANDARD_SHIPPING_FEE } from "../../utils/constants";
import { MOCK_PRODUCTS } from "../../data/mockData";
import { Button } from "../ui/Button";

export const CartDrawer: React.FC = () => {
  const {
    items,
    subtotal,
    deliveryFee,
    total,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeItem,
    itemCount,
    addItem,
  } = useCart();

  const navigate = useNavigate();

  // Recommendations: products not in cart
  const crossSellSuggestions = MOCK_PRODUCTS.filter(
    (p) => !items.some((i) => i.product.id === p.id)
  ).slice(0, 3);

  const handleCheckoutClick = () => {
    closeCart();
    navigate("/checkout");
  };

  const handleViewCartClick = () => {
    closeCart();
    navigate("/cart");
  };

  const amountNeeded = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  return (
    <Drawer
      isOpen={isCartOpen}
      onClose={closeCart}
      side="right"
      title={
        <div className="flex items-center gap-2">
          <ShoppingBag className="w-5 h-5 text-rose" />
          <span>Your Bag ({itemCount})</span>
        </div>
      }
    >
      <div className="flex flex-col h-full justify-between">
        {/* Scrollable Items */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
          {/* Free delivery alert banner */}
          <div className="bg-blush-bg/60 p-3 rounded-xl border border-blush/40 text-xs text-maroon flex items-center justify-between">
            {amountNeeded === 0 ? (
              <span className="font-semibold text-teal-deep flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-teal" />
                <span>Unlocked FREE Discreet Delivery!</span>
              </span>
            ) : (
              <span>
                Add <strong>{formatPrice(amountNeeded)}</strong> more for FREE Shipping!
              </span>
            )}
            <span className="text-[11px] font-bold text-rose">Threshold: ₹499</span>
          </div>

          {items.length === 0 ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-blush-bg mx-auto flex items-center justify-center text-rose">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h4 className="font-heading font-semibold text-lg text-ink">Your bag is empty</h4>
              <p className="text-xs text-muted max-w-xs mx-auto">
                Explore our gentle organic cotton pads, self-heating patches, and relief kits.
              </p>
              <Button
                variant="primary"
                size="md"
                onClick={() => {
                  closeCart();
                  navigate("/shop");
                }}
              >
                Shop Essentials
              </Button>
            </div>
          ) : (
            <div className="space-y-1">
              {items.map((item) => (
                <CartItem
                  key={`${item.product.id}-${item.selectedVariant || "default"}`}
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
          )}

          {/* "You may also need" cross-sell row */}
          {items.length > 0 && crossSellSuggestions.length > 0 && (
            <div className="pt-4 border-t border-maroon/10">
              <p className="text-xs font-bold text-maroon uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-rose" />
                <span>You may also need:</span>
              </p>
              <div className="space-y-2">
                {crossSellSuggestions.map((p) => (
                  <div
                    key={p.id}
                    className="p-2.5 bg-white rounded-xl border border-maroon/10 flex items-center justify-between gap-3 text-xs shadow-xs"
                  >
                    <div className="truncate">
                      <p className="font-semibold text-ink truncate">{p.name}</p>
                      <p className="text-[11px] text-maroon font-bold tabular-nums">
                        {formatPrice(p.price)}
                      </p>
                    </div>
                    <button
                      onClick={() => addItem(p, 1)}
                      className="px-2.5 py-1 rounded-full bg-blush-bg text-rose hover:bg-rose-button hover:text-white text-[11px] font-semibold transition-colors flex items-center gap-1 shrink-0 cursor-pointer"
                    >
                      <Plus className="w-3 h-3" />
                      <span>Add</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sticky Drawer Footer */}
        {items.length > 0 && (
          <div className="p-4 md:p-5 bg-white border-t border-maroon/10 shadow-lg space-y-3 shrink-0">
            {/* Plain packaging confirmation */}
            <div className="flex items-center gap-2 text-[11px] text-teal-deep bg-teal/10 p-2 rounded-lg">
              <ShieldCheck className="w-4 h-4 text-teal shrink-0" />
              <span>100% Plain packaging guarantee included</span>
            </div>

            {/* Totals */}
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-muted">
                <span>Subtotal</span>
                <span className="font-semibold text-ink tabular-nums">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-muted">
                <span>Shipping</span>
                <span className="font-semibold text-ink tabular-nums">
                  {deliveryFee === 0 ? "FREE" : formatPrice(deliveryFee)}
                </span>
              </div>
              <div className="flex justify-between text-sm font-bold text-maroon pt-1 border-t border-maroon/10">
                <span>Total to Pay</span>
                <span className="tabular-nums text-base">{formatPrice(total)}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <Button
                variant="outline"
                size="md"
                onClick={handleViewCartClick}
                className="w-full"
              >
                View Full Cart
              </Button>
              <Button
                variant="primary"
                size="md"
                onClick={handleCheckoutClick}
                rightIcon={<ArrowRight className="w-4 h-4" />}
                className="w-full"
              >
                Checkout
              </Button>
            </div>
          </div>
        )}
      </div>
    </Drawer>
  );
};
