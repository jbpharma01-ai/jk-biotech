import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import { AdminLayout } from "../components/layout/AdminLayout";

// Pages
import { LoginPage } from "../pages/auth/LoginPage";
import { DashboardPage } from "../pages/dashboard/DashboardPage";
import { CategoriesListPage } from "../pages/categories/CategoriesListPage";
import { ProductsListPage } from "../pages/products/ProductsListPage";
import { ProductFormPage } from "../pages/products/ProductFormPage";
import { HeroSlidesListPage } from "../pages/hero/HeroSlidesListPage";
import { DocCategoriesListPage } from "../pages/downloads/DocCategoriesListPage";
import { DocumentsListPage } from "../pages/downloads/DocumentsListPage";
import { EnquiriesListPage } from "../pages/enquiries/EnquiriesListPage";
import { CompanySettingsPage } from "../pages/settings/CompanySettingsPage";
import { ProfilePage } from "../pages/profile/ProfilePage";

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Authentication Route */}
      <Route path="/login" element={<LoginPage />} />

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
        <Route path="document-categories" element={<DocCategoriesListPage />} />
        <Route path="documents" element={<DocumentsListPage />} />

        {/* Enquiries */}
        <Route path="enquiries" element={<EnquiriesListPage />} />

        {/* Company Settings */}
        <Route path="settings" element={<CompanySettingsPage />} />

        {/* Profile */}
        <Route path="profile" element={<ProfilePage />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};
