import React from "react";
import { Menu, ExternalLink, LogOut, ShieldCheck } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import jkLogo from "../../assets/logo/jk-logo.png";

export const Header = ({ onOpenSidebar, title }) => {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-30 h-16 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-8 flex items-center justify-between transition-all">
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenSidebar}
          className="p-2 text-slate-600 hover:text-premium-orange hover:bg-orange-50 rounded-xl lg:hidden transition"
          aria-label="Open Navigation Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Mobile brand logo */}
        <div className="flex items-center gap-2 lg:hidden">
          <div className="h-8 px-2 py-0.5 rounded-lg bg-white border border-slate-200 shadow-xs flex items-center justify-center">
            <img src={jkLogo} alt="JK BIOTECH" className="h-5 w-auto object-contain" />
          </div>
        </div>

        {title && (
          <div className="flex items-center gap-2.5">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
              {title}
            </h2>
          </div>
        )}
      </div>

      <div className="flex items-center gap-3 sm:gap-4">
        {/* Quick Website View */}
        <a
          href="http://localhost:5173"
          target="_blank"
          rel="noreferrer"
          title="Open live website"
          className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-600 hover:text-premium-orange hover:bg-orange-50 border border-slate-200 hover:border-orange-200 transition"
        >
          <ExternalLink className="w-3.5 h-3.5 text-premium-orange" />
          <span>Live Site</span>
        </a>

        {/* User Profile */}
        <div className="flex items-center gap-3 pl-3 border-l border-slate-200">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-premium-orange to-premium-orangeLight text-white flex items-center justify-center text-xs font-bold shadow-xs">
              {user?.name?.[0]?.toUpperCase() || "A"}
            </div>
            <div className="hidden sm:block text-left leading-tight">
              <p className="text-xs font-bold text-slate-800">{user?.name || "Admin"}</p>
              <div className="flex items-center gap-1 mt-0.5">
                <span className="px-1.5 py-0.2 rounded text-[10px] font-semibold uppercase tracking-wider bg-orange-50 text-premium-orange border border-orange-200/60">
                  {user?.role || "superadmin"}
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={logout}
            className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition"
            title="Logout"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
