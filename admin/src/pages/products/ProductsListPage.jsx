import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Pill,
  Plus,
  Search,
  Edit2,
  Trash2,
  CheckCircle2,
  XCircle,
  ExternalLink,
  Filter,
} from "lucide-react";
import { productService } from "../../services/productService";
import { categoryService } from "../../services/categoryService";
import { useToast } from "../../hooks/useToast";
import { Card } from "../../components/common/Card";
import { Button } from "../../components/common/Button";
import { Badge } from "../../components/common/Badge";
import { Spinner } from "../../components/common/Spinner";
import { EmptyState } from "../../components/common/EmptyState";
import { ConfirmModal } from "../../components/common/ConfirmModal";

export const ProductsListPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  // Delete modal state
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  const { success, error: toastError } = useToast();

  const loadData = async () => {
    setLoading(true);
    try {
      const [prodRes, catRes] = await Promise.all([
        productService.getAll(),
        categoryService.getAll(),
      ]);
      setProducts(prodRes.data || []);
      setCategories(catRes.data || []);
    } catch (err) {
      toastError("Failed to fetch product catalog.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDeletePrompt = (prod) => {
    setProductToDelete(prod);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!productToDelete) return;
    setActionLoading(true);
    try {
      await productService.delete(productToDelete._id);
      success(`Product "${productToDelete.name}" deleted.`);
      setDeleteModalOpen(false);
      setProductToDelete(null);
      loadData();
    } catch (err) {
      toastError(err.response?.data?.message || "Failed to delete product.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleToggleStatus = async (prod) => {
    try {
      if (prod.isActive) {
        await productService.deactivate(prod._id);
        success(`"${prod.name}" deactivated.`);
      } else {
        await productService.activate(prod._id);
        success(`"${prod.name}" activated.`);
      }
      loadData();
    } catch (err) {
      toastError(err.response?.data?.message || "Failed to update product status.");
    }
  };

  // Filtered products list
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        p.name?.toLowerCase().includes(query) ||
        p.composition?.toLowerCase().includes(query) ||
        p.dosageForm?.toLowerCase().includes(query);

      const catId = typeof p.categoryId === "object" ? p.categoryId?._id : p.categoryId;
      const matchesCategory = categoryFilter === "all" || catId === categoryFilter;

      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "active" && p.isActive) ||
        (statusFilter === "inactive" && !p.isActive);

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [products, searchQuery, categoryFilter, statusFilter]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Products Catalog
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Manage pharmaceutical formulations, dosages, packaging, and descriptions
          </p>
        </div>
        <Link to="/products/new">
          <Button variant="primary" icon={Plus}>
            Add New Product
          </Button>
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <Card padding="sm">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search product, composition..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:bg-white transition"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            {/* Category Select */}
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:bg-white transition"
            >
              <option value="all">All Categories ({products.length})</option>
              {categories.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>

            {/* Status Tabs */}
            <div className="inline-flex rounded-xl bg-slate-100 p-1">
              {["all", "active", "inactive"].map((st) => (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`px-3 py-1 text-xs font-semibold rounded-lg capitalize transition ${statusFilter === st
                      ? "bg-white text-slate-900 shadow-xs"
                      : "text-slate-500 hover:text-slate-800"
                    }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Content */}
      {loading ? (
        <Spinner size="lg" message="Loading products..." />
      ) : filteredProducts.length === 0 ? (
        <EmptyState
          icon={Pill}
          title="No products found"
          description={
            searchQuery || categoryFilter !== "all" || statusFilter !== "all"
              ? "No formulations match your filter settings."
              : "Start by adding your first product formulation."
          }
          actionLabel={
            searchQuery || categoryFilter !== "all" || statusFilter !== "all"
              ? undefined
              : "Add Product"
          }
          onAction={
            searchQuery || categoryFilter !== "all" || statusFilter !== "all"
              ? undefined
              : () => (window.location.href = "/products/new")
          }
        />
      ) : (
        <Card padding="none">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-100 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="py-3.5 px-6">Product</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Dosage / Form</th>
                  <th className="py-3.5 px-4">Packaging</th>
                  <th className="py-3.5 px-4 text-center">Status</th>
                  <th className="py-3.5 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredProducts.map((p) => {
                  const catName =
                    typeof p.categoryId === "object"
                      ? p.categoryId?.name
                      : categories.find((c) => c._id === p.categoryId)?.name || "General";

                  return (
                    <tr key={p._id} className="hover:bg-slate-50/60 transition group">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 overflow-hidden shrink-0 flex items-center justify-center">
                            {p.image?.url ? (
                              <img
                                src={p.image.url}
                                alt={p.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <Pill className="w-6 h-6 text-slate-300" />
                            )}
                          </div>
                          <div className="min-w-0">
                            <p className="font-semibold text-slate-900 truncate">{p.name}</p>
                            {p.composition && (
                              <p className="text-xs text-slate-500 truncate max-w-xs">
                                {p.composition}
                              </p>
                            )}
                          </div>
                        </div>
                      </td>

                      <td className="py-4 px-4">
                        <Badge variant="teal" size="sm">
                          {catName}
                        </Badge>
                      </td>

                      <td className="py-4 px-4 text-xs font-medium text-slate-600">
                        {p.dosageForm || "—"}
                      </td>

                      <td className="py-4 px-4 text-xs text-slate-500">
                        {p.packaging || "—"}
                      </td>

                      <td className="py-4 px-4 text-center">
                        <button
                          onClick={() => handleToggleStatus(p)}
                          title="Click to toggle active status"
                          className="inline-flex items-center focus:outline-none"
                        >
                          <Badge variant={p.isActive ? "success" : "default"}>
                            {p.isActive ? (
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
                          <Link
                            to={`/products/edit/${p._id}`}
                            className="p-1.5 text-slate-400 hover:text-brand-blue hover:bg-slate-100 rounded-lg transition"
                            title="Edit Product"
                          >
                            <Edit2 className="w-4 h-4" />
                          </Link>
                          <button
                            onClick={() => handleDeletePrompt(p)}
                            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                            title="Delete Product"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={deleteModalOpen}
        title="Delete Product"
        message={`Are you sure you want to permanently delete "${productToDelete?.name}"? Its image stored on Cloudinary CDN will also be removed.`}
        confirmText="Delete Product"
        loading={actionLoading}
        onConfirm={confirmDelete}
        onClose={() => setDeleteModalOpen(false)}
      />
    </div>
  );
};
