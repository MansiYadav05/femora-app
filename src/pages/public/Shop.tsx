import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Filter, SlidersHorizontal, X, RotateCcw } from "lucide-react";
import { CATEGORIES } from "../../utils/constants";
import { productService } from "../../services/productService";
import { Product } from "../../data/mockData";
import { ProductGrid } from "../../components/product/ProductGrid";
import { Breadcrumbs } from "../../components/common/Breadcrumbs";
import { Pagination } from "../../components/common/Pagination";
import { Drawer } from "../../components/ui/Drawer";
import { Button } from "../../components/ui/Button";
import { EmptyState } from "../../components/common/EmptyState";
import { formatPrice } from "../../utils/formatPrice";

export const Shop: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  // Filters state derived from URL or defaults
  const currentCategory = searchParams.get("category") || "all";
  const currentSort = (searchParams.get("sort") as any) || "featured";
  const currentOrganic = searchParams.get("organic") === "true";
  const currentMinPrice = Number(searchParams.get("minPrice")) || 0;
  const currentMaxPrice = Number(searchParams.get("maxPrice")) || 1500;
  const currentPage = Number(searchParams.get("page")) || 1;

  useEffect(() => {
    document.title = "Shop Organic Period Care & Cramp Relief | Femora";
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setLoading(true);
    productService
      .getProducts({
        category: currentCategory === "all" ? undefined : currentCategory,
        sort: currentSort,
        organicOnly: currentOrganic,
        minPrice: currentMinPrice > 0 ? currentMinPrice : undefined,
        maxPrice: currentMaxPrice < 1500 ? currentMaxPrice : undefined,
        page: currentPage,
        limit: 9,
      })
      .then((res) => {
        if (res.success && res.data) {
          setProducts(res.data.items);
          setTotalCount(res.data.total);
          setTotalPages(res.data.totalPages);
        }
        setLoading(false);
      });
  }, [currentCategory, currentSort, currentOrganic, currentMinPrice, currentMaxPrice, currentPage]);

  const updateParam = (key: string, value: string | null) => {
    const next = new URLSearchParams(searchParams);
    if (value === null || value === "" || (key === "page" && value === "1")) {
      next.delete(key);
    } else {
      next.set(key, value);
    }
    // Reset page on filter changes (except when paging itself)
    if (key !== "page") {
      next.delete("page");
    }
    setSearchParams(next);
  };

  const handleResetFilters = () => {
    setSearchParams({});
    setIsFilterDrawerOpen(false);
  };

  const activeFiltersCount =
    (currentCategory !== "all" ? 1 : 0) +
    (currentOrganic ? 1 : 0) +
    (currentMinPrice > 0 || currentMaxPrice < 1500 ? 1 : 0);

  // Reusable Filter Panel
  const FilterContent = (
    <div className="space-y-6 text-ink">
      {/* Active filters clear */}
      {activeFiltersCount > 0 && (
        <div className="flex items-center justify-between pb-3 border-b border-maroon/10">
          <span className="text-xs font-semibold text-maroon">
            {activeFiltersCount} filter(s) active
          </span>
          <button
            onClick={handleResetFilters}
            className="text-xs text-rose hover:underline flex items-center gap-1 cursor-pointer font-medium"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Clear all</span>
          </button>
        </div>
      )}

      {/* Categories */}
      <div className="space-y-2">
        <label className="block text-xs font-bold uppercase tracking-wider text-maroon">
          Category
        </label>
        <div className="space-y-1">
          <button
            type="button"
            onClick={() => updateParam("category", "all")}
            className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              currentCategory === "all"
                ? "bg-maroon text-white font-semibold"
                : "text-ink/80 hover:bg-blush-bg"
            }`}
          >
            All Products
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => updateParam("category", cat.slug)}
              className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                currentCategory === cat.slug
                  ? "bg-maroon text-white font-semibold"
                  : "text-ink/80 hover:bg-blush-bg"
              }`}
            >
              <span className="truncate">{cat.name}</span>
              <span className="text-[10px] opacity-70 tabular-nums">({cat.itemCount})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Organic Only Checkbox */}
      <div className="pt-2 border-t border-maroon/10">
        <label className="flex items-center gap-2 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={currentOrganic}
            onChange={(e) => updateParam("organic", e.target.checked ? "true" : null)}
            className="w-4 h-4 rounded text-teal-deep focus:ring-aqua border-maroon/20"
          />
          <span className="text-xs font-semibold text-ink">100% Certified Organic Only</span>
        </label>
      </div>

      {/* Price Range Slider */}
      <div className="space-y-2 pt-2 border-t border-maroon/10">
        <div className="flex items-center justify-between text-xs font-semibold text-maroon uppercase tracking-wider">
          <span>Max Price</span>
          <span className="tabular-nums font-bold text-ink">{formatPrice(currentMaxPrice)}</span>
        </div>
        <input
          type="range"
          min="200"
          max="1500"
          step="50"
          value={currentMaxPrice}
          onChange={(e) => updateParam("maxPrice", e.target.value)}
          className="w-full accent-rose-button cursor-pointer"
        />
        <div className="flex justify-between text-[11px] text-muted tabular-nums">
          <span>₹200</span>
          <span>₹1,500</span>
        </div>
      </div>

      {/* Plain packaging note */}
      <div className="p-3 bg-blush-bg/50 rounded-xl border border-blush/40 text-[11px] text-maroon leading-relaxed">
        <strong>Privacy Promise:</strong> All items delivered with zero product descriptions or logos outside.
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-cream py-6 md:py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <Breadcrumbs items={[{ label: "Shop Catalog" }]} />

        {/* Page Title & Controls Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 my-6 pb-6 border-b border-maroon/10">
          <div>
            <h1 className="text-2xl md:text-3xl font-heading font-bold text-maroon">
              {currentCategory === "all"
                ? "All Feminine Care & Cramp Relief"
                : CATEGORIES.find((c) => c.slug === currentCategory)?.name || "Shop Products"}
            </h1>
            <p className="text-xs text-muted mt-1">
              Showing <strong className="text-ink tabular-nums">{totalCount}</strong> products with 100% discreet packaging.
            </p>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
            {/* Mobile Filter Button */}
            <button
              onClick={() => setIsFilterDrawerOpen(true)}
              className="lg:hidden px-3.5 py-2 rounded-full border border-maroon/20 bg-white text-xs font-semibold text-ink flex items-center gap-1.5 shadow-xs"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-rose" />
              <span>Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}</span>
            </button>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 text-xs">
              <span className="text-muted hidden sm:inline">Sort by:</span>
              <select
                value={currentSort}
                onChange={(e) => updateParam("sort", e.target.value)}
                className="bg-white border border-maroon/15 rounded-xl px-3 py-2 text-xs text-ink font-medium focus:outline-none focus:ring-2 focus:ring-aqua cursor-pointer"
              >
                <option value="featured">Featured First</option>
                <option value="bestseller">Best Sellers</option>
                <option value="rating">Highest Rated</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Layout: Sidebar + Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block bg-white p-6 rounded-2xl border border-maroon/10 shadow-femora sticky top-24">
            <h3 className="font-heading font-semibold text-base text-maroon mb-4 flex items-center gap-2">
              <Filter className="w-4 h-4 text-rose" />
              <span>Filter Catalog</span>
            </h3>
            {FilterContent}
          </aside>

          {/* Product Grid Area */}
          <div className="lg:col-span-3">
            <ProductGrid
              products={products}
              isLoading={loading}
              columns={3}
              emptyState={
                <EmptyState
                  title="No products matched your filters"
                  description="Try adjusting your price range, clearing organic filters, or browsing other period care categories."
                  actionLabel="Clear Filters"
                  onAction={handleResetFilters}
                />
              }
            />

            {/* Pagination */}
            {!loading && totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(p) => updateParam("page", String(p))}
              />
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filters Drawer */}
      <Drawer
        isOpen={isFilterDrawerOpen}
        onClose={() => setIsFilterDrawerOpen(false)}
        side="left"
        title="Filter Products"
      >
        <div className="p-6">{FilterContent}</div>
      </Drawer>
    </div>
  );
};
