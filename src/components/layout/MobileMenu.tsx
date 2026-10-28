import React from "react";
import { Link } from "react-router-dom";
import {
  X,
  Sparkles,
  Package,
  BookOpen,
  MapPin,
  Heart,
  User,
  ShieldCheck,
  ChevronRight,
  LogOut,
  LayoutDashboard,
} from "lucide-react";
import { CATEGORIES } from "../../utils/constants";
import { useAuth } from "../../context/AuthContext";
import { useWishlist } from "../../context/WishlistContext";
import logoImg from "../../assets/logo.webp";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const { user, isAuthenticated, logout } = useAuth();
  const { count: wishlistCount } = useWishlist();

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex bg-maroon-dark/70 backdrop-blur-xs transition-opacity duration-300"
      onClick={onClose}
    >
      <div
        className="fixed top-0 bottom-0 left-0 w-4/5 max-w-sm bg-cream text-ink shadow-2xl flex flex-col z-50 animate-in slide-in-from-left duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Brand Header */}
        <div className="bg-maroon p-5 text-white flex items-center justify-between border-b border-maroon-dark">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-maroon flex items-center justify-center border border-blush/30">
              <img src={logoImg} alt="Femora" className="w-full h-full object-cover scale-110" />
            </div>
            <div>
              <span className="font-heading font-bold text-xl leading-none">Femora</span>
              <p className="text-[10px] text-blush tracking-wide uppercase mt-0.5">Discreet Organic Care</p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="p-1 rounded-full text-white/80 hover:text-white hover:bg-maroon-dark transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Navigation */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {/* Quick Account Banner */}
          <div className="p-3 bg-white rounded-xl border border-maroon/10 shadow-xs">
            {isAuthenticated && user ? (
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted">Signed in as</p>
                  <p className="font-semibold text-sm text-maroon">{user.name}</p>
                </div>
                {user.role === "admin" && (
                  <Link
                    to="/admin"
                    onClick={onClose}
                    className="text-xs font-semibold px-2.5 py-1 rounded bg-rose-button text-white"
                  >
                    Admin
                  </Link>
                )}
              </div>
            ) : (
              <div className="flex items-center justify-between gap-2">
                <p className="text-xs text-muted">Sign in to view orders</p>
                <Link
                  to="/login"
                  onClick={onClose}
                  className="text-xs font-semibold px-3 py-1.5 rounded-full bg-maroon text-white"
                >
                  Sign In
                </Link>
              </div>
            )}
          </div>

          {/* Primary Links */}
          <div className="space-y-1">
            <Link
              to="/shop"
              onClick={onClose}
              className="flex items-center justify-between p-2.5 rounded-xl font-medium text-ink hover:bg-blush-bg hover:text-maroon transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <Sparkles className="w-4 h-4 text-rose" />
                <span>Shop All Products</span>
              </div>
              <ChevronRight className="w-4 h-4 text-muted/50" />
            </Link>

            <Link
              to="/kits"
              onClick={onClose}
              className="flex items-center justify-between p-2.5 rounded-xl font-medium text-ink hover:bg-blush-bg hover:text-maroon transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <Package className="w-4 h-4 text-teal-deep" />
                <span>Relief Kits & Bundles</span>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose/15 text-rose">SAVE ₹500</span>
            </Link>

            <Link
              to="/learn"
              onClick={onClose}
              className="flex items-center justify-between p-2.5 rounded-xl font-medium text-ink hover:bg-blush-bg hover:text-maroon transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <BookOpen className="w-4 h-4 text-maroon" />
                <span>Period Health & Care</span>
              </div>
              <ChevronRight className="w-4 h-4 text-muted/50" />
            </Link>

            <Link
              to="/track-order"
              onClick={onClose}
              className="flex items-center justify-between p-2.5 rounded-xl font-medium text-ink hover:bg-blush-bg hover:text-maroon transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-teal" />
                <span>Track Order Status</span>
              </div>
              <ChevronRight className="w-4 h-4 text-muted/50" />
            </Link>
          </div>

          {/* Categories List */}
          <div>
            <p className="text-[11px] font-semibold text-muted uppercase tracking-wider px-2 mb-2">
              Browse Categories
            </p>
            <div className="space-y-1">
              {CATEGORIES.map((cat) => (
                <Link
                  key={cat.id}
                  to={`/category/${cat.slug}`}
                  onClick={onClose}
                  className="flex items-center justify-between p-2 rounded-lg text-sm text-ink/80 hover:bg-blush-bg hover:text-maroon transition-colors"
                >
                  <span>{cat.name}</span>
                  <span className="text-xs text-muted tabular-nums">{cat.itemCount}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Customer Account Area */}
          <div className="pt-4 border-t border-maroon/10">
            <p className="text-[11px] font-semibold text-muted uppercase tracking-wider px-2 mb-2">
              My Account
            </p>
            <div className="space-y-1">
              <Link
                to="/account/orders"
                onClick={onClose}
                className="flex items-center justify-between p-2 rounded-lg text-sm text-ink/80 hover:bg-blush-bg hover:text-maroon"
              >
                <div className="flex items-center gap-2">
                  <Package className="w-4 h-4 text-muted" />
                  <span>My Orders</span>
                </div>
              </Link>
              <Link
                to="/account/wishlist"
                onClick={onClose}
                className="flex items-center justify-between p-2 rounded-lg text-sm text-ink/80 hover:bg-blush-bg hover:text-maroon"
              >
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4 text-rose" />
                  <span>Wishlist</span>
                </div>
                {wishlistCount > 0 && (
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-rose/15 text-rose">
                    {wishlistCount}
                  </span>
                )}
              </Link>
              <Link
                to="/account/addresses"
                onClick={onClose}
                className="flex items-center justify-between p-2 rounded-lg text-sm text-ink/80 hover:bg-blush-bg hover:text-maroon"
              >
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-muted" />
                  <span>Saved Addresses</span>
                </div>
              </Link>
              {isAuthenticated && (
                <button
                  onClick={() => {
                    logout();
                    onClose();
                  }}
                  className="w-full flex items-center gap-2 p-2 rounded-lg text-sm text-rose hover:bg-rose/10 transition-colors text-left cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              )}
            </div>
          </div>

          {/* Brand Guarantee Badge */}
          <div className="p-3 bg-blush-bg/50 rounded-xl border border-blush/40 text-xs text-maroon flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-teal-deep shrink-0 mt-0.5" />
            <p className="leading-snug">
              <strong>100% Plain packaging guarantee.</strong> Zero product names on outer labels.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
