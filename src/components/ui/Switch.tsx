import React from "react";

export interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  description?: string;
  id?: string;
  disabled?: boolean;
}

export const Switch: React.FC<SwitchProps> = ({
  checked,
  onChange,
  label,
  description,
  id = "switch-toggle",
  disabled = false,
}) => {
  return (
    <label htmlFor={id} className={`flex items-start gap-3 cursor-pointer select-none ${disabled ? "opacity-60 cursor-not-allowed" : ""}`}>
      <div className="relative inline-flex items-center mt-0.5">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          disabled={disabled}
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only"
        />
        <div
          className={`w-11 h-6 rounded-full transition-colors duration-200 ease-in-out ${
            checked ? "bg-teal-deep" : "bg-maroon/20"
          }`}
        >
          <div
            className={`w-5 h-5 bg-white rounded-full shadow-sm transform transition-transform duration-200 ease-in-out mt-0.5 ${
              checked ? "translate-x-5.5 ml-0" : "translate-x-0.5"
            }`}
          />
        </div>
      </div>
      {(label || description) && (
        <div className="flex flex-col text-left">
          {label && <span className="text-sm font-semibold text-ink">{label}</span>}
          {description && <span className="text-xs text-muted mt-0.5">{description}</span>}
        </div>
      )}
    </label>
  );
};
