import React from "react";
import { Menu, Bell, User, LogOut } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";

export const Header = ({ onOpenSidebar, title }) => {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-30 h-16 bg-white/80 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-8 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenSidebar}
          className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-xl lg:hidden transition"
        >
          <Menu className="w-5 h-5" />
        </button>
        {title && <h2 className="text-lg font-bold text-slate-800">{title}</h2>}
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-3 pl-3 border-l border-slate-200">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-brand-blue text-white flex items-center justify-center text-xs font-semibold shadow-xs">
              {user?.name?.[0]?.toUpperCase() || "A"}
            </div>
            <div className="hidden sm:block text-left leading-tight">
              <p className="text-xs font-semibold text-slate-800">{user?.name || "Admin"}</p>
              <p className="text-[10px] text-slate-400 capitalize">{user?.role || "superadmin"}</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
            title="Logout"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
