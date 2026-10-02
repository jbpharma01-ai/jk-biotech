import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, ShieldCheck, ArrowRight } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { useToast } from "../../hooks/useToast";
import { Button } from "../../components/common/Button";
import { Input } from "../../components/common/Input";
import jkLogo from "../../assets/logo/jk-logo.png";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const { login } = useAuth();
  const { success, error: toastError } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/dashboard";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMsg("Please provide both email and password.");
      return;
    }

    setErrorMsg("");
    setLoading(true);
    try {
      const admin = await login(email, password);
      success(`Welcome back, ${admin.name}!`);
      navigate(from, { replace: true });
    } catch (err) {
      const message =
        err.response?.data?.message || err.message || "Invalid email or password.";
      setErrorMsg(message);
      toastError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-premium-black flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden selection:bg-premium-orange selection:text-white">
      {/* Decorative gradient background glows */}
      <div className="absolute top-0 -left-40 w-96 h-96 bg-premium-orange/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 -right-40 w-96 h-96 bg-premium-orangeDark/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-premium-surface/30 rounded-full blur-3xl pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="flex flex-col items-center">
          {/* Authentic JK BIOTECH Logo Container */}
          <div className="w-24 h-24 rounded-2xl bg-white p-3 flex items-center justify-center shadow-2xl shadow-premium-orange/25 mb-4 border border-white/20">
            <img
              src={jkLogo}
              alt="JK BIOTECH"
              className="w-full h-full object-contain"
              draggable={false}
            />
          </div>
          <h2 className="text-center text-2xl sm:text-3xl font-bold tracking-tight text-white">
            JK BIOTECH
          </h2>
          <p className="mt-1 text-center text-xs uppercase tracking-widest text-premium-orange font-bold">
            Administrative Management Portal
          </p>
        </div>

        <div className="mt-8 bg-white/95 backdrop-blur-md py-8 px-6 sm:px-10 shadow-2xl rounded-3xl border border-white/40">
          <form className="space-y-5" onSubmit={handleSubmit}>
            {errorMsg && (
              <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-sm font-medium animate-in fade-in">
                {errorMsg}
              </div>
            )}

            <div>
              <Input
                label="Admin Email"
                id="email"
                type="email"
                required
                icon={Mail}
                placeholder="admin@jkbiotech.in"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="text-xs font-semibold uppercase tracking-wider text-slate-600 block mb-1.5"
              >
                Password <span className="text-rose-500">*</span>
              </label>
              <div className="relative rounded-xl shadow-xs">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  className="w-full rounded-xl border border-slate-200 hover:border-slate-300 pl-10 pr-10 py-2.5 text-sm bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-premium-orange/30 focus:border-premium-orange transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex justify-end -mt-2">
              <Link
                to="/forgot-password"
                className="text-sm font-semibold text-premium-orange hover:text-premium-orangeDark transition"
              >
                Forgot Password?
              </Link>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              loading={loading}
              className="w-full shadow-lg shadow-premium-orange/25"
              icon={ArrowRight}
            >
              Sign In to Dashboard
            </Button>
          </form>

          <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-center gap-2 text-xs text-slate-500">
            <ShieldCheck className="w-4 h-4 text-premium-orange shrink-0" />
            <span>Authorized JK BIOTECH Administrators Only</span>
          </div>
        </div>
      </div>
    </div>
  );
};
