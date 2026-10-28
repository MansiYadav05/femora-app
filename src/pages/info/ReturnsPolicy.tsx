import React from "react";
import { Link } from "react-router-dom";
import { AlertCircle, RotateCcw, ShieldCheck, CheckCircle2 } from "lucide-react";
import { Breadcrumbs } from "../../components/common/Breadcrumbs";

export const ReturnsPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-cream py-6 md:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8 text-ink">
        <Breadcrumbs items={[{ label: "Hygiene Returns & Refund Policy" }]} />

        {/* Title */}
        <div className="space-y-2 pb-4 border-b border-maroon/10">
          <span className="text-xs font-bold text-rose uppercase tracking-widest">
            Customer Guarantee & Compliance
          </span>
          <h1 className="text-3xl sm:text-4xl font-heading font-bold text-maroon">
            Hygiene Returns & Refund Policy
          </h1>
          <p className="text-xs sm:text-sm text-muted">
            Last updated: October 2026 · Compliant with Indian Medical & Personal Care Standards.
          </p>
        </div>

        {/* Core Rule: Opened Hygiene Products Cannot Be Returned */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-maroon/10 shadow-femora space-y-4">
          <div className="flex items-center gap-3 text-maroon">
            <div className="w-10 h-10 rounded-xl bg-rose/10 flex items-center justify-center text-rose">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-heading font-bold">1. Non-Returnable Hygiene Items</h2>
          </div>
          <div className="p-4 rounded-2xl bg-rose/5 border border-rose/20 text-xs sm:text-sm text-ink/90 leading-relaxed space-y-2">
            <p className="font-semibold text-rose">
              Important Hygiene Regulation:
            </p>
            <p>
              Due to strict intimate hygiene, sanitary safety, and public health regulations, opened or seal-tampered personal care products (including Sanitary Pads, Menstrual Cups, Tampons, and Cramp Roll-ons) <strong>cannot be returned, reused, or restocked</strong> under any circumstances once delivered.
            </p>
          </div>
        </div>

        {/* Damaged or Incorrect Orders */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-maroon/10 shadow-femora space-y-4">
          <div className="flex items-center gap-3 text-maroon">
            <div className="w-10 h-10 rounded-xl bg-teal/10 flex items-center justify-center text-teal-deep">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-heading font-bold">2. Damaged or Defective Deliveries</h2>
          </div>
          <p className="text-xs sm:text-sm text-muted leading-relaxed">
            If your package arrived in a damaged condition, with broken tamper seals, or contains incorrect items:
          </p>
          <ul className="space-y-2 text-xs sm:text-sm text-ink/85">
            <li className="flex items-start gap-2">
              <span className="text-teal-deep font-bold">•</span>
              <span>Notify our team within <strong>48 hours</strong> of delivery with photos of the outer box and products.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-teal-deep font-bold">•</span>
              <span>We will issue an immediate <strong>100% free replacement</strong> dispatched on priority, or process a full refund to your source account.</span>
            </li>
          </ul>
        </div>

        {/* Cancellation Rules as specified */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-maroon/10 shadow-femora space-y-4">
          <div className="flex items-center gap-3 text-maroon">
            <div className="w-10 h-10 rounded-xl bg-blush-bg flex items-center justify-center text-maroon">
              <RotateCcw className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-heading font-bold">3. Order Cancellation Rules</h2>
          </div>
          <div className="space-y-2 text-xs sm:text-sm text-ink/85 leading-relaxed">
            <p>
              • <strong>Before Dispatch:</strong> You may cancel any order directly from your <Link to="/account/orders" className="text-rose-button font-medium underline">My Orders</Link> account dashboard while its status is <strong>Placed</strong> or <strong>Packed</strong>.
            </p>
            <p>
              • <strong>After Dispatch:</strong> Once your shipment has been handed over to the courier partner (status: <strong>Shipped</strong>), the order cannot be intercepted or cancelled in transit. You may refuse delivery at the doorstep.
            </p>
            <p>
              • <strong>Refund Timing:</strong> Approved refunds for cancelled prepaid orders are credited back to the original UPI, Card, or NetBanking method within 2 to 3 business days.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
