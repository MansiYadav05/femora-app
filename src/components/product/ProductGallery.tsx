import React, { useState } from "react";
import { ProductArtwork } from "../common/ProductArtwork";
import { ShieldCheck, Sparkles } from "lucide-react";

export interface ProductGalleryProps {
  theme: string;
  name: string;
}

export const ProductGallery: React.FC<ProductGalleryProps> = ({ theme, name }) => {
  const [activeView, setActiveView] = useState(0);

  const views = [
    { label: "Main Pack", sub: "Studio Pack Shot", zoom: "scale-100" },
    { label: "Texture Close-up", sub: "Purity & Botanical Core", zoom: "scale-130" },
    { label: "Plain Packaging", sub: "Discreet Unmarked Box", zoom: "scale-105" },
  ];

  return (
    <div className="flex flex-col gap-4">
      {/* Main Large Artwork Container */}
      <div className="relative bg-cream/40 rounded-2xl border border-maroon/15 shadow-femora overflow-hidden group">
        <div className={`w-full overflow-hidden transition-transform duration-500 ease-out ${views[activeView].zoom}`}>
          <ProductArtwork
            theme={theme}
            alt={name}
            aspectRatio="square"
            className="w-full max-h-[460px] mx-auto object-cover"
            zoomOnHover={false}
          />
        </div>

        {/* View Indicator Overlay */}
        <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-maroon border border-maroon/10 shadow-xs flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-rose" />
          <span>{views[activeView].label}</span>
        </div>

        {/* Plain Box Guarantee Ribbon */}
        <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-md text-[11px] font-semibold text-teal-deep border border-teal/20 flex items-center gap-1 shadow-xs">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Plain Box Guarantee</span>
        </div>
      </div>

      {/* Thumbnails Row */}
      <div className="grid grid-cols-3 gap-3">
        {views.map((v, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setActiveView(i)}
            className={`p-2.5 rounded-xl text-left border transition-all cursor-pointer ${
              activeView === i
                ? "border-maroon bg-white shadow-sm ring-2 ring-maroon/20"
                : "border-maroon/10 bg-cream/60 hover:bg-white text-muted"
            }`}
          >
            <p className="text-xs font-semibold text-ink truncate">{v.label}</p>
            <p className="text-[10px] text-muted truncate mt-0.5">{v.sub}</p>
          </button>
        ))}
      </div>
    </div>
  );
};
