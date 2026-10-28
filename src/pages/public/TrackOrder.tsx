import React, { useState } from "react";
import { Truck, Search, ShieldCheck, MapPin, Package, AlertCircle } from "lucide-react";
import { orderService } from "../../services/orderService";
import { Order } from "../../data/mockData";
import { OrderStatusTimeline } from "../../components/order/OrderStatusTimeline";
import { Breadcrumbs } from "../../components/common/Breadcrumbs";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Badge } from "../../components/ui/Badge";
import { formatPrice } from "../../utils/formatPrice";

export const TrackOrder: React.FC = () => {
  const [orderNumber, setOrderNumber] = useState("");
  const [phone, setPhone] = useState("");
  const [order, setOrder] = useState<Order | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderNumber.trim()) {
      setError("Please enter your Order ID or Reference number.");
      return;
    }
    if (!phone.trim()) {
      setError("Please enter the contact phone number used for the order.");
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const res = await orderService.trackOrder(orderNumber, phone);
      if (res.success && res.data) {
        setOrder(res.data);
      } else {
        setOrder(null);
        setError(res.message || "Shipment not found. Please verify details.");
      }
    } catch {
      setError("Unable to track shipment at this moment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream py-6 md:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        <Breadcrumbs items={[{ label: "Track Shipment" }]} />

        {/* Header */}
        <div className="text-center max-w-xl mx-auto space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-maroon text-white flex items-center justify-center mx-auto mb-3 shadow-sm">
            <Truck className="w-6 h-6 text-aqua" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-heading font-bold text-maroon">
            Track Your Shipment
          </h1>
          <p className="text-xs sm:text-sm text-muted">
            Enter your order reference number and 10-digit phone number to view live neutral tracking updates.
          </p>
        </div>

        {/* Tracking Lookup Form */}
        <div className="bg-white rounded-2xl border border-maroon/10 shadow-femora p-6 sm:p-8">
          <form onSubmit={handleTrack} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Order ID / Number"
                placeholder="e.g. FEM-82914"
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
                required
              />
              <Input
                label="Phone Number"
                placeholder="10-digit mobile number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>

            {error && (
              <div className="p-3 bg-rose/10 border border-rose/30 rounded-xl text-xs text-rose flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <div className="pt-2 flex justify-center">
              <Button
                type="submit"
                variant="primary"
                size="md"
                isLoading={loading}
                leftIcon={<Search className="w-4 h-4" />}
                className="w-full sm:w-auto"
              >
                Track Shipment
              </Button>
            </div>
          </form>

          {/* Quick Demo Hint */}
          <div className="mt-4 pt-4 border-t border-maroon/10 text-[11px] text-muted text-center">
            Demo quick test: Order <strong className="text-maroon">FEM-82914</strong> or <strong className="text-maroon">FEM-83002</strong> with Phone <strong className="text-maroon">9876543210</strong>
          </div>
        </div>

        {/* Results Card & Status Timeline */}
        {order && (
          <div className="bg-white rounded-2xl border border-maroon/10 shadow-femora p-6 sm:p-8 space-y-6 animate-in fade-in duration-200">
            {/* Top Shipment Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-maroon/10">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-heading font-bold text-lg text-maroon">
                    {order.orderNumber}
                  </span>
                  <Badge variant="status" statusColor={order.status}>
                    {order.status}
                  </Badge>
                </div>
                <p className="text-xs text-muted mt-0.5">
                  Placed: {order.date} · Tracking #{order.trackingNumber || "Assigned upon dispatch"}
                </p>
              </div>

              <div className="text-right">
                <span className="text-xs text-muted block">Expected Arrival</span>
                <span className="text-sm font-semibold text-ink">
                  {order.estimatedDelivery}
                </span>
              </div>
            </div>

            {/* Privacy Box Seal */}
            <div className="p-3 bg-blush-bg/50 rounded-xl border border-blush/40 text-xs text-maroon flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-teal-deep shrink-0" />
              <span>
                <strong>Plain Packaging Verified:</strong> Dispatched in an unmarked brown corrugated parcel.
              </span>
            </div>

            {/* Timeline */}
            <div>
              <h3 className="font-heading font-semibold text-base text-maroon mb-4">
                Shipment Progress
              </h3>
              <OrderStatusTimeline
                timeline={order.timeline}
                currentStatus={order.status}
              />
            </div>

            {/* Delivery Destination */}
            <div className="pt-4 border-t border-maroon/10 text-xs text-muted flex items-start gap-2">
              <MapPin className="w-4 h-4 text-rose shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-ink">Destination: </span>
                <span>
                  {order.shippingAddress.locality}, {order.shippingAddress.city} - {order.shippingAddress.pincode}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
