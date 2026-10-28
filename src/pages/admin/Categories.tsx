import React, { useState } from "react";
import { Plus, Edit, Tags, Sparkles } from "lucide-react";
import { CATEGORIES, Category } from "../../utils/constants";
import { Button } from "../../components/ui/Button";
import { Modal } from "../../components/ui/Modal";
import { Input } from "../../components/ui/Input";
import toast from "react-hot-toast";

export const Categories: React.FC = () => {
  const [categoriesList, setCategoriesList] = useState<Category[]>(CATEGORIES);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const [formName, setFormName] = useState("");
  const [formTagline, setFormTagline] = useState("");
  const [formDesc, setFormDesc] = useState("");

  const handleOpenAdd = () => {
    setEditingCategory(null);
    setFormName("");
    setFormTagline("");
    setFormDesc("");
    setIsModalOpen(true);
  };

  const handleOpenEdit = (cat: Category) => {
    setEditingCategory(cat);
    setFormName(cat.name);
    setFormTagline(cat.tagline);
    setFormDesc(cat.description);
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) {
      toast.error("Category name is required");
      return;
    }

    if (editingCategory) {
      setCategoriesList((prev) =>
        prev.map((c) =>
          c.id === editingCategory.id
            ? { ...c, name: formName, tagline: formTagline, description: formDesc }
            : c
        )
      );
      toast.success("Category updated successfully");
    } else {
      const slug = formName.toLowerCase().replace(/[^a-z0-9]+/g, "-");
      const newCat: Category = {
        id: `cat-${Date.now()}`,
        slug,
        name: formName,
        tagline: formTagline || "Herbal and organic wellness products",
        description: formDesc || "Formulated with plant-derived non-toxic ingredients.",
        iconName: "Sparkles",
        itemCount: 0,
        bgGradient: "from-rose/10 to-blush/20",
      };
      setCategoriesList((prev) => [...prev, newCat]);
      toast.success("New category added to catalog");
    }

    setIsModalOpen(false);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-heading font-bold text-maroon flex items-center gap-2">
            <Tags className="w-6 h-6 text-rose" />
            <span>Product Categories ({categoriesList.length})</span>
          </h1>
          <p className="text-xs text-muted mt-1">
            Browse and organize period care classification lines.
          </p>
        </div>

        <Button
          variant="primary"
          size="md"
          onClick={handleOpenAdd}
          leftIcon={<Plus className="w-4 h-4" />}
        >
          Add Category
        </Button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 border-b border-slate-200 text-muted uppercase tracking-wider font-semibold">
              <tr>
                <th className="py-3 px-4">Category Name</th>
                <th className="py-3 px-4">Slug</th>
                <th className="py-3 px-4">Tagline</th>
                <th className="py-3 px-4">Active Items</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {categoriesList.map((cat) => (
                <tr key={cat.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-sm text-maroon">
                    {cat.name}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-muted text-[11px]">
                    /category/{cat.slug}
                  </td>
                  <td className="py-3.5 px-4 text-ink/80 max-w-xs truncate">
                    {cat.tagline}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-teal/10 text-teal-deep">
                      {cat.itemCount} products
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => handleOpenEdit(cat)}
                      className="p-1.5 rounded-lg border border-slate-200 text-muted hover:text-maroon hover:bg-slate-100 transition-colors inline-flex items-center gap-1 cursor-pointer"
                    >
                      <Edit className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Category Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingCategory ? "Edit Category" : "Add New Category"}
      >
        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          <Input
            label="Category Name"
            required
            placeholder="e.g. Sanitary Pads"
            value={formName}
            onChange={(e) => setFormName(e.target.value)}
          />

          <Input
            label="Tagline / Key Highlight"
            placeholder="e.g. Ultra-thin, 100% certified organic cotton"
            value={formTagline}
            onChange={(e) => setFormTagline(e.target.value)}
          />

          <div>
            <label className="block text-xs font-semibold text-ink/80 mb-1.5 uppercase tracking-wider">
              Category Description
            </label>
            <textarea
              rows={3}
              placeholder="Introductory text displayed on the category banner"
              value={formDesc}
              onChange={(e) => setFormDesc(e.target.value)}
              className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-aqua"
            />
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              {editingCategory ? "Update Category" : "Create Category"}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
