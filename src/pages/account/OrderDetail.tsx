import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  ShieldCheck,
  Truck,
  CreditCard,
  MapPin,
  Clock,
  AlertTriangle,
  XCircle,
} from "lucide-react";
import { orderService } from "../../services/orderService";
import { Order } from "../../data/mockData";
import { OrderStatusTimeline } from "../../components/order/OrderStatusTimeline";
import { Breadcrumbs } from "../../components/common/Breadcrumbs";
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";
import { Modal } from "../../components/ui/Modal";
import { EmptyState } from "../../components/common/EmptyState";
import { formatPrice } from "../../utils/formatPrice";
import { ProductArtwork } from "../../components/common/ProductArtwork";
import toast from "react-hot-toast";

export const OrderDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  // Cancellation modal
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [cancelReason, setCancelReason] = useState("");
  const [isCancelling, setIsCancelling] = useState(false);

  useEffect(() => {
    document.title = "Femora | My orders";
    window.scrollTo(0, 0);

    if (id) {
      orderService.getOrder(id).then((res) => {
        if (res.success && res.data) {
          setOrder(res.data);
        }
        setLoading(false);
      });
    }
  }, [id]);

  const handleCancelOrder = async () => {
    if (!order) return;
    setIsCancelling(true);

    const res = await orderService.cancelOrder(order.id, cancelReason);
    setIsCancelling(false);

    if (res.success && res.data) {
      setOrder(res.data);
      setIsCancelModalOpen(false);
      toast.success("Order has been successfully cancelled.");
    } else {
      toast.error(res.message || "Could not cancel order.");
    }
  };

  if (!order && !loading) {
    return (
      <div className="max-w-4xl mx-auto py-16 px-4">
        <EmptyState
          title="Order Not Found"
          description="We could not find the details for this order."
          actionLabel="Back to My Orders"
          actionTo="/account/orders"
        />
      </div>
    );
  }

  // Can cancel only when Placed or Packed
  const canCancel = order?.status === "Placed" || order?.status === "Packed";

  return (
    <div className="min-h-screen bg-cream py-6 md:py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-6">
        <Breadcrumbs
          items={[
            { label: "My Orders", path: "/account/orders" },
            { label: order?.orderNumber || "Order Details" },
          ]}
        />

        {order && (
          <div className="space-y-6">
            {/* Top Bar with Number, Status & Cancel Action */}
            <div className="bg-white rounded-3xl border border-maroon/10 shadow-femora p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2.5">
                  <h1 className="text-2xl font-heading font-bold text-maroon">
                    {order.orderNumber}
                  </h1>
                  <Badge variant="status" statusColor={order.status}>
                    {order.status}
                  </Badge>
                </div>
                <p className="text-xs text-muted mt-1">
                  Ordered on {order.date} · Tracking #{order.trackingNumber || "Assigned upon dispatch"}
                </p>
              </div>

              {canCancel && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsCancelModalOpen(true)}
                  className="text-rose border-rose/30 hover:bg-rose/10"
                >
                  Cancel Order
                </Button>
              )}
            </div>

            {/* 2-Column: Status Timeline & Order Items Breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Status Timeline & Instructions */}
              <div className="lg:col-span-6 space-y-6">
                {/* Timeline Card in neutral wording */}
                <div className="bg-white rounded-3xl border border-maroon/10 shadow-femora p-6 sm:p-8 space-y-5">
                  <h3 className="font-heading font-semibold text-lg text-maroon">
                    Shipment Timeline
                  </h3>
                  <OrderStatusTimeline
                    timeline={order.timeline}
                    currentStatus={order.status}
                  />
                </div>

                {/* Plain Packaging & Delivery Instructions */}
                <div className="bg-white rounded-3xl border border-maroon/10 shadow-femora p-6 space-y-4">
                  <h4 className="font-heading font-semibold text-base text-maroon">
                    Packaging & Delivery Notes
                  </h4>

                  <div className="p-3 bg-blush-bg/50 rounded-xl border border-blush/40 flex items-start gap-2 text-xs text-maroon">
                    <ShieldCheck className="w-4 h-4 text-teal-deep shrink-0 mt-0.5" />
                    <span>
                      <strong>100% Plain packaging verified.</strong> Shipped with a neutral logistics label.
                    </span>
                  </div>

                  {order.deliveryInstructions ? (
                    <div className="text-xs">
                      <span className="font-semibold text-muted block mb-1">
                        Your Delivery Instructions:
                      </span>
                      <p className="p-3 rounded-xl bg-cream border border-maroon/10 text-ink">
                        &ldquo;{order.deliveryInstructions}&rdquo;
                      </p>
                    </div>
                  ) : (
                    <p className="text-xs text-muted">No specific delivery instructions provided.</p>
                  )}
                </div>
              </div>

              {/* Right Column: Items & Address Breakdown */}
              <div className="lg:col-span-6 space-y-6">
                {/* Items in Order */}
                <div className="bg-white rounded-3xl border border-maroon/10 shadow-femora p-6 space-y-4">
                  <h3 className="font-heading font-semibold text-lg text-maroon pb-2 border-b border-maroon/10">
                    Items in Shipment ({order.items.length})
                  </h3>

                  <div className="divide-y divide-maroon/10">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="py-3 flex items-center justify-between text-xs gap-3">
                        <div className="flex items-center gap-3 truncate">
                          <div className="w-12 h-12 rounded-xl bg-cream border border-maroon/10 p-1 shrink-0 overflow-hidden">
                            <ProductArtwork theme={item.imageTheme || "pads"} aspectRatio="square" />
                          </div>
                          <div className="truncate">
                            <Link
                              to={`/product/${item.slug}`}
                              className="font-medium text-ink hover:text-maroon transition-colors truncate block"
                            >
                              {item.name}
                            </Link>
                            <p className="text-[11px] text-muted">
                              Qty: {item.quantity} {item.variant ? `· ${item.variant}` : ""}
                            </p>
                          </div>
                        </div>

                        <span className="font-semibold text-maroon tabular-nums shrink-0">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Financial Totals */}
                  <div className="pt-3 border-t border-maroon/10 space-y-2 text-xs">
                    <div className="flex justify-between text-muted">
                      <span>Subtotal</span>
                      <span className="font-semibold text-ink tabular-nums">{formatPrice(order.subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-muted">
                      <span>Discreet Delivery Fee</span>
                      <span className="font-semibold text-ink tabular-nums">
                        {order.deliveryFee === 0 ? "FREE" : formatPrice(order.deliveryFee)}
                      </span>
                    </div>
                    <div className="flex justify-between text-base font-bold text-maroon pt-2 border-t border-maroon/10">
                      <span>Total Paid</span>
                      <span className="tabular-nums">{formatPrice(order.total)}</span>
                    </div>
                  </div>
                </div>

                {/* Delivery Address & Payment Method Card */}
                <div className="bg-white rounded-3xl border border-maroon/10 shadow-femora p-6 space-y-4">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-muted flex items-center gap-1.5 mb-1.5">
                      <MapPin className="w-3.5 h-3.5 text-rose" />
                      <span>Shipping Address</span>
                    </span>
                    <p className="text-xs font-semibold text-ink">{order.shippingAddress.fullName}</p>
                    <p className="text-xs text-muted leading-relaxed">
                      {order.shippingAddress.addressLine}, {order.shippingAddress.locality},{" "}
                      {order.shippingAddress.city}, {order.shippingAddress.state} -{" "}
                      {order.shippingAddress.pincode}
                    </p>
                    <p className="text-xs text-muted mt-1">Phone: +91 {order.shippingAddress.phone}</p>
                  </div>

                  <div className="pt-3 border-t border-maroon/10">
                    <span className="text-xs font-semibold uppercase tracking-wider text-muted flex items-center gap-1.5 mb-1.5">
                      <CreditCard className="w-3.5 h-3.5 text-teal" />
                      <span>Payment Method</span>
                    </span>
                    <p className="text-xs font-medium text-ink">{order.paymentMethod}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Cancel Order Modal */}
      <Modal
        isOpen={isCancelModalOpen}
        onClose={() => setIsCancelModalOpen(false)}
        title="Confirm Order Cancellation"
      >
        <div className="space-y-4 text-left">
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <p>
              Cancellation is only possible before courier dispatch. Once cancelled, your refund will be credited back in 2 to 3 business days.
            </p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-ink mb-1.5">
              Reason for cancellation (optional):
            </label>
            <select
              value={cancelReason}
              onChange={(e) => setCancelReason(e.target.value)}
              className="w-full text-xs p-2.5 rounded-xl border border-maroon/20 bg-white focus:outline-none focus:ring-2 focus:ring-aqua"
            >
              <option value="Ordered by mistake">Ordered by mistake</option>
              <option value="Want to change delivery address">Want to change delivery address</option>
              <option value="Need different products">Need different products or sizes</option>
              <option value="Delay in required delivery time">Delay in required delivery time</option>
              <option value="Other reason">Other reason</option>
            </select>
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <Button
              variant="ghost"
              onClick={() => setIsCancelModalOpen(false)}
            >
              Keep Order
            </Button>
            <Button
              variant="primary"
              isLoading={isCancelling}
              onClick={handleCancelOrder}
              className="bg-rose hover:bg-rose-button"
            >
              Confirm Cancellation
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
