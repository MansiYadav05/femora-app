import React from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, Leaf, Heart, Sparkles, Award } from "lucide-react";
import { Breadcrumbs } from "../../components/common/Breadcrumbs";
import { LotusDivider } from "../../components/common/LotusDivider";
import { Button } from "../../components/ui/Button";
import logoImg from "../../assets/logo.webp";

export const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-cream py-6 md:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-10 text-ink">
        <Breadcrumbs items={[{ label: "About Femora" }]} />

        {/* Hero */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <div className="w-16 h-16 rounded-full overflow-hidden bg-maroon p-1 mx-auto border-2 border-blush/40 shadow-md">
            <img src={logoImg} alt="Femora Lotus" className="w-full h-full object-cover scale-110" />
          </div>
          <span className="text-xs font-bold text-rose uppercase tracking-widest">
            Our Brand Story & Mission
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-maroon">
            Care without compromises. Privacy without shame.
          </h1>
          <p className="text-sm md:text-base text-muted leading-relaxed font-normal">
            Femora was founded on a simple premise: Menstrual wellness in India should feel respectful, gentle on the body, and entirely private.
          </p>
        </div>

        {/* Brand Story Box */}
        <div className="bg-white rounded-3xl border border-maroon/10 shadow-femora p-6 sm:p-10 space-y-6 text-sm leading-relaxed text-ink/85">
          <h2 className="text-xl font-heading font-bold text-maroon">The Femora Story</h2>
          <p>
            For generations, purchasing sanitary napkins in India involved awkward black plastic bags, hurried counter exchanges, and products laced with synthetic plastics, chlorine bleaching, and synthetic fragrances that trigger friction rashes and chafing.
          </p>
          <p>
            We set out to redesign this experience from the inside out. By combining certified GOTS organic cotton topsheets, plant-based absorbent cores, and therapeutic Ayurvedic essential oils with an unwavering commitment to 100% plain outer packaging, Femora empowers menstruators to care for their cycles with pride, comfort, and zero awkwardness.
          </p>
        </div>

        <LotusDivider />

        {/* Three Core Brand Values as specified */}
        <div className="space-y-6">
          <h2 className="text-2xl font-heading font-bold text-maroon text-center">
            Our Three Pillars
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Value 1: Privacy */}
            <div className="bg-white p-6 rounded-2xl border border-maroon/10 shadow-femora space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-maroon text-white flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-aqua" />
              </div>
              <h3 className="font-heading font-semibold text-lg text-maroon">1. Privacy</h3>
              <p className="text-xs text-muted leading-relaxed">
                Plain cardboard parcel with a neutral shipping label. No brand logos, no period product words, and zero curious glances from delivery couriers or family.
              </p>
            </div>

            {/* Value 2: Organic */}
            <div className="bg-white p-6 rounded-2xl border border-maroon/10 shadow-femora space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-teal-deep text-white flex items-center justify-center">
                <Leaf className="w-6 h-6 text-aqua" />
              </div>
              <h3 className="font-heading font-semibold text-lg text-maroon">2. Organic & Gentle</h3>
              <p className="text-xs text-muted leading-relaxed">
                100% certified organic cotton and pure Ayurvedic essential botanicals. Completely chlorine-free, perfume-free, and toxin-free against delicate intimate skin.
              </p>
            </div>

            {/* Value 3: Care */}
            <div className="bg-white p-6 rounded-2xl border border-maroon/10 shadow-femora space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-rose-button text-white flex items-center justify-center">
                <Heart className="w-6 h-6 text-blush" />
              </div>
              <h3 className="font-heading font-semibold text-lg text-maroon">3. Shame-Free Care</h3>
              <p className="text-xs text-muted leading-relaxed">
                Warm, factual, and medically grounded cycle care that honors natural physiology without shame, taboo, or clinical coldness.
              </p>
            </div>
          </div>
        </div>

        <LotusDivider />

        {/* Call to Action */}
        <div className="text-center p-8 bg-blush-bg/60 rounded-3xl border border-blush/40 space-y-4">
          <h3 className="font-heading font-bold text-2xl text-maroon">Ready to switch to gentler period care?</h3>
          <p className="text-xs sm:text-sm text-muted max-w-md mx-auto">
            Discover our ultra-thin organic pads, medical-grade cups, and soothing cramp relief kits today.
          </p>
          <div className="pt-2">
            <Link to="/shop">
              <Button variant="primary" size="lg">Explore the Store</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
