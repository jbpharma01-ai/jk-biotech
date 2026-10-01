import React, { useState, useEffect, useMemo } from "react";
import {
  FileText,
  Plus,
  Search,
  Edit2,
  Trash2,
  Download,
  ExternalLink,
  CheckCircle2,
  XCircle,
  FileCode,
} from "lucide-react";
import { documentService } from "../../services/documentService";
import { documentCategoryService } from "../../services/documentCategoryService";
import { useToast } from "../../hooks/useToast";
import { Card } from "../../components/common/Card";
import { Button } from "../../components/common/Button";
import { Badge } from "../../components/common/Badge";
import { Spinner } from "../../components/common/Spinner";
import { EmptyState } from "../../components/common/EmptyState";
import { ConfirmModal } from "../../components/common/ConfirmModal";
import { DocumentModal } from "./DocumentModal";

export const DocumentsListPage = () => {
  const [documents, setDocuments] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  // Modal states
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [docToDelete, setDocToDelete] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  const { success, error: toastError } = useToast();

  const loadData = async () => {
    setLoading(true);
    try {
      const [docRes, catRes] = await Promise.all([
        documentService.getAll(),
        documentCategoryService.getAll(),
      ]);
      setDocuments(docRes.data || []);
      setCategories(catRes.data || []);
    } catch (err) {
      toastError("Failed to fetch documents.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCreate = () => {
    setSelectedDoc(null);
    setModalOpen(true);
  };

  const handleEdit = (doc) => {
    setSelectedDoc(doc);
    setModalOpen(true);
  };

  const handleDeletePrompt = (doc) => {
    setDocToDelete(doc);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!docToDelete) return;
    setActionLoading(true);
    try {
      await documentService.delete(docToDelete._id);
      success(`Document "${docToDelete.title}" deleted.`);
      setDeleteModalOpen(false);
      setDocToDelete(null);
      loadData();
    } catch (err) {
      toastError(err.response?.data?.message || "Failed to delete document.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleToggleStatus = async (doc) => {
    try {
      if (doc.isActive) {
        await documentService.deactivate(doc._id);
        success(`"${doc.title}" deactivated.`);
      } else {
        await documentService.activate(doc._id);
        success(`"${doc.title}" activated.`);
      }
      loadData();
    } catch (err) {
      toastError("Failed to update document status.");
    }
  };

  const filteredDocs = useMemo(() => {
    return documents.filter((doc) => {
      const matchesSearch = doc.title?.toLowerCase().includes(searchQuery.toLowerCase());
      const catId =
        typeof doc.documentCategoryId === "object"
          ? doc.documentCategoryId?._id
          : doc.documentCategoryId;
      const matchesCategory = categoryFilter === "all" || catId === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [documents, searchQuery, categoryFilter]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Downloads & Documents
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Manage public downloadable PDF brochures, WHO-GMP certificates, and product lists
          </p>
        </div>
        <Button variant="primary" icon={Plus} onClick={handleCreate}>
          Upload Document
        </Button>
      </div>

      {/* Filter and Search Bar */}
      <Card padding="sm">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search document by title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:bg-white transition"
            />
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Category:
            </span>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:bg-white transition"
            >
              <option value="all">All Categories ({documents.length})</option>
              {categories.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </Card>

      {/* Content */}
      {loading ? (
        <Spinner size="lg" message="Loading documents..." />
      ) : filteredDocs.length === 0 ? (
        <EmptyState
          icon={FileText}
          title="No documents uploaded"
          description={
            searchQuery || categoryFilter !== "all"
              ? "No files matched your search criteria."
              : "Upload brochures, price lists, or certificates for your website."
          }
          actionLabel={searchQuery || categoryFilter !== "all" ? undefined : "Upload Document"}
          onAction={searchQuery || categoryFilter !== "all" ? undefined : handleCreate}
        />
      ) : (
        <Card padding="none">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-100 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="py-3.5 px-6">Document Title</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">File Type</th>
                  <th className="py-3.5 px-4 text-center">Status</th>
                  <th className="py-3.5 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredDocs.map((doc) => {
                  const catName =
                    typeof doc.documentCategoryId === "object"
                      ? doc.documentCategoryId?.name
                      : categories.find((c) => c._id === doc.documentCategoryId)?.name || "General";

                  return (
                    <tr key={doc._id} className="hover:bg-slate-50/60 transition group">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-brand-blue/5 text-brand-blue flex items-center justify-center shrink-0">
                            <FileText className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="font-semibold text-slate-800">{doc.title}</p>
                            {doc.file?.fileName && (
                              <p className="text-xs text-slate-400 font-mono">
                                {doc.file.fileName}
                              </p>
                            )}
                          </div>
                        </div>
                      </td>

                      <td className="py-4 px-4">
                        <Badge variant="purple" size="sm">
                          {catName}
                        </Badge>
                      </td>

                      <td className="py-4 px-4 text-xs font-mono text-slate-500 uppercase">
                        {doc.file?.fileType || "PDF"}
                      </td>

                      <td className="py-4 px-4 text-center">
                        <button
                          onClick={() => handleToggleStatus(doc)}
                          title="Click to toggle status"
                          className="inline-flex items-center focus:outline-none"
                        >
                          <Badge variant={doc.isActive ? "success" : "default"}>
                            {doc.isActive ? (
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
                          {doc.file?.url && (
                            <a
                              href={doc.file.url}
                              target="_blank"
                              rel="noreferrer"
                              className="p-1.5 text-slate-400 hover:text-brand-blue hover:bg-slate-100 rounded-lg transition"
                              title="Download / View Attachment"
                            >
                              <Download className="w-4 h-4" />
                            </a>
                          )}
                          <button
                            onClick={() => handleEdit(doc)}
                            className="p-1.5 text-slate-400 hover:text-brand-blue hover:bg-slate-100 rounded-lg transition"
                            title="Edit Document Details"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeletePrompt(doc)}
                            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                            title="Delete Document"
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

      {/* Modal for Add / Edit */}
      <DocumentModal
        isOpen={modalOpen}
        doc={selectedDoc}
        onClose={() => setModalOpen(false)}
        onSuccess={loadData}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={deleteModalOpen}
        title="Delete Document"
        message={`Are you sure you want to permanently delete "${docToDelete?.title}"? The file will also be deleted from Cloudinary storage.`}
        confirmText="Delete Document"
        loading={actionLoading}
        onConfirm={confirmDelete}
        onClose={() => setDeleteModalOpen(false)}
      />
    </div>
  );
};
