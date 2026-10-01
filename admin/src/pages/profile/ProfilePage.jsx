import React from "react";
import { User, ShieldCheck, Mail, Clock, LogOut } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { Card } from "../../components/common/Card";
import { Button } from "../../components/common/Button";
import { Badge } from "../../components/common/Badge";

export const ProfilePage = () => {
  const { user, logout } = useAuth();

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          Admin Profile
        </h1>
        <p className="text-sm text-slate-500 mt-0.5">
          Account details and session status for the current authenticated administrator
        </p>
      </div>

      <Card>
        <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-slate-100">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-brand-blue to-brand-teal flex items-center justify-center text-white text-3xl font-bold shadow-lg shadow-brand-blue/20">
            {user?.name?.[0]?.toUpperCase() || "A"}
          </div>
          <div className="text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2.5">
              <h2 className="text-xl font-bold text-slate-900">{user?.name || "Administrator"}</h2>
              <Badge variant="primary" size="sm">
                {user?.role || "superadmin"}
              </Badge>
            </div>
            <p className="text-sm text-slate-500 mt-1 flex items-center justify-center sm:justify-start gap-2">
              <Mail className="w-4 h-4 text-slate-400" />
              <span>{user?.email || "admin@jkbiotech.in"}</span>
            </p>
          </div>
        </div>

        <div className="py-6 space-y-4">
          <div className="flex items-center justify-between py-2 border-b border-slate-50">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Account Status
            </span>
            <Badge variant="success">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Active & Verified
            </Badge>
          </div>

          <div className="flex items-center justify-between py-2 border-b border-slate-50">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Assigned Role
            </span>
            <span className="text-sm font-semibold text-slate-800 capitalize">
              {user?.role || "Super Admin"}
            </span>
          </div>

          <div className="flex items-center justify-between py-2 border-b border-slate-50">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Last Login
            </span>
            <span className="text-sm text-slate-600 font-mono flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              {user?.lastLogin ? new Date(user.lastLogin).toLocaleString() : "Active Now"}
            </span>
          </div>
        </div>

        <div className="pt-4 flex items-center justify-between">
          <span className="text-xs text-slate-400">Session ID: {user?.id || user?._id || "Active"}</span>
          <Button variant="danger" icon={LogOut} onClick={logout}>
            Sign Out
          </Button>
        </div>
      </Card>
    </div>
  );
};
