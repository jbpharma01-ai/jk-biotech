import React, { useState, useEffect } from "react";
import {
  FolderTree,
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { documentCategoryService } from "../../services/documentCategoryService";
import { useToast } from "../../hooks/useToast";
import { Card } from "../../components/common/Card";
import { Button } from "../../components/common/Button";
import { Badge } from "../../components/common/Badge";
import { Spinner } from "../../components/common/Spinner";
import { EmptyState } from "../../components/common/EmptyState";
import { ConfirmModal } from "../../components/common/ConfirmModal";
import { DocCategoryModal } from "./DocCategoryModal";

export const DocCategoriesListPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  const { success, error: toastError } = useToast();

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await documentCategoryService.getAll();
      setCategories(res.data || []);
    } catch (err) {
      toastError("Failed to fetch document categories.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCreate = () => {
    setSelectedCategory(null);
    setModalOpen(true);
  };

  const handleEdit = (cat) => {
    setSelectedCategory(cat);
    setModalOpen(true);
  };

  const handleDeletePrompt = (cat) => {
    setCategoryToDelete(cat);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!categoryToDelete) return;
    setActionLoading(true);
    try {
      await documentCategoryService.delete(categoryToDelete._id);
      success(`Category "${categoryToDelete.name}" deleted.`);
      setDeleteModalOpen(false);
      setCategoryToDelete(null);
      fetchCategories();
    } catch (err) {
      toastError(err.response?.data?.message || "Failed to delete category.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleToggleStatus = async (cat) => {
    try {
      if (cat.isActive) {
        await documentCategoryService.deactivate(cat._id);
        success(`"${cat.name}" deactivated.`);
      } else {
        await documentCategoryService.activate(cat._id);
        success(`"${cat.name}" activated.`);
      }
      fetchCategories();
    } catch (err) {
      toastError("Failed to change category status.");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Document Categories
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Group official documents, product catalogs, and certifications
          </p>
        </div>
        <Button variant="primary" icon={Plus} onClick={handleCreate}>
          Add Category
        </Button>
      </div>

      {loading ? (
        <Spinner size="lg" message="Loading categories..." />
      ) : categories.length === 0 ? (
        <EmptyState
          icon={FolderTree}
          title="No document categories"
          description="Create categories to organize downloadable resources."
          actionLabel="Add Category"
          onAction={handleCreate}
        />
      ) : (
        <Card padding="none">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-100 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="py-3.5 px-6">Category Name</th>
                  <th className="py-3.5 px-6">Slug</th>
                  <th className="py-3.5 px-4 text-center">Display Order</th>
                  <th className="py-3.5 px-4 text-center">Status</th>
                  <th className="py-3.5 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {categories.map((cat) => (
                  <tr key={cat._id} className="hover:bg-slate-50/60 transition group">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-orange-50 text-premium-orange flex items-center justify-center shrink-0">
                          <FolderTree className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="font-semibold text-slate-800">{cat.name}</p>
                          {cat.description && (
                            <p className="text-xs text-slate-400 line-clamp-1">{cat.description}</p>
                          )}
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-6 text-xs font-mono text-slate-600">
                      /{cat.slug}
                    </td>

                    <td className="py-4 px-4 text-center font-medium text-slate-600">
                      {cat.displayOrder || 0}
                    </td>

                    <td className="py-4 px-4 text-center">
                      <button
                        onClick={() => handleToggleStatus(cat)}
                        title="Click to toggle status"
                        className="inline-flex items-center focus:outline-none"
                      >
                        <Badge variant={cat.isActive ? "success" : "default"}>
                          {cat.isActive ? (
                            <>
                              <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Active
                            </>
                          ) : (
                            <>
                              <XCircle className="w-3 h-3 text-slate-400" /> Inactive
                            </>
                          )}
                        </Badge>
                      </button>
                    </td>

                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleEdit(cat)}
                          className="p-1.5 text-slate-400 hover:text-premium-orange hover:bg-orange-50 rounded-lg transition"
                          title="Edit Category"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeletePrompt(cat)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                          title="Delete Category"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Category Modal */}
      <DocCategoryModal
        isOpen={modalOpen}
        category={selectedCategory}
        onClose={() => setModalOpen(false)}
        onSuccess={fetchCategories}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={deleteModalOpen}
        title="Delete Document Category"
        message={`Are you sure you want to permanently delete category "${categoryToDelete?.name}"?`}
        confirmText="Delete Category"
        loading={actionLoading}
        onConfirm={confirmDelete}
        onClose={() => setDeleteModalOpen(false)}
      />
    </div>
  );
};
