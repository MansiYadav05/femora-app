import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  TrendingUp,
  Package,
  ShoppingCart,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { adminService } from "../../services/adminService";
import { orderService } from "../../services/orderService";
import { productService } from "../../services/productService";
import { Order, Product } from "../../data/mockData";
import { formatPrice } from "../../utils/formatPrice";
import { Badge } from "../../components/ui/Badge";

export const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<any>(null);
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);
  const [lowStockProducts, setLowStockProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Admin Dashboard | Femora Operations";

    Promise.all([
      adminService.getStats(),
      orderService.getOrders(),
      productService.getProducts({ limit: 100 }),
    ]).then(([statsRes, ordersRes, prodRes]) => {
      if (statsRes.success) setStats(statsRes.data);
      if (ordersRes.success) setRecentOrders(ordersRes.data.slice(0, 5));
      if (prodRes.success) {
        setLowStockProducts(prodRes.data.items.filter((p) => p.stock <= 25).slice(0, 4));
      }
      setLoading(false);
    });
  }, []);

  const maxSales = stats?.salesTrend7Days
    ? Math.max(...stats.salesTrend7Days.map((d: any) => d.amount))
    : 35000;

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl md:text-3xl font-heading font-bold text-maroon">
            Operations & Sales Dashboard
          </h1>
          <p className="text-xs text-muted mt-1">
            Real-time mock analytics, packing queue, and inventory alerts.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/admin/orders"
            className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-maroon text-white hover:bg-maroon-dark transition-colors shadow-xs"
          >
            Manage Packing Queue
          </Link>
          <Link
            to="/admin/products/new"
            className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-rose-button text-white hover:bg-rose transition-colors shadow-xs"
          >
            + Add Product
          </Link>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted">
              Today&apos;s Orders
            </span>
            <div className="w-8 h-8 rounded-lg bg-teal/10 text-teal-deep flex items-center justify-center">
              <ShoppingCart className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-bold font-heading text-maroon tabular-nums">
            {stats?.todayOrders || 18}
          </p>
          <span className="text-[11px] text-teal-deep font-medium">All with plain packaging</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted">
              Today&apos;s Revenue
            </span>
            <div className="w-8 h-8 rounded-lg bg-rose/10 text-rose flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-bold font-heading text-maroon tabular-nums">
            {formatPrice(stats?.todayRevenue || 22450)}
          </p>
          <span className="text-[11px] text-teal-deep font-medium">+14% vs yesterday</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted">
              Pending Packing
            </span>
            <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center">
              <Package className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-bold font-heading text-amber-700 tabular-nums">
            {stats?.pendingOrders || 7}
          </p>
          <span className="text-[11px] text-amber-800 font-medium">Awaiting courier dispatch</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted">
              Low Stock Alerts
            </span>
            <div className="w-8 h-8 rounded-lg bg-rose/10 text-rose flex items-center justify-center">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-bold font-heading text-rose tabular-nums">
            {stats?.lowStockItems || 3}
          </p>
          <span className="text-[11px] text-rose font-medium">&le; 25 units remaining</span>
        </div>
      </div>

      {/* 7-Day Sales Bar Chart (Drawn with Plain SVG / CSS as requested - NO Chart Library) */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="font-heading font-semibold text-lg text-maroon">
              7-Day Revenue Trend (INR)
            </h3>
            <p className="text-xs text-muted">Daily gross store sales in Indian Rupees</p>
          </div>
          <span className="text-xs font-bold text-teal-deep px-2.5 py-1 rounded bg-teal/10">
            Total 7D: {formatPrice(174650)}
          </span>
        </div>

        {/* Pure CSS/SVG Bar Chart */}
        <div className="pt-4">
          <div className="h-56 flex items-end justify-between gap-3 sm:gap-6 px-2">
            {stats?.salesTrend7Days?.map((item: any, idx: number) => {
              const heightPercent = Math.max(15, Math.round((item.amount / maxSales) * 100));
              const isToday = idx === stats.salesTrend7Days.length - 1;

              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                  <span className="text-[10px] font-bold text-muted group-hover:text-maroon tabular-nums">
                    {formatPrice(item.amount)}
                  </span>
                  <div className="w-full max-w-[48px] bg-slate-100 rounded-t-xl h-full flex items-end overflow-hidden p-0.5">
                    <div
                      className={`w-full rounded-t-lg transition-all duration-500 ${
                        isToday
                          ? "bg-rose-button group-hover:bg-rose"
                          : "bg-maroon/70 group-hover:bg-maroon"
                      }`}
                      style={{ height: `${heightPercent}%` }}
                    />
                  </div>
                  <div className="text-center">
                    <p className="text-xs font-semibold text-ink">{item.day}</p>
                    <p className="text-[10px] text-muted">{item.date}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 2-Column: Recent Orders Table & Low Stock List */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Recent Orders */}
        <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="font-heading font-semibold text-lg text-maroon">Recent Store Orders</h3>
            <Link to="/admin/orders" className="text-xs font-semibold text-rose-button hover:underline flex items-center gap-1">
              <span>View all</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-slate-100 text-muted uppercase tracking-wider font-semibold">
                  <th className="py-2.5 px-3">Order</th>
                  <th className="py-2.5 px-3">Recipient</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3">Total</th>
                  <th className="py-2.5 px-3">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentOrders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-3 font-semibold text-maroon">
                      {ord.orderNumber}
                      <span className="block text-[10px] text-muted font-normal">{ord.date}</span>
                    </td>
                    <td className="py-3 px-3">
                      <p className="font-medium text-ink">{ord.shippingAddress.fullName}</p>
                      <p className="text-[10px] text-muted">{ord.shippingAddress.city}</p>
                    </td>
                    <td className="py-3 px-3">
                      <Badge variant="status" statusColor={ord.status} size="sm">
                        {ord.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-3 font-bold text-ink tabular-nums">
                      {formatPrice(ord.total)}
                    </td>
                    <td className="py-3 px-3">
                      <Link
                        to={`/admin/orders/${ord.id}`}
                        className="text-xs font-semibold text-teal-deep hover:underline"
                      >
                        Pack View &rarr;
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Low Stock List */}
        <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="font-heading font-semibold text-lg text-maroon flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-rose" />
              <span>Low Stock List</span>
            </h3>
            <Link to="/admin/products" className="text-xs text-rose-button hover:underline">
              Inventory &rarr;
            </Link>
          </div>

          <div className="space-y-3">
            {lowStockProducts.map((p) => (
              <div
                key={p.id}
                className="p-3 rounded-xl border border-rose/20 bg-rose/5 flex items-center justify-between gap-3 text-xs"
              >
                <div className="truncate">
                  <p className="font-semibold text-ink truncate">{p.name}</p>
                  <p className="text-[11px] text-muted">{p.category}</p>
                </div>
                <div className="text-right shrink-0">
                  <span className="font-bold text-rose tabular-nums block text-sm">
                    {p.stock} units
                  </span>
                  <Link
                    to={`/admin/products/${p.id}/edit`}
                    className="text-[10px] font-semibold text-maroon hover:underline"
                  >
                    Restock
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
