import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Search, Eye, EyeOff, Edit, Sparkles, Filter } from "lucide-react";
import { productService } from "../../services/productService";
import { adminService } from "../../services/adminService";
import { Product } from "../../data/mockData";
import { CATEGORIES } from "../../utils/constants";
import { formatPrice } from "../../utils/formatPrice";
import { Button } from "../../components/ui/Button";
import { Badge } from "../../components/ui/Badge";
import toast from "react-hot-toast";

export const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Products Catalog | Femora Admin";
    loadProducts();
  }, []);

  const loadProducts = () => {
    setLoading(true);
    productService.getProducts({ limit: 100 }).then((res) => {
      if (res.success && res.data) {
        setProducts(res.data.items);
      }
      setLoading(false);
    });
  };

  const handleToggleHide = async (product: Product) => {
    const nextHidden = product.active !== false; // if active, we hide it
    const res = await adminService.hideProduct(product.id, nextHidden);
    if (res.success) {
      toast.success(res.message || "Product visibility updated");
      setProducts((prev) =>
        prev.map((p) => (p.id === product.id ? { ...p, active: !nextHidden } : p))
      );
    }
  };

  const filtered = products.filter((p) => {
    const matchesCat = categoryFilter === "all" || p.categorySlug === categoryFilter;
    const matchesSearch =
      !search.trim() ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-heading font-bold text-maroon">
            Product Catalog Management
          </h1>
          <p className="text-xs text-muted mt-1">
            Total {products.length} products listed across 7 categories.
          </p>
        </div>

        <Link to="/admin/products/new">
          <Button variant="primary" size="md" leftIcon={<Plus className="w-4 h-4" />}>
            Add New Product
          </Button>
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full sm:w-72">
          <input
            type="text"
            placeholder="Search products by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full text-xs rounded-xl pl-9 pr-3 py-2.5 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-aqua"
          />
          <Search className="w-4 h-4 text-muted absolute left-3 top-1/2 -translate-y-1/2" />
        </div>

        {/* Category filter */}
        <div className="flex items-center gap-2 w-full sm:w-auto text-xs">
          <span className="text-muted font-medium">Category:</span>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-ink focus:outline-none focus:ring-2 focus:ring-aqua cursor-pointer"
          >
            <option value="all">All Categories</option>
            {CATEGORIES.map((c) => (
              <option key={c.id} value={c.slug}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Products Table (Desktop) / Cards (Mobile) */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 border-b border-slate-200 text-muted uppercase tracking-wider font-semibold">
              <tr>
                <th className="py-3 px-4">Product Name</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Price / MRP</th>
                <th className="py-3 px-4">Stock Status</th>
                <th className="py-3 px-4">Visibility</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((product) => {
                const isHidden = product.active === false;

                return (
                  <tr
                    key={product.id}
                    className={`hover:bg-slate-50/80 transition-colors ${
                      isHidden ? "opacity-60 bg-slate-50/50" : ""
                    }`}
                  >
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        <div>
                          <p className="font-semibold text-ink text-sm leading-tight">
                            {product.name}
                          </p>
                          <span className="text-[11px] text-muted">
                            {product.variants?.length || 1} variant(s) · Rating {product.rating} ★
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 font-medium text-muted">
                      {product.category}
                    </td>

                    <td className="py-3.5 px-4 tabular-nums">
                      <span className="font-bold text-maroon block">
                        {formatPrice(product.price)}
                      </span>
                      <span className="text-[10px] text-muted line-through">
                        {formatPrice(product.mrp)}
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      {product.stock <= 20 ? (
                        <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-rose/15 text-rose border border-rose/20">
                          Low Stock ({product.stock})
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-teal/10 text-teal-deep">
                          In Stock ({product.stock})
                        </span>
                      )}
                    </td>

                    <td className="py-3.5 px-4">
                      {isHidden ? (
                        <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-200 text-slate-700">
                          Hidden
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-100 text-emerald-800">
                          Active
                        </span>
                      )}
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          to={`/admin/products/${product.id}/edit`}
                          className="p-1.5 rounded-lg border border-slate-200 text-muted hover:text-maroon hover:bg-slate-100 transition-colors"
                          title="Edit product"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </Link>

                        <button
                          type="button"
                          onClick={() => handleToggleHide(product)}
                          className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                            isHidden
                              ? "border-teal/30 text-teal-deep hover:bg-teal/10"
                              : "border-slate-200 text-muted hover:text-rose hover:bg-rose/10"
                          }`}
                          title={isHidden ? "Unhide product" : "Hide product"}
                        >
                          {isHidden ? (
                            <Eye className="w-3.5 h-3.5" />
                          ) : (
                            <EyeOff className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
