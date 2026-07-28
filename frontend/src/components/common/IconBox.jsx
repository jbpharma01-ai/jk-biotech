import React from 'react';

const IconBox = ({
  icon: Icon,
  variant = 'primary',
  size = 'md',
  className = '',
}) => {
  const variants = {
    primary: 'bg-primary-50 text-primary-600 border border-primary-100',
    secondary: 'bg-secondary-50 text-secondary-600 border border-secondary-100',
    dark: 'bg-slate-900 text-white border border-slate-800',
    light: 'bg-white text-primary-600 shadow-md border border-slate-100',
  };

  const sizes = {
    sm: 'w-10 h-10 rounded-xl p-2 text-sm',
    md: 'w-12 h-12 rounded-xl p-2.5 text-base',
    lg: 'w-16 h-16 rounded-2xl p-3.5 text-xl',
  };

  const iconSizes = {
    sm: 'w-5 h-5',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  };

  return (
    <div className={`inline-flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${className}`}>
      {Icon && <Icon className={`${iconSizes[size] || iconSizes.md}`} />}
    </div>
  );
};

export default IconBox;
