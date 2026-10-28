import React from "react";
import { MapPin, Phone, Check, Trash2, Edit2 } from "lucide-react";
import { Address } from "../../data/mockData";
import { Badge } from "../ui/Badge";

export interface AddressCardProps {
  address: Address;
  onEdit?: (address: Address) => void;
  onDelete?: (id: string) => void;
  onSetDefault?: (id: string) => void;
  selectable?: boolean;
  isSelected?: boolean;
  onSelect?: (address: Address) => void;
}

export const AddressCard: React.FC<AddressCardProps> = ({
  address,
  onEdit,
  onDelete,
  onSetDefault,
  selectable = false,
  isSelected = false,
  onSelect,
}) => {
  return (
    <div
      onClick={() => selectable && onSelect && onSelect(address)}
      className={`p-5 rounded-2xl border transition-all duration-200 relative text-left ${
        selectable ? "cursor-pointer" : ""
      } ${
        isSelected
          ? "border-maroon bg-blush-bg/30 ring-2 ring-maroon shadow-md"
          : "border-maroon/15 bg-white shadow-femora hover:border-maroon/30"
      }`}
    >
      {/* Header with Type & Default Badge */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-sm text-ink">{address.fullName}</span>
          <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-maroon/10 text-maroon">
            {address.type}
          </span>
          {address.isDefault && (
            <Badge variant="organic" size="sm">
              Default
            </Badge>
          )}
        </div>

        {selectable && isSelected && (
          <div className="w-5 h-5 rounded-full bg-teal-deep text-white flex items-center justify-center">
            <Check className="w-3 h-3" />
          </div>
        )}
      </div>

      {/* Address Details */}
      <p className="text-xs text-ink/80 leading-relaxed mb-2">
        {address.addressLine}, {address.locality}, {address.city}, {address.state} -{" "}
        <strong className="text-maroon font-semibold">{address.pincode}</strong>
      </p>

      {/* Phone */}
      <div className="flex items-center gap-1.5 text-xs text-muted mb-3">
        <Phone className="w-3.5 h-3.5" />
        <span>+91 {address.phone}</span>
      </div>

      {/* Card Actions */}
      {(onEdit || onDelete || onSetDefault) && (
        <div className="flex items-center justify-between pt-3 border-t border-maroon/10 text-xs">
          <div>
            {!address.isDefault && onSetDefault && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onSetDefault(address.id);
                }}
                className="text-teal-deep hover:underline font-medium cursor-pointer"
              >
                Set as Default
              </button>
            )}
          </div>

          <div className="flex items-center gap-3">
            {onEdit && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(address);
                }}
                className="text-muted hover:text-maroon inline-flex items-center gap-1 cursor-pointer"
              >
                <Edit2 className="w-3.5 h-3.5" />
                <span>Edit</span>
              </button>
            )}

            {onDelete && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(address.id);
                }}
                className="text-muted hover:text-rose inline-flex items-center gap-1 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
