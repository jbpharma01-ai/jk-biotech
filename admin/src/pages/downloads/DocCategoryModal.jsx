import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { documentCategoryService } from "../../services/documentCategoryService";
import { useToast } from "../../hooks/useToast";
import { Button } from "../../components/common/Button";
import { Input } from "../../components/common/Input";
import { Textarea } from "../../components/common/Textarea";
import { Toggle } from "../../components/common/Toggle";

export const DocCategoryModal = ({ isOpen, category, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    displayOrder: 0,
    isActive: true,
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const { success, error: toastError } = useToast();
  const isEditing = !!category;

  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name || "",
        slug: category.slug || "",
        description: category.description || "",
        displayOrder: category.displayOrder || 0,
        isActive: category.isActive !== undefined ? category.isActive : true,
      });
    } else {
      setFormData({
        name: "",
        slug: "",
        description: "",
        displayOrder: 0,
        isActive: true,
      });
    }
    setErrors({});
  }, [category, isOpen]);

  const handleNameChange = (e) => {
    const name = e.target.value;
    if (!isEditing) {
      const generatedSlug = name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      setFormData((prev) => ({ ...prev, name, slug: generatedSlug }));
    } else {
      setFormData((prev) => ({ ...prev, name }));
    }
  };

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = "Category name is required";
    if (!formData.slug.trim()) errs.slug = "Slug is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      if (isEditing) {
        await documentCategoryService.update(category._id, formData);
        success("Document category updated successfully!");
      } else {
        await documentCategoryService.create(formData);
        success("Document category created successfully!");
      }

      onSuccess();
      onClose();
    } catch (err) {
      const message =
        err.response?.data?.message || err.message || "Failed to save category.";
      toastError(message);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in overflow-y-auto">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200/80 overflow-hidden my-8">
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-800">
              {isEditing ? "Edit Document Category" : "Add Document Category"}
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Classify downloads such as Certificates, Visual Aids, Price Lists
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <Input
            label="Category Name"
            required
            placeholder="e.g. Certifications, Visual Aids"
            value={formData.name}
            onChange={handleNameChange}
            error={errors.name}
          />

          <Input
            label="URL Slug"
            required
            placeholder="certifications"
            value={formData.slug}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, slug: e.target.value.toLowerCase() }))
            }
            error={errors.slug}
          />

          <Input
            label="Display Order"
            type="number"
            min="0"
            value={formData.displayOrder}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, displayOrder: parseInt(e.target.value) || 0 }))
            }
            helperText="Lower numbers appear first"
          />

          <Textarea
            label="Description"
            rows={2}
            placeholder="Brief overview of documents in this classification..."
            value={formData.description}
            onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
          />

          <div className="pt-2">
            <Toggle
              checked={formData.isActive}
              onChange={(val) => setFormData((prev) => ({ ...prev, isActive: val }))}
              label="Active Status"
              description="Visible on the downloads and resource page"
            />
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
            <Button variant="secondary" onClick={onClose} disabled={loading}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" loading={loading}>
              {isEditing ? "Save Changes" : "Create Category"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
