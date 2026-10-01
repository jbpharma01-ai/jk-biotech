import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { documentService } from "../../services/documentService";
import { documentCategoryService } from "../../services/documentCategoryService";
import { useToast } from "../../hooks/useToast";
import { Button } from "../../components/common/Button";
import { Input } from "../../components/common/Input";
import { Textarea } from "../../components/common/Textarea";
import { Select } from "../../components/common/Select";
import { Toggle } from "../../components/common/Toggle";
import { FileUpload } from "../../components/common/FileUpload";

export const DocumentModal = ({ isOpen, doc, onClose, onSuccess }) => {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    documentCategoryId: "",
    description: "",
    displayOrder: 0,
    isActive: true,
  });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const { success, error: toastError } = useToast();
  const isEditing = !!doc;

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const res = await documentCategoryService.getAll();
        setCategories(res.data || []);
      } catch (err) {
        toastError("Failed to fetch document categories.");
      }
    };
    loadCategories();
  }, []);

  useEffect(() => {
    if (doc) {
      setFormData({
        title: doc.title || "",
        documentCategoryId:
          typeof doc.documentCategoryId === "object"
            ? doc.documentCategoryId?._id
            : doc.documentCategoryId || "",
        description: doc.description || "",
        displayOrder: doc.displayOrder || 0,
        isActive: doc.isActive !== undefined ? doc.isActive : true,
      });
      setFile(null);
    } else {
      setFormData({
        title: "",
        documentCategoryId: categories[0]?._id || "",
        description: "",
        displayOrder: 0,
        isActive: true,
      });
      setFile(null);
    }
    setErrors({});
  }, [doc, isOpen, categories]);

  const validate = () => {
    const errs = {};
    if (!formData.title.trim()) errs.title = "Document title is required";
    if (!formData.documentCategoryId)
      errs.documentCategoryId = "Please select a category";
    if (!isEditing && !file) errs.file = "Please upload a document file";
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
      data.append("documentCategoryId", formData.documentCategoryId);
      data.append("description", formData.description);
      data.append("displayOrder", formData.displayOrder.toString());
      data.append("isActive", formData.isActive.toString());

      if (file) {
        data.append("file", file);
      }

      if (isEditing) {
        await documentService.update(doc._id, data);
        success("Document updated successfully!");
      } else {
        await documentService.create(data);
        success("Document uploaded successfully!");
      }

      onSuccess();
      onClose();
    } catch (err) {
      const message =
        err.response?.data?.message || err.message || "Failed to save document.";
      toastError(message);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const categoryOptions = categories.map((c) => ({
    value: c._id,
    label: c.name,
  }));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in overflow-y-auto">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden my-8">
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-800">
              {isEditing ? "Edit Document" : "Upload Official Document"}
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Attach PDF certificates, regulatory approvals, or brochures
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
            label="Document Title"
            required
            placeholder="e.g. WHO-GMP Certificate 2026, Visual Aid Catalog"
            value={formData.title}
            onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
            error={errors.title}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Select
              label="Document Category"
              required
              placeholder="-- Select Category --"
              options={categoryOptions}
              value={formData.documentCategoryId}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, documentCategoryId: e.target.value }))
              }
              error={errors.documentCategoryId}
            />

            <Input
              label="Display Order"
              type="number"
              min="0"
              value={formData.displayOrder}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, displayOrder: parseInt(e.target.value) || 0 }))
              }
              helperText="Sorting order in downloads list"
            />
          </div>

          <Textarea
            label="Document Description"
            rows={2}
            placeholder="Brief details about this document or certification body..."
            value={formData.description}
            onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
          />

          <FileUpload
            label="Document Attachment"
            required={!isEditing}
            currentFileName={doc?.file?.fileName}
            currentFileUrl={doc?.file?.url}
            onChange={(selected) => setFile(selected)}
            error={errors.file}
            helperText="PDF, DOC, DOCX, Images up to 10MB"
          />

          <div className="pt-2">
            <Toggle
              checked={formData.isActive}
              onChange={(val) => setFormData((prev) => ({ ...prev, isActive: val }))}
              label="Active Status"
              description="Make document available for public download"
            />
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
            <Button variant="secondary" onClick={onClose} disabled={loading}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" loading={loading}>
              {isEditing ? "Save Changes" : "Upload Document"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
