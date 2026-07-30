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
const baseStyles =
'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-300 hover:-translate-y-0.5 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed';

const variants = {
  primary:
    'bg-premium-orange hover:bg-premium-orangeDark text-white shadow-orange border border-transparent focus:ring-premium-orange transition-all duration-300',

  secondary:
    'bg-premium-charcoal hover:bg-black text-white border border-premium-border shadow-black transition-all duration-300',

  outline:
    'bg-transparent hover:bg-orange-50 text-premium-orange border-2 border-premium-orange focus:ring-premium-orange transition-all duration-300',

  ghost:
    'bg-transparent hover:bg-orange-50 text-slate-700 hover:text-premium-orange transition-all duration-300',

  white:
    'bg-white hover:bg-orange-50 text-premium-charcoal shadow-md border border-orange-100 transition-all duration-300',
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
