import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { CATEGORIES, Category as CategoryType } from "../../utils/constants";
import { productService } from "../../services/productService";
import { Product } from "../../data/mockData";
import { ProductGrid } from "../../components/product/ProductGrid";
import { Breadcrumbs } from "../../components/common/Breadcrumbs";
import { EmptyState } from "../../components/common/EmptyState";
import { Sparkles, ShieldCheck, Leaf } from "lucide-react";

export const Category: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  const [category, setCategory] = useState<CategoryType | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState("featured");

  useEffect(() => {
    window.scrollTo(0, 0);
    const cat = CATEGORIES.find((c) => c.slug === slug) || null;
    setCategory(cat);

    if (cat) {
      document.title = `${cat.name} | Femora Organic Care`;
    }

    setLoading(true);
    productService
      .getProducts({
        category: slug,
        sort: sort as any,
      })
      .then((res) => {
        if (res.success && res.data) {
          setProducts(res.data.items);
        }
        setLoading(false);
      });
  }, [slug, sort]);

  if (!category && !loading) {
    return (
      <div className="max-w-4xl mx-auto py-16 px-4">
        <EmptyState
          title="Category Not Found"
          description="The period care collection you are looking for does not exist or has been reorganized."
          actionLabel="Browse All Products"
          actionTo="/shop"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream py-6 md:py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <Breadcrumbs
          items={[
            { label: "Categories", path: "/shop" },
            { label: category?.name || "Category" },
          ]}
        />

        {/* Category Banner with Intro Text */}
        {category && (
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-maroon to-maroon-dark text-white p-8 md:p-12 shadow-femora border border-maroon-dark">
            <div className="max-w-2xl space-y-3 relative z-10">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-aqua text-xs font-semibold uppercase tracking-wider">
                <Leaf className="w-3.5 h-3.5" />
                <span>Certified Skin-Safe Collection</span>
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold tracking-tight">
                {category.name}
              </h1>
              <p className="text-sm md:text-base text-cream/90 leading-relaxed font-normal">
                {category.description}
              </p>
              <div className="pt-2 flex items-center gap-2 text-xs text-blush font-medium">
                <ShieldCheck className="w-4 h-4 text-aqua" />
                <span>100% Plain packaging guarantee on every order</span>
              </div>
            </div>

            {/* Decorative soft glow */}
            <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial from-rose/20 to-transparent pointer-events-none" />
          </div>
        )}

        {/* Sorting & Result Count Bar */}
        <div className="flex items-center justify-between gap-4 pb-4 border-b border-maroon/10">
          <p className="text-xs text-muted">
            Showing <strong className="text-ink tabular-nums">{products.length}</strong> items in{" "}
            {category?.name}
          </p>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-muted hidden sm:inline">Sort:</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="bg-white border border-maroon/15 rounded-xl px-3 py-2 text-xs font-medium text-ink focus:outline-none focus:ring-2 focus:ring-aqua cursor-pointer"
            >
              <option value="featured">Featured</option>
              <option value="bestseller">Best Sellers</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        <ProductGrid
          products={products}
          isLoading={loading}
          columns={3}
          emptyState={
            <EmptyState
              title="No products found in this category"
              description="Check back soon as we expand our organic care inventory."
              actionLabel="Explore All Products"
              actionTo="/shop"
            />
          }
        />
      </div>
    </div>
  );
};
