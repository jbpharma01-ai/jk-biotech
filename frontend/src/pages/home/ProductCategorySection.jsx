import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Container from '../../components/common/Container';
import SectionHeading from '../../components/common/SectionHeading';
import Button from '../../components/common/Button';
import { PRODUCT_CATEGORIES } from '../../constants/navigation';
import { staggerContainer, fadeUp } from '../../animations/variants';

// Colour cycling for cards – gives each category a distinct accent without manual mapping
const ACCENT_PALETTE = [
  { bg: 'from-primary-600/90 to-primary-800', light: 'bg-primary-50', icon: 'text-primary-600', badge: 'bg-primary-100 text-primary-700' },
  { bg: 'from-secondary-600/90 to-secondary-800', light: 'bg-secondary-50', icon: 'text-secondary-600', badge: 'bg-secondary-100 text-secondary-700' },
  { bg: 'from-slate-700/90 to-slate-900', light: 'bg-slate-50', icon: 'text-slate-600', badge: 'bg-slate-100 text-slate-700' },
  { bg: 'from-sky-600/90 to-sky-800', light: 'bg-sky-50', icon: 'text-sky-600', badge: 'bg-sky-100 text-sky-700' },
];

const CategoryCard = ({ name, slug, path, icon: Icon, desc, index }) => {
  const accent = ACCENT_PALETTE[index % ACCENT_PALETTE.length];

  return (
    <motion.div variants={fadeUp} custom={index * 0.06}>
      <Link
        to={path}
        aria-label={`Browse ${name} products`}
        className="group relative flex flex-col bg-white rounded-2xl border border-slate-200/80 shadow-soft overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card hover:border-primary-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
      >
        {/* Gradient header strip */}
        <div className={`h-1.5 w-full bg-gradient-to-r ${accent.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

        <div className="p-5 sm:p-6 flex flex-col gap-3.5">
          {/* Icon */}
          <div className={`w-12 h-12 rounded-xl ${accent.light} flex items-center justify-center transition-all duration-300 group-hover:scale-110`}>
            <Icon className={`w-6 h-6 ${accent.icon} transition-transform duration-300 group-hover:rotate-6`} />
          </div>

          {/* Name */}
          <h3 className="text-base font-bold text-slate-900 font-heading group-hover:text-primary-700 transition-colors leading-snug">
            {name}
          </h3>

          {/* Description */}
          <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
            {desc}
          </p>

          {/* Arrow */}
          <div className="flex items-center gap-1 text-xs font-semibold text-slate-400 group-hover:text-primary-600 transition-colors mt-auto pt-1">
            <span>View products</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
          </div>
        </div>

        {/* Subtle bottom border-glow on hover */}
        <div className={`absolute bottom-0 left-4 right-4 h-[2px] bg-gradient-to-r ${accent.bg} opacity-0 group-hover:opacity-80 transition-opacity duration-300 rounded-t-full`} />
      </Link>
    </motion.div>
  );
};

const ProductCategorySection = () => {
  return (
    <section
      className="py-16 sm:py-20 lg:py-24 bg-brand-grayBg"
      aria-label="Product categories"
    >
      <Container>
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeading
            subtitle="Our Specialisations"
            title="Our Product Categories"
            description="Explore J K BIOTECH's comprehensive range of WHO-GMP certified pharmaceutical dosage forms — engineered for efficacy, safety, and patient compliance."
            align="center"
          />
        </motion.div>

        {/* Grid: 1 → 2 → 3 → 4 columns */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5"
        >
          {PRODUCT_CATEGORIES.map((cat, index) => (
            <CategoryCard key={cat.slug} {...cat} index={index} />
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex justify-center mt-12"
        >
          <Link to="/products">
            <Button variant="primary" size="lg" icon={ArrowRight} iconPosition="right">
              Browse All Products
            </Button>
          </Link>
        </motion.div>
      </Container>
    </section>
  );
};

export default ProductCategorySection;
