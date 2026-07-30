import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, FlaskConical, Handshake, Factory } from 'lucide-react';
import Container from '../../components/common/Container';
import { staggerContainer, fadeUp } from '../../animations/variants';

const FEATURES = [
  {
    icon: ShieldCheck,
    title: "WHO-GMP Certified",
    description:
      "Manufactured under stringent WHO-GMP quality standards ensuring safety, consistency and reliability.",
    color: "primary",
  },

  {
    icon: FlaskConical,
    title: "11 Dosage Forms",
    description:
      "Comprehensive formulations including tablets, capsules, syrups, injectables and specialty products.",
    color: "secondary",
  },

  {
    icon: Handshake,
    title: "Trusted Healthcare Partner",
    description:
      "Building long-term relationships with healthcare professionals through dependable pharmaceutical solutions.",
    color: "primary",
  },

  {
    icon: Factory,
    title: "Advanced Manufacturing",
    description:
      "Modern manufacturing infrastructure delivering precision, hygiene and pharmaceutical excellence.",
    color: "secondary",
  },
];

const COLOR_MAP = {
  primary: {
    iconWrap:
      "bg-orange-50 text-premium-orange border border-orange-100 group-hover:bg-premium-orange group-hover:text-white group-hover:border-premium-orange",

    accent:
      "group-hover:border-premium-orange/40",

    dot:
      "bg-premium-orange",
  },

  secondary: {
    iconWrap:
      "bg-orange-50 text-premium-orange border border-orange-100 group-hover:bg-premium-orange group-hover:text-white group-hover:border-premium-orange",

    accent:
      "group-hover:border-premium-orange/40",

    dot:
      "bg-premium-orange",
  },
};

const FeatureCard = ({ icon: Icon, title, description, color, index }) => {
  const c = COLOR_MAP[color];
  return (
    <motion.div
      variants={fadeUp}
      custom={index * 0.1}
      className={`group relative bg-white rounded-3xl border border-slate-100 shadow-lg hover:shadow-2xl hover:shadow-orange-100 p-6 sm:p-7 flex flex-col gap-5 transition-all duration-500 hover:-translate-y-3  hover:border-premium-orange/40 ${c.accent}`}
    >
      {/* Top accent line */}
      <div className={`absolute top-0 left-6 right-6 h-0.5 rounded-full ${c.dot} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-orange-50/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

      {/* Icon */}
      <div className={`relative w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all duration-300 ${c.iconWrap}`}>

        <div className="absolute inset-0 rounded-2xl bg-premium-orange/10 blur-xl opacity-0 group-hover:opacity-100 transition duration-300"></div>
        <Icon className="relative w-8 h-8 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6" />

      </div>

      {/* Content */}
      <div className="flex flex-col gap-2">
        <h3 className="text-xl font-extrabold leading-tight text-slate-900 font-heading group-hover:text-premium-orange transition-colors">
          {title}
        </h3>
        <p className="text-slate-600 text-[15px] leading-7">
          {description}
        </p>
      </div>

      <div className="absolute bottom-0 left-6 right-6 h-1 rounded-full bg-premium-orange scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100"></div>

    
    </motion.div>
  );
};

const FeatureCardsSection = () => {
  return (
    <section className="relative py-20 bg-white overflow-hidden" aria-label="Our key features">

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,123,0,0.05),transparent_40%)]" />

      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:34px_34px]" />

      <Container>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="inline-flex items-center px-5 py-2 rounded-full bg-orange-50 border border-premium-orange/20 text-premium-orange text-xs font-bold tracking-[0.28em] px-6 uppercase">
            Why Choose Us
          </span>

          <h2 className="mt-6 font-heading font-black leading-[0.95] tracking-tight">

            <span className="block text-slate-900 text-4xl md:text-5xl lg:text-6xl">
              Excellence That
            </span>

            <span className="block text-premium-orange text-4xl md:text-5xl lg:text-6xl mt-1">
              Defines JK Biotech
            </span>

          </h2>

          <div className="flex justify-center mt-7">
            <div className="w-28 h-1 rounded-full bg-gradient-to-r from-orange-500 via-orange-400 to-orange-300"></div>
          </div>
        </motion.div>

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
