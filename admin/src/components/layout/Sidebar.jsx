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
import jkLogo from "../../assets/logo/jk-logo.png";

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
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs lg:hidden"
        />
      )}

      {/* Sidebar container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 w-64 bg-premium-charcoal text-zinc-300 flex flex-col border-r border-premium-border transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Brand header with Original Logo */}
        <div className="h-20 px-5 flex items-center justify-between border-b border-premium-border bg-premium-black/60">
          <div className="flex items-center gap-3 min-w-0">
            <div className="h-11 px-2.5 py-1 rounded-xl bg-white flex items-center justify-center shadow-sm border border-white/20 shrink-0">
              <img
                src={jkLogo}
                alt="JK BIOTECH"
                className="h-8 w-auto object-contain"
                draggable={false}
              />
            </div>
            <div className="truncate">
              <h1 className="text-sm font-bold text-white tracking-wide truncate">
                JK BIOTECH
              </h1>
              <p className="text-[10px] uppercase font-bold text-premium-orange tracking-widest truncate">
                Admin Portal
              </p>
            </div>
          </div>
        </div>

        {/* Navigation list */}
        <div className="flex-1 overflow-y-auto px-4 py-5 space-y-1.5 dark-scrollbar">
          <p className="px-3 text-[11px] font-semibold uppercase tracking-wider text-zinc-400 mb-2">
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
                      ? "bg-gradient-to-r from-premium-orange to-premium-orangeDark text-white shadow-md shadow-premium-orange/25 font-semibold"
                      : "text-zinc-400 hover:text-white hover:bg-premium-surface"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <div className="flex items-center gap-3">
                      <Icon
                        className={`w-4 h-4 shrink-0 transition group-hover:scale-110 ${
                          isActive
                            ? "text-white"
                            : "text-zinc-400 group-hover:text-premium-orange"
                        }`}
                      />
                      <span>{item.label}</span>
                    </div>
                    <ChevronRight
                      className={`w-3.5 h-3.5 transition-all ${
                        isActive
                          ? "opacity-100 text-white"
                          : "opacity-0 group-hover:opacity-100 text-premium-orange"
                      }`}
                    />
                  </>
                )}
              </NavLink>
            );
          })}
        </div>

        {/* Bottom actions & user badge */}
        <div className="p-4 border-t border-premium-border bg-premium-black/40 space-y-3">
          <a
            href="http://localhost:5173"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 w-full py-2.5 px-3 rounded-xl text-xs font-semibold bg-premium-surface hover:bg-premium-surfaceHover text-zinc-200 hover:text-white border border-premium-border transition"
          >
            <ExternalLink className="w-3.5 h-3.5 text-premium-orange" />
            <span>Visit Live Website</span>
          </a>

          <div className="flex items-center justify-between p-2.5 rounded-xl bg-premium-surface/80 border border-premium-border/80">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-premium-orange to-premium-orangeLight text-white flex items-center justify-center text-xs font-bold shrink-0 shadow-sm">
                {user?.name?.[0]?.toUpperCase() || "A"}
              </div>
              <div className="truncate">
                <p className="text-xs font-semibold text-white truncate">
                  {user?.name || "Admin"}
                </p>
                <p className="text-[10px] text-zinc-400 capitalize truncate">
                  {user?.role || "superadmin"}
                </p>
              </div>
            </div>
            <button
              onClick={logout}
              title="Sign Out"
              className="p-1.5 text-zinc-400 hover:text-rose-400 hover:bg-premium-surface rounded-lg transition"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
