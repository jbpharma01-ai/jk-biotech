import React, { useState, useEffect, useMemo } from "react";
import {
  Mail,
  Search,
  Eye,
  Trash2,
  Calendar,
  MessageSquare,
  Clock,
  Phone,
} from "lucide-react";
import { enquiryService } from "../../services/enquiryService";
import { useToast } from "../../hooks/useToast";
import { Card } from "../../components/common/Card";
import { Button } from "../../components/common/Button";
import { Badge } from "../../components/common/Badge";
import { Spinner } from "../../components/common/Spinner";
import { EmptyState } from "../../components/common/EmptyState";
import { ConfirmModal } from "../../components/common/ConfirmModal";
import { EnquiryDetailModal } from "./EnquiryDetailModal";

export const EnquiriesListPage = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Modal states
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [enquiryToDelete, setEnquiryToDelete] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  const { success, error: toastError } = useToast();

  const fetchEnquiries = async () => {
    setLoading(true);
    try {
      const res = await enquiryService.getAll();
      setEnquiries(res.data || []);
    } catch (err) {
      toastError("Failed to fetch enquiries.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const handleOpenDetail = (enq) => {
    setSelectedEnquiry(enq);
    setDetailModalOpen(true);
  };

  const handleDeletePrompt = (enq) => {
    setEnquiryToDelete(enq);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!enquiryToDelete) return;
    setActionLoading(true);
    try {
      await enquiryService.delete(enquiryToDelete._id);
      success("Inquiry deleted.");
      setDeleteModalOpen(false);
      setEnquiryToDelete(null);
      fetchEnquiries();
    } catch (err) {
      toastError(err.response?.data?.message || "Failed to delete inquiry.");
    } finally {
      setActionLoading(false);
    }
  };

  const filteredEnquiries = useMemo(() => {
    return enquiries.filter((enq) => {
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        enq.name?.toLowerCase().includes(query) ||
        enq.email?.toLowerCase().includes(query) ||
        enq.phone?.toLowerCase().includes(query) ||
        enq.subject?.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "all" || enq.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [enquiries, searchQuery, statusFilter]);

  const counts = useMemo(() => {
    return {
      all: enquiries.length,
      new: enquiries.filter((e) => e.status === "new").length,
      read: enquiries.filter((e) => e.status === "read").length,
      replied: enquiries.filter((e) => e.status === "replied").length,
      closed: enquiries.filter((e) => e.status === "closed").length,
    };
  }, [enquiries]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          Customer & Partner Inquiries
        </h1>
        <p className="text-sm text-slate-500 mt-0.5">
          View and reply to messages received from the public website contact form
        </p>
      </div>

      {/* Filter and Search Bar */}
      <Card padding="sm">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search sender, email, subject..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:bg-white transition"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto p-1 bg-slate-100 rounded-2xl">
            {[
              { id: "all", label: "All", count: counts.all },
              { id: "new", label: "New", count: counts.new, alert: counts.new > 0 },
              { id: "read", label: "Read", count: counts.read },
              { id: "replied", label: "Replied", count: counts.replied },
              { id: "closed", label: "Closed", count: counts.closed },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setStatusFilter(tab.id)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-xl capitalize whitespace-nowrap transition flex items-center gap-1.5 ${
                  statusFilter === tab.id
                    ? "bg-white text-slate-900 shadow-xs"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                    tab.alert
                      ? "bg-rose-500 text-white"
                      : "bg-slate-200 text-slate-600"
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* Content */}
      {loading ? (
        <Spinner size="lg" message="Loading inquiries..." />
      ) : filteredEnquiries.length === 0 ? (
        <EmptyState
          icon={Mail}
          title="No inquiries found"
          description={
            searchQuery || statusFilter !== "all"
              ? "No messages match your search filter."
              : "Customer messages submitted from the website will appear here."
          }
        />
      ) : (
        <Card padding="none">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-100 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="py-3.5 px-6">Sender</th>
                  <th className="py-3.5 px-6">Subject / Message</th>
                  <th className="py-3.5 px-4">Date</th>
                  <th className="py-3.5 px-4 text-center">Status</th>
                  <th className="py-3.5 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredEnquiries.map((enq) => (
                  <tr
                    key={enq._id}
                    onClick={() => handleOpenDetail(enq)}
                    className="hover:bg-slate-50/60 transition cursor-pointer group"
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-600 font-bold flex items-center justify-center shrink-0">
                          {enq.name?.[0]?.toUpperCase() || "E"}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900">{enq.name}</p>
                          <p className="text-xs text-slate-500 font-mono">{enq.email}</p>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-6 max-w-xs sm:max-w-md">
                      <p className="font-medium text-slate-800 truncate">
                        {enq.subject || "General Inquiry"}
                      </p>
                      <p className="text-xs text-slate-500 truncate mt-0.5">
                        {enq.message}
                      </p>
                    </td>

                    <td className="py-4 px-4 text-xs text-slate-500 whitespace-nowrap">
                      {new Date(enq.createdAt || Date.now()).toLocaleDateString()}
                    </td>

                    <td className="py-4 px-4 text-center">
                      <Badge
                        variant={
                          enq.status === "new"
                            ? "danger"
                            : enq.status === "replied"
                            ? "success"
                            : enq.status === "read"
                            ? "warning"
                            : "default"
                        }
                      >
                        {enq.status}
                      </Badge>
                    </td>

                    <td className="py-4 px-6 text-right" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleOpenDetail(enq)}
                          className="p-1.5 text-slate-400 hover:text-brand-blue hover:bg-slate-100 rounded-lg transition"
                          title="View Message"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeletePrompt(enq)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                          title="Delete Message"
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

      {/* Enquiry Detail Modal */}
      <EnquiryDetailModal
        isOpen={detailModalOpen}
        enquiry={selectedEnquiry}
        onClose={() => setDetailModalOpen(false)}
        onSuccess={fetchEnquiries}
        onDeletePrompt={handleDeletePrompt}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={deleteModalOpen}
        title="Delete Inquiry"
        message={`Are you sure you want to permanently delete the inquiry from ${enquiryToDelete?.name}?`}
        confirmText="Delete Message"
        loading={actionLoading}
        onConfirm={confirmDelete}
        onClose={() => setDeleteModalOpen(false)}
      />
    </div>
  );
};
