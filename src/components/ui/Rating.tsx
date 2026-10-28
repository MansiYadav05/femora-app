import React from "react";
import { Star } from "lucide-react";

export interface RatingProps {
  score: number;
  count?: number;
  size?: "sm" | "md";
  showCount?: boolean;
}

export const Rating: React.FC<RatingProps> = ({
  score,
  count,
  size = "sm",
  showCount = true,
}) => {
  const iconSize = size === "sm" ? "w-3.5 h-3.5" : "w-4 h-4";
  const fontSize = size === "sm" ? "text-xs" : "text-sm";

  return (
    <div className={`inline-flex items-center gap-1.5 ${fontSize}`}>
      <div className="flex items-center text-amber-500">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${iconSize} ${
              star <= Math.round(score) ? "fill-amber-400 text-amber-400" : "text-amber-200 fill-amber-100"
            }`}
          />
        ))}
      </div>
      <span className="font-semibold text-ink tabular-nums">{score.toFixed(1)}</span>
      {showCount && count !== undefined && (
        <span className="text-muted tabular-nums">({count})</span>
      )}
    </div>
  );
};
