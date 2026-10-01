import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Tags,
  Pill,
  Sliders,
  FolderTree,
  FileText,
  Mail,
  Building2,
  User,
  ExternalLink,
  ChevronRight,
  LogOut,
} from "lucide-react";
import { useAuth } from "../../hooks/useAuth";

export const Sidebar = ({ isOpen, onClose }) => {
  const { user, logout } = useAuth();

  const navItems = [
    { label: "Dashboard", to: "/dashboard", icon: LayoutDashboard },
    { label: "Categories", to: "/categories", icon: Tags },
    { label: "Products", to: "/products", icon: Pill },
    { label: "Hero Banner", to: "/hero-slides", icon: Sliders },
    { label: "Doc Categories", to: "/document-categories", icon: FolderTree },
    { label: "Documents", to: "/documents", icon: FileText },
    { label: "Enquiries", to: "/enquiries", icon: Mail },
    { label: "Company Info", to: "/settings", icon: Building2 },
    { label: "My Profile", to: "/profile", icon: User },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-xs lg:hidden"
        />
      )}

      {/* Sidebar container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 w-64 bg-slate-900 text-slate-300 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Brand header */}
        <div className="h-16 px-6 flex items-center justify-between border-b border-slate-800/80">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-blue to-brand-teal flex items-center justify-center text-white font-bold text-lg shadow-md">
              JK
            </div>
            <div>
              <h1 className="text-sm font-bold text-white tracking-wide">JK BIOTECH</h1>
              <p className="text-[10px] uppercase font-semibold text-brand-teal tracking-widest">
                Admin Portal
              </p>
            </div>
          </div>
        </div>

        {/* Navigation list */}
        <div className="flex-1 overflow-y-auto px-4 py-5 space-y-1.5">
          <p className="px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-2">
            Main Management
          </p>
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 group ${
                    isActive
                      ? "bg-brand-blue text-white shadow-sm font-semibold"
                      : "text-slate-400 hover:text-slate-100 hover:bg-slate-800/60"
                  }`
                }
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4 shrink-0 transition group-hover:scale-110" />
                  <span>{item.label}</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </NavLink>
            );
          })}
        </div>

        {/* Bottom actions & user badge */}
        <div className="p-4 border-t border-slate-800/80 space-y-3">
          <a
            href="http://localhost:5173"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 w-full py-2 px-3 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 transition"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Visit Live Website</span>
          </a>

          <div className="flex items-center justify-between pt-1 px-1">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-brand-blue/30 text-brand-teal flex items-center justify-center text-xs font-bold shrink-0">
                {user?.name?.[0]?.toUpperCase() || "A"}
              </div>
              <div className="truncate">
                <p className="text-xs font-medium text-slate-200 truncate">
                  {user?.name || "Admin"}
                </p>
                <p className="text-[10px] text-slate-500 capitalize truncate">
                  {user?.role || "superadmin"}
                </p>
              </div>
            </div>
            <button
              onClick={logout}
              title="Sign Out"
              className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
