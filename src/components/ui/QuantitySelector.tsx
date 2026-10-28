import React from "react";
import { Minus, Plus } from "lucide-react";

export interface QuantitySelectorProps {
  quantity: number;
  max?: number;
  min?: number;
  onChange: (newQuantity: number) => void;
  size?: "sm" | "md";
  disabled?: boolean;
}

export const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  quantity,
  max = 99,
  min = 1,
  onChange,
  size = "md",
  disabled = false,
}) => {
  const isSm = size === "sm";

  const handleDecrease = () => {
    if (quantity > min) {
      onChange(quantity - 1);
    }
  };

  const handleIncrease = () => {
    if (quantity < max) {
      onChange(quantity + 1);
    }
  };

  return (
    <div
      className={`inline-flex items-center rounded-full border border-maroon/20 bg-white ${
        isSm ? "h-7 px-1 text-xs" : "h-9 px-1.5 text-sm"
      } ${disabled ? "opacity-50 pointer-events-none" : ""}`}
    >
      <button
        type="button"
        onClick={handleDecrease}
        disabled={quantity <= min || disabled}
        className="p-1 rounded-full text-muted hover:text-maroon hover:bg-blush-bg transition-colors disabled:opacity-30 disabled:hover:bg-transparent"
        aria-label="Decrease quantity"
      >
        <Minus className={isSm ? "w-3 h-3" : "w-3.5 h-3.5"} />
      </button>

      <span
        className={`font-semibold text-ink text-center tabular-nums select-none ${
          isSm ? "w-6" : "w-8"
        }`}
      >
        {quantity}
      </span>

      <button
        type="button"
        onClick={handleIncrease}
        disabled={quantity >= max || disabled}
        className="p-1 rounded-full text-muted hover:text-maroon hover:bg-blush-bg transition-colors disabled:opacity-30 disabled:hover:bg-transparent"
        aria-label="Increase quantity"
      >
        <Plus className={isSm ? "w-3 h-3" : "w-3.5 h-3.5"} />
      </button>
    </div>
  );
};
