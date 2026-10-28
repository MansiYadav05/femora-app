import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Search,
  ShoppingBag,
  Heart,
  User as UserIcon,
  Menu,
  X,
  ChevronDown,
  ShieldCheck,
  Package,
  LogOut,
  LayoutDashboard,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { CATEGORIES } from "../../utils/constants";
import { productService } from "../../services/productService";
import { Product } from "../../data/mockData";
import logoImg from "../../assets/logo.webp";

interface NavbarProps {
  onOpenMobileMenu: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenMobileMenu }) => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const { itemCount, openCart } = useCart();
  const { count: wishlistCount } = useWishlist();

  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isSearchOpenMobile, setIsSearchOpenMobile] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  const searchContainerRef = useRef<HTMLDivElement>(null);
  const accountRef = useRef<HTMLDivElement>(null);
  const categoryMenuRef = useRef<HTMLDivElement>(null);

  // Live search suggestions
  useEffect(() => {
    if (!searchQuery.trim() || searchQuery.length < 2) {
      setSuggestions([]);
      setIsSearching(false);
      return;
    }

    const timer = setTimeout(() => {
      productService
        .getProducts({ q: searchQuery, limit: 5 })
        .then((res) => {
          if (res.success && res.data) {
            setSuggestions(res.data.items);
            setIsSearching(true);
          }
        });
    }, 200);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Click outside listener for dropdowns
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(e.target as Node)
      ) {
        setIsSearching(false);
      }
      if (
        accountRef.current &&
        !accountRef.current.contains(e.target as Node)
      ) {
        setIsAccountOpen(false);
      }
      if (
        categoryMenuRef.current &&
        !categoryMenuRef.current.contains(e.target as Node)
      ) {
        setIsCategoryOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearching(false);
      setIsSearchOpenMobile(false);
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleSelectProduct = (slug: string) => {
    setIsSearching(false);
    setIsSearchOpenMobile(false);
    setSearchQuery("");
    navigate(`/product/${slug}`);
  };

  return (
    <header className="sticky top-0 z-40 bg-maroon text-white shadow-md border-b border-maroon-dark select-none">
      {/* Main Nav Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        {/* Left: Mobile hamburger & Brand */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onOpenMobileMenu}
            aria-label="Open mobile menu"
            className="lg:hidden p-2 rounded-xl text-white hover:bg-maroon-dark transition-colors focus-visible:ring-2 focus-visible:ring-aqua"
          >
            <Menu className="w-6 h-6" />
          </button>

          <Link
            to="/"
            className="flex items-center gap-2.5 group focus-visible:ring-2 focus-visible:ring-aqua rounded-lg py-1 px-1.5"
          >
            <div className="w-10 h-10 rounded-full overflow-hidden bg-maroon flex items-center justify-center shrink-0 border border-blush/30 shadow-xs group-hover:border-blush transition-colors">
              <img
                src={logoImg}
                alt="Femora Lotus Logo"
                className="w-full h-full object-cover scale-110"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-bold text-2xl tracking-tight text-white group-hover:text-blush transition-colors leading-none">
                Femora
              </span>
              <span className="text-[10px] text-blush tracking-wider font-medium uppercase mt-0.5 hidden sm:inline">
                Organic & Discreet Care
              </span>
            </div>
          </Link>
        </div>

        {/* Center: Desktop Nav Links & Category Dropdown */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium">
          <Link
            to="/shop"
            className="text-cream/90 hover:text-white transition-colors py-1"
          >
            All Products
          </Link>

          {/* Categories Dropdown */}
          <div className="relative" ref={categoryMenuRef}>
            <button
              onClick={() => setIsCategoryOpen(!isCategoryOpen)}
              className="flex items-center gap-1 text-cream/90 hover:text-white transition-colors py-1 cursor-pointer focus-visible:ring-2 focus-visible:ring-aqua rounded"
            >
              <span>Categories</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  isCategoryOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isCategoryOpen && (
              <div className="absolute top-full left-0 mt-2 w-64 bg-white text-ink rounded-xl shadow-femora-hover border border-maroon/10 py-2 z-50 animate-in fade-in duration-150">
                {CATEGORIES.map((cat) => (
                  <Link
                    key={cat.id}
                    to={`/category/${cat.slug}`}
                    onClick={() => setIsCategoryOpen(false)}
                    className="flex items-center justify-between px-4 py-2.5 text-xs font-medium hover:bg-blush-bg hover:text-maroon transition-colors"
                  >
                    <span>{cat.name}</span>
                    <span className="text-[11px] text-muted">
                      {cat.itemCount}
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link
            to="/kits"
            className="text-cream/90 hover:text-white transition-colors py-1 flex items-center gap-1.5"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-rose animate-pulse" />
            <span>Relief Kits</span>
          </Link>

          <Link
            to="/learn"
            className="text-cream/90 hover:text-white transition-colors py-1"
          >
            Period Health
          </Link>

          <Link
            to="/track-order"
            className="text-cream/90 hover:text-white transition-colors py-1"
          >
            Track Order
          </Link>
        </nav>

        {/* Right: Search, Wishlist, Account, Cart */}
        <div className="flex items-center gap-1.5 sm:gap-3">
          {/* Desktop Search Bar */}
          <div className="relative hidden md:block w-56 lg:w-68" ref={searchContainerRef}>
            <form onSubmit={handleSearchSubmit}>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search pads, kits, roll-ons..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => searchQuery.length >= 2 && setIsSearching(true)}
                  className="w-full bg-maroon-dark/80 text-white placeholder:text-cream/50 text-xs rounded-full pl-9 pr-4 py-2 border border-maroon-dark focus:bg-maroon-dark focus:outline-none focus:ring-2 focus:ring-aqua transition-colors"
                />
                <Search className="w-4 h-4 text-cream/60 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </form>

            {/* Live Search Suggestions Dropdown */}
            {isSearching && suggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white text-ink rounded-xl shadow-femora-hover border border-maroon/10 py-2 z-50 overflow-hidden">
                <div className="px-3 py-1.5 text-[11px] font-semibold text-muted uppercase tracking-wider border-b border-maroon/5">
                  Products ({suggestions.length})
                </div>
                {suggestions.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleSelectProduct(item.slug)}
                    className="w-full px-3 py-2 text-left hover:bg-blush-bg flex items-center justify-between text-xs transition-colors cursor-pointer"
                  >
                    <div className="truncate pr-2">
                      <p className="font-medium text-ink truncate">{item.name}</p>
                      <p className="text-[11px] text-muted">{item.category}</p>
                    </div>
                    <span className="font-semibold text-maroon shrink-0 tabular-nums">
                      ₹{item.price}
                    </span>
                  </button>
                ))}
                <div className="p-2 border-t border-maroon/5 text-center">
                  <button
                    onClick={handleSearchSubmit}
                    className="text-xs font-semibold text-rose-button hover:underline"
                  >
                    View all results for &quot;{searchQuery}&quot;
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Search Toggle */}
          <button
            onClick={() => setIsSearchOpenMobile(!isSearchOpenMobile)}
            className="md:hidden p-2 text-cream hover:text-white rounded-full hover:bg-maroon-dark transition-colors"
            aria-label="Toggle mobile search"
          >
            {isSearchOpenMobile ? <X className="w-5 h-5" /> : <Search className="w-5 h-5" />}
          </button>

          {/* Wishlist Link */}
          <Link
            to="/account/wishlist"
            className="p-2 text-cream hover:text-white rounded-full hover:bg-maroon-dark transition-colors relative"
            aria-label={`Wishlist with ${wishlistCount} items`}
          >
            <Heart className="w-5 h-5" />
            {wishlistCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-rose text-white text-[10px] font-bold rounded-full flex items-center justify-center leading-none">
                {wishlistCount}
              </span>
            )}
          </Link>

          {/* Account Dropdown */}
          <div className="relative" ref={accountRef}>
            <button
              onClick={() => setIsAccountOpen(!isAccountOpen)}
              className="p-2 text-cream hover:text-white rounded-full hover:bg-maroon-dark transition-colors flex items-center gap-1 cursor-pointer focus-visible:ring-2 focus-visible:ring-aqua"
              aria-label="Account menu"
            >
              <UserIcon className="w-5 h-5" />
            </button>

            {isAccountOpen && (
              <div className="absolute right-0 top-full mt-2 w-52 bg-white text-ink rounded-xl shadow-femora-hover border border-maroon/10 py-2 z-50 text-xs animate-in fade-in duration-150">
                {isAuthenticated && user ? (
                  <>
                    <div className="px-4 py-2 border-b border-maroon/10 bg-cream/40">
                      <p className="font-semibold text-maroon truncate">{user.name}</p>
                      <p className="text-[11px] text-muted truncate">{user.email}</p>
                      <span className="inline-block mt-1 text-[10px] font-bold text-teal-deep uppercase">
                        {user.role}
                      </span>
                    </div>

                    {user.role === "admin" && (
                      <Link
                        to="/admin"
                        onClick={() => setIsAccountOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-maroon font-semibold hover:bg-blush-bg transition-colors"
                      >
                        <LayoutDashboard className="w-4 h-4 text-rose" />
                        <span>Admin Dashboard</span>
                      </Link>
                    )}

                    <Link
                      to="/account/profile"
                      onClick={() => setIsAccountOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 hover:bg-blush-bg transition-colors"
                    >
                      <UserIcon className="w-4 h-4 text-muted" />
                      <span>My Profile</span>
                    </Link>

                    <Link
                      to="/account/orders"
                      onClick={() => setIsAccountOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 hover:bg-blush-bg transition-colors"
                    >
                      <Package className="w-4 h-4 text-muted" />
                      <span>My Orders</span>
                    </Link>

                    <Link
                      to="/account/addresses"
                      onClick={() => setIsAccountOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 hover:bg-blush-bg transition-colors"
                    >
                      <ShieldCheck className="w-4 h-4 text-muted" />
                      <span>Saved Addresses</span>
                    </Link>

                    <div className="border-t border-maroon/10 my-1" />

                    <button
                      onClick={() => {
                        setIsAccountOpen(false);
                        logout();
                      }}
                      className="w-full flex items-center gap-2 px-4 py-2 text-left text-rose hover:bg-rose/10 transition-colors cursor-pointer"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </>
                ) : (
                  <>
                    <div className="px-4 py-2 text-muted text-[11px] border-b border-maroon/10">
                      Welcome to Femora
                    </div>
                    <Link
                      to="/login"
                      onClick={() => setIsAccountOpen(false)}
                      className="block px-4 py-2.5 font-medium hover:bg-blush-bg text-maroon transition-colors"
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setIsAccountOpen(false)}
                      className="block px-4 py-2.5 font-medium hover:bg-blush-bg transition-colors"
                    >
                      Create Account
                    </Link>
                    <div className="border-t border-maroon/10 my-1" />
                    <Link
                      to="/login"
                      onClick={() => setIsAccountOpen(false)}
                      className="block px-4 py-2 text-[11px] text-muted hover:text-maroon transition-colors"
                    >
                      Admin Sign-in (Demo)
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Cart Drawer Trigger */}
          <button
            onClick={openCart}
            className="p-2 bg-rose-button text-white rounded-full hover:bg-rose transition-all flex items-center gap-1.5 shadow-sm active:scale-95 focus-visible:ring-2 focus-visible:ring-aqua"
            aria-label={`Shopping cart with ${itemCount} items`}
          >
            <ShoppingBag className="w-5 h-5" />
            <span className="font-bold text-xs pr-1 tabular-nums">{itemCount}</span>
          </button>
        </div>
      </div>

      {/* Mobile Search Bar Expansion */}
      {isSearchOpenMobile && (
        <div className="md:hidden px-4 pb-3 pt-1 bg-maroon-dark">
          <form onSubmit={handleSearchSubmit}>
            <div className="relative">
              <input
                type="text"
                placeholder="Search organic pads, kits, roll-ons..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                className="w-full bg-white text-ink placeholder:text-muted text-sm rounded-xl pl-10 pr-4 py-2.5 border border-maroon focus:outline-none focus:ring-2 focus:ring-aqua"
              />
              <Search className="w-4 h-4 text-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </form>
        </div>
      )}
    </header>
  );
};
