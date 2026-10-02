import React, { useState, useEffect } from "react";
import { Building2, Save, Globe, Mail, Phone, MapPin, Clock, Share2 } from "lucide-react";
import { companyService } from "../../services/companyService";
import { useToast } from "../../hooks/useToast";
import { Card } from "../../components/common/Card";
import { Button } from "../../components/common/Button";
import { Input } from "../../components/common/Input";
import { Textarea } from "../../components/common/Textarea";
import { Spinner } from "../../components/common/Spinner";
import jkLogo from "../../assets/logo/jk-logo.png";

export const CompanySettingsPage = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    tagline: "",
    email: "",
    phone: "",
    address: "",
    workingHours: "",
    logoUrl: "",
    logoAlt: "",
    facebook: "",
    instagram: "",
    linkedin: "",
    youtube: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { success, error: toastError } = useToast();

  useEffect(() => {
    const fetchCompanyData = async () => {
      setLoading(true);
      try {
        const res = await companyService.get();
        const c = res.data;
        if (c) {
          setFormData({
            companyName: c.companyName || "",
            tagline: c.tagline || "",
            email: c.email || "",
            phone: c.phone || "",
            address: c.address || "",
            workingHours: c.workingHours || "",
            logoUrl: c.logo?.url || "",
            logoAlt: c.logo?.alt || "",
            facebook: c.socialLinks?.facebook || "",
            instagram: c.socialLinks?.instagram || "",
            linkedin: c.socialLinks?.linkedin || "",
            youtube: c.socialLinks?.youtube || "",
          });
        }
      } catch (err) {
        toastError("Failed to fetch company settings.");
      } finally {
        setLoading(false);
      }
    };

    fetchCompanyData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.companyName.trim()) {
      toastError("Company Name is required.");
      return;
    }

    setSaving(true);
    try {
      const payload = {
        companyName: formData.companyName,
        tagline: formData.tagline,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        workingHours: formData.workingHours,
        logo: {
          url: formData.logoUrl,
          alt: formData.logoAlt || formData.companyName,
        },
        socialLinks: {
          facebook: formData.facebook,
          instagram: formData.instagram,
          linkedin: formData.linkedin,
          youtube: formData.youtube,
        },
      };

      await companyService.update(payload);
      success("Company information updated successfully!");
    } catch (err) {
      toastError(err.response?.data?.message || "Failed to update settings.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <Spinner size="lg" message="Loading company settings..." />;
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Company & Contact Settings
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Configure header and footer contact coordinates, address, working hours, and social media handles
          </p>
        </div>
        <Button
          type="submit"
          form="settings-form"
          variant="primary"
          icon={Save}
          loading={saving}
        >
          Save Settings
        </Button>
      </div>

      <form id="settings-form" onSubmit={handleSubmit} className="space-y-6">
        {/* Core Corporate Identity */}
        <Card title="Corporate Identity" subtitle="Official branding and business name">
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Company Name"
                required
                placeholder="J K BIOTECH"
                value={formData.companyName}
                onChange={(e) => setFormData((prev) => ({ ...prev, companyName: e.target.value }))}
              />

              <Input
                label="Tagline / Motto"
                placeholder="Care with Quality & Innovation"
                value={formData.tagline}
                onChange={(e) => setFormData((prev) => ({ ...prev, tagline: e.target.value }))}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Logo Image URL"
                placeholder="https://.../logo.png"
                value={formData.logoUrl}
                onChange={(e) => setFormData((prev) => ({ ...prev, logoUrl: e.target.value }))}
                helperText="URL to brand logo file"
              />

              <Input
                label="Logo Alt Text"
                placeholder="JK BIOTECH Logo"
                value={formData.logoAlt}
                onChange={(e) => setFormData((prev) => ({ ...prev, logoAlt: e.target.value }))}
              />
            </div>

            {/* Brand Logo Visual Indicator */}
            <div className="p-4 bg-orange-50/40 rounded-2xl border border-orange-200/60 flex flex-col sm:flex-row items-center gap-4">
              <div className="h-16 px-4 py-2 bg-white rounded-xl border border-slate-200 shadow-xs flex items-center justify-center shrink-0">
                <img
                  src={formData.logoUrl || jkLogo}
                  alt={formData.logoAlt || "JK BIOTECH"}
                  className="h-12 w-auto object-contain"
                  onError={(e) => {
                    e.currentTarget.src = jkLogo;
                  }}
                />
              </div>
              <div className="text-center sm:text-left">
                <p className="text-xs font-bold text-slate-800">Original J K BIOTECH Brand Logo</p>
                <p className="text-xs text-slate-500 mt-0.5">
                  Official high-resolution brand asset active across both frontend website and admin panel.
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Contact Coordinates */}
        <Card title="Contact Coordinates" subtitle="Publicly listed phone, email, and facility location">
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Official Email"
                type="email"
                icon={Mail}
                placeholder="info@jkbiotech.in"
                value={formData.email}
                onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
              />

              <Input
                label="Contact Phone / Hotline"
                icon={Phone}
                placeholder="+91 98765 43210"
                value={formData.phone}
                onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
              />
            </div>

            <Textarea
              label="Physical Facility & Office Address"
              rows={2}
              placeholder="Plot No. 123, Pharma Industrial Estate, Gujarat, India"
              value={formData.address}
              onChange={(e) => setFormData((prev) => ({ ...prev, address: e.target.value }))}
            />

            <Input
              label="Operating / Working Hours"
              icon={Clock}
              placeholder="Mon - Sat: 9:00 AM - 6:00 PM (Closed Sunday)"
              value={formData.workingHours}
              onChange={(e) => setFormData((prev) => ({ ...prev, workingHours: e.target.value }))}
            />
          </div>
        </Card>

        {/* Social Media Links */}
        <Card title="Social Media Handles" subtitle="Links to official corporate social channels">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Facebook URL"
              placeholder="https://facebook.com/jkbiotech"
              value={formData.facebook}
              onChange={(e) => setFormData((prev) => ({ ...prev, facebook: e.target.value }))}
            />

            <Input
              label="Instagram URL"
              placeholder="https://instagram.com/jkbiotech"
              value={formData.instagram}
              onChange={(e) => setFormData((prev) => ({ ...prev, instagram: e.target.value }))}
            />

            <Input
              label="LinkedIn URL"
              placeholder="https://linkedin.com/company/jkbiotech"
              value={formData.linkedin}
              onChange={(e) => setFormData((prev) => ({ ...prev, linkedin: e.target.value }))}
            />

            <Input
              label="YouTube URL"
              placeholder="https://youtube.com/@jkbiotech"
              value={formData.youtube}
              onChange={(e) => setFormData((prev) => ({ ...prev, youtube: e.target.value }))}
            />
          </div>
        </Card>
      </form>
    </div>
  );
};
