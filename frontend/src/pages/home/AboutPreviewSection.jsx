import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Award, FlaskConical, Users } from 'lucide-react';
import Container from '../../components/common/Container';
import Button from '../../components/common/Button';
import SectionHeading from '../../components/common/SectionHeading';
import { slideInLeft, slideInRight, staggerContainer, fadeUp } from '../../animations/variants';

const HIGHLIGHTS = [
  { icon: CheckCircle2, text: 'Over 200+ pharmaceutical products across 11 dosage forms' },
  { icon: Award, text: 'WHO-GMP and ISO 9001:2015 certified manufacturing facilities' },
  { icon: FlaskConical, text: 'Dedicated R&D department for formulation innovation' },
  { icon: Users, text: 'Serving healthcare professionals across India and beyond' },
];

// Inline SVG: Company Laboratory Scene
const AboutIllustration = () => (
  <svg
    viewBox="0 0 520 480"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full h-full"
    aria-hidden="true"
  >
    {/* Background panel */}
    <rect x="20" y="20" width="480" height="440" rx="28" fill="url(#abg)" />

    {/* Table surface */}
    <rect x="40" y="330" width="440" height="18" rx="6" fill="#0a3f68" opacity="0.5" />

    {/* Large flask */}
    <path d="M195 120 L195 240 L130 340 Q120 358 138 366 L382 366 Q400 358 390 340 L325 240 L325 120 Z" fill="url(#af1)" opacity="0.92" />
    <path d="M195 120 L195 240 L130 340 Q120 358 138 366 L258 366 L258 120 Z" fill="url(#af2)" opacity="0.4" />
    {/* Liquid in flask */}
    <ellipse cx="258" cy="330" rx="105" ry="24" fill="#34d399" opacity="0.35" />
    <ellipse cx="258" cy="318" rx="85" ry="16" fill="#6ee7b7" opacity="0.25" />
    {/* Flask neck */}
    <rect x="193" y="100" width="133" height="28" rx="10" fill="#054b7e" opacity="0.7" />
    {/* Bubbles */}
    <circle cx="218" cy="295" r="7" fill="#a7f3d0" opacity="0.55" />
    <circle cx="255" cy="270" r="5" fill="#6ee7b7" opacity="0.5" />
    <circle cx="286" cy="290" r="6" fill="#34d399" opacity="0.5" />

    {/* Small pill bottle - right */}
    <rect x="370" y="220" width="60" height="110" rx="14" fill="#0369a1" opacity="0.85" />
    <rect x="370" y="220" width="30" height="110" rx="14" fill="#0c4a6e" opacity="0.6" />
    <rect x="363" y="205" width="74" height="24" rx="8" fill="#0284c7" opacity="0.85" />
    {/* Label stripe */}
    <rect x="376" y="258" width="48" height="8" rx="4" fill="white" opacity="0.2" />
    <rect x="376" y="272" width="36" height="6" rx="3" fill="white" opacity="0.15" />

    {/* Small pill box - left */}
    <rect x="90" y="255" width="78" height="75" rx="10" fill="#047857" opacity="0.8" />
    <rect x="90" y="255" width="40" height="75" rx="10" fill="#065f46" opacity="0.6" />
    {/* Label */}
    <rect x="96" y="275" width="66" height="7" rx="3.5" fill="white" opacity="0.2" />
    <rect x="96" y="288" width="50" height="5" rx="2.5" fill="white" opacity="0.15" />

    {/* Capsules on table */}
    <rect x="440" y="316" width="52" height="22" rx="11" fill="#0ea5e9" opacity="0.85" />
    <rect x="440" y="316" width="26" height="22" rx="11" fill="#0369a1" opacity="0.85" />
    <rect x="78" y="316" width="52" height="22" rx="11" fill="#10b981" opacity="0.8" />
    <rect x="78" y="316" width="26" height="22" rx="11" fill="#047857" opacity="0.8" />

    {/* Top decorative elements */}
    <circle cx="440" cy="80" r="26" fill="#0ea5e9" opacity="0.15" />
    <circle cx="440" cy="80" r="16" fill="#38bdf8" opacity="0.2" />
    <circle cx="80" cy="80" r="20" fill="#10b981" opacity="0.15" />
    <circle cx="80" cy="80" r="12" fill="#34d399" opacity="0.2" />

    {/* Cross / medical symbol */}
    <rect x="426" y="40" width="12" height="44" rx="6" fill="white" opacity="0.1" />
    <rect x="412" y="54" width="40" height="12" rx="6" fill="white" opacity="0.1" />

    {/* Molecule lines */}
    <circle cx="390" cy="170" r="8" fill="#7dd3fc" opacity="0.5" />
    <circle cx="420" cy="148" r="5" fill="#38bdf8" opacity="0.6" />
    <circle cx="405" cy="192" r="6" fill="#0ea5e9" opacity="0.5" />
    <line x1="390" y1="170" x2="420" y2="148" stroke="#7dd3fc" strokeWidth="1.5" opacity="0.4" />
    <line x1="390" y1="170" x2="405" y2="192" stroke="#7dd3fc" strokeWidth="1.5" opacity="0.4" />

    <defs>
      <linearGradient id="abg" x1="20" y1="20" x2="500" y2="460" gradientUnits="userSpaceOnUse">
        <stop stopColor="#0f172a" />
        <stop offset="0.6" stopColor="#082040" />
        <stop offset="1" stopColor="#071e3d" />
      </linearGradient>
      <linearGradient id="af1" x1="195" y1="240" x2="325" y2="366" gradientUnits="userSpaceOnUse">
        <stop stopColor="#054b7e" />
        <stop offset="1" stopColor="#0ea5e9" />
      </linearGradient>
      <linearGradient id="af2" x1="195" y1="240" x2="258" y2="366" gradientUnits="userSpaceOnUse">
        <stop stopColor="#0369a1" />
        <stop offset="1" stopColor="#0284c7" />
      </linearGradient>
    </defs>
  </svg>
);

const AboutPreviewSection = () => {
  return (
    <section
      className="py-16 sm:py-20 lg:py-24 bg-white overflow-hidden"
      aria-label="About J K Biotech preview"
    >
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* LEFT: Illustration */}
          <motion.div
            variants={slideInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            className="relative group"
          >
            {/* Decorative background blob */}
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-primary-50 via-slate-100 to-secondary-50 -z-10 blur-sm" />

            {/* Main image container */}
            <div className="relative rounded-3xl overflow-hidden shadow-card border border-slate-200/60 aspect-[4/3] w-full bg-slate-900 transition-transform duration-500 group-hover:scale-[1.01]">
              <AboutIllustration />

              {/* Floating badge */}
              <div className="absolute bottom-5 left-5 bg-white/95 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-glass flex items-center gap-3 border border-slate-200/80">
                <div className="w-9 h-9 rounded-xl bg-primary-600 flex items-center justify-center flex-shrink-0">
                  <Award className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900 leading-tight">WHO-GMP Certified</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">Pharmaceutical Manufacturer</div>
                </div>
              </div>

              {/* Corner accent tag */}
              <div className="absolute top-5 right-5 bg-secondary-500/90 backdrop-blur-sm text-white text-[11px] font-bold px-3 py-1.5 rounded-full">
                Est. Ahmedabad, Gujarat
              </div>
            </div>
          </motion.div>

          {/* RIGHT: Content */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            className="flex flex-col gap-6"
          >
            {/* Section heading */}
            <SectionHeading
              subtitle="About J K Biotech"
              title="Your Trusted Pharmaceutical Manufacturing Partner"
              description="J K BIOTECH is a premier corporate pharmaceutical manufacturing enterprise, committed to delivering safe, effective, and innovative healthcare solutions to medical professionals and patients across India."
              align="left"
              noMargin
            />

            {/* Highlight list */}
            <motion.ul
              variants={staggerContainer}
              className="flex flex-col gap-3 mt-2"
            >
              {HIGHLIGHTS.map(({ icon: Icon, text }) => (
                <motion.li
                  key={text}
                  variants={fadeUp}
                  className="flex items-start gap-3 text-sm text-slate-700 leading-relaxed"
                >
                  <div className="w-6 h-6 rounded-lg bg-primary-50 border border-primary-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon className="w-3.5 h-3.5 text-primary-600" />
                  </div>
                  <span>{text}</span>
                </motion.li>
              ))}
            </motion.ul>

            {/* Stats chips */}
            <motion.div
              variants={fadeUp}
              className="flex flex-wrap gap-3 pt-2"
            >
              {[
                { label: 'Products', value: '200+' },
                { label: 'Dosage Forms', value: '11' },
                { label: 'Experience', value: '10+ Yrs' },
                { label: 'Certifications', value: '3' },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  className="flex flex-col items-center justify-center bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3 min-w-[80px] hover:border-primary-200 hover:bg-primary-50 transition-colors"
                >
                  <span className="text-xl font-extrabold text-primary-700 font-heading leading-none">{value}</span>
                  <span className="text-[11px] text-slate-500 mt-1 text-center">{label}</span>
                </div>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.div variants={fadeUp} className="pt-2">
              <Link to="/about">
                <Button
                  variant="primary"
                  size="lg"
                  icon={ArrowRight}
                  iconPosition="right"
                >
                  Discover Our Story
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default AboutPreviewSection;
