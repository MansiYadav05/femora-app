import React, { useEffect, useRef } from "react";
import { X } from "lucide-react";

export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  children: React.ReactNode;
  side?: "right" | "left";
  maxWidth?: "sm" | "md" | "lg";
}

export const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  title,
  children,
  side = "right",
  maxWidth = "md",
}) => {
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const maxWidthClasses = {
    sm: "max-w-xs",
    md: "max-w-md",
    lg: "max-w-lg",
  };

  const sideClasses =
    side === "right"
      ? "right-0 animate-in slide-in-from-right duration-300"
      : "left-0 animate-in slide-in-from-left duration-300";

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex bg-maroon-dark/60 backdrop-blur-xs transition-opacity duration-300"
      onClick={onClose}
    >
      <div
        ref={drawerRef}
        className={`fixed top-0 bottom-0 ${sideClasses} w-full ${maxWidthClasses[maxWidth]} bg-cream shadow-2xl flex flex-col z-50 text-ink`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-maroon/10 bg-white shrink-0">
          <div className="text-base font-heading font-semibold text-maroon">{title}</div>
          <button
            onClick={onClose}
            aria-label="Close drawer"
            className="p-1.5 rounded-full text-muted hover:text-maroon hover:bg-blush-bg transition-colors focus-visible:ring-2 focus-visible:ring-aqua"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
};
