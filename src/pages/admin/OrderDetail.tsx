import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  ShieldCheck,
  Package,
  Truck,
  CheckCircle2,
  Printer,
  Save,
} from "lucide-react";
import { orderService } from "../../services/orderService";
import { adminService } from "../../services/adminService";
import { Order, OrderStatus } from "../../data/mockData";
import { ORDER_STATUSES } from "../../utils/constants";
import { formatPrice } from "../../utils/formatPrice";
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import toast from "react-hot-toast";

export const OrderDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [trackingNumber, setTrackingNumber] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    document.title = "Fulfillment & Packing Slip | Femora Admin";

    if (id) {
      orderService.getOrder(id).then((res) => {
        if (res.success && res.data) {
          setOrder(res.data);
          setTrackingNumber(res.data.trackingNumber || "");
        }
      });
    }
  }, [id]);

  const handleStatusChange = async (newStatus: OrderStatus) => {
    if (!order) return;
    setIsUpdating(true);

    const res = await adminService.updateOrderStatus(order.id, newStatus, trackingNumber);
    setIsUpdating(false);

    if (res.success && res.data) {
      setOrder(res.data);
      toast.success(`Status updated to ${newStatus}`);
    }
  };

  const handleSaveTracking = async () => {
    if (!order) return;
    const res = await adminService.updateOrderStatus(order.id, order.status, trackingNumber);
    if (res.success && res.data) {
      setOrder(res.data);
      toast.success("Courier tracking number saved!");
    }
  };

  if (!order) {
    return (
      <div className="p-8 text-center text-sm text-muted">Loading order packing slip...</div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <Link
            to="/admin/orders"
            className="p-2 rounded-xl border border-slate-200 text-muted hover:text-maroon hover:bg-slate-100 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-heading font-bold text-maroon">
                Order {order.orderNumber}
              </h1>
              <Badge variant="status" statusColor={order.status}>
                {order.status}
              </Badge>
            </div>
            <p className="text-xs text-muted mt-0.5">
              Placed: {order.date} · Payment: {order.paymentMethod}
            </p>
          </div>
        </div>

        <button
          onClick={() => window.print()}
          className="px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-ink hover:bg-slate-50 flex items-center gap-1.5 shadow-xs cursor-pointer"
        >
          <Printer className="w-4 h-4" />
          <span>Print Packing Slip</span>
        </button>
      </div>

      {/* HIGHLIGHTED PACKING VIEW WITH DISCREET PACKAGING FLAG as specified */}
      <div
        className={`p-6 rounded-3xl border-2 space-y-4 shadow-md ${
          order.discreetPackaging
            ? "border-teal-deep bg-teal/5"
            : "border-slate-200 bg-white"
        }`}
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-teal-deep text-white flex items-center justify-center shrink-0">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-teal-deep block">
                Fulfillment Protocol Verification
              </span>
              <h2 className="text-xl font-heading font-bold text-maroon">
                {order.discreetPackaging
                  ? "CONFIRMED: 100% DISCREET PLAIN BOX REQUIRED"
                  : "Standard Packaging"}
              </h2>
            </div>
          </div>

          <span className="px-3 py-1 rounded-full text-xs font-bold uppercase bg-teal-deep text-white">
            Plain Brown Carton Only
          </span>
        </div>

        <div className="p-3.5 bg-white/90 rounded-2xl border border-teal/20 text-xs text-ink/90 space-y-1">
          <p className="font-semibold text-teal-deep">Fulfillment Checklist:</p>
          <p>• Verify outer box has ZERO product names, period terms, or brand graphics.</p>
          <p>• Ensure courier dispatch label sender reads: &quot;FM Logistics / Fulfillment Partner&quot;.</p>
          <p>• Include internal discreet instruction guide inside the sealed tamper box.</p>
        </div>
      </div>

      {/* Main Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Items to Pack */}
        <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <h3 className="font-heading font-semibold text-lg text-maroon pb-2 border-b border-slate-100 flex items-center gap-2">
            <Package className="w-4 h-4 text-rose" />
            <span>Items to Pack & Seal ({order.items.length})</span>
          </h3>

          <div className="divide-y divide-slate-100">
            {order.items.map((it, idx) => (
              <div key={idx} className="py-3 flex items-center justify-between text-xs">
                <div>
                  <p className="font-semibold text-ink text-sm">{it.name}</p>
                  <p className="text-muted text-[11px]">
                    Variant: {it.variant || "Standard"} · Product ID: {it.productId}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-base font-bold text-maroon tabular-nums">
                    Qty: {it.quantity}
                  </span>
                  <span className="text-[11px] text-muted block">
                    {formatPrice(it.price * it.quantity)}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {order.deliveryInstructions && (
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 mt-4">
              <strong>Customer Instructions:</strong> &ldquo;{order.deliveryInstructions}&rdquo;
            </div>
          )}
        </div>

        {/* Right: Shipping Address & Tracking Updates */}
        <div className="lg:col-span-4 space-y-6">
          {/* Tracking Number Input */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted block">
              Carrier Tracking Number
            </span>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="e.g. DEL-IND-994821"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                className="flex-1 text-xs px-3 py-2 rounded-xl border border-slate-200 font-mono focus:outline-none focus:ring-2 focus:ring-aqua"
              />
              <button
                onClick={handleSaveTracking}
                className="px-3 py-2 text-xs font-semibold rounded-xl bg-teal-deep text-white hover:bg-teal transition-colors cursor-pointer"
              >
                Save
              </button>
            </div>
          </div>

          {/* Quick Status Buttons */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted block">
              Update Order Status
            </span>
            <div className="grid grid-cols-2 gap-2">
              {ORDER_STATUSES.map((st) => (
                <button
                  key={st}
                  disabled={order.status === st || isUpdating}
                  onClick={() => handleStatusChange(st)}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer text-center ${
                    order.status === st
                      ? "bg-maroon text-white cursor-default"
                      : "bg-slate-100 hover:bg-slate-200 text-ink/80"
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          {/* Recipient Details */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2 text-xs">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted block pb-1 border-b border-slate-100">
              Recipient Address
            </span>
            <p className="font-semibold text-ink text-sm">{order.shippingAddress.fullName}</p>
            <p className="text-muted leading-relaxed">
              {order.shippingAddress.addressLine}, {order.shippingAddress.locality},{" "}
              {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}
            </p>
            <p className="font-medium text-maroon pt-1">
              Contact: +91 {order.shippingAddress.phone}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
