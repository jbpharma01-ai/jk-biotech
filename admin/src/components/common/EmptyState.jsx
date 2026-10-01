import React from "react";
import { FolderOpen } from "lucide-react";
import { Button } from "./Button";

export const EmptyState = ({
  icon: Icon = FolderOpen,
  title = "No data found",
  description = "Get started by creating your first entry.",
  actionLabel,
  onAction,
  className = "",
}) => {
  return (
    <div className={`flex flex-col items-center justify-center text-center p-12 bg-white rounded-2xl border border-dashed border-slate-300 ${className}`}>
      <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 mb-4 shadow-xs">
        <Icon className="w-7 h-7" />
      </div>
      <h3 className="text-base font-semibold text-slate-800 mb-1">{title}</h3>
      <p className="text-sm text-slate-500 max-w-sm mb-6">{description}</p>
      {actionLabel && onAction && (
        <Button onClick={onAction} variant="primary" size="sm">
          {actionLabel}
        </Button>
      )}
    </div>
  );
};
