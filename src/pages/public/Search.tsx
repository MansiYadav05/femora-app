import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Search as SearchIcon, Sparkles } from "lucide-react";
import { productService } from "../../services/productService";
import { Product } from "../../data/mockData";
import { ProductGrid } from "../../components/product/ProductGrid";
import { Breadcrumbs } from "../../components/common/Breadcrumbs";
import { EmptyState } from "../../components/common/EmptyState";
import { CATEGORIES } from "../../utils/constants";

export const Search: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = query ? `Search results for "${query}" | Femora` : "Search Products | Femora";
    window.scrollTo(0, 0);

    setLoading(true);
    productService
      .getProducts({ q: query, limit: 24 })
      .then((res) => {
        if (res.success && res.data) {
          setProducts(res.data.items);
        }
        setLoading(false);
      });
  }, [query]);

  return (
    <div className="min-h-screen bg-cream py-6 md:py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <Breadcrumbs items={[{ label: "Search Results" }]} />

        {/* Heading */}
        <div className="pb-4 border-b border-maroon/10">
          <div className="flex items-center gap-2 text-rose text-xs font-semibold uppercase tracking-wider mb-1">
            <SearchIcon className="w-3.5 h-3.5" />
            <span>Search Results</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-heading font-bold text-maroon">
            {query ? (
              <>
                Results for &ldquo;{query}&rdquo;
              </>
            ) : (
              "All Products"
            )}
          </h1>
          <p className="text-xs text-muted mt-1">
            Found <strong className="text-ink tabular-nums">{products.length}</strong> matching period care items.
          </p>
        </div>

        {/* Grid or No-results with suggestions */}
        <ProductGrid
          products={products}
          isLoading={loading}
          columns={3}
          emptyState={
            <div className="space-y-8">
              <EmptyState
                icon={<SearchIcon className="w-8 h-8" />}
                title={`No products matched "${query}"`}
                description="We couldn't find exact matches for your query. Check your spelling or browse our popular organic period categories below."
                actionLabel="View All Products"
                actionTo="/shop"
              />

              {/* Popular categories suggestions */}
              <div className="bg-white p-6 rounded-2xl border border-maroon/10 shadow-femora text-left max-w-2xl mx-auto">
                <h4 className="font-heading font-semibold text-base text-maroon mb-3 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-rose" />
                  <span>Popular Suggestions:</span>
                </h4>
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.map((cat) => (
                    <Link
                      key={cat.id}
                      to={`/category/${cat.slug}`}
                      className="px-3.5 py-1.5 rounded-full bg-cream text-ink text-xs font-medium hover:bg-blush-bg hover:text-maroon border border-maroon/10 transition-colors"
                    >
                      {cat.name}
                    </Link>
                  ))}
                  <Link
                    to="/kits"
                    className="px-3.5 py-1.5 rounded-full bg-rose-button text-white text-xs font-medium hover:bg-rose transition-colors"
                  >
                    Relief Kits & Bundles
                  </Link>
                </div>
              </div>
            </div>
          }
        />
      </div>
    </div>
  );
};
