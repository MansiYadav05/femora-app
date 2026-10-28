import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Package, Filter, Clock } from "lucide-react";
import { orderService } from "../../services/orderService";
import { Order, OrderStatus } from "../../data/mockData";
import { OrderCard } from "../../components/order/OrderCard";
import { Breadcrumbs } from "../../components/common/Breadcrumbs";
import { EmptyState } from "../../components/common/EmptyState";
import { ORDER_STATUSES } from "../../utils/constants";
import { Skeleton } from "../../components/common/Skeleton";

export const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string>("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Femora | My orders";
    window.scrollTo(0, 0);

    setLoading(true);
    orderService.getOrders(selectedStatus).then((res) => {
      if (res.success && res.data) {
        setOrders(res.data);
      }
      setLoading(false);
    });
  }, [selectedStatus]);

  const filterTabs = ["All", ...ORDER_STATUSES];

  return (
    <div className="min-h-screen bg-cream py-6 md:py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-6">
        <Breadcrumbs items={[{ label: "My Account" }, { label: "My Orders" }]} />

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-maroon/10">
          <div>
            <h1 className="text-2xl md:text-3xl font-heading font-bold text-maroon flex items-center gap-2.5">
              <Package className="w-6 h-6 text-rose" />
              <span>My Orders</span>
            </h1>
            <p className="text-xs text-muted mt-1">
              Track recent shipments, view invoices, or review past organic period care orders.
            </p>
          </div>
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-2">
          {filterTabs.map((status) => (
            <button
              key={status}
              onClick={() => setSelectedStatus(status)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                selectedStatus === status
                  ? "bg-maroon text-white shadow-xs font-semibold"
                  : "bg-white text-ink/80 hover:bg-blush-bg border border-maroon/10"
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Orders List */}
        {loading ? (
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border border-maroon/10 space-y-3">
                <Skeleton className="h-5 w-1/3" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-4 w-1/4" />
              </div>
            ))}
          </div>
        ) : orders.length === 0 ? (
          <EmptyState
            icon={<Package className="w-8 h-8" />}
            title="No orders found"
            description={
              selectedStatus !== "All"
                ? `You have no orders currently in "${selectedStatus}" status.`
                : "You haven't placed any orders yet. Discover our skin-friendly pads and cramp patches."
            }
            actionLabel="Browse Store"
            actionTo="/shop"
          />
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
