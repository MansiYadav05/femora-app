import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/Button";

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  actionLabel?: string;
  actionTo?: string;
  onAction?: () => void;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  actionLabel,
  actionTo,
  onAction,
  className = "",
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center text-center p-8 md:p-12 bg-white/60 rounded-2xl border border-maroon/10 ${className}`}
    >
      {icon && (
        <div className="w-16 h-16 rounded-full bg-blush-bg flex items-center justify-center text-maroon mb-4 shadow-xs">
          {icon}
        </div>
      )}
      <h3 className="text-xl font-heading font-semibold text-maroon mb-2">{title}</h3>
      <p className="text-sm text-muted max-w-md leading-relaxed mb-6">{description}</p>
      {actionLabel && (
        <div>
          {actionTo ? (
            <Link to={actionTo}>
              <Button variant="primary">{actionLabel}</Button>
            </Link>
          ) : (
            <Button variant="primary" onClick={onAction}>
              {actionLabel}
            </Button>
          )}
        </div>
      )}
    </div>
  );
};
