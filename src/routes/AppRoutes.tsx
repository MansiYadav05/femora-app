import React, { Suspense, lazy } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import { AnnouncementBar } from "../components/layout/AnnouncementBar";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { MobileMenu } from "../components/layout/MobileMenu";
import { CartDrawer } from "../components/cart/CartDrawer";
import { AdminLayout } from "../components/layout/AdminLayout";
import { ProtectedRoute } from "./ProtectedRoute";
import { AdminRoute } from "./AdminRoute";

// Lazy-loaded pages
const Home = lazy(() => import("../pages/public/Home").then((m) => ({ default: m.Home })));
const Shop = lazy(() => import("../pages/public/Shop").then((m) => ({ default: m.Shop })));
const Category = lazy(() => import("../pages/public/Category").then((m) => ({ default: m.Category })));
const Kits = lazy(() => import("../pages/public/Kits").then((m) => ({ default: m.Kits })));
const Search = lazy(() => import("../pages/public/Search").then((m) => ({ default: m.Search })));
const ProductDetail = lazy(() => import("../pages/public/ProductDetail").then((m) => ({ default: m.ProductDetail })));
const Cart = lazy(() => import("../pages/public/Cart").then((m) => ({ default: m.Cart })));
const Checkout = lazy(() => import("../pages/public/Checkout").then((m) => ({ default: m.Checkout })));
const OrderSuccess = lazy(() => import("../pages/public/OrderSuccess").then((m) => ({ default: m.OrderSuccess })));
const TrackOrder = lazy(() => import("../pages/public/TrackOrder").then((m) => ({ default: m.TrackOrder })));
const Login = lazy(() => import("../pages/public/Login").then((m) => ({ default: m.Login })));
const Register = lazy(() => import("../pages/public/Register").then((m) => ({ default: m.Register })));
const ForgotPassword = lazy(() => import("../pages/public/ForgotPassword").then((m) => ({ default: m.ForgotPassword })));
const Learn = lazy(() => import("../pages/public/Learn").then((m) => ({ default: m.Learn })));
const LearnDetail = lazy(() => import("../pages/public/LearnDetail").then((m) => ({ default: m.LearnDetail })));

// Customer account pages
const Profile = lazy(() => import("../pages/account/Profile").then((m) => ({ default: m.Profile })));
const Orders = lazy(() => import("../pages/account/Orders").then((m) => ({ default: m.Orders })));
const OrderDetail = lazy(() => import("../pages/account/OrderDetail").then((m) => ({ default: m.OrderDetail })));
const Addresses = lazy(() => import("../pages/account/Addresses").then((m) => ({ default: m.Addresses })));
const Wishlist = lazy(() => import("../pages/account/Wishlist").then((m) => ({ default: m.Wishlist })));

// Information pages
const About = lazy(() => import("../pages/info/About").then((m) => ({ default: m.About })));
const Contact = lazy(() => import("../pages/info/Contact").then((m) => ({ default: m.Contact })));
const FAQ = lazy(() => import("../pages/info/FAQ").then((m) => ({ default: m.FAQ })));
const ShippingPolicy = lazy(() => import("../pages/info/ShippingPolicy").then((m) => ({ default: m.ShippingPolicy })));
const ReturnsPolicy = lazy(() => import("../pages/info/ReturnsPolicy").then((m) => ({ default: m.ReturnsPolicy })));
const PrivacyPolicy = lazy(() => import("../pages/info/PrivacyPolicy").then((m) => ({ default: m.PrivacyPolicy })));
const Terms = lazy(() => import("../pages/info/Terms").then((m) => ({ default: m.Terms })));
const NotFound = lazy(() => import("../pages/info/NotFound").then((m) => ({ default: m.NotFound })));

// Admin pages
const AdminDashboard = lazy(() => import("../pages/admin/Dashboard").then((m) => ({ default: m.Dashboard })));
const AdminProducts = lazy(() => import("../pages/admin/Products").then((m) => ({ default: m.Products })));
const AdminProductForm = lazy(() => import("../pages/admin/ProductForm").then((m) => ({ default: m.ProductForm })));
const AdminOrders = lazy(() => import("../pages/admin/Orders").then((m) => ({ default: m.Orders })));
const AdminOrderDetail = lazy(() => import("../pages/admin/OrderDetail").then((m) => ({ default: m.OrderDetail })));
const AdminCategories = lazy(() => import("../pages/admin/Categories").then((m) => ({ default: m.Categories })));
const AdminCustomers = lazy(() => import("../pages/admin/Customers").then((m) => ({ default: m.Customers })));

// Layout wrapper for Public & Customer storefront routes
const StorefrontLayout: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      <AnnouncementBar />
      <Navbar onOpenMobileMenu={() => setIsMobileMenuOpen(true)} />
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
      <CartDrawer />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export const AppRoutes: React.FC = () => {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-cream">
          <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 rounded-full border-3 border-maroon border-t-transparent animate-spin" />
            <span className="text-xs font-semibold text-maroon uppercase tracking-wider">
              Loading Femora...
            </span>
          </div>
        </div>
      }
    >
      <Routes>
        {/* Storefront Layout Routes */}
        <Route element={<StorefrontLayout />}>
          {/* 4.1 Storefront public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/category/:slug" element={<Category />} />
          <Route path="/kits" element={<Kits />} />
          <Route path="/search" element={<Search />} />
          <Route path="/product/:slug" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-success/:id" element={<OrderSuccess />} />
          <Route path="/track-order" element={<TrackOrder />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/learn/:slug" element={<LearnDetail />} />

          {/* 4.2 Customer account routes (Protected) */}
          <Route
            path="/account/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/account/orders"
            element={
              <ProtectedRoute>
                <Orders />
              </ProtectedRoute>
            }
          />
          <Route
            path="/account/orders/:id"
            element={
              <ProtectedRoute>
                <OrderDetail />
              </ProtectedRoute>
            }
          />
          <Route
            path="/account/addresses"
            element={
              <ProtectedRoute>
                <Addresses />
              </ProtectedRoute>
            }
          />
          <Route
            path="/account/wishlist"
            element={
              <ProtectedRoute>
                <Wishlist />
              </ProtectedRoute>
            }
          />

          {/* 4.3 Information pages */}
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/shipping-policy" element={<ShippingPolicy />} />
          <Route path="/returns-policy" element={<ReturnsPolicy />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* 4.4 Admin Panel Routes (Protected by AdminRoute and using AdminLayout) */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="products/new" element={<AdminProductForm />} />
          <Route path="products/:id/edit" element={<AdminProductForm />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="orders/:id" element={<AdminOrderDetail />} />
          <Route path="categories" element={<AdminCategories />} />
          <Route path="customers" element={<AdminCustomers />} />
        </Route>
      </Routes>
    </Suspense>
  );
};
