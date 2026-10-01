import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Tags,
  Pill,
  Sliders,
  FileText,
  Mail,
  Plus,
  ArrowUpRight,
  Clock,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { categoryService } from "../../services/categoryService";
import { productService } from "../../services/productService";
import { heroSlideService } from "../../services/heroSlideService";
import { documentService } from "../../services/documentService";
import { enquiryService } from "../../services/enquiryService";
import { Card } from "../../components/common/Card";
import { Badge } from "../../components/common/Badge";
import { Button } from "../../components/common/Button";
import { Spinner } from "../../components/common/Spinner";

export const DashboardPage = () => {
  const [stats, setStats] = useState({
    categories: 0,
    products: 0,
    heroSlides: 0,
    documents: 0,
    enquiries: 0,
    newEnquiries: 0,
  });
  const [recentEnquiries, setRecentEnquiries] = useState([]);
  const [recentProducts, setRecentProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        const [catRes, prodRes, heroRes, docRes, enqRes] = await Promise.allSettled([
          categoryService.getAll(),
          productService.getAll(),
          heroSlideService.getAll(),
          documentService.getAll(),
          enquiryService.getAll(),
        ]);

        const categories = catRes.status === "fulfilled" && catRes.value?.data ? catRes.value.data : [];
        const products = prodRes.status === "fulfilled" && prodRes.value?.data ? prodRes.value.data : [];
        const heroSlides = heroRes.status === "fulfilled" && heroRes.value?.data ? heroRes.value.data : [];
        const documents = docRes.status === "fulfilled" && docRes.value?.data ? docRes.value.data : [];
        const enquiries = enqRes.status === "fulfilled" && enqRes.value?.data ? enqRes.value.data : [];

        const newCount = enquiries.filter((e) => e.status === "new").length;

        setStats({
          categories: categories.length,
          products: products.length,
          heroSlides: heroSlides.length,
          documents: documents.length,
          enquiries: enquiries.length,
          newEnquiries: newCount,
        });

        setRecentEnquiries(enquiries.slice(0, 5));
        setRecentProducts(products.slice(0, 5));
      } catch (err) {
        console.error("Dashboard data load error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return <Spinner size="lg" message="Loading dashboard overview..." />;
  }

  const statCards = [
    {
      title: "Products Catalog",
      count: stats.products,
      icon: Pill,
      color: "bg-blue-50 text-brand-blue border-blue-100",
      link: "/products",
      actionText: "Manage Products",
    },
    {
      title: "Categories",
      count: stats.categories,
      icon: Tags,
      color: "bg-teal-50 text-brand-teal border-teal-100",
      link: "/categories",
      actionText: "Manage Categories",
    },
    {
      title: "Downloads & Docs",
      count: stats.documents,
      icon: FileText,
      color: "bg-purple-50 text-purple-600 border-purple-100",
      link: "/documents",
      actionText: "View Documents",
    },
    {
      title: "Hero Banner Slides",
      count: stats.heroSlides,
      icon: Sliders,
      color: "bg-amber-50 text-amber-600 border-amber-100",
      link: "/hero-slides",
      actionText: "Configure Slides",
    },
    {
      title: "Customer Inquiries",
      count: stats.enquiries,
      badge: stats.newEnquiries > 0 ? `${stats.newEnquiries} New` : null,
      icon: Mail,
      color: "bg-rose-50 text-rose-600 border-rose-100",
      link: "/enquiries",
      actionText: "Read Inquiries",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome header banner */}
      <div className="bg-gradient-to-r from-brand-darkBg via-brand-blue to-brand-surface rounded-3xl p-6 sm:p-8 text-white shadow-xl shadow-brand-blue/10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-brand-teal text-xs font-semibold backdrop-blur-md mb-3 border border-white/10">
            <CheckCircle2 className="w-3.5 h-3.5" /> System Connected & Ready
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            JK BIOTECH Management Dashboard
          </h1>
          <p className="text-sm text-slate-300 mt-1 max-w-xl">
            Control product catalogs, dosage categories, banner slides, and download certificates in real-time.
          </p>
        </div>
        <div className="flex flex-wrap gap-3 shrink-0">
          <Link to="/products/new">
            <Button variant="teal" size="md" icon={Plus}>
              New Product
            </Button>
          </Link>
          <Link to="/categories">
            <Button variant="secondary" size="md" icon={Tags}>
              Categories
            </Button>
          </Link>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
        {statCards.map((c) => {
          const Icon = c.icon;
          return (
            <Card key={c.title} padding="sm" className="hover:shadow-md transition">
              <div className="flex items-center justify-between">
                <div className={`w-11 h-11 rounded-2xl flex items-center justify-center border ${c.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                {c.badge && (
                  <Badge variant="danger" size="sm">
                    {c.badge}
                  </Badge>
                )}
              </div>
              <div className="mt-4">
                <h3 className="text-2xl font-bold text-slate-900 tracking-tight">{c.count}</h3>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mt-0.5">
                  {c.title}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100">
                <Link
                  to={c.link}
                  className="text-xs font-semibold text-brand-blue hover:text-brand-darkTeal flex items-center justify-between group"
                >
                  <span>{c.actionText}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Two Column Section: Recent Inquiries & Recent Products */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Inquiries Card */}
        <Card
          title="Recent Contact Inquiries"
          subtitle="Latest queries received through the website contact form"
          action={
            <Link
              to="/enquiries"
              className="text-xs font-semibold text-brand-blue hover:text-brand-darkTeal flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          }
          padding="none"
        >
          {recentEnquiries.length === 0 ? (
            <div className="p-8 text-center text-sm text-slate-400">
              No inquiries received yet.
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {recentEnquiries.map((enq) => (
                <div key={enq._id} className="p-4 sm:px-6 hover:bg-slate-50/80 transition flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm text-slate-800 truncate">
                        {enq.name}
                      </span>
                      <Badge
                        variant={
                          enq.status === "new"
                            ? "danger"
                            : enq.status === "replied"
                            ? "success"
                            : "default"
                        }
                        size="sm"
                      >
                        {enq.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-slate-500 truncate mt-0.5">{enq.subject || enq.message}</p>
                    <div className="flex items-center gap-3 mt-1.5 text-[11px] text-slate-400">
                      <span>{enq.email}</span>
                      {enq.phone && <span>• {enq.phone}</span>}
                    </div>
                  </div>
                  <Link to="/enquiries">
                    <Button variant="ghost" size="sm">
                      Details
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Recent Products Card */}
        <Card
          title="Recent Products"
          subtitle="Recently added pharmaceutical catalog items"
          action={
            <Link
              to="/products"
              className="text-xs font-semibold text-brand-blue hover:text-brand-darkTeal flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          }
          padding="none"
        >
          {recentProducts.length === 0 ? (
            <div className="p-8 text-center text-sm text-slate-400">
              No products found in the catalog.
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {recentProducts.map((p) => (
                <div key={p._id} className="p-4 sm:px-6 hover:bg-slate-50/80 transition flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 overflow-hidden shrink-0 flex items-center justify-center">
                      {p.image?.url ? (
                        <img
                          src={p.image.url}
                          alt={p.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Pill className="w-5 h-5 text-slate-400" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-slate-800 truncate">{p.name}</p>
                      <p className="text-xs text-slate-400 truncate">
                        {p.dosageForm || (typeof p.categoryId === "object" ? p.categoryId?.name : "Pharma Product")}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <Badge variant={p.isActive ? "success" : "default"} size="sm">
                      {p.isActive ? "Active" : "Inactive"}
                    </Badge>
                    <Link to={`/products/edit/${p._id}`}>
                      <Button variant="ghost" size="sm">
                        Edit
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};
