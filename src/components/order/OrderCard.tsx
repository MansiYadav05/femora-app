import React from "react";
import { Link } from "react-router-dom";
import { Package, ChevronRight, ShieldCheck, Clock } from "lucide-react";
import { Order } from "../../data/mockData";
import { formatPrice } from "../../utils/formatPrice";
import { Badge } from "../ui/Badge";
import { ProductArtwork } from "../common/ProductArtwork";

export interface OrderCardProps {
  order: Order;
}

export const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
  return (
    <div className="bg-white rounded-2xl border border-maroon/10 shadow-femora hover:shadow-femora-hover transition-all p-5 space-y-4">
      {/* Header Info */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-maroon/10">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-heading font-bold text-base text-maroon">
              {order.orderNumber}
            </span>
            <Badge variant="status" statusColor={order.status}>
              {order.status}
            </Badge>
          </div>
          <p className="text-xs text-muted mt-0.5">Placed on {order.date}</p>
        </div>

        <div className="text-right">
          <span className="text-base font-bold text-ink tabular-nums">
            {formatPrice(order.total)}
          </span>
          <p className="text-[11px] text-muted">{order.items.length} item(s)</p>
        </div>
      </div>

      {/* Items Preview */}
      <div className="space-y-2">
        {order.items.map((item, idx) => (
          <div key={idx} className="flex items-center justify-between text-xs gap-3">
            <div className="flex items-center gap-2.5 truncate">
              <div className="w-10 h-10 rounded-lg bg-cream border border-maroon/10 p-0.5 shrink-0 overflow-hidden">
                <ProductArtwork theme={item.imageTheme || "pads"} aspectRatio="square" />
              </div>
              <div className="truncate">
                <p className="font-medium text-ink truncate">{item.name}</p>
                <p className="text-[11px] text-muted">
                  Qty: {item.quantity} {item.variant ? `· ${item.variant}` : ""}
                </p>
              </div>
            </div>
            <span className="font-semibold text-ink shrink-0 tabular-nums">
              {formatPrice(item.price * item.quantity)}
            </span>
          </div>
        ))}
      </div>

      {/* Bottom Footer Actions */}
      <div className="flex items-center justify-between pt-3 border-t border-maroon/5 text-xs">
        <div className="flex items-center gap-1.5 text-teal-deep font-medium">
          <ShieldCheck className="w-4 h-4 text-teal" />
          <span>Discreet packaging</span>
        </div>

        <Link
          to={`/account/orders/${order.id}`}
          className="font-semibold text-rose-button hover:text-rose inline-flex items-center gap-1 transition-colors"
        >
          <span>View Details & Timeline</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};
