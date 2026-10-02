
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Mail,
   Lock,
  KeyRound,
  ArrowLeft,
  ArrowRight,
  Eye,
  EyeOff,
  ShieldCheck,
} from "lucide-react";
import { useToast } from "../../hooks/useToast";
import { Button } from "../../components/common/Button";
import { Input } from "../../components/common/Input";
import { authService } from "../../services/authService";
import jkLogo from "../../assets/logo/jk-logo.png";

export const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [recoveryCode, setRecoveryCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showRecoveryCode, setShowRecoveryCode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const { success, error: toastError } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!email.trim() || !recoveryCode.trim() || !newPassword || !confirmPassword) {
      setErrorMsg("Please fill in all fields.");
      return;
    }

    if (newPassword.length < 8) {
      setErrorMsg("Password must be at least 8 characters long.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMsg("New password and confirm password do not match.");
      return;
    }

    setLoading(true);

    try {
      await authService.resetPassword({
        email: email.trim().toLowerCase(),
        recoveryCode: recoveryCode.trim(),
        newPassword,
      });

      success("Password reset successfully. Please log in.");
      navigate("/login", { replace: true });
    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.message ||
        "Unable to reset password. Please try again.";

      setErrorMsg(message);
      toastError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-premium-black flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden selection:bg-premium-orange selection:text-white">
      <div className="absolute top-0 -left-40 w-96 h-96 bg-premium-orange/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 -right-40 w-96 h-96 bg-premium-orangeDark/15 rounded-full blur-3xl pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 rounded-2xl bg-white p-3 flex items-center justify-center shadow-2xl shadow-premium-orange/25 mb-4 border border-white/20">
            <img
              src={jkLogo}
              alt="JK BIOTECH"
              className="w-full h-full object-contain"
              draggable={false}
            />
          </div>

          <h2 className="text-center text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Reset Password
          </h2>
          <p className="mt-1 text-center text-xs uppercase tracking-widest text-premium-orange font-bold">
            Administrative Management Portal
          </p>
        </div>

        <div className="mt-8 bg-white/95 backdrop-blur-md py-8 px-6 sm:px-10 shadow-2xl rounded-3xl border border-white/40">
          <div className="mb-6">
            <h3 className="text-lg font-bold text-slate-900">
              Forgot your password?
            </h3>
            <p className="text-sm text-slate-500 mt-1">
              Enter your admin email and recovery code to set a new password.
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {errorMsg && (
              <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-sm font-medium">
                {errorMsg}
              </div>
            )}

            <Input
              label="Admin Email"
              id="recovery-email"
              type="email"
              required
              icon={Mail}
              placeholder="admin@jkbiotech.in"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />

            <div>
              <label
                htmlFor="recovery-code"
                className="text-xs font-semibold uppercase tracking-wider text-slate-600 block mb-1.5"
              >
                Recovery Code <span className="text-rose-500">*</span>
              </label>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <KeyRound className="w-4 h-4" />
                </div>

                <input
                  id="recovery-code"
                  type={showRecoveryCode ? "text" : "password"}
                  required
                  value={recoveryCode}
                  onChange={(e) => setRecoveryCode(e.target.value)}
                  placeholder="Enter your recovery code"
                  autoComplete="off"
                  className="w-full rounded-xl border border-slate-200 hover:border-slate-300 pl-10 pr-10 py-2.5 text-sm bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-premium-orange/30 focus:border-premium-orange transition"
                />

                <button
                  type="button"
                  onClick={() => setShowRecoveryCode(!showRecoveryCode)}
                  aria-label={showRecoveryCode ? "Hide recovery code" : "Show recovery code"}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600"
                >
                  {showRecoveryCode ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label
                htmlFor="new-password"
                className="text-xs font-semibold uppercase tracking-wider text-slate-600 block mb-1.5"
              >
                New Password <span className="text-rose-500">*</span>
              </label>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <KeyRound className="w-4 h-4" />
                </div>

                <input
                  id="new-password"
                  type={showPassword ? "text" : "password"}
                  required
                  minLength={8}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                  autoComplete="new-password"
                  className="w-full rounded-xl border border-slate-200 hover:border-slate-300 pl-10 pr-10 py-2.5 text-sm bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-premium-orange/30 focus:border-premium-orange transition"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label
                htmlFor="confirm-password"
                className="text-xs font-semibold uppercase tracking-wider text-slate-600 block mb-1.5"
              >
                Confirm New Password <span className="text-rose-500">*</span>
              </label>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>

                <input
                  id="confirm-password"
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                  autoComplete="new-password"
                  className="w-full rounded-xl border border-slate-200 hover:border-slate-300 pl-10 pr-10 py-2.5 text-sm bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-premium-orange/30 focus:border-premium-orange transition"
                />

                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              loading={loading}
              className="w-full shadow-lg shadow-premium-orange/25"
              icon={ArrowRight}
            >
              Reset Password
            </Button>
          </form>

          <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-center">
            <Link
              to="/login"
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-premium-orange transition"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Login
            </Link>
          </div>

          <div className="mt-5 flex items-center justify-center gap-2 text-xs text-slate-500">
            <ShieldCheck className="w-4 h-4 text-premium-orange shrink-0" />
            <span>Authorized JK BIOTECH Administrators Only</span>
          </div>
        </div>
      </div>
    </div>
  );
};
