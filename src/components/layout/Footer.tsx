import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, Leaf, Clock, ArrowRight, CheckCircle2 } from "lucide-react";
import logoImg from "../../assets/logo.webp";
import { CATEGORIES } from "../../utils/constants";

export const Footer: React.FC = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes("@")) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="bg-maroon-dark text-cream border-t border-maroon select-none">
      {/* Brand Promises Trust Strip */}
      <div className="border-b border-white/10 bg-maroon/60 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
          <div className="flex items-center gap-4 justify-center md:justify-start">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-aqua shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm">Discreet Delivery</h4>
              <p className="text-xs text-cream/70 mt-0.5">Plain packaging. No product names outside.</p>
            </div>
          </div>

          <div className="flex items-center gap-4 justify-center md:justify-start">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-teal shrink-0">
              <Leaf className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm">Organic & Gentle</h4>
              <p className="text-xs text-cream/70 mt-0.5">100% GOTS organic cotton & herbal oils.</p>
            </div>
          </div>

          <div className="flex items-center gap-4 justify-center md:justify-start">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-blush shrink-0">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm">Fast Dispatch</h4>
              <p className="text-xs text-cream/70 mt-0.5">Orders before 2 PM dispatched the same day.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-maroon flex items-center justify-center border border-blush/30 shrink-0">
                <img src={logoImg} alt="Femora" className="w-full h-full object-cover scale-110" />
              </div>
              <div>
                <span className="font-heading font-bold text-2xl text-white tracking-tight">Femora</span>
                <p className="text-xs text-blush tracking-wider uppercase font-medium">Gentle Period Care & Cramp Relief</p>
              </div>
            </div>
            <p className="text-sm text-cream/80 max-w-sm leading-relaxed">
              India&apos;s trusted destination for certified organic pads, medical-grade cups, air-activated heat patches, and soothing herbal cramp care—delivered with uncompromising privacy.
            </p>
            <div className="pt-2">
              <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-aqua text-xs font-semibold tracking-wide">
                Plain packaging. Always.
              </span>
            </div>
          </div>

          {/* Shop Column */}
          <div className="space-y-3">
            <h5 className="font-semibold text-sm text-white tracking-wider uppercase font-heading">Shop</h5>
            <ul className="space-y-2 text-xs text-cream/75">
              {CATEGORIES.slice(0, 6).map((cat) => (
                <li key={cat.id}>
                  <Link to={`/category/${cat.slug}`} className="hover:text-white hover:underline transition-colors">
                    {cat.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/kits" className="hover:text-white hover:underline transition-colors text-blush font-medium">
                  Relief Kits & Bundles
                </Link>
              </li>
            </ul>
          </div>

          {/* Help & Support */}
          <div className="space-y-3">
            <h5 className="font-semibold text-sm text-white tracking-wider uppercase font-heading">Help & Care</h5>
            <ul className="space-y-2 text-xs text-cream/75">
              <li>
                <Link to="/track-order" className="hover:text-white hover:underline transition-colors">
                  Track Your Order
                </Link>
              </li>
              <li>
                <Link to="/shipping-policy" className="hover:text-white hover:underline transition-colors">
                  Shipping & Plain Packaging
                </Link>
              </li>
              <li>
                <Link to="/returns-policy" className="hover:text-white hover:underline transition-colors">
                  Hygiene Returns & Refunds
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-white hover:underline transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white hover:underline transition-colors">
                  Contact Support
                </Link>
              </li>
              <li>
                <Link to="/learn" className="hover:text-white hover:underline transition-colors text-aqua font-medium">
                  Period Health Articles
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="space-y-3">
            <h5 className="font-semibold text-sm text-white tracking-wider uppercase font-heading">Gentle Updates</h5>
            <p className="text-xs text-cream/70 leading-relaxed">
              Quiet menstrual health tips, self-care routines, and private seasonal savings. No spam, ever.
            </p>
            {subscribed ? (
              <div className="p-3 rounded-xl bg-teal-deep/50 border border-teal text-xs text-white flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-aqua shrink-0" />
                <span>Thank you! You are on our private list.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-maroon/90 text-white placeholder:text-cream/50 text-xs rounded-xl px-3.5 py-2.5 border border-white/20 focus:outline-none focus:ring-2 focus:ring-aqua"
                  />
                  <button
                    type="submit"
                    aria-label="Subscribe"
                    className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1.5 rounded-lg bg-rose-button text-white hover:bg-rose transition-colors cursor-pointer"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-[11px] text-cream/50">Unsubscribe anytime with one tap.</p>
              </form>
            )}
          </div>
        </div>

        {/* Accepted Payment Methods & Legal */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-cream/60">
          <div className="flex items-center flex-wrap gap-2 justify-center md:justify-start">
            <span className="text-[11px] uppercase tracking-wider text-cream/50 mr-2">Secure Payments:</span>
            {["UPI", "RuPay", "Visa", "Mastercard", "NetBanking", "Cash on Delivery"].map((method) => (
              <span
                key={method}
                className="px-2.5 py-1 rounded-md bg-white/10 text-cream/90 text-[11px] font-medium"
              >
                {method}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <span>·</span>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <span>·</span>
            <Link to="/about" className="hover:text-white transition-colors">About Us</Link>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-6 text-center text-[11px] text-cream/40">
          &copy; {new Date().getFullYear()} Femora Wellness India Pvt. Ltd. All rights reserved. Discreet packaging guaranteed on every shipment.
        </div>
      </div>
    </footer>
  );
};
