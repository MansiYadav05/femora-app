import React, { useState } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Tags,
  Users,
  ExternalLink,
  LogOut,
  Menu,
  X,
  ShieldAlert,
  ArrowLeft,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import logoImg from "../../assets/logo.webp";

export const AdminLayout: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navItems = [
    { label: "Dashboard", to: "/admin", icon: LayoutDashboard, end: true },
    { label: "Products Catalog", to: "/admin/products", icon: Package },
    { label: "Orders & Shipping", to: "/admin/orders", icon: ShoppingCart },
    { label: "Categories", to: "/admin/categories", icon: Tags },
    { label: "Customers", to: "/admin/customers", icon: Users },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col lg:flex-row text-ink">
      {/* Mobile Top Bar */}
      <div className="lg:hidden bg-maroon text-white p-4 flex items-center justify-between border-b border-maroon-dark sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-1.5 rounded-lg hover:bg-maroon-dark"
            aria-label="Toggle admin sidebar"
          >
            {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <div className="flex items-center gap-2">
            <img src={logoImg} alt="Femora" className="w-7 h-7 rounded-full object-cover" />
            <span className="font-heading font-bold text-lg">Femora Admin</span>
          </div>
        </div>
        <Link
          to="/"
          className="text-xs bg-white/10 hover:bg-white/20 text-cream px-3 py-1.5 rounded-full flex items-center gap-1"
        >
          <span>Store</span>
          <ExternalLink className="w-3 h-3" />
        </Link>
      </div>

      {/* Maroon Sidebar (Desktop & Mobile Drawer) */}
      <aside
        className={`fixed lg:sticky top-0 bottom-0 left-0 z-40 w-64 bg-maroon text-white flex flex-col justify-between transition-transform duration-200 lg:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div>
          {/* Header */}
          <div className="p-6 border-b border-maroon-dark flex items-center justify-between">
            <Link to="/admin" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-maroon-dark border border-blush/30 shrink-0">
                <img src={logoImg} alt="Femora" className="w-full h-full object-cover scale-110" />
              </div>
              <div>
                <span className="font-heading font-bold text-xl block leading-tight">Femora</span>
                <span className="text-[11px] text-blush tracking-wider uppercase font-semibold">Store Operations</span>
              </div>
            </Link>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="lg:hidden text-white/70 hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  onClick={() => setIsSidebarOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      isActive
                        ? "bg-rose-button text-white shadow-sm font-semibold"
                        : "text-cream/80 hover:bg-maroon-dark hover:text-white"
                    }`
                  }
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Bottom User Area */}
        <div className="p-4 border-t border-maroon-dark bg-maroon-dark/50">
          <div className="flex items-center justify-between mb-3 px-1">
            <div className="truncate pr-2">
              <p className="text-xs font-semibold text-white truncate">{user?.name || "Admin"}</p>
              <p className="text-[11px] text-blush truncate">{user?.email || "admin@femora.test"}</p>
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] bg-teal-deep text-white font-bold uppercase">
              Admin
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/10">
            <Link
              to="/"
              className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs bg-white/10 hover:bg-white/20 text-cream transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Storefront</span>
            </Link>

            <button
              onClick={() => {
                logout();
                navigate("/login");
              }}
              className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs bg-rose/20 hover:bg-rose/30 text-rose transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Backdrop for mobile */}
      {isSidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 z-30 bg-black/50 backdrop-blur-xs"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Admin Content Body */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};
