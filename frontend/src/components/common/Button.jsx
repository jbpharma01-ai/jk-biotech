import React from 'react';
import { Loader2 } from 'lucide-react';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  isDisabled = false,
  icon: Icon,
  iconPosition = 'left',
  className = '',
  onClick,
  type = 'button',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed disabled:shadow-none active:scale-[0.98]';

  const variants = {
    primary: 'bg-primary-600 hover:bg-primary-700 text-white shadow-md shadow-primary-600/25 focus:ring-primary-500 border border-transparent',
    secondary: 'bg-secondary-600 hover:bg-secondary-700 text-white shadow-md shadow-secondary-600/20 focus:ring-secondary-500 border border-transparent',
    outline: 'bg-transparent hover:bg-primary-50 text-primary-700 border-2 border-primary-600 focus:ring-primary-500',
    ghost: 'bg-transparent hover:bg-slate-100 text-slate-700 focus:ring-slate-400 border border-transparent',
    white: 'bg-white hover:bg-slate-50 text-primary-800 shadow-md focus:ring-white border border-slate-100',
  };

  const sizes = {
    sm: 'px-3.5 py-1.5 text-xs gap-1.5',
    md: 'px-5 py-2.5 text-sm gap-2',
    lg: 'px-7 py-3.5 text-base gap-2.5 font-semibold',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled || isLoading}
      className={`${baseStyles} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${className}`}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin text-current" />
      ) : (
        <>
          {Icon && iconPosition === 'left' && <Icon className="w-4 h-4 flex-shrink-0" />}
          <span>{children}</span>
          {Icon && iconPosition === 'right' && <Icon className="w-4 h-4 flex-shrink-0" />}
        </>
      )}
    </button>
  );
};

export default Button;
