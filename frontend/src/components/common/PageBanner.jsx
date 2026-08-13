import React from 'react';
import Container from './Container';
import { ChevronRight, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

const PageBanner = ({
  title,
  subtitle = 'J K BIOTECH Pharmaceutical Excellence',
  breadcrumbs = [],
  className = '',
}) => {
  return (
    <div className={`relative bg-[#0B0B0B] text-white py-16 sm:py-24 overflow-hidden border-b border-primary-900/50 ${className}`}>

      {/* Top Accent Line */}
      <div className="absolute top-0 left-0 h-[2px] w-full bg-gradient-to-r from-transparent via-orange-500 to-transparent" />

      {/* Background Decorative Pattern */}
      <div className="absolute -left-40 top-0 h-[350px] w-[350px] rounded-full bg-orange-500/10 blur-[120px]" />

      <div className="absolute right-0 bottom-0 h-[400px] w-[400px] rounded-full bg-amber-500/10 blur-[140px]" />

      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:60px_60px]" />

      <Container className="relative z-10">
        <div className="max-w-4xl">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-300 mb-4 overflow-x-auto pb-1">
            <Link
              to="/"
              className="flex items-center gap-1.5 text-zinc-400 hover:text-orange-400 transition-colors"
            >
              <Home className="w-4 h-4" />
              <span>Home</span>
            </Link>
            {breadcrumbs.map((crumb, idx) => (
              <React.Fragment key={idx}>
                <ChevronRight className="w-3.5 h-3.5 text-orange-500/50 flex-shrink-0" />
                {crumb.path ? (
                  <Link to={crumb.path} className="text-zinc-400 hover:text-orange-400 transition-colors whitespace-nowrap">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-orange-400 font-semibold whitespace-nowrap">{crumb.label}</span>
                )}
              </React.Fragment>
            ))}
          </nav>

          {/* Page Title & Subtitle */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-3">
            {title}
          </h1>

          <div className="mt-5 h-1 w-24 rounded-full bg-gradient-to-r from-orange-500 to-amber-400" />

          {subtitle && (
            <p className="text-zinc-400 text-base sm:text-lg leading-relaxed max-w-2xl">
              {subtitle}
            </p>
          )}
        </div>
      </Container>
    </div>
  );
};

export default PageBanner;
