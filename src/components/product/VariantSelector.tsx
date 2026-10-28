import React from "react";
import { ProductVariant } from "../../data/mockData";
import { formatPrice } from "../../utils/formatPrice";

export interface VariantSelectorProps {
  variants: ProductVariant[];
  selectedVariant: string;
  onSelect: (variantName: string) => void;
  basePrice: number;
}

export const VariantSelector: React.FC<VariantSelectorProps> = ({
  variants,
  selectedVariant,
  onSelect,
  basePrice,
}) => {
  if (!variants || variants.length <= 1) return null;

  return (
    <div className="space-y-2">
      <label className="block text-xs font-semibold uppercase tracking-wider text-ink/80">
        Select Size / Pack:
      </label>
      <div className="flex flex-wrap gap-2.5">
        {variants.map((v) => {
          const isSelected = selectedVariant === v.name;
          const finalPrice = basePrice + (v.priceModifier || 0);

          return (
            <button
              key={v.id}
              type="button"
              onClick={() => onSelect(v.name)}
              className={`px-3.5 py-2 rounded-xl text-xs font-medium border text-left transition-all cursor-pointer ${
                isSelected
                  ? "border-maroon bg-blush-bg/60 text-maroon font-semibold ring-2 ring-maroon/20 shadow-xs"
                  : "border-maroon/15 bg-white text-ink hover:border-maroon/40"
              }`}
            >
              <span>{v.name}</span>
              {v.priceModifier ? (
                <span className="ml-1.5 text-muted font-normal tabular-nums">
                  ({formatPrice(finalPrice)})
                </span>
              ) : null}
            </button>
          );
        })}
      </div>
    </div>
  );
};
