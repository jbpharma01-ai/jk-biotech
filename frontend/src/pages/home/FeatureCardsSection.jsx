import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, FlaskConical, Handshake, Factory } from 'lucide-react';
import Container from '../../components/common/Container';
import { staggerContainer, fadeUp } from '../../animations/variants';

const FEATURES = [
  {
    icon: ShieldCheck,
    title: 'Quality Products',
    description:
      'All formulations manufactured under stringent WHO-GMP guidelines, ensuring safety, efficacy, and consistent quality in every batch.',
    color: 'primary',
  },
  {
    icon: FlaskConical,
    title: 'Research & Innovation',
    description:
      'Continuous R&D investment drives cutting-edge pharmaceutical development across 11 diverse dosage forms for evolving healthcare needs.',
    color: 'secondary',
  },
  {
    icon: Handshake,
    title: 'Trusted Healthcare Partner',
    description:
      'Thousands of doctors, hospitals, and pharmacies rely on J K BIOTECH for dependable pharmaceutical products and unwavering support.',
    color: 'primary',
  },
  {
    icon: Factory,
    title: 'Advanced Manufacturing',
    description:
      'State-of-the-art ISO-certified manufacturing facilities deliver pharmaceutical-grade products with precision, hygiene, and compliance.',
    color: 'secondary',
  },
];

const COLOR_MAP = {
  primary: {
    iconWrap: 'bg-primary-50 text-primary-700 border border-primary-100 group-hover:bg-primary-600 group-hover:text-white group-hover:border-primary-600',
    accent: 'group-hover:border-primary-200',
    dot: 'bg-primary-400',
  },
  secondary: {
    iconWrap: 'bg-secondary-50 text-secondary-700 border border-secondary-100 group-hover:bg-secondary-600 group-hover:text-white group-hover:border-secondary-600',
    accent: 'group-hover:border-secondary-200',
    dot: 'bg-secondary-400',
  },
};

const FeatureCard = ({ icon: Icon, title, description, color, index }) => {
  const c = COLOR_MAP[color];
  return (
    <motion.div
      variants={fadeUp}
      custom={index * 0.1}
      className={`group relative bg-white rounded-2xl border border-slate-200/80 shadow-soft p-6 sm:p-7 flex flex-col gap-4 transition-all duration-300 hover:shadow-card hover:-translate-y-1.5 ${c.accent}`}
    >
      {/* Top accent line */}
      <div className={`absolute top-0 left-6 right-6 h-0.5 rounded-full ${c.dot} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

      {/* Icon */}
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all duration-300 ${c.iconWrap}`}>
        <Icon className="w-7 h-7 transition-transform duration-300 group-hover:scale-110" />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-bold text-slate-900 font-heading group-hover:text-primary-700 transition-colors">
          {title}
        </h3>
        <p className="text-slate-600 text-sm leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

const FeatureCardsSection = () => {
  return (
    <section className="py-16 sm:py-20 bg-slate-50" aria-label="Our key features">
      <Container>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6"
        >
          {FEATURES.map((feature, index) => (
            <FeatureCard key={feature.title} {...feature} index={index} />
          ))}
        </motion.div>
      </Container>
    </section>
  );
};

export default FeatureCardsSection;
