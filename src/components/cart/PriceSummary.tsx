import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, ArrowRight, Tag, Truck } from "lucide-react";
import { formatPrice } from "../../utils/formatPrice";
import { FREE_SHIPPING_THRESHOLD, STANDARD_SHIPPING_FEE } from "../../utils/constants";
import { Button } from "../ui/Button";
import { Switch } from "../ui/Switch";
import toast from "react-hot-toast";

export interface PriceSummaryProps {
  subtotal: number;
  deliveryFee: number;
  total: number;
  discreetPackaging: boolean;
  onToggleDiscreet?: () => void;
  showCheckoutButton?: boolean;
  onCheckout?: () => void;
  checkoutText?: string;
  isProcessing?: boolean;
}

export const PriceSummary: React.FC<PriceSummaryProps> = ({
  subtotal,
  deliveryFee,
  total,
  discreetPackaging,
  onToggleDiscreet,
  showCheckoutButton = true,
  onCheckout,
  checkoutText = "Proceed to Checkout",
  isProcessing = false,
}) => {
  const [couponCode, setCouponCode] = useState("");

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.trim()) {
      toast("Coupon entered. Note: Coupons are currently in preview mode.", {
        icon: "🏷️",
        style: {
          borderRadius: "10px",
          background: "#2B1215",
          color: "#fff",
          fontSize: "13px",
        },
      });
    }
  };

  const amountNeededForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const freeShippingProgress = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));

  return (
    <div className="bg-white rounded-2xl border border-maroon/10 shadow-femora p-5 md:p-6 space-y-5">
      <h3 className="font-heading font-semibold text-lg text-maroon">Order Summary</h3>

      {/* Free Shipping Progress Indicator */}
      {subtotal > 0 && (
        <div className="bg-cream p-3 rounded-xl border border-maroon/10 space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="flex items-center gap-1.5 font-medium text-ink">
              <Truck className="w-3.5 h-3.5 text-teal" />
              {amountNeededForFreeShipping === 0 ? (
                <span className="text-teal-deep font-bold">You qualify for FREE Delivery!</span>
              ) : (
                <span>
                  Add <strong className="text-maroon">{formatPrice(amountNeededForFreeShipping)}</strong> more for Free Shipping
                </span>
              )}
            </span>
            <span className="text-[11px] font-semibold text-muted tabular-nums">
              {freeShippingProgress}%
            </span>
          </div>
          <div className="w-full h-1.5 bg-maroon/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-teal-deep rounded-full transition-all duration-300"
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>
      )}

      {/* Coupon Field (UI Only as requested) */}
      <form onSubmit={handleApplyCoupon} className="flex gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Coupon or Gift Code"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            className="w-full text-xs rounded-xl border border-maroon/15 px-3 py-2 uppercase placeholder:normal-case placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-aqua"
          />
          <Tag className="w-3.5 h-3.5 text-muted absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
        <button
          type="submit"
          className="px-3.5 py-2 text-xs font-semibold rounded-xl bg-blush-bg text-maroon hover:bg-rose/10 border border-maroon/15 transition-colors cursor-pointer"
        >
          Apply
        </button>
      </form>

      {/* Breakdown Items */}
      <div className="space-y-2.5 text-xs text-ink/80 pt-2 border-t border-maroon/10">
        <div className="flex justify-between items-center">
          <span className="text-muted">Subtotal (Taxes incl.)</span>
          <span className="font-semibold tabular-nums text-sm">{formatPrice(subtotal)}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-muted">Discreet Shipping</span>
          <span className="font-semibold tabular-nums text-sm">
            {deliveryFee === 0 ? (
              <span className="text-teal-deep font-bold uppercase text-xs">FREE</span>
            ) : (
              formatPrice(deliveryFee)
            )}
          </span>
        </div>

        {/* Discreet packaging toggle */}
        {onToggleDiscreet && (
          <div className="pt-2 pb-1">
            <Switch
              checked={discreetPackaging}
              onChange={onToggleDiscreet}
              label="100% Plain Packaging"
              description="Zero product names, logos, or references outside."
            />
          </div>
        )}

        <div className="border-t border-maroon/10 pt-3 flex justify-between items-baseline">
          <div>
            <span className="font-heading font-bold text-base text-maroon">Total to Pay</span>
            <p className="text-[10px] text-muted">All taxes & duties included</p>
          </div>
          <span className="text-xl font-bold text-maroon tabular-nums">
            {formatPrice(total)}
          </span>
        </div>
      </div>

      {/* Discreet Box Guarantee Note */}
      <div className="p-3 bg-blush-bg/50 rounded-xl border border-blush/40 flex items-start gap-2.5 text-xs text-ink/90">
        <ShieldCheck className="w-4 h-4 text-teal-deep shrink-0 mt-0.5" />
        <p className="leading-snug">
          <strong>Privacy Promise:</strong> Shipped in an unmarked brown box with a neutral logistics label. Total privacy at your doorstep.
        </p>
      </div>

      {/* Checkout CTA */}
      {showCheckoutButton && (
        <div>
          {onCheckout ? (
            <Button
              variant="primary"
              size="lg"
              className="w-full"
              isLoading={isProcessing}
              onClick={onCheckout}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              {checkoutText}
            </Button>
          ) : (
            <Link to="/checkout" className="block">
              <Button
                variant="primary"
                size="lg"
                className="w-full"
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                {checkoutText}
              </Button>
            </Link>
          )}
        </div>
      )}
    </div>
  );
};
