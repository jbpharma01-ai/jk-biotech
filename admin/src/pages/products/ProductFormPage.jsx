import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { ArrowLeft, Save, Pill, CheckCircle2 } from "lucide-react";
import { productService } from "../../services/productService";
import { categoryService } from "../../services/categoryService";
import { useToast } from "../../hooks/useToast";
import { Card } from "../../components/common/Card";
import { Button } from "../../components/common/Button";
import { Input } from "../../components/common/Input";
import { Textarea } from "../../components/common/Textarea";
import { Select } from "../../components/common/Select";
import { Toggle } from "../../components/common/Toggle";
import { ImageUpload } from "../../components/common/ImageUpload";
import { Spinner } from "../../components/common/Spinner";

export const ProductFormPage = () => {
  const { id } = useParams();
  const isEditing = !!id;
  const navigate = useNavigate();
  const { success, error: toastError } = useToast();

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEditing);

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    categoryId: "",
    dosageForm: "",
    shortDescription: "",
    composition: "",
    packaging: "",
    indications: "",
    description: "",
    displayOrder: 0,
    isActive: true,
  });

  const [imageFile, setImageFile] = useState(null);
  const [currentImageUrl, setCurrentImageUrl] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const res = await categoryService.getAll();
        setCategories(res.data || []);
      } catch (err) {
        toastError("Failed to fetch product categories.");
      }
    };
    loadCategories();
  }, []);

  useEffect(() => {
    if (isEditing) {
      const loadProduct = async () => {
        setFetching(true);
        try {
          const res = await productService.getById(id);
          const p = res.data;
          if (p) {
            setFormData({
              name: p.name || "",
              slug: p.slug || "",
              categoryId: typeof p.categoryId === "object" ? p.categoryId?._id : p.categoryId || "",
              dosageForm: p.dosageForm || "",
              shortDescription: p.shortDescription || "",
              composition: p.composition || "",
              packaging: p.packaging || "",
              indications: p.indications || "",
              description: p.description || "",
              displayOrder: p.displayOrder || 0,
              isActive: p.isActive !== undefined ? p.isActive : true,
            });
            setCurrentImageUrl(p.image?.url || "");
          }
        } catch (err) {
          toastError("Failed to load product details.");
          navigate("/products");
        } finally {
          setFetching(false);
        }
      };
      loadProduct();
    }
  }, [id, isEditing]);

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
    if (!formData.name.trim()) errs.name = "Product name is required";
    if (!formData.categoryId) errs.categoryId = "Please select a category";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("slug", formData.slug);
      data.append("categoryId", formData.categoryId);
      data.append("dosageForm", formData.dosageForm);
      data.append("shortDescription", formData.shortDescription);
      data.append("composition", formData.composition);
      data.append("packaging", formData.packaging);
      data.append("indications", formData.indications);
      data.append("description", formData.description);
      data.append("displayOrder", formData.displayOrder.toString());
      data.append("isActive", formData.isActive.toString());

      if (imageFile) {
        data.append("image", imageFile);
      }

      if (isEditing) {
        await productService.update(id, data);
        success("Product updated successfully!");
      } else {
        await productService.create(data);
        success("Product created successfully!");
      }

      navigate("/products");
    } catch (err) {
      const message =
        err.response?.data?.message || err.message || "Failed to save product.";
      toastError(message);
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return <Spinner size="lg" message="Loading product information..." />;
  }

  const categoryOptions = categories.map((c) => ({
    value: c._id,
    label: c.name,
  }));

  const commonDosageForms = [
    "Tablets",
    "Capsules",
    "Syrup / Liquid",
    "Dry Syrup",
    "Injections",
    "Ointment / Gel",
    "Drops",
    "Nasal Spray",
    "Sachets / Powder",
    "Suspension",
    "Softgel Capsules",
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            to="/products"
            className="p-2 bg-white rounded-xl border border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition shadow-xs"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              {isEditing ? `Edit: ${formData.name || "Product"}` : "Create New Product"}
            </h1>
            <p className="text-sm text-slate-500 mt-0.5">
              {isEditing
                ? "Update composition, dosage packaging, and high-res imagery"
                : "Add a pharmaceutical formulation to the official catalog"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="secondary" onClick={() => navigate("/products")}>
            Cancel
          </Button>
          <Button
            type="submit"
            form="product-form"
            variant="primary"
            icon={Save}
            loading={loading}
          >
            {isEditing ? "Save Product" : "Publish Product"}
          </Button>
        </div>
      </div>

      <form id="product-form" onSubmit={handleSubmit} className="space-y-6">
        {/* Core Product Information Card */}
        <Card title="Product Identification" subtitle="Essential product name and categorization">
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Product Name"
                required
                placeholder="e.g. Paracetamol 650mg, JK-Cef 200"
                value={formData.name}
                onChange={handleNameChange}
                error={errors.name}
              />

              <Input
                label="URL Slug"
                placeholder="e.g. paracetamol-650"
                value={formData.slug}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, slug: e.target.value.toLowerCase() }))
                }
                helperText="Identifier used in public URLs"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Select
                label="Product Category"
                required
                placeholder="-- Select Category --"
                options={categoryOptions}
                value={formData.categoryId}
                onChange={(e) => setFormData((prev) => ({ ...prev, categoryId: e.target.value }))}
                error={errors.categoryId}
              />

              <Select
                label="Dosage Form"
                placeholder="-- Select or custom --"
                options={commonDosageForms}
                value={formData.dosageForm}
                onChange={(e) => setFormData((prev) => ({ ...prev, dosageForm: e.target.value }))}
                helperText="Physical formulation type"
              />
            </div>

            <Input
              label="Short Catchline / Summary"
              placeholder="e.g. Fast acting anti-pyretic and pain relief formulation"
              value={formData.shortDescription}
              onChange={(e) => setFormData((prev) => ({ ...prev, shortDescription: e.target.value }))}
            />
          </div>
        </Card>

        {/* Technical & Formulation Details */}
        <Card title="Composition & Packaging" subtitle="Medical specification and strip/bottle details">
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Active Composition"
                placeholder="e.g. Paracetamol IP 650mg, Cefixime 200mg"
                value={formData.composition}
                onChange={(e) => setFormData((prev) => ({ ...prev, composition: e.target.value }))}
                helperText="Active pharmaceutical ingredients (APIs)"
              />

              <Input
                label="Packaging Presentation"
                placeholder="e.g. 10 x 10 Blister Pack, 100ml Glass Bottle"
                value={formData.packaging}
                onChange={(e) => setFormData((prev) => ({ ...prev, packaging: e.target.value }))}
                helperText="Standard unit package type"
              />
            </div>

            <Textarea
              label="Therapeutic Indications"
              rows={2}
              placeholder="e.g. Indicated for fever, post-operative pain, respiratory infections..."
              value={formData.indications}
              onChange={(e) => setFormData((prev) => ({ ...prev, indications: e.target.value }))}
            />

            <Textarea
              label="Detailed Product Description"
              rows={4}
              placeholder="Comprehensive clinical details, mechanism of action, or special precautions..."
              value={formData.description}
              onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
            />
          </div>
        </Card>

        {/* Media & Presentation Card */}
        <Card title="Product Imagery & Display" subtitle="High resolution packshot and catalog sort priority">
          <div className="space-y-5">
            <ImageUpload
              label="Product Packshot Image"
              currentImageUrl={currentImageUrl}
              onChange={(file) => setImageFile(file)}
              helperText="High resolution PNG or WEBP product packshot"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <Input
                label="Display Order"
                type="number"
                min="0"
                value={formData.displayOrder}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, displayOrder: parseInt(e.target.value) || 0 }))
                }
                helperText="Sorting order in product listings (lower numbers appear first)"
              />

              <div className="flex items-center pt-6">
                <Toggle
                  checked={formData.isActive}
                  onChange={(val) => setFormData((prev) => ({ ...prev, isActive: val }))}
                  label="Visible in Catalog"
                  description="When active, product is displayed in public catalog searches"
                />
              </div>
            </div>
          </div>
        </Card>
      </form>
    </div>
  );
};

