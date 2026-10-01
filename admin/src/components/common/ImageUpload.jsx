import React, { useState, useRef, useEffect } from "react";
import { UploadCloud, X, Image as ImageIcon } from "lucide-react";

export const ImageUpload = ({
  label = "Upload Image",
  currentImageUrl,
  onChange,
  onRemove,
  error,
  helperText = "PNG, JPG, WEBP up to 5MB",
  className = "",
  required = false,
}) => {
  const [preview, setPreview] = useState(currentImageUrl || null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    setPreview(currentImageUrl || null);
  }, [currentImageUrl]);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
      if (onChange) onChange(file);
    }
  };

  const handleClear = () => {
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    if (onChange) onChange(null);
    if (onRemove) onRemove();
  };

  return (
    <div className={`w-full flex flex-col gap-1.5 ${className}`}>
      {label && (
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-600">
          {label} {required && <span className="text-rose-500">*</span>}
        </span>
      )}

      {preview ? (
        <div className="relative group rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 max-w-sm aspect-video flex items-center justify-center shadow-xs">
          <img
            src={preview}
            alt="Preview"
            className="w-full h-full object-cover transition duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="p-2 bg-white/90 hover:bg-white text-slate-800 rounded-xl shadow-md transition"
              title="Change Image"
            >
              <UploadCloud className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={handleClear}
              className="p-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl shadow-md transition"
              title="Remove Image"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
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
          <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 group-hover:text-brand-blue">
            <ImageIcon className="w-6 h-6" />
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-slate-700">
              <span className="text-brand-blue font-semibold">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-slate-400 mt-0.5">{helperText}</p>
          </div>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/png, image/jpeg, image/webp, image/gif"
        onChange={handleFileChange}
        className="hidden"
      />

      {error && <span className="text-xs text-rose-600 font-medium">{error}</span>}
    </div>
  );
};
