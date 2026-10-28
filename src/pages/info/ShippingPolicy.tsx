import React from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, Truck, Clock, AlertCircle } from "lucide-react";
import { Breadcrumbs } from "../../components/common/Breadcrumbs";
import { FREE_SHIPPING_THRESHOLD, STANDARD_SHIPPING_FEE, EXPRESS_SHIPPING_FEE } from "../../utils/constants";
import { formatPrice } from "../../utils/formatPrice";

export const ShippingPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-cream py-6 md:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8 text-ink">
        <Breadcrumbs items={[{ label: "Shipping & Plain Packaging Policy" }]} />

        {/* Title */}
        <div className="space-y-2 pb-4 border-b border-maroon/10">
          <span className="text-xs font-bold text-rose uppercase tracking-widest">
            Privacy & Logistics
          </span>
          <h1 className="text-3xl sm:text-4xl font-heading font-bold text-maroon">
            Shipping & Discreet Delivery Policy
          </h1>
          <p className="text-xs sm:text-sm text-muted">
            Last updated: October 2026 · Valid across all 28 Indian States & Union Territories.
          </p>
        </div>

        {/* Highlight Box: Plain Packaging Promise */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-maroon/10 shadow-femora space-y-4">
          <div className="flex items-center gap-3 text-maroon">
            <div className="w-10 h-10 rounded-xl bg-blush-bg flex items-center justify-center text-teal-deep">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-heading font-bold">1. The 100% Plain Packaging Promise</h2>
          </div>
          <p className="text-xs sm:text-sm text-muted leading-relaxed">
            We understand that period care is deeply personal. Every single order placed on Femora is shipped in an unmarked, plain brown corrugated cardboard carton.
          </p>
          <ul className="space-y-2 text-xs sm:text-sm text-ink/85">
            <li className="flex items-start gap-2">
              <span className="text-teal-deep font-bold">•</span>
              <span><strong>No Brand Logos:</strong> The exterior of the box contains zero Femora branding or lotus artwork.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-teal-deep font-bold">•</span>
              <span><strong>No Product Descriptions:</strong> Words like &quot;Sanitary Napkin&quot;, &quot;Menstrual Cup&quot;, or &quot;Cramp Relief&quot; are completely omitted from the outer shipping label.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-teal-deep font-bold">•</span>
              <span><strong>Neutral Sender Name:</strong> The parcel return address is listed simply under our registered corporate logistics entity (&quot;FM Logistics / Fulfillment Partner&quot;).</span>
            </li>
          </ul>
        </div>

        {/* Delivery Times & Speeds */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-maroon/10 shadow-femora space-y-4">
          <div className="flex items-center gap-3 text-maroon">
            <div className="w-10 h-10 rounded-xl bg-blush-bg flex items-center justify-center text-rose">
              <Clock className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-heading font-bold">2. Dispatch & Delivery Timelines</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 text-xs sm:text-sm">
            <div className="p-4 rounded-2xl bg-cream border border-maroon/10 space-y-1">
              <h4 className="font-semibold text-ink">Same-Day Dispatch</h4>
              <p className="text-muted leading-relaxed">
                Orders placed before 2:00 PM IST (Monday through Saturday) are packed and handed over to our courier partner the very same afternoon.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-cream border border-maroon/10 space-y-1">
              <h4 className="font-semibold text-ink">Metro Transit</h4>
              <p className="text-muted leading-relaxed">
                Major metros (Bengaluru, Mumbai, Delhi NCR, Chennai, Hyderabad, Kolkata) generally receive deliveries in 2 to 3 business days.
              </p>
            </div>
          </div>
        </div>

        {/* Shipping Charges */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-maroon/10 shadow-femora space-y-4">
          <div className="flex items-center gap-3 text-maroon">
            <div className="w-10 h-10 rounded-xl bg-blush-bg flex items-center justify-center text-teal-deep">
              <Truck className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-heading font-bold">3. Shipping Rates & Thresholds</h2>
          </div>
          <div className="space-y-2 text-xs sm:text-sm text-ink/85">
            <p>
              • <strong>Free Shipping:</strong> All orders with a subtotal of <strong>{formatPrice(FREE_SHIPPING_THRESHOLD)}</strong> or higher qualify for 100% Free Standard Delivery across India.
            </p>
            <p>
              • <strong>Standard Shipping:</strong> A flat nominal fee of <strong>{formatPrice(STANDARD_SHIPPING_FEE)}</strong> applies to orders under {formatPrice(FREE_SHIPPING_THRESHOLD)}.
            </p>
            <p>
              • <strong>Express Delivery:</strong> Available for select metro pin codes for <strong>{formatPrice(EXPRESS_SHIPPING_FEE)}</strong>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
