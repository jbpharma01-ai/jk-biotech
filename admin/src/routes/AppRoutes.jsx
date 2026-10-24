import React, { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import { AdminLayout } from "../components/layout/AdminLayout";
import { Spinner } from "../components/common/Spinner";

// ─── Lazy-loaded Pages ─────────────────────────────────────────────────────
// Each page is split into its own JS chunk, so the browser only downloads
// the code it needs for the current route. This dramatically cuts initial
// bundle size and speeds up first paint.
const LoginPage          = lazy(() => import("../pages/auth/LoginPage").then(m => ({ default: m.LoginPage })));
const ForgotPasswordPage = lazy(() => import("../pages/auth/ForgotPasswordPage").then(m => ({ default: m.ForgotPasswordPage })));
const DashboardPage      = lazy(() => import("../pages/dashboard/DashboardPage").then(m => ({ default: m.DashboardPage })));
const CategoriesListPage = lazy(() => import("../pages/categories/CategoriesListPage").then(m => ({ default: m.CategoriesListPage })));
const ProductsListPage   = lazy(() => import("../pages/products/ProductsListPage").then(m => ({ default: m.ProductsListPage })));
const ProductFormPage    = lazy(() => import("../pages/products/ProductFormPage").then(m => ({ default: m.ProductFormPage })));
const HeroSlidesListPage = lazy(() => import("../pages/hero/HeroSlidesListPage").then(m => ({ default: m.HeroSlidesListPage })));
// const DocCategoriesListPage = lazy(() => import("../pages/downloads/DocCategoriesListPage").then(m => ({ default: m.DocCategoriesListPage })));
// const DocumentsListPage  = lazy(() => import("../pages/downloads/DocumentsListPage").then(m => ({ default: m.DocumentsListPage })));
const EnquiriesListPage  = lazy(() => import("../pages/enquiries/EnquiriesListPage").then(m => ({ default: m.EnquiriesListPage })));
const CompanySettingsPage = lazy(() => import("../pages/settings/CompanySettingsPage").then(m => ({ default: m.CompanySettingsPage })));
const ProfilePage        = lazy(() => import("../pages/profile/ProfilePage").then(m => ({ default: m.ProfilePage })));

// Lightweight fallback shown while a page chunk is loading
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-[60vh]">
    <Spinner size="lg" message="Loading page..." />
  </div>
);

export const AppRoutes = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* Public Authentication Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />

        {/* Protected Admin Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPage />} />

          {/* Categories */}
          <Route path="categories" element={<CategoriesListPage />} />

          {/* Products */}
          <Route path="products" element={<ProductsListPage />} />
          <Route path="products/new" element={<ProductFormPage />} />
          <Route path="products/edit/:id" element={<ProductFormPage />} />

          {/* Hero Slides */}
          <Route path="hero-slides" element={<HeroSlidesListPage />} />

          {/* Downloads & Documents */}
          {/* <Route path="document-categories" element={<DocCategoriesListPage />} />
          <Route path="documents" element={<DocumentsListPage />} /> */}

          {/* Enquiries */}
          <Route path="enquiries" element={<EnquiriesListPage />} />

          {/* Company Settings */}
          <Route path="settings" element={<CompanySettingsPage />} />

          {/* Profile */}
          <Route path="profile" element={<ProfilePage />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Suspense>
  );
};
