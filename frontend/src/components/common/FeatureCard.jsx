import React from 'react';
import Card from './Card';
import IconBox from './IconBox';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const FeatureCard = ({
  icon,
  title,
  description,
  linkText = 'Learn More',
  linkTo = '#',
  variant = 'primary',
  className = '',
}) => {
  return (
    <Card className={`group flex flex-col h-full ${className}`}>
      <IconBox icon={icon} variant={variant} size="lg" className="mb-6 group-hover:scale-110" />
      <h3 className="text-xl font-bold text-slate-900 group-hover:text-primary-600 transition-colors mb-3">
        {title}
      </h3>
      <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-grow">
        {description}
      </p>
      {linkTo && (
        <Link
          to={linkTo}
          className="inline-flex items-center gap-2 text-sm font-semibold text-primary-600 group-hover:text-primary-700 transition-colors"
        >
          <span>{linkText}</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      )}
    </Card>
  );
};

export default FeatureCard;
