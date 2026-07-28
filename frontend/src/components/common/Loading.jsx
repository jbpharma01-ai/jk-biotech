import React from 'react';
import { Activity } from 'lucide-react';

export const LoadingSpinner = ({ label = 'Loading...', size = 'md' }) => {
  const sizes = {
    sm: 'w-5 h-5',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 gap-3">
      <div className="relative">
        <Activity className={`${sizes[size] || sizes.md} text-primary-600 animate-pulse`} />
      </div>
      {label && <p className="text-xs font-medium text-slate-500 animate-pulse">{label}</p>}
    </div>
  );
};

export const SkeletonCard = () => {
  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm animate-pulse space-y-4">
      <div className="w-12 h-12 rounded-xl bg-slate-200"></div>
      <div className="h-5 bg-slate-200 rounded w-3/4"></div>
      <div className="space-y-2">
        <div className="h-3 bg-slate-100 rounded w-full"></div>
        <div className="h-3 bg-slate-100 rounded w-5/6"></div>
      </div>
      <div className="h-8 bg-slate-200 rounded-xl w-1/3 pt-2"></div>
    </div>
  );
};

export default LoadingSpinner;
