import React from "react";
import { Breadcrumbs } from "../../components/common/Breadcrumbs";
import { ShieldCheck } from "lucide-react";

export const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-cream py-6 md:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8 text-ink">
        <Breadcrumbs items={[{ label: "Privacy Policy" }]} />

        <div className="space-y-2 pb-4 border-b border-maroon/10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-amber-100 text-amber-900 text-xs font-semibold uppercase tracking-wider">
            <span>[DRAFT POLICY DOCUMENT]</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-heading font-bold text-maroon">
            Privacy Policy
          </h1>
          <p className="text-xs text-muted">Draft Version 1.2 · Prepared for Femora Wellness India</p>
        </div>

        <div className="bg-white rounded-3xl border border-maroon/10 shadow-femora p-6 sm:p-10 space-y-6 text-sm text-ink/85 leading-relaxed">
          <div className="p-4 rounded-xl bg-blush-bg/50 border border-blush/40 flex items-start gap-2.5 text-xs text-maroon">
            <ShieldCheck className="w-4 h-4 text-teal-deep shrink-0 mt-0.5" />
            <p>
              <strong>Core Privacy Commitment:</strong> We never sell customer health information, cycle dates, product choices, or contact coordinates to advertising networks.
            </p>
          </div>

          <section className="space-y-2">
            <h3 className="font-heading font-bold text-base text-maroon">1. Information We Collect</h3>
            <p>
              When you browse our storefront, register an account, or complete a purchase, we collect the necessary contact details required to fulfill your order: full name, shipping address, 10-digit telephone number for delivery couriers, and email address for neutral status notifications.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="font-heading font-bold text-base text-maroon">2. Discreet Logistics & Packaging Data</h3>
            <p>
              All customer parcels are dispatched via contracted third-party logistics providers. We transmit only minimal shipping details (recipient name, address, phone number). Exterior shipping documentation does not list sensitive product names, period care classifications, or intimate hygiene identifiers.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="font-heading font-bold text-base text-maroon">3. Data Security & Storage</h3>
            <p>
              We enforce 256-bit TLS encryption for all data transmissions. Payment data is processed directly via RBI-authorized payment gateways; Femora does not store full credit card numbers or UPI PINs on internal servers.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="font-heading font-bold text-base text-maroon">4. Cookies & Local Storage</h3>
            <p>
              We utilize essential browser local storage to preserve active shopping cart items, saved delivery preferences, and authentication tokens across browsing sessions.
            </p>
          </section>

          <p className="text-xs text-muted pt-4 border-t border-maroon/10 italic">
            Note: This privacy document is marked as draft for informational and compliance review purposes.
          </p>
        </div>
      </div>
    </div>
  );
};
