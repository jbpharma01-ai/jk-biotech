import React from 'react';

const SectionHeading = ({
  subtitle,
  title,
  description,
  align = 'center',
  className = '',
  light = false,
  noMargin = false,
}) => {
  const alignmentClasses = {
    left: 'text-left items-start',
    center: 'text-center items-center mx-auto',
    right: 'text-right items-end ml-auto',
  };

  const marginClass = noMargin ? '' : 'mb-12 sm:mb-16';

  return (
    <div className={`flex flex-col max-w-3xl ${marginClass} ${alignmentClasses[align]} ${className}`}>
      {subtitle && (
        <span className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-3 ${
          light
            ? 'bg-white/10 text-secondary-300 border border-white/20'
            : 'bg-primary-50 text-primary-700 border border-primary-100'
        }`}>
          {subtitle}
        </span>
      )}

      {title && (
        <h2 className={`text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight ${
          light ? 'text-white' : 'text-slate-900'
        }`}>
          {title}
        </h2>
      )}

      {description && (
        <p className={`mt-4 text-base sm:text-lg leading-relaxed ${
          light ? 'text-slate-300' : 'text-slate-600'
        }`}>
          {description}
        </p>
      )}
    </div>
  );
};

export default SectionHeading;
