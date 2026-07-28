import React from 'react';
import Card from './Card';
import Button from './Button';
import { Pill, ChevronRight, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const ProductCard = ({
  title,
  category = 'Capsule',
  composition = 'Active Pharmaceutical Ingredient Formulation',
  dosageForm = 'Oral Dosage',
  className = '',
}) => {
  return (
    <Card className={`group flex flex-col h-full overflow-hidden ${className}`} padding="none">
      {/* Product Image / Placeholder Banner */}
      <div className="relative w-full h-48 bg-gradient-to-br from-slate-100 via-primary-50/40 to-slate-100 flex items-center justify-center p-6 border-b border-slate-100">
        <div className="w-20 h-20 rounded-2xl bg-white/80 shadow-md backdrop-blur-sm flex items-center justify-center text-primary-600 group-hover:scale-110 transition-transform duration-300">
          <Pill className="w-10 h-10" />
        </div>
        
        {/* Category Badge */}
        <span className="absolute top-3 left-3 bg-primary-600 text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-sm uppercase tracking-wider">
          {category}
        </span>

        {/* Quality Tag */}
        <span className="absolute top-3 right-3 bg-secondary-50 text-secondary-700 border border-secondary-200/80 text-[10px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
          <ShieldCheck className="w-3 h-3 text-secondary-600" />
          GMP Standard
        </span>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <span className="text-xs font-semibold text-primary-700 mb-1">
          {dosageForm}
        </span>
        
        <h3 className="text-lg font-bold text-slate-900 group-hover:text-primary-600 transition-colors mb-2 line-clamp-1">
          {title}
        </h3>
        
        <p className="text-xs text-slate-500 leading-relaxed mb-4 line-clamp-2">
          {composition}
        </p>

        <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
          <Link to={`/products`} className="w-full">
            <Button variant="outline" size="sm" className="w-full justify-between group-hover:bg-primary-600 group-hover:text-white group-hover:border-primary-600">
              <span>View Product Details</span>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
};

export default ProductCard;
