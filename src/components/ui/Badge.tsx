import React from "react";
import { Sparkles, Leaf, Percent, ShieldCheck } from "lucide-react";

export interface BadgeProps {
  variant?: "organic" | "bestseller" | "discount" | "status" | "discreet" | "neutral";
  statusColor?: "Placed" | "Packed" | "Shipped" | "Out for delivery" | "Delivered" | "Cancelled";
  children: React.ReactNode;
  className?: string;
  size?: "sm" | "md";
}

export const Badge: React.FC<BadgeProps> = ({
  variant = "neutral",
  statusColor,
  children,
  className = "",
  size = "sm",
}) => {
  const sizeClasses = size === "sm" ? "text-[11px] px-2 py-0.5" : "text-xs px-2.5 py-1";

  if (variant === "organic") {
    // Teal-deep with white text for AA contrast, or soft light tint with dark teal text
    return (
      <span
        className={`inline-flex items-center gap-1 font-medium rounded-md bg-teal-deep text-white ${sizeClasses} ${className}`}
      >
        <Leaf className="w-3 h-3 text-aqua" />
        <span>{children}</span>
      </span>
    );
  }

  if (variant === "bestseller") {
    return (
      <span
        className={`inline-flex items-center gap-1 font-semibold rounded-md bg-rose-button text-white ${sizeClasses} ${className}`}
      >
        <Sparkles className="w-3 h-3 text-blush" />
        <span>{children}</span>
      </span>
    );
  }

  if (variant === "discount") {
    return (
      <span
        className={`inline-flex items-center gap-0.5 font-bold rounded-md bg-rose/15 text-rose border border-rose/30 ${sizeClasses} ${className}`}
      >
        <Percent className="w-3 h-3" />
        <span>{children}</span>
      </span>
    );
  }

  if (variant === "discreet") {
    return (
      <span
        className={`inline-flex items-center gap-1 font-medium rounded-md bg-maroon/10 text-maroon border border-maroon/20 ${sizeClasses} ${className}`}
      >
        <ShieldCheck className="w-3 h-3 text-teal-deep" />
        <span>{children}</span>
      </span>
    );
  }

  if (variant === "status" && statusColor) {
    const statusStyles: Record<string, string> = {
      Placed: "bg-amber-100 text-amber-900 border border-amber-300",
      Packed: "bg-blue-100 text-blue-900 border border-blue-300",
      Shipped: "bg-purple-100 text-purple-900 border border-purple-300",
      "Out for delivery": "bg-indigo-100 text-indigo-900 border border-indigo-300",
      Delivered: "bg-emerald-100 text-emerald-900 border border-emerald-300",
      Cancelled: "bg-rose/15 text-rose border border-rose/30",
    };

    return (
      <span
        className={`inline-flex items-center gap-1.5 font-medium rounded-md ${
          statusStyles[statusColor] || "bg-slate-100 text-slate-800"
        } ${sizeClasses} ${className}`}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-current opacity-75" />
        <span>{children}</span>
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center font-medium rounded-md bg-blush-bg text-maroon border border-maroon/10 ${sizeClasses} ${className}`}
    >
      {children}
    </span>
  );
};
