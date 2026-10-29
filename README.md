# Femora — Menstrual Wellness & Rapid Delivery

Femora is a discreet online store for organic period care and cramp-relief products in India.

---

## 🌸 Brand Promises & Identity

1. **Discreet Delivery:** Unmarked plain brown outer cardboard boxes with zero product names or brand logos outside.
2. **Organic & Gentle:** GOTS certified 100% organic cotton, medical-grade German silicone, and pure Ayurvedic essential oils free from chlorine bleaching, plastics, and fragrances.
3. **Fast Dispatch:** Same-day courier dispatch for orders confirmed before 2:00 PM IST.


## 🚀 Getting Started

### 1. Installation & Local Development
```bash
# Install dependencies
npm install

# Start Vite development server on port 3000
npm run dev
```

### 2. Mock Admin Sign-In Credentials
Any email and password works for authentication. To access the **Admin Panel**:
- **Admin Email:** `admin@femora.test`
- **Password:** `AnyPassword123` (or click the "Admin Login" demo button on `/login`)
- **Regular Customer:** Any other email (e.g., `pooja.sharma@example.com`)

## Deploying to Vercel

Import the repository into Vercel and use the detected Vite settings:

- Build command: `npm run build`
- Output directory: `dist`
- Install command: `npm install`

The included `vercel.json` sends app routes to `index.html`, so refreshing or opening a nested route directly works. No additional Vercel package is required. If connecting a real API, set `VITE_API_URL` and `VITE_USE_MOCK=false` in the Vercel project's environment variables before deploying.

---

## 🔄 Switching Between Mock & Real API

The application strictly queries data through the `src/services/` layer (`productService`, `orderService`, `cartService`, `authService`, etc.). To connect a real backend:

1. Update `.env.example` or `.env`:
   ```bash
   VITE_API_URL=http://localhost:5000/api
   VITE_USE_MOCK=false
   ```
2. When `VITE_USE_MOCK=false`, every service automatically delegates calls to the shared Axios instance (`src/services/api.ts`) with Bearer token authentication headers.

---

## 📁 Folder Structure

```
src/
  assets/        logo.webp, logo.png (lotus logo on maroon background)
  components/
    layout/      AnnouncementBar, Navbar, MobileMenu, Footer, AdminLayout
    ui/          Button, Input, Select, Switch, Modal, Drawer, Badge, Rating, Tabs, Accordion, QuantitySelector
    product/     ProductCard, ProductGrid, ProductGallery, KitCard, VariantSelector, ReviewList
    cart/        CartDrawer, CartItem, PriceSummary
    order/       OrderStatusTimeline, OrderCard, AddressCard
    common/      Breadcrumbs, Pagination, EmptyState, Skeleton, LotusDivider, ProductArtwork
  pages/
    public/      Home, Shop, Category, Kits, Search, ProductDetail, Cart, Checkout, OrderSuccess, TrackOrder, Login, Register, ForgotPassword, Learn, LearnDetail
    account/     Profile, Orders, OrderDetail, Addresses, Wishlist
    info/        About, Contact, FAQ, ShippingPolicy, ReturnsPolicy, PrivacyPolicy, Terms, NotFound
    admin/       Dashboard, Products, ProductForm, Orders, OrderDetail, Categories, Customers
  context/       AuthContext, CartContext, WishlistContext
  services/      api.ts, authService.ts, productService.ts, cartService.ts, addressService.ts, orderService.ts, paymentService.ts, adminService.ts
  data/          mockData.ts (36 products, 6 kits, orders, addresses, FAQs, articles, stats)
  routes/        AppRoutes.tsx, ProtectedRoute.tsx, AdminRoute.tsx
  utils/         constants.ts, formatPrice.ts, validators.ts
```

---

## 📋 Comprehensive Route Matrix (All 36 Routes)

- **Storefront:** `/`, `/shop`, `/category/:slug`, `/kits`, `/search`, `/product/:slug`, `/cart`, `/checkout`, `/order-success/:id`, `/track-order`, `/login`, `/register`, `/forgot-password`, `/learn`, `/learn/:slug`
- **Customer Account (Login required):** `/account/profile`, `/account/orders`, `/account/orders/:id`, `/account/addresses`, `/account/wishlist`
- **Information:** `/about`, `/contact`, `/faq`, `/shipping-policy`, `/returns-policy`, `/privacy-policy`, `/terms`, `*` (Not Found)
- **Admin Operations (Admin role only):** `/admin`, `/admin/products`, `/admin/products/new`, `/admin/products/:id/edit`, `/admin/orders`, `/admin/orders/:id`, `/admin/categories`, `/admin/customers`
