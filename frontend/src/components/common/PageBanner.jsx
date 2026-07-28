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
    <div className={`relative bg-gradient-to-r from-slate-900 via-primary-950 to-slate-950 text-white py-14 sm:py-20 overflow-hidden border-b border-primary-900/50 ${className}`}>
      {/* Background Decorative Pattern */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px]"></div>
      <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-primary-600/20 blur-3xl pointer-events-none"></div>

      <Container className="relative z-10">
        <div className="max-w-3xl">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-300 mb-4 overflow-x-auto pb-1">
            <Link to="/" className="hover:text-sky-400 flex items-center gap-1.5 transition-colors">
              <Home className="w-4 h-4" />
              <span>Home</span>
            </Link>
            {breadcrumbs.map((crumb, idx) => (
              <React.Fragment key={idx}>
                <ChevronRight className="w-3.5 h-3.5 text-slate-500 flex-shrink-0" />
                {crumb.path ? (
                  <Link to={crumb.path} className="hover:text-sky-400 transition-colors whitespace-nowrap">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-sky-400 font-semibold whitespace-nowrap">{crumb.label}</span>
                )}
              </React.Fragment>
            ))}
          </nav>

          {/* Page Title & Subtitle */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-3">
            {title}
          </h1>

          {subtitle && (
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
              {subtitle}
            </p>
          )}
        </div>
      </Container>
    </div>
  );
};

export default PageBanner;
