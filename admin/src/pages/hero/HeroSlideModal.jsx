import React, { useState, useEffect } from "react";
import { X, Plus, Trash2 } from "lucide-react";
import { heroSlideService } from "../../services/heroSlideService";
import { useToast } from "../../hooks/useToast";
import { Button } from "../../components/common/Button";
import { Input } from "../../components/common/Input";
import { Textarea } from "../../components/common/Textarea";
import { Toggle } from "../../components/common/Toggle";
import { ImageUpload } from "../../components/common/ImageUpload";

export const HeroSlideModal = ({ isOpen, slide, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    title: "",
    titleLines: [""],
    badge: "",
    subtitle: "",
    ctaLabel: "",
    ctaLink: "",
    displayOrder: 0,
    isActive: true,
  });
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const { success, error: toastError } = useToast();
  const isEditing = !!slide;

  useEffect(() => {
    if (slide) {
      setFormData({
        title: slide.title || "",
        titleLines: Array.isArray(slide.titleLines) && slide.titleLines.length > 0 ? slide.titleLines : [""],
        badge: slide.badge || "",
        subtitle: slide.subtitle || "",
        ctaLabel: slide.cta?.label || "",
        ctaLink: slide.cta?.link || "",
        displayOrder: slide.displayOrder || 0,
        isActive: slide.isActive !== undefined ? slide.isActive : true,
      });
      setImageFile(null);
    } else {
      setFormData({
        title: "",
        titleLines: [""],
        badge: "",
        subtitle: "",
        ctaLabel: "",
        ctaLink: "",
        displayOrder: 0,
        isActive: true,
      });
      setImageFile(null);
    }
    setErrors({});
  }, [slide, isOpen]);

  const handleTitleLineChange = (index, value) => {
    setFormData((prev) => {
      const next = [...prev.titleLines];
      next[index] = value;
      return { ...prev, titleLines: next };
    });
  };

  const addTitleLine = () => {
    setFormData((prev) => ({
      ...prev,
      titleLines: [...prev.titleLines, ""],
    }));
  };

  const removeTitleLine = (index) => {
    setFormData((prev) => ({
      ...prev,
      titleLines: prev.titleLines.filter((_, i) => i !== index),
    }));
  };

  const validate = () => {
    const errs = {};
    if (!formData.title.trim()) errs.title = "Main slide title is required";
    if (!isEditing && !imageFile) errs.image = "Slide background image is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const data = new FormData();
      data.append("title", formData.title);
      // Clean up empty lines
      const cleanLines = formData.titleLines.filter((l) => l.trim() !== "");
      data.append("titleLines", JSON.stringify(cleanLines.length ? cleanLines : [formData.title]));
      data.append("badge", formData.badge);
      data.append("subtitle", formData.subtitle);

      // CTA object
      if (formData.ctaLabel || formData.ctaLink) {
        data.append(
          "cta",
          JSON.stringify({
            label: formData.ctaLabel || "Learn More",
            link: formData.ctaLink || "/products",
          })
        );
      }

      data.append("displayOrder", formData.displayOrder.toString());
      data.append("isActive", formData.isActive.toString());

      if (imageFile) {
        data.append("image", imageFile);
      }

      if (isEditing) {
        await heroSlideService.update(slide._id, data);
        success("Hero slide updated successfully!");
      } else {
        await heroSlideService.create(data);
        success("Hero slide created successfully!");
      }

      onSuccess();
      onClose();
    } catch (err) {
      const message =
        err.response?.data?.message || err.message || "Failed to save slide.";
      toastError(message);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in overflow-y-auto">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden my-8">
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-800">
              {isEditing ? "Edit Hero Banner Slide" : "Add Hero Banner Slide"}
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Configure homepage prominent banner visuals and headline typography
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
            label="Internal Slide Title"
            required
            placeholder="e.g. Pharmaceutical Quality Slide"
            value={formData.title}
            onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
            error={errors.title}
          />

          {/* Title Lines */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-600">
                Headline Lines (Displayed on Homepage)
              </span>
              <button
                type="button"
                onClick={addTitleLine}
                className="text-xs font-semibold text-brand-blue hover:text-brand-darkTeal flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> Add Line
              </button>
            </div>
            {formData.titleLines.map((line, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder={`Headline Line ${idx + 1}`}
                  value={line}
                  onChange={(e) => handleTitleLineChange(idx, e.target.value)}
                  className="flex-1 rounded-xl border border-slate-200 px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/30"
                />
                {formData.titleLines.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeTitleLine(idx)}
                    className="p-2 text-slate-400 hover:text-rose-600 rounded-lg transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Highlight Badge"
              placeholder="e.g. WHO-GMP Certified"
              value={formData.badge}
              onChange={(e) => setFormData((prev) => ({ ...prev, badge: e.target.value }))}
              helperText="Small chip displayed above headline"
            />

            <Input
              label="Display Order"
              type="number"
              min="0"
              value={formData.displayOrder}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, displayOrder: parseInt(e.target.value) || 0 }))
              }
              helperText="Slide position in rotation sequence"
            />
          </div>

          <Textarea
            label="Slide Subtitle / Description"
            rows={2}
            placeholder="Supportive text under the main headline..."
            value={formData.subtitle}
            onChange={(e) => setFormData((prev) => ({ ...prev, subtitle: e.target.value }))}
          />

          {/* CTA Link Config */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Button Text"
              placeholder="e.g. Explore Products"
              value={formData.ctaLabel}
              onChange={(e) => setFormData((prev) => ({ ...prev, ctaLabel: e.target.value }))}
            />

            <Input
              label="Button URL / Route"
              placeholder="/products"
              value={formData.ctaLink}
              onChange={(e) => setFormData((prev) => ({ ...prev, ctaLink: e.target.value }))}
            />
          </div>

          <ImageUpload
            label="Banner Background Image"
            required={!isEditing}
            currentImageUrl={slide?.image?.url}
            onChange={(file) => setImageFile(file)}
            error={errors.image}
            helperText="Wide aspect ratio high-definition image"
          />

          <div className="pt-2">
            <Toggle
              checked={formData.isActive}
              onChange={(val) => setFormData((prev) => ({ ...prev, isActive: val }))}
              label="Active Status"
              description="Slide will be included in the homepage banner carousel"
            />
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
            <Button variant="secondary" onClick={onClose} disabled={loading}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" loading={loading}>
              {isEditing ? "Save Changes" : "Create Slide"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
