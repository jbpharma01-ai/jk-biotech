import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

export const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  // Determine current page title
  const getPageTitle = (pathname) => {
    if (pathname.includes("/dashboard")) return "Dashboard Overview";
    if (pathname.includes("/categories")) return "Categories Management";
    if (pathname.includes("/products")) return "Products Catalog";
    if (pathname.includes("/hero-slides")) return "Hero Banner Slides";
    if (pathname.includes("/document-categories")) return "Document Categories";
    if (pathname.includes("/documents")) return "Downloads & Documents";
    if (pathname.includes("/enquiries")) return "Contact Enquiries";
    if (pathname.includes("/settings")) return "Company Settings";
    if (pathname.includes("/profile")) return "Administrator Profile";
    return "Admin Portal";
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-64 flex flex-col min-w-0">
        <Header
          onOpenSidebar={() => setSidebarOpen(true)}
          title={getPageTitle(location.pathname)}
        />
        <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
