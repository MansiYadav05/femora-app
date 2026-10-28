import React from "react";
import { Loader2 } from "lucide-react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "maroon";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = "primary",
      size = "md",
      isLoading = false,
      leftIcon,
      rightIcon,
      className = "",
      disabled,
      ...props
    },
    ref
  ) => {
    // Base styles: pill shape (fully rounded), smooth transition, focus ring
    const baseStyles =
      "inline-flex items-center justify-center font-medium rounded-full transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none whitespace-nowrap shrink-0 active:scale-[0.98]";

    const sizeStyles = {
      sm: "text-xs px-3.5 py-1.5 gap-1.5",
      md: "text-sm px-5 py-2.5 gap-2",
      lg: "text-base px-7 py-3 gap-2.5",
    };

    const variantStyles = {
      // Primary drives the main action: rose-button (#D63868) with white text (passes contrast)
      primary:
        "bg-rose-button text-white hover:bg-rose shadow-sm hover:shadow-md focus-visible:ring-2 focus-visible:ring-aqua",
      // Secondary: teal-deep (#0F7F70) with white text (passes contrast)
      secondary:
        "bg-teal-deep text-white hover:bg-teal focus-visible:ring-2 focus-visible:ring-aqua shadow-sm",
      // Maroon: #800000 with white text
      maroon:
        "bg-maroon text-white hover:bg-maroon-dark focus-visible:ring-2 focus-visible:ring-aqua shadow-sm",
      // Outline: bordered with maroon or rose
      outline:
        "border border-maroon/20 text-maroon hover:bg-blush-bg hover:border-maroon/40 focus-visible:ring-2 focus-visible:ring-aqua",
      // Ghost: transparent background
      ghost:
        "text-ink hover:text-maroon hover:bg-blush-bg/60 focus-visible:ring-2 focus-visible:ring-aqua",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
        {...props}
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin text-current" />
            <span>Processing...</span>
          </>
        ) : (
          <>
            {leftIcon && <span className="shrink-0">{leftIcon}</span>}
            {children}
            {rightIcon && <span className="shrink-0">{rightIcon}</span>}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
