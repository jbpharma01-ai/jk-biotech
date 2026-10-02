import React, { useState, useEffect } from "react";
import {
  Sliders,
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  XCircle,
  ExternalLink,
  MoveUp,
  MoveDown,
} from "lucide-react";
import { heroSlideService } from "../../services/heroSlideService";
import { useToast } from "../../hooks/useToast";
import { Card } from "../../components/common/Card";
import { Button } from "../../components/common/Button";
import { Badge } from "../../components/common/Badge";
import { Spinner } from "../../components/common/Spinner";
import { EmptyState } from "../../components/common/EmptyState";
import { ConfirmModal } from "../../components/common/ConfirmModal";
import { HeroSlideModal } from "./HeroSlideModal";

export const HeroSlidesListPage = () => {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedSlide, setSelectedSlide] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [slideToDelete, setSlideToDelete] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  const { success, error: toastError } = useToast();

  const fetchSlides = async () => {
    setLoading(true);
    try {
      const res = await heroSlideService.getAll();
      setSlides(res.data || []);
    } catch (err) {
      toastError("Failed to fetch hero slides.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSlides();
  }, []);

  const handleCreate = () => {
    setSelectedSlide(null);
    setModalOpen(true);
  };

  const handleEdit = (slide) => {
    setSelectedSlide(slide);
    setModalOpen(true);
  };

  const handleDeletePrompt = (slide) => {
    setSlideToDelete(slide);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!slideToDelete) return;
    setActionLoading(true);
    try {
      await heroSlideService.delete(slideToDelete._id);
      success("Slide removed successfully.");
      setDeleteModalOpen(false);
      setSlideToDelete(null);
      fetchSlides();
    } catch (err) {
      toastError(err.response?.data?.message || "Failed to delete slide.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleToggleStatus = async (slide) => {
    try {
      if (slide.isActive) {
        await heroSlideService.deactivate(slide._id);
        success(`Slide deactivated.`);
      } else {
        await heroSlideService.activate(slide._id);
        success(`Slide activated.`);
      }
      fetchSlides();
    } catch (err) {
      toastError("Failed to change slide status.");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Hero Banner Slides
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Configure homepage hero slider images, headline typography, and action buttons
          </p>
        </div>
        <Button variant="primary" icon={Plus} onClick={handleCreate}>
          Add Hero Slide
        </Button>
      </div>

      {loading ? (
        <Spinner size="lg" message="Loading banner slides..." />
      ) : slides.length === 0 ? (
        <EmptyState
          icon={Sliders}
          title="No hero slides created"
          description="Create your first homepage banner slide to welcome visitors."
          actionLabel="Add Slide"
          onAction={handleCreate}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {slides.map((s, idx) => (
            <Card key={s._id} padding="none" className="flex flex-col overflow-hidden">
              {/* Slide image preview */}
              <div className="relative aspect-video bg-slate-900 overflow-hidden group">
                {s.image?.url ? (
                  <img
                    src={s.image.url}
                    alt={s.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500 opacity-80"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-500">
                    No image uploaded
                  </div>
                )}

                {/* Overlaid preview badge and order */}
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md text-white text-xs font-bold border border-white/10">
                    #{s.displayOrder || idx + 1}
                  </span>
                  {s.badge && (
                    <span className="px-2.5 py-1 rounded-lg bg-premium-orange/95 text-white text-xs font-semibold backdrop-blur-md shadow-sm">
                      {s.badge}
                    </span>
                  )}
                </div>

                <div className="absolute top-3 right-3">
                  <button
                    onClick={() => handleToggleStatus(s)}
                    className="focus:outline-none"
                    title="Toggle active status"
                  >
                    <Badge variant={s.isActive ? "success" : "default"}>
                      {s.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </button>
                </div>

                {/* Overlaid headline sample */}
                <div className="absolute bottom-3 left-3 right-3">
                  {s.titleLines && s.titleLines.length > 0 ? (
                    <div className="text-white font-bold text-base leading-tight drop-shadow-md">
                      {s.titleLines.map((l, i) => (
                        <div key={i}>{l}</div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-white font-bold text-base drop-shadow-md">{s.title}</p>
                  )}
                </div>
              </div>

              {/* Details & CTA info */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h4 className="font-semibold text-slate-900 text-sm">{s.title}</h4>
                  {s.subtitle && (
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                      {s.subtitle}
                    </p>
                  )}
                  {s.cta?.label && (
                    <div className="mt-3 flex items-center gap-2 text-xs font-medium text-slate-600">
                      <span className="text-slate-400">Action Button:</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-semibold">
                        {s.cta.label}
                      </span>
                      <span className="text-slate-400 font-mono text-[11px]">{s.cta.link}</span>
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-400">
                    Order: <strong className="text-slate-700">{s.displayOrder || 0}</strong>
                  </span>
                  <div className="flex items-center gap-2">
                    <Button variant="secondary" size="sm" icon={Edit2} onClick={() => handleEdit(s)}>
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      icon={Trash2}
                      onClick={() => handleDeletePrompt(s)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Hero Slide Modal */}
      <HeroSlideModal
        isOpen={modalOpen}
        slide={selectedSlide}
        onClose={() => setModalOpen(false)}
        onSuccess={fetchSlides}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={deleteModalOpen}
        title="Delete Hero Slide"
        message="Are you sure you want to permanently delete this banner slide? Its CDN image asset will also be destroyed."
        confirmText="Delete Slide"
        loading={actionLoading}
        onConfirm={confirmDelete}
        onClose={() => setDeleteModalOpen(false)}
      />
    </div>
  );
};
