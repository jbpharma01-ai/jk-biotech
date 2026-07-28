import React from 'react';
import { motion } from 'framer-motion';
import Container from '../../components/common/Container';
import SectionHeading from '../../components/common/SectionHeading';
import { VME_CARDS } from '../../constants/homeData';
import { staggerContainer, fadeUp } from '../../animations/variants';

// Per-card colour theming
const COLOR_CONFIG = {
  blue: {
    iconBg: 'bg-primary-50 text-primary-700 border border-primary-100',
    iconHover: 'group-hover:bg-primary-600 group-hover:text-white group-hover:border-primary-600',
    topBar: 'bg-primary-500',
    tag: 'bg-primary-50 text-primary-700 border-primary-100',
    hover: 'hover:border-primary-200 hover:shadow-card',
  },
  teal: {
    iconBg: 'bg-secondary-50 text-secondary-700 border border-secondary-100',
    iconHover: 'group-hover:bg-secondary-600 group-hover:text-white group-hover:border-secondary-600',
    topBar: 'bg-secondary-500',
    tag: 'bg-secondary-50 text-secondary-700 border-secondary-100',
    hover: 'hover:border-secondary-200 hover:shadow-card',
  },
  navy: {
    iconBg: 'bg-slate-100 text-slate-700 border border-slate-200',
    iconHover: 'group-hover:bg-slate-800 group-hover:text-white group-hover:border-slate-800',
    topBar: 'bg-slate-700',
    tag: 'bg-slate-100 text-slate-600 border-slate-200',
    hover: 'hover:border-slate-300 hover:shadow-card',
  },
};

const VMECard = ({ icon: Icon, title, tagline, description, color, index }) => {
  const c = COLOR_CONFIG[color];

  return (
    <motion.div
      variants={fadeUp}
      custom={index * 0.12}
      className={`group relative bg-white rounded-2xl border border-slate-200/80 shadow-soft p-7 flex flex-col gap-5 transition-all duration-300 hover:-translate-y-2 ${c.hover}`}
    >
      {/* Top accent bar */}
      <div className={`absolute top-0 left-8 right-8 h-[3px] rounded-b-full ${c.topBar} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

      {/* Icon box */}
      <div
        className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 border transition-all duration-300 ${c.iconBg} ${c.iconHover}`}
      >
        <Icon className="w-7 h-7 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3" />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2">
        <span className={`self-start px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider rounded-full border ${c.tag}`}>
          {tagline}
        </span>
        <h3 className="text-xl font-bold text-slate-900 font-heading group-hover:text-primary-700 transition-colors">
          {title}
        </h3>
        <p className="text-slate-600 text-sm leading-relaxed">
          {description}
        </p>
      </div>

      {/* Bottom read-more hint */}
      <div className="mt-auto pt-4 border-t border-slate-100">
        <span className="text-xs font-semibold text-slate-400 group-hover:text-primary-600 transition-colors flex items-center gap-1">
          Learn about our values
          <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 16 16" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 8h10M9 4l4 4-4 4" />
          </svg>
        </span>
      </div>
    </motion.div>
  );
};

const VisionMissionSection = () => {
  return (
    <section
      className="py-16 sm:py-20 lg:py-24 bg-white"
      aria-label="Vision, Mission and Ethics"
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
            subtitle="Our Foundation"
            title="Vision, Mission & Ethics"
            description="The principles that guide every formula we develop, every batch we manufacture, and every partnership we build."
            align="center"
          />
        </motion.div>

        {/* Cards grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {VME_CARDS.map((card, index) => (
            <VMECard key={card.id} {...card} index={index} />
          ))}
        </motion.div>
      </Container>
    </section>
  );
};

export default VisionMissionSection;
