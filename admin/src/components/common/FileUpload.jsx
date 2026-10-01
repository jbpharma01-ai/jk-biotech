import React, { useState, useRef, useEffect } from "react";
import { UploadCloud, FileText, X, CheckCircle2 } from "lucide-react";

export const FileUpload = ({
  label = "Upload File",
  currentFileName,
  currentFileUrl,
  onChange,
  error,
  helperText = "PDF, DOC, DOCX, Images up to 10MB",
  className = "",
  required = false,
}) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      if (onChange) onChange(file);
    }
  };

  const handleClear = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    if (onChange) onChange(null);
  };

  return (
    <div className={`w-full flex flex-col gap-1.5 ${className}`}>
      {label && (
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-600">
          {label} {required && <span className="text-rose-500">*</span>}
        </span>
      )}

      {selectedFile ? (
        <div className="flex items-center justify-between p-3.5 bg-brand-blue/5 border border-brand-blue/20 rounded-xl">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-9 h-9 rounded-lg bg-brand-blue/10 text-brand-blue flex items-center justify-center shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <div className="truncate">
              <p className="text-sm font-medium text-slate-800 truncate">{selectedFile.name}</p>
              <p className="text-xs text-slate-500">{(selectedFile.size / (1024 * 1024)).toFixed(2)} MB</p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleClear}
            className="p-1 text-slate-400 hover:text-rose-600 transition rounded-md"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : currentFileName || currentFileUrl ? (
        <div className="flex items-center justify-between p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div className="truncate">
              <p className="text-sm font-medium text-slate-800 truncate">
                {currentFileName || "Current File Attached"}
              </p>
              {currentFileUrl && (
                <a
                  href={currentFileUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-brand-blue hover:underline"
                >
                  View current file
                </a>
              )}
            </div>
          </div>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="text-xs font-medium text-brand-blue hover:text-brand-darkTeal transition"
          >
            Replace
          </button>
        </div>
      ) : (
        <div
          onClick={() => fileInputRef.current?.click()}
          className={`cursor-pointer rounded-2xl border-2 border-dashed p-6 flex flex-col items-center justify-center gap-2 transition bg-white hover:bg-slate-50 text-slate-400 hover:text-brand-blue ${
            error
              ? "border-rose-300 bg-rose-50/20 text-rose-500"
              : "border-slate-200 hover:border-brand-blue/50"
          }`}
        >
          <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400">
            <UploadCloud className="w-6 h-6" />
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-slate-700">
              <span className="text-brand-blue font-semibold">Click to upload document</span>
            </p>
            <p className="text-xs text-slate-400 mt-0.5">{helperText}</p>
          </div>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.doc,.docx,image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {error && <span className="text-xs text-rose-600 font-medium">{error}</span>}
    </div>
  );
};
