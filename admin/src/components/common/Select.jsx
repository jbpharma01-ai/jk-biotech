import React, { forwardRef } from "react";

export const Select = forwardRef(
  (
    {
      label,
      options = [],
      error,
      helperText,
      className = "",
      id,
      required,
      placeholder,
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
        <select
          ref={ref}
          id={inputId}
          required={required}
          className={`w-full rounded-xl border px-3.5 py-2.5 transition-all duration-150 text-sm bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue disabled:bg-slate-50 disabled:text-slate-400 ${
            error
              ? "border-rose-300 focus:border-rose-500 focus:ring-rose-500/20 text-rose-900"
              : "border-slate-200 hover:border-slate-300"
          } ${className}`}
          {...props}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((opt) => {
            const value = typeof opt === "object" ? opt.value : opt;
            const labelText = typeof opt === "object" ? opt.label : opt;
            return (
              <option key={value} value={value}>
                {labelText}
              </option>
            );
          })}
        </select>
        {error && <span className="text-xs text-rose-600 font-medium">{error}</span>}
        {helperText && !error && <span className="text-xs text-slate-500">{helperText}</span>}
      </div>
    );
  }
);

Select.displayName = "Select";
