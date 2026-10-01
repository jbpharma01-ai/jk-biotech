import React, { useState, useEffect } from "react";
import { X, Mail, Phone, Calendar, Save, Trash2 } from "lucide-react";
import { enquiryService } from "../../services/enquiryService";
import { useToast } from "../../hooks/useToast";
import { Button } from "../../components/common/Button";
import { Badge } from "../../components/common/Badge";
import { Select } from "../../components/common/Select";
import { Textarea } from "../../components/common/Textarea";

export const EnquiryDetailModal = ({ isOpen, enquiry, onClose, onSuccess, onDeletePrompt }) => {
  const [status, setStatus] = useState("new");
  const [adminNote, setAdminNote] = useState("");
  const [loading, setLoading] = useState(false);

  const { success, error: toastError } = useToast();

  useEffect(() => {
    if (enquiry) {
      setStatus(enquiry.status || "new");
      setAdminNote(enquiry.adminNote || "");

      // If status is new, automatically mark as read upon viewing
      if (enquiry.status === "new") {
        enquiryService.updateStatus(enquiry._id, { status: "read", adminNote: enquiry.adminNote || "" })
          .then(() => setStatus("read"))
          .catch((e) => console.error("Could not auto-mark read", e));
      }
    }
  }, [enquiry, isOpen]);

  const handleSave = async () => {
    setLoading(true);
    try {
      await enquiryService.updateStatus(enquiry._id, { status, adminNote });
      success("Inquiry status updated successfully!");
      onSuccess();
      onClose();
    } catch (err) {
      toastError("Failed to update enquiry status.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen || !enquiry) return null;

  const statusOptions = [
    { value: "new", label: "New / Unread" },
    { value: "read", label: "Read / Under Review" },
    { value: "replied", label: "Replied" },
    { value: "closed", label: "Closed / Resolved" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden my-8">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-blue/10 text-brand-blue flex items-center justify-center font-bold">
              {enquiry.name?.[0]?.toUpperCase() || "E"}
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-800">{enquiry.name}</h3>
              <p className="text-xs text-slate-400">
                Received on {new Date(enquiry.createdAt || Date.now()).toLocaleString()}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Quick contact buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <a
              href={`mailto:${enquiry.email}`}
              className="flex items-center gap-3 p-3 bg-slate-50 hover:bg-slate-100 rounded-2xl border border-slate-200 text-slate-700 transition group"
            >
              <Mail className="w-4 h-4 text-brand-blue shrink-0" />
              <div className="truncate">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Email</span>
                <span className="text-xs font-semibold text-slate-800 truncate block">
                  {enquiry.email}
                </span>
              </div>
            </a>

            {enquiry.phone ? (
              <a
                href={`tel:${enquiry.phone}`}
                className="flex items-center gap-3 p-3 bg-slate-50 hover:bg-slate-100 rounded-2xl border border-slate-200 text-slate-700 transition group"
              >
                <Phone className="w-4 h-4 text-brand-teal shrink-0" />
                <div className="truncate">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Phone</span>
                  <span className="text-xs font-semibold text-slate-800 truncate block">
                    {enquiry.phone}
                  </span>
                </div>
              </a>
            ) : (
              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-200 text-slate-400">
                <Phone className="w-4 h-4 shrink-0" />
                <span className="text-xs">No phone number provided</span>
              </div>
            )}
          </div>

          {/* Subject & Message Body */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Subject
              </span>
              <Badge
                variant={
                  status === "new"
                    ? "danger"
                    : status === "replied"
                    ? "success"
                    : "default"
                }
              >
                {status}
              </Badge>
            </div>
            <h4 className="text-sm font-bold text-slate-900">
              {enquiry.subject || "General Inquiry"}
            </h4>
            <div className="pt-2 border-t border-slate-200/60 text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">
              {enquiry.message}
            </div>
          </div>

          {/* Admin Management Section */}
          <div className="space-y-4 pt-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600">
              Admin Follow-up & Status
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Select
                label="Inquiry Status"
                options={statusOptions}
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              />

              <div className="flex items-end">
                <Button
                  variant="danger"
                  className="w-full"
                  icon={Trash2}
                  onClick={() => {
                    onClose();
                    onDeletePrompt(enquiry);
                  }}
                >
                  Delete Inquiry
                </Button>
              </div>
            </div>

            <Textarea
              label="Internal Admin Notes"
              rows={3}
              placeholder="e.g. Sent catalogue via email on Oct 1. Client interested in bulk antibiotic tablets..."
              value={adminNote}
              onChange={(e) => setAdminNote(e.target.value)}
              helperText="Only visible to administrators"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-100 flex items-center justify-end gap-3">
          <Button variant="secondary" onClick={onClose} disabled={loading}>
            Close
          </Button>
          <Button variant="primary" icon={Save} loading={loading} onClick={handleSave}>
            Save Status & Notes
          </Button>
        </div>
      </div>
    </div>
  );
};
