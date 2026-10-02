import React from "react";
import { Loader2 } from "lucide-react";

export const Button = ({
  children,
  type = "button",
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  icon: Icon,
  className = "",
  onClick,
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.98]";

  const variants = {
    primary:
      "bg-premium-orange hover:bg-premium-orangeDark text-white shadow-sm hover:shadow-orange focus:ring-premium-orange/40 border border-transparent font-semibold",
    secondary:
      "bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 hover:border-slate-300 shadow-xs focus:ring-premium-orange/30",
    dark:
      "bg-premium-charcoal hover:bg-black text-white border border-premium-border shadow-black focus:ring-zinc-700 font-semibold",
    danger:
      "bg-rose-600 hover:bg-rose-700 text-white shadow-sm focus:ring-rose-500/40 border border-transparent",
    ghost:
      "bg-transparent hover:bg-orange-50 text-slate-600 hover:text-premium-orange focus:ring-premium-orange/30",
    outline:
      "bg-transparent hover:bg-orange-50 text-premium-orange border-2 border-premium-orange focus:ring-premium-orange/30 font-semibold",
    teal:
      "bg-premium-orange hover:bg-premium-orangeDark text-white shadow-sm hover:shadow-orange focus:ring-premium-orange/40 border border-transparent font-semibold",
    orange:
      "bg-premium-orange hover:bg-premium-orangeDark text-white shadow-sm hover:shadow-orange focus:ring-premium-orange/40 border border-transparent font-semibold",
  };

  const sizes = {
    sm: "text-xs px-3 py-1.5 gap-1.5",
    md: "text-sm px-4 py-2 gap-2",
    lg: "text-base px-5 py-2.5 gap-2.5",
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${className}`}
      {...props}
    >
      {loading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin shrink-0" />
          <span>{children}</span>
        </>
      ) : (
        <>
          {Icon && <Icon className="w-4 h-4 shrink-0" />}
          <span>{children}</span>
        </>
      )}
    </button>
  );
};
