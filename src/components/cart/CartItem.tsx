import React from "react";
import { Link } from "react-router-dom";
import { Trash2 } from "lucide-react";
import { CartItemType } from "../../services/cartService";
import { formatPrice } from "../../utils/formatPrice";
import { QuantitySelector } from "../ui/QuantitySelector";
import { ProductArtwork } from "../common/ProductArtwork";

export interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (quantity: number) => void;
  onRemove: () => void;
}

export const CartItem: React.FC<CartItemProps> = ({
  item,
  onUpdateQuantity,
  onRemove,
}) => {
  const { product, quantity, selectedVariant } = item;

  // Compute unit price factoring in variant modifier
  let unitPrice = product.price;
  if (selectedVariant && product.variants) {
    const v = product.variants.find((vr) => vr.name === selectedVariant);
    if (v?.priceModifier) {
      unitPrice += v.priceModifier;
    }
  }

  const lineTotal = unitPrice * quantity;

  return (
    <div className="flex gap-3.5 py-3.5 border-b border-maroon/10 last:border-b-0 items-start">
      {/* Thumbnail artwork */}
      <Link
        to={`/product/${product.slug}`}
        className="w-16 h-16 rounded-xl bg-cream border border-maroon/10 overflow-hidden shrink-0 flex items-center justify-center p-1"
      >
        <ProductArtwork
          theme={product.imageTheme || "pads"}
          aspectRatio="square"
          className="w-full h-full"
        />
      </Link>

      {/* Details & controls */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <Link
            to={`/product/${product.slug}`}
            className="text-xs font-semibold text-ink hover:text-maroon transition-colors line-clamp-1"
          >
            {product.name}
          </Link>
          <button
            type="button"
            onClick={onRemove}
            aria-label="Remove item"
            className="text-muted hover:text-rose p-1 transition-colors cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>

        {selectedVariant && (
          <p className="text-[11px] text-muted font-medium mt-0.5">{selectedVariant}</p>
        )}

        <div className="flex items-center justify-between mt-2.5">
          <QuantitySelector
            quantity={quantity}
            max={product.stock || 20}
            onChange={onUpdateQuantity}
            size="sm"
          />
          <div className="text-right">
            <span className="text-sm font-bold text-maroon tabular-nums">
              {formatPrice(lineTotal)}
            </span>
            {quantity > 1 && (
              <p className="text-[10px] text-muted tabular-nums">
                {formatPrice(unitPrice)} each
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
