import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { CheckCircle2, ShieldCheck, Truck, Package, ArrowRight, Printer } from "lucide-react";
import { orderService } from "../../services/orderService";
import { Order } from "../../data/mockData";
import { formatPrice } from "../../utils/formatPrice";
import { Button } from "../../components/ui/Button";

export const OrderSuccess: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    document.title = "Order Confirmation | Femora";
    window.scrollTo(0, 0);

    if (id) {
      orderService.getOrder(id).then((res) => {
        if (res.success && res.data) {
          setOrder(res.data);
        }
      });
    }
  }, [id]);

  return (
    <div className="min-h-screen bg-cream py-10 md:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white rounded-3xl border border-maroon/10 shadow-femora p-6 sm:p-10 text-center space-y-6">
        {/* Success Icon */}
        <div className="w-16 h-16 rounded-full bg-teal/15 text-teal-deep mx-auto flex items-center justify-center">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        {/* Neutral Title & Header */}
        <div>
          <span className="text-xs font-semibold text-teal-deep uppercase tracking-wider">
            Order Confirmed & Received
          </span>
          <h1 className="text-2xl sm:text-3xl font-heading font-bold text-maroon mt-1">
            Your package is being prepared
          </h1>
          <p className="text-sm text-muted mt-2">
            Order Reference: <strong className="text-ink font-mono">{order?.orderNumber || id}</strong>
          </p>
        </div>

        {/* Expected Delivery & Discreet Box Seal */}
        <div className="p-4 rounded-2xl bg-cream border border-maroon/10 grid grid-cols-1 sm:grid-cols-2 gap-4 text-left text-xs">
          <div>
            <span className="text-muted block text-[11px] uppercase tracking-wider">Expected Arrival</span>
            <p className="font-semibold text-sm text-ink mt-0.5">
              {order?.estimatedDelivery || "Within 2 to 4 business days"}
            </p>
            <span className="text-[11px] text-teal-deep font-medium">Standard Dispatch Handover</span>
          </div>

          <div>
            <span className="text-muted block text-[11px] uppercase tracking-wider">Packaging Guarantee</span>
            <div className="flex items-center gap-1.5 text-teal-deep font-semibold mt-0.5">
              <ShieldCheck className="w-4 h-4 text-teal" />
              <span>100% Plain Cardboard Box</span>
            </div>
            <span className="text-[11px] text-muted">Zero product names printed outside</span>
          </div>
        </div>

        {/* Order Details Brief */}
        {order && (
          <div className="border-t border-maroon/10 pt-4 text-left space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-muted">
              Package Summary ({order.items.length} items)
            </h4>
            <div className="space-y-1.5 text-xs text-ink/80 max-h-40 overflow-y-auto divide-y divide-maroon/5">
              {order.items.map((it, idx) => (
                <div key={idx} className="py-1.5 flex justify-between">
                  <span className="truncate pr-3">
                    {it.name} <span className="text-muted">(Qty: {it.quantity})</span>
                  </span>
                  <span className="font-semibold tabular-nums shrink-0">
                    {formatPrice(it.price * it.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-maroon/10 pt-2 flex justify-between font-bold text-sm text-maroon">
              <span>Total Paid</span>
              <span className="tabular-nums">{formatPrice(order.total)}</span>
            </div>
          </div>
        )}

        {/* Actions: Track button & Storefront */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link to="/track-order" className="w-full sm:w-auto">
            <Button
              variant="primary"
              size="md"
              leftIcon={<Truck className="w-4 h-4" />}
              className="w-full sm:w-auto"
            >
              Track Order Status
            </Button>
          </Link>

          <Link to="/shop" className="w-full sm:w-auto">
            <Button variant="outline" size="md" className="w-full sm:w-auto">
              Continue Shopping
            </Button>
          </Link>
        </div>

        <p className="text-[11px] text-muted pt-2">
          A neutral confirmation note has been sent to your registered contact.
        </p>
      </div>
    </div>
  );
};
