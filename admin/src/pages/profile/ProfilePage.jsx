
import React, { useState } from "react";
import {
  User,
  ShieldCheck,
  Mail,
  Clock,
  LogOut,
  Lock,
  Eye,
  EyeOff,
  KeyRound,
} from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { useToast } from "../../hooks/useToast";
import { authService } from "../../services/authService";
import { Card } from "../../components/common/Card";
import { Button } from "../../components/common/Button";
import { Badge } from "../../components/common/Badge";
import { Input } from "../../components/common/Input";

export const ProfilePage = () => {
  const { user, logout } = useAuth();
  const { success, error: toastError } = useToast();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (!currentPassword || !newPassword || !confirmPassword) {
      toastError("Please fill in all password fields.");
      return;
    }

    if (newPassword.length < 8) {
      toastError("New password must be at least 8 characters long.");
      return;
    }

    if (newPassword !== confirmPassword) {
      toastError("New password and confirm password do not match.");
      return;
    }

    if (currentPassword === newPassword) {
      toastError("New password must be different from your current password.");
      return;
    }

    setLoading(true);

    try {
      await authService.changePassword({
        currentPassword,
        newPassword,
      });

      success("Password changed successfully.");

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.message ||
        "Unable to change password.";

      toastError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      {/* Page Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          Admin Profile
        </h1>
        <p className="text-sm text-slate-500 mt-0.5">
          Account details and security settings for the current authenticated
          administrator
        </p>
      </div>

      {/* Profile Card */}
      <Card>
        <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-slate-100">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-premium-orange to-premium-orangeLight flex items-center justify-center text-white text-3xl font-bold shadow-lg shadow-premium-orange/20">
            {user?.name?.[0]?.toUpperCase() || "A"}
          </div>

          <div className="text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2.5">
              <h2 className="text-xl font-bold text-slate-900">
                {user?.name || "Administrator"}
              </h2>

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
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              Active & Verified
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
              {user?.lastLogin
                ? new Date(user.lastLogin).toLocaleString()
                : "Active Now"}
            </span>
          </div>
        </div>

        <div className="pt-4 flex items-center justify-between gap-4">
          <span className="text-xs text-slate-400 truncate">
            Session ID: {user?.id || user?._id || "Active"}
          </span>

          <Button variant="danger" icon={LogOut} onClick={logout}>
            Sign Out
          </Button>
        </div>
      </Card>

      {/* Change Password Card */}
      <Card>
        <div className="flex items-start gap-4 pb-5 border-b border-slate-100">
          <div className="w-11 h-11 rounded-xl bg-premium-orange/10 flex items-center justify-center shrink-0">
            <KeyRound className="w-5 h-5 text-premium-orange" />
          </div>

          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Change Password
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              Update your administrator password to keep your account secure.
            </p>
          </div>
        </div>

        <form onSubmit={handleChangePassword} className="pt-6 space-y-5">
          {/* Current Password */}
          <div className="relative">
            <Input
              label="Current Password"
              id="currentPassword"
              type={showCurrentPassword ? "text" : "password"}
              placeholder="Enter current password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
              icon={Lock}
              autoComplete="current-password"
            />

            <button
              type="button"
              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              className="absolute right-3 top-[34px] text-slate-400 hover:text-slate-600 transition"
              aria-label={
                showCurrentPassword
                  ? "Hide current password"
                  : "Show current password"
              }
            >
              {showCurrentPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>

          {/* New Password */}
          <div className="relative">
            <Input
              label="New Password"
              id="newPassword"
              type={showNewPassword ? "text" : "password"}
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              icon={Lock}
              autoComplete="new-password"
            />

            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute right-3 top-[34px] text-slate-400 hover:text-slate-600 transition"
              aria-label={
                showNewPassword ? "Hide new password" : "Show new password"
              }
            >
              {showNewPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <Input
              label="Confirm New Password"
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              icon={Lock}
              autoComplete="new-password"
            />

            <button
              type="button"
              onClick={() =>
                setShowConfirmPassword(!showConfirmPassword)
              }
              className="absolute right-3 top-[34px] text-slate-400 hover:text-slate-600 transition"
              aria-label={
                showConfirmPassword
                  ? "Hide confirm password"
                  : "Show confirm password"
              }
            >
              {showConfirmPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>

          {/* Password Requirement */}
          <div className="rounded-xl bg-slate-50 border border-slate-100 px-4 py-3">
            <p className="text-xs text-slate-500">
              Password must contain at least <strong>8 characters</strong>.
            </p>
          </div>

          {/* Submit */}
          <div className="flex justify-end pt-1">
            <Button
              type="submit"
              variant="primary"
              icon={KeyRound}
              loading={loading}
            >
              Change Password
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};
