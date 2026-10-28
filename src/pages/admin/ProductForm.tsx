import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Save, Sparkles, CheckCircle2 } from "lucide-react";
import { productService } from "../../services/productService";
import { adminService } from "../../services/adminService";
import { Product } from "../../data/mockData";
import { CATEGORIES } from "../../utils/constants";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Switch } from "../../components/ui/Switch";
import { ProductArtwork } from "../../components/common/ProductArtwork";
import toast from "react-hot-toast";

export const ProductForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [loading, setLoading] = useState(isEditing);
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState<Partial<Product>>({
    name: "",
    category: "Sanitary Pads",
    categorySlug: "sanitary-pads",
    price: 299,
    mrp: 399,
    stock: 40,
    shortDescription: "",
    description: "",
    ingredients: "",
    howToUse: "",
    isOrganic: true,
    isBestseller: false,
    isFeatured: false,
    imageTheme: "pads",
    active: true,
    kitContents: [],
  });

  const [kitContentsText, setKitContentsText] = useState("");

  useEffect(() => {
    document.title = isEditing ? "Edit Product | Femora Admin" : "Add Product | Femora Admin";

    if (isEditing && id) {
      productService.getProduct(id).then((res) => {
        if (res.success && res.data) {
          setFormData(res.data);
          if (res.data.kitContents) {
            setKitContentsText(res.data.kitContents.join("\n"));
          }
        }
        setLoading(false);
      });
    }
  }, [id, isEditing]);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const slug = e.target.value;
    const cat = CATEGORIES.find((c) => c.slug === slug);
    const themeMap: Record<string, any> = {
      "sanitary-pads": "pads",
      tampons: "tampons",
      "menstrual-cups": "cups",
      "heating-patches": "patches",
      "cramp-roll-ons": "rollon",
      "hot-water-bags": "waterbag",
      "relief-kits": "kit",
    };

    setFormData({
      ...formData,
      categorySlug: slug,
      category: cat?.name || "Sanitary Pads",
      imageTheme: themeMap[slug] || "pads",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name?.trim()) {
      toast.error("Product name is required");
      return;
    }

    setIsSaving(true);

    const kitContents =
      formData.categorySlug === "relief-kits" && kitContentsText.trim()
        ? kitContentsText.split("\n").filter((l) => l.trim())
        : undefined;

    const payload = {
      ...formData,
      kitContents,
    };

    if (isEditing && id) {
      const res = await adminService.updateProduct(id, payload);
      setIsSaving(false);
      if (res.success) {
        toast.success("Product updated successfully");
        navigate("/admin/products");
      }
    } else {
      const res = await adminService.createProduct(payload);
      setIsSaving(false);
      if (res.success) {
        toast.success("New product created successfully");
        navigate("/admin/products");
      }
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <Link
            to="/admin/products"
            className="p-2 rounded-xl border border-slate-200 text-muted hover:text-maroon hover:bg-slate-100 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-2xl font-heading font-bold text-maroon">
              {isEditing ? `Edit: ${formData.name || "Product"}` : "Create New Product"}
            </h1>
            <p className="text-xs text-muted">
              Configure pricing, stock, botanical ingredients, and category classification.
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Form Column */}
        <div className="lg:col-span-8 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-5">
          <Input
            label="Product Title"
            required
            placeholder="e.g. GentleFlow Organic Cotton Pads (Regular)"
            value={formData.name || ""}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-ink/80 mb-1.5 uppercase tracking-wider">
                Category
              </label>
              <select
                value={formData.categorySlug || "sanitary-pads"}
                onChange={handleCategoryChange}
                className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-aqua cursor-pointer"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat.id} value={cat.slug}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-ink/80 mb-1.5 uppercase tracking-wider">
                Artwork Theme
              </label>
              <select
                value={formData.imageTheme || "pads"}
                onChange={(e) => setFormData({ ...formData, imageTheme: e.target.value as any })}
                className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-aqua cursor-pointer"
              >
                <option value="pads">Sanitary Pads (Organic cotton winged)</option>
                <option value="tampons">Tampons (Smooth applicator / core)</option>
                <option value="cups">Menstrual Cup (Medical silicone)</option>
                <option value="patches">Heating Patches (Air-activated thermal)</option>
                <option value="rollon">Cramp Roll-on (Metal ball bottle)</option>
                <option value="waterbag">Hot Water Bag (Quilted plush cover)</option>
                <option value="kit">Relief Kit (Curated gift box)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <Input
              label="Selling Price (INR)"
              type="number"
              required
              value={formData.price || 0}
              onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
            />
            <Input
              label="MRP (INR)"
              type="number"
              required
              value={formData.mrp || 0}
              onChange={(e) => setFormData({ ...formData, mrp: Number(e.target.value) })}
            />
            <Input
              label="Inventory Stock"
              type="number"
              required
              value={formData.stock || 0}
              onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-ink/80 mb-1.5 uppercase tracking-wider">
              Short Summary Description
            </label>
            <input
              type="text"
              placeholder="1-line summary shown on cards"
              value={formData.shortDescription || ""}
              onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
              className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-aqua"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-ink/80 mb-1.5 uppercase tracking-wider">
              Full Product Description
            </label>
            <textarea
              rows={4}
              placeholder="Detailed description of features, materials, and benefits"
              value={formData.description || ""}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-aqua"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-ink/80 mb-1.5 uppercase tracking-wider">
              Ingredients & Materials
            </label>
            <input
              type="text"
              placeholder="e.g. 100% GOTS Organic Cotton, Bamboo core, Plant-based adhesive"
              value={formData.ingredients || ""}
              onChange={(e) => setFormData({ ...formData, ingredients: e.target.value })}
              className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-aqua"
            />
          </div>

          {/* Kit Contents Field (if relief kit category) */}
          {formData.categorySlug === "relief-kits" && (
            <div className="p-4 rounded-xl bg-blush-bg/50 border border-blush/40 space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-maroon">
                Bundle Contents (One item per line):
              </label>
              <textarea
                rows={4}
                placeholder="1x GentleFlow Regular Pads (Pack of 10)&#10;1x Herbal Rescue Roll-on (10ml)&#10;1x HerbalHeat Patches (Pack of 5)"
                value={kitContentsText}
                onChange={(e) => setKitContentsText(e.target.value)}
                className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-aqua font-mono"
              />
            </div>
          )}

          <div className="pt-4 border-t border-slate-200 flex justify-end gap-3">
            <Link to="/admin/products">
              <Button type="button" variant="ghost">Cancel</Button>
            </Link>
            <Button
              type="submit"
              variant="primary"
              size="md"
              isLoading={isSaving}
              leftIcon={<Save className="w-4 h-4" />}
            >
              {isEditing ? "Update Product" : "Publish to Store"}
            </Button>
          </div>
        </div>

        {/* Right Preview Column */}
        <div className="lg:col-span-4 space-y-6">
          {/* Live Artwork Preview */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3 text-center">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted block text-left">
              Live Artwork Preview
            </span>
            <div className="bg-cream/60 rounded-xl p-4 overflow-hidden">
              <ProductArtwork
                theme={formData.imageTheme || "pads"}
                aspectRatio="square"
                className="w-44 h-44 mx-auto"
              />
            </div>
            <p className="text-[11px] text-muted">
              Vector illustrated SVG theme rendered in real-time.
            </p>
          </div>

          {/* Visibility & Badges Toggles */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4 text-left">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted block">
              Flags & Status
            </span>

            <Switch
              checked={formData.active !== false}
              onChange={(val) => setFormData({ ...formData, active: val })}
              label="Active in Storefront"
              description="Visible to customers browsing the shop"
            />

            <Switch
              checked={Boolean(formData.isOrganic)}
              onChange={(val) => setFormData({ ...formData, isOrganic: val })}
              label="Organic Badge"
              description="Displays 100% GOTS organic tag"
            />

            <Switch
              checked={Boolean(formData.isBestseller)}
              onChange={(val) => setFormData({ ...formData, isBestseller: val })}
              label="Bestseller Badge"
              description="Feature in top recommended strips"
            />
          </div>
        </div>
      </form>
    </div>
  );
};
