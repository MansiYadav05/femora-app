import React, { useState } from "react";
import padsImg from "../../assets/images/product_organic_pads_1793194420084.jpg";
import tamponsImg from "../../assets/images/product_organic_tampons_1793194420868.jpg";
import cupsImg from "../../assets/images/product_menstrual_cup_1793194421608.jpg";
import patchesImg from "../../assets/images/product_heating_patches_1793194421954.jpg";
import rollonImg from "../../assets/images/product_cramp_rollon_1793194422431.jpg";
import waterbagImg from "../../assets/images/product_hot_water_bag_1793194423231.jpg";
import kitImg from "../../assets/images/product_relief_kit_1793194423555.jpg";

export const THEME_IMAGES: Record<string, string> = {
  pads: padsImg,
  tampons: tamponsImg,
  cups: cupsImg,
  patches: patchesImg,
  rollon: rollonImg,
  waterbag: waterbagImg,
  kit: kitImg,
};

export interface ProductArtworkProps {
  theme?: "pads" | "tampons" | "cups" | "patches" | "rollon" | "waterbag" | "kit" | string;
  src?: string;
  alt?: string;
  className?: string;
  aspectRatio?: "4/3" | "square" | "wide";
  zoomOnHover?: boolean;
}

export const ProductArtwork: React.FC<ProductArtworkProps> = ({
  theme = "pads",
  src,
  alt = "Femora organic period care product",
  className = "",
  aspectRatio = "4/3",
  zoomOnHover = true,
}) => {
  const [hasError, setHasError] = useState(false);

  const aspectClass =
    aspectRatio === "square"
      ? "aspect-square"
      : aspectRatio === "wide"
      ? "aspect-16/9"
      : "aspect-4/3";

  // Resolve image source: custom URL, or theme photo, or fallback to pads photo
  const resolvedSrc = src || THEME_IMAGES[theme] || padsImg;

  return (
    <div
      className={`relative overflow-hidden flex items-center justify-center select-none bg-cream/60 ${aspectClass} ${className}`}
    >
      {!hasError ? (
        <img
          src={resolvedSrc}
          alt={alt}
          loading="lazy"
          decoding="async"
          onError={() => setHasError(true)}
          className={`w-full h-full object-cover object-center ${
            zoomOnHover ? "transition-transform duration-500 ease-out group-hover:scale-105" : ""
          }`}
        />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center bg-blush-bg/60 p-4 text-center">
          <span className="font-heading font-semibold text-maroon text-sm">Femora Organic</span>
          <span className="text-[11px] text-muted capitalize mt-1">{theme} care</span>
        </div>
      )}
    </div>
  );
};
