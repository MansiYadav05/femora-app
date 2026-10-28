import React from "react";
import { Breadcrumbs } from "../../components/common/Breadcrumbs";

export const Terms: React.FC = () => {
  return (
    <div className="min-h-screen bg-cream py-6 md:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8 text-ink">
        <Breadcrumbs items={[{ label: "Terms and Conditions" }]} />

        <div className="space-y-2 pb-4 border-b border-maroon/10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-amber-100 text-amber-900 text-xs font-semibold uppercase tracking-wider">
            <span>[DRAFT TERMS DOCUMENT]</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-heading font-bold text-maroon">
            Terms & Conditions of Service
          </h1>
          <p className="text-xs text-muted">Draft Version 1.0 · Governing use of Femora Storefront</p>
        </div>

        <div className="bg-white rounded-3xl border border-maroon/10 shadow-femora p-6 sm:p-10 space-y-6 text-sm text-ink/85 leading-relaxed">
          <section className="space-y-2">
            <h3 className="font-heading font-bold text-base text-maroon">1. Agreement to Terms</h3>
            <p>
              By accessing or using the Femora web application, browsing products, or submitting orders, you agree to be bound by these Terms and Conditions and our associated Privacy and Shipping policies.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="font-heading font-bold text-base text-maroon">2. Product Descriptions & No Medical Claims</h3>
            <p>
              Femora provides certified organic cotton menstrual care products, silicone hygiene items, and herbal cramp relief products designed for personal comfort. Product descriptions are provided factually and do not constitute professional medical advice, clinical diagnosis, or promises to cure medical conditions such as severe endometriosis or pelvic pathology.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="font-heading font-bold text-base text-maroon">3. Pricing & Currency</h3>
            <p>
              All listed product prices and order charges are displayed in Indian Rupees (INR) and are inclusive of Goods and Services Tax (GST) unless explicitly noted otherwise.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="font-heading font-bold text-base text-maroon">4. Governing Law & Jurisdiction</h3>
            <p>
              These Terms and any non-contractual disputes arising out of the use of Femora shall be governed by and construed in accordance with the laws of India, subject to the jurisdiction of the competent courts in Bengaluru, Karnataka.
            </p>
          </section>

          <p className="text-xs text-muted pt-4 border-t border-maroon/10 italic">
            Note: This document represents a formal legal draft pending final statutory regulatory filing.
          </p>
        </div>
      </div>
    </div>
  );
};
