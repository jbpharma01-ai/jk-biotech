import React from "react";

export const Card = ({
  children,
  className = "",
  title,
  subtitle,
  action,
  padding = "default",
}) => {
  const paddingMap = {
    none: "p-0",
    sm: "p-4",
    default: "p-6",
    lg: "p-8",
  };

  return (
    <div className={`bg-white rounded-2xl border border-slate-200/80 shadow-soft overflow-hidden ${className}`}>
      {(title || subtitle || action) && (
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between gap-4">
          <div>
            {title && <h3 className="text-base font-semibold text-slate-800">{title}</h3>}
            {subtitle && <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>}
          </div>
          {action && <div>{action}</div>}
        </div>
      )}
      <div className={paddingMap[padding]}>{children}</div>
    </div>
  );
};
