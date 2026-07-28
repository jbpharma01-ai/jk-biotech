import React from 'react';

const Card = ({
  children,
  className = '',
  hoverable = true,
  padding = 'md',
  onClick,
}) => {
  const paddings = {
    none: 'p-0',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-2xl border border-slate-200/80 shadow-soft transition-all duration-300 ${
        hoverable ? 'hover:shadow-card hover:-translate-y-1 hover:border-primary-200' : ''
      } ${paddings[padding] || paddings.md} ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
