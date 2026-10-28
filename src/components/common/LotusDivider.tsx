import React from "react";

export interface LotusDividerProps {
  className?: string;
}

export const LotusDivider: React.FC<LotusDividerProps> = ({ className = "" }) => {
  return (
    <div className={`w-full flex items-center justify-center my-8 md:my-12 px-4 ${className}`} aria-hidden="true">
      <div className="h-px bg-gradient-to-r from-transparent via-maroon/20 to-transparent flex-1 max-w-xs md:max-w-md" />
      <div className="mx-4 flex items-center gap-1.5 text-maroon opacity-80">
        <svg
          className="w-8 h-8 text-rose drop-shadow-xs"
          viewBox="0 0 100 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Central Lotus Petal */}
          <path
            d="M50 10 C45 35 35 55 50 72 C65 55 55 35 50 10 Z"
            fill="#E63B6E"
          />
          {/* Inner Pink Petal */}
          <path
            d="M50 20 C47 38 40 52 50 66 C60 52 53 38 50 20 Z"
            fill="#F48CAE"
          />
          {/* Left Petal */}
          <path
            d="M32 28 C28 45 35 60 48 68 C35 60 25 45 32 28 Z"
            fill="#D63868"
          />
          {/* Right Petal */}
          <path
            d="M68 28 C72 45 65 60 52 68 C65 60 75 45 68 28 Z"
            fill="#D63868"
          />
          {/* Base Teal Calyx Leaves */}
          <path
            d="M25 62 C35 72 45 74 50 75 C55 74 65 72 75 62 C65 66 50 67 25 62 Z"
            fill="#1BA896"
          />
          {/* Aqua Dots */}
          <circle cx="36" cy="22" r="3" fill="#5EDBCB" />
          <circle cx="64" cy="22" r="3" fill="#5EDBCB" />
        </svg>
      </div>
      <div className="h-px bg-gradient-to-r from-transparent via-maroon/20 to-transparent flex-1 max-w-xs md:max-w-md" />
    </div>
  );
};
