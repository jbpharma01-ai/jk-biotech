import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Pill, ShieldCheck } from 'lucide-react';
import Button from './Button';

const ProductCard = ({
  product,
  title,
  name,
  category,
  composition,
  shortDescription,
  description,
  dosageForm,
  image,
  slug,
  className = '',
}) => {
  const [imageError, setImageError] = useState(false);

  // Normalize product data from either product object or direct props
  const item = product || {};
  const productName = item.name || name || title || 'JK Biotech Product';
  const productCategory = item.category || category || 'Capsule';
  const productShortDesc =
    item.shortDescription ||
    shortDescription ||
    item.description ||
    description ||
    composition ||
    'WHO-GMP certified pharmaceutical formulation engineered for patient health and compliance.';
  const productSlug =
    item.slug || slug || productName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const productImage = item.image || image;

  // Format category badge title
  const formattedCategory =
    typeof productCategory === 'string'
      ? productCategory.replace(/-/g, ' ').toUpperCase()
      : 'DOSAGE FORM';

  return (
    <div
      className={`group relative flex flex-col h-full bg-white rounded-3xl border border-orange-100 shadow-md overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:border-orange-200 hover:shadow-[0_18px_45px_rgba(249,115,22,0.12)] ${className}`}
    >
      {/* Product Image / Visual Showcase Container */}
      <div className="relative h-72 bg-gradient-to-b from-[#FFFDF9] via-[#FFF8F3] to-[#F8F8F8] flex items-center justify-center overflow-hidden border-b border-orange-100">
        {/* Subtle background glow */}
        <div className="absolute w-52 h-52 rounded-full bg-orange-100/50 blur-3xl"></div>

        {productImage && !imageError ? (
          <img
            src={productImage}
            alt={productName}
            onError={() => setImageError(true)}
            className="max-h-56 max-w-[90%] object-contain drop-shadow-xl transition-all duration-500 group-hover:scale-105"
          />
        ) : (
            <div className="relative z-10 flex flex-col items-center justify-center text-center px-6">
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-orange-200 bg-white shadow-sm text-premium-orange transition-transform duration-300 group-hover:scale-105">
                <Pill className="h-9 w-9" strokeWidth={1.7} />
              </div>

              <p className="mt-4 text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
                JK BIOTECH
              </p>

              <p className="mt-1 text-[11px] text-slate-400">
                Product Image
              </p>
            </div>
        )}

        {/* Category Badge */}
        <span className="absolute top-4 left-4 z-20 rounded-full border border-orange-200 bg-white/95 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-orange-600 shadow-sm backdrop-blur-sm">
          {formattedCategory}
        </span>

        {/* Quality Tag */}
        <span className="absolute top-4 right-4 z-20 inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white/95 px-3 py-1 text-[10px] font-semibold tracking-wide text-slate-600 shadow-sm backdrop-blur-sm">
          <ShieldCheck className="h-3.5 w-3.5 text-premium-orange" />
          WHO-GMP
        </span>
      </div>

      {/* Content Body */}
      <div className="p-6 sm:p-7 flex flex-col flex-grow">
        {/* Product Title */}
        <h3 className="font-heading text-xl sm:text-2xl font-extrabold text-slate-900 leading-tight tracking-tight group-hover:text-premium-orange transition-colors duration-300 mb-2">
          {productName}
        </h3>

        {item.composition && (
          <p className="mb-3 text-xs font-semibold leading-5 text-orange-700 line-clamp-2">
            {item.composition}
          </p>
        )}

        {/* Short Description */}
        <p className="text-sm text-slate-600 leading-6 line-clamp-3 mb-6 flex-grow">
          {productShortDesc}
        </p>

        {/* Action Bar / Read More Button */}
        <div className="mt-auto pt-5 border-t border-slate-100 flex items-center justify-between">
          <Link to={`/products/${productSlug}`} className="w-full">
            <Button
              variant="outline"
              size="sm"
              icon={ArrowRight}
              iconPosition="right"
              className="w-full justify-between rounded-xl border border-orange-200 bg-orange-50 text-premium-orange hover:bg-premium-orange hover:text-white hover:border-premium-orange shadow-sm hover:shadow-md transition-all duration-300 py-3"
            >
              View Details
            </Button>
          </Link>
        </div>
      </div>

    </div>
  );
};

export default ProductCard;
