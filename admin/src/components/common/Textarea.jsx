import React, { forwardRef } from "react";

export const Textarea = forwardRef(
  (
    {
      label,
      error,
      helperText,
      rows = 3,
      className = "",
      id,
      required,
      ...props
    },
    ref
  ) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="text-xs font-semibold uppercase tracking-wider text-slate-600">
            {label} {required && <span className="text-rose-500">*</span>}
          </label>
        )}
        <textarea
          ref={ref}
          id={inputId}
          rows={rows}
          required={required}
          className={`w-full rounded-xl border px-3.5 py-2.5 transition-all duration-150 text-sm bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue disabled:bg-slate-50 disabled:text-slate-400 ${
            error
              ? "border-rose-300 focus:border-rose-500 focus:ring-rose-500/20 text-rose-900"
              : "border-slate-200 hover:border-slate-300"
          } ${className}`}
          {...props}
        />
        {error && <span className="text-xs text-rose-600 font-medium">{error}</span>}
        {helperText && !error && <span className="text-xs text-slate-500">{helperText}</span>}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
