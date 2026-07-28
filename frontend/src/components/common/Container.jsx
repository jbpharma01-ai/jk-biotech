import React from 'react';

const Container = ({ children, className = '', size = 'default' }) => {
  const sizes = {
    small: 'max-w-5xl',
    default: 'max-w-7xl',
    full: 'max-w-full',
  };

  return (
    <div className={`w-full mx-auto px-4 sm:px-6 lg:px-8 ${sizes[size] || sizes.default} ${className}`}>
      {children}
    </div>
  );
};

export default Container;
