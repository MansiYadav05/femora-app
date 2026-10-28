import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Search, Filter, ShieldCheck, ChevronRight, Check } from "lucide-react";
import { adminService } from "../../services/adminService";
import { Order, OrderStatus } from "../../data/mockData";
import { ORDER_STATUSES } from "../../utils/constants";
import { formatPrice } from "../../utils/formatPrice";
import { Badge } from "../../components/ui/Badge";
import toast from "react-hot-toast";

export const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [statusFilter, setStatusFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Manage Orders & Packing Queue | Femora Admin";
    loadOrders();
  }, [statusFilter, search]);

  const loadOrders = () => {
    setLoading(true);
    adminService
      .getAllOrders({
        status: statusFilter,
        search,
      })
      .then((res) => {
        if (res.success && res.data) {
          setOrders(res.data);
        }
        setLoading(false);
      });
  };

  const handleQuickStatusChange = async (orderId: string, newStatus: OrderStatus) => {
    const res = await adminService.updateOrderStatus(orderId, newStatus);
    if (res.success) {
      toast.success(`Order ${orderId} status set to ${newStatus}`);
      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
      );
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-heading font-bold text-maroon">
            Orders & Packing Queue
          </h1>
          <p className="text-xs text-muted mt-1">
            Manage customer shipments, inspect discreet packaging flags, and update courier milestones.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Search by order number, customer name, phone */}
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            placeholder="Search Order #, customer name, or phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full text-xs rounded-xl pl-9 pr-3 py-2.5 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-aqua"
          />
          <Search className="w-4 h-4 text-muted absolute left-3 top-1/2 -translate-y-1/2" />
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-2 w-full sm:w-auto text-xs">
          <span className="text-muted font-medium">Filter by Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-ink font-medium focus:outline-none focus:ring-2 focus:ring-aqua cursor-pointer"
          >
            <option value="All">All Statuses ({orders.length})</option>
            {ORDER_STATUSES.map((st) => (
              <option key={st} value={st}>
                {st}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 border-b border-slate-200 text-muted uppercase tracking-wider font-semibold">
              <tr>
                <th className="py-3 px-4">Order ID & Date</th>
                <th className="py-3 px-4">Customer & City</th>
                <th className="py-3 px-4">Packaging Type</th>
                <th className="py-3 px-4">Items / Total</th>
                <th className="py-3 px-4">Status & Quick Update</th>
                <th className="py-3 px-4 text-right">Packing View</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {orders.map((ord) => (
                <tr key={ord.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4">
                    <span className="font-bold text-sm text-maroon block">
                      {ord.orderNumber}
                    </span>
                    <span className="text-[11px] text-muted">{ord.date}</span>
                  </td>

                  <td className="py-3.5 px-4">
                    <p className="font-semibold text-ink">{ord.shippingAddress.fullName}</p>
                    <p className="text-[11px] text-muted">
                      {ord.shippingAddress.city}, PIN {ord.shippingAddress.pincode}
                    </p>
                  </td>

                  <td className="py-3.5 px-4">
                    {ord.discreetPackaging ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-teal-deep bg-teal/10 px-2 py-0.5 rounded">
                        <ShieldCheck className="w-3.5 h-3.5 text-teal" />
                        <span>100% Plain Box</span>
                      </span>
                    ) : (
                      <span className="text-[11px] text-muted">Standard</span>
                    )}
                  </td>

                  <td className="py-3.5 px-4">
                    <span className="font-bold text-ink tabular-nums text-sm block">
                      {formatPrice(ord.total)}
                    </span>
                    <span className="text-[11px] text-muted">{ord.items.length} product(s)</span>
                  </td>

                  <td className="py-3.5 px-4">
                    {/* Status dropdown directly inside table as specified */}
                    <select
                      value={ord.status}
                      onChange={(e) =>
                        handleQuickStatusChange(ord.id, e.target.value as OrderStatus)
                      }
                      className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-xs font-semibold text-ink focus:outline-none focus:ring-2 focus:ring-aqua cursor-pointer"
                    >
                      {ORDER_STATUSES.map((st) => (
                        <option key={st} value={st}>
                          {st}
                        </option>
                      ))}
                    </select>
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <Link
                      to={`/admin/orders/${ord.id}`}
                      className="px-3 py-1 rounded-lg text-xs font-semibold bg-maroon/10 text-maroon hover:bg-maroon hover:text-white transition-colors inline-flex items-center gap-1"
                    >
                      <span>Pack Slip</span>
                      <ChevronRight className="w-3 h-3" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
