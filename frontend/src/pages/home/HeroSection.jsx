import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowRight, ChevronDown, ShieldCheck, Award, Microscope } from 'lucide-react';
import Container from '../../components/common/Container';
import Button from '../../components/common/Button';
import { fadeUp, staggerContainer } from '../../animations/variants';

// Slide data – each slide has its own headline, description and gradient theme
const HERO_SLIDES = [
  {
    id: 1,
    badge: 'WHO & GMP Certified Manufacturer',
    heading: 'Advancing Healthcare Through Quality Pharmaceutical Solutions',
    subheading:
      'J K BIOTECH delivers precisely engineered, safe, and effective pharmaceutical formulations to healthcare professionals and patients across India and beyond.',
    theme: 'blue',
    // Illustrated SVG pharmacy scene
    IllustrationComponent: 'slide1',
  },
  {
    id: 2,
    badge: 'Research & Innovation Driven',
    heading: 'Pioneering Science That Transforms Patient Lives',
    subheading:
      'Our state-of-the-art R&D facilities and rigorous quality standards ensure every product meets the highest therapeutic and safety benchmarks.',
    theme: 'teal',
    IllustrationComponent: 'slide2',
  },
  {
    id: 3,
    badge: 'Trusted by Healthcare Professionals',
    heading: 'Your Reliable Partner in Corporate Healthcare Excellence',
    subheading:
      'From capsules to injections, syrups to soft-gel capsules — J K BIOTECH offers a comprehensive range of 11 dosage form formulations trusted by doctors nationwide.',
    theme: 'navy',
    IllustrationComponent: 'slide3',
  },
];

// Theme gradients per slide
const THEME_MAP = {
  blue: {
    bg: 'from-slate-950 via-primary-950 to-slate-900',
    accent: 'from-primary-500/20 to-secondary-500/10',
    badge: 'bg-primary-500/15 border-primary-400/30 text-primary-300',
    dot: 'bg-primary-400',
    circle1: 'bg-primary-600/20',
    circle2: 'bg-secondary-600/10',
  },
  teal: {
    bg: 'from-slate-950 via-secondary-950 to-slate-900',
    accent: 'from-secondary-500/20 to-primary-500/10',
    badge: 'bg-secondary-500/15 border-secondary-400/30 text-secondary-300',
    dot: 'bg-secondary-400',
    circle1: 'bg-secondary-600/20',
    circle2: 'bg-primary-600/10',
  },
  navy: {
    bg: 'from-slate-950 via-slate-900 to-primary-950',
    accent: 'from-primary-800/30 to-secondary-600/10',
    badge: 'bg-white/10 border-white/20 text-slate-200',
    dot: 'bg-white/60',
    circle1: 'bg-primary-500/15',
    circle2: 'bg-secondary-500/15',
  },
};

// Inline SVG pharmaceutical illustrations for each slide
const Slide1Illustration = () => (
  <svg viewBox="0 0 480 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-2xl">
    <ellipse cx="240" cy="370" rx="160" ry="16" fill="#0c4a6e" opacity="0.4" />
    {/* Large pill */}
    <rect x="90" y="130" width="300" height="130" rx="65" fill="url(#pg1)" />
    <rect x="90" y="130" width="155" height="130" rx="65" fill="url(#pg2)" />
    <ellipse cx="246" cy="195" rx="2" ry="62" fill="white" opacity="0.15" />
    {/* Small pills floating */}
    <rect x="60" y="290" width="90" height="40" rx="20" fill="#0ea5e9" opacity="0.7" />
    <rect x="60" y="290" width="46" height="40" rx="20" fill="#0369a1" opacity="0.7" />
    <rect x="330" y="60" width="80" height="36" rx="18" fill="#10b981" opacity="0.7" />
    <rect x="330" y="60" width="41" height="36" rx="18" fill="#047857" opacity="0.7" />
    {/* Molecule dots */}
    <circle cx="60" cy="80" r="12" fill="#38bdf8" opacity="0.5" />
    <circle cx="400" cy="300" r="18" fill="#34d399" opacity="0.4" />
    <circle cx="420" cy="90" r="8" fill="#7dd3fc" opacity="0.6" />
    <circle cx="50" cy="220" r="7" fill="#6ee7b7" opacity="0.5" />
    {/* Cross symbol */}
    <rect x="215" y="30" width="16" height="56" rx="8" fill="white" opacity="0.15" />
    <rect x="200" y="45" width="46" height="16" rx="8" fill="white" opacity="0.15" />
    <defs>
      <linearGradient id="pg1" x1="90" y1="195" x2="390" y2="195" gradientUnits="userSpaceOnUse">
        <stop stopColor="#1e40af" />
        <stop offset="1" stopColor="#0ea5e9" />
      </linearGradient>
      <linearGradient id="pg2" x1="90" y1="195" x2="245" y2="195" gradientUnits="userSpaceOnUse">
        <stop stopColor="#1e3a8a" />
        <stop offset="1" stopColor="#1d4ed8" />
      </linearGradient>
    </defs>
  </svg>
);

const Slide2Illustration = () => (
  <svg viewBox="0 0 480 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-2xl">
    <ellipse cx="240" cy="370" rx="160" ry="16" fill="#064e3b" opacity="0.4" />
    {/* Flask */}
    <path d="M170 80 L170 210 L100 330 Q90 350 110 360 L370 360 Q390 350 380 330 L310 210 L310 80 Z" fill="url(#fg1)" opacity="0.9" />
    <path d="M170 80 L170 210 L100 330 Q90 350 110 360 L240 360 L240 80 Z" fill="url(#fg2)" opacity="0.5" />
    {/* Liquid */}
    <ellipse cx="240" cy="320" rx="100" ry="28" fill="#34d399" opacity="0.4" />
    <ellipse cx="240" cy="310" rx="80" ry="20" fill="#6ee7b7" opacity="0.3" />
    {/* Bubbles */}
    <circle cx="200" cy="290" r="8" fill="#a7f3d0" opacity="0.6" />
    <circle cx="240" cy="260" r="5" fill="#6ee7b7" opacity="0.5" />
    <circle cx="270" cy="285" r="6" fill="#34d399" opacity="0.5" />
    {/* Flask neck rect */}
    <rect x="168" y="70" width="144" height="20" rx="8" fill="#059669" opacity="0.6" />
    {/* Stars / sparkles */}
    <circle cx="80" cy="100" r="8" fill="#10b981" opacity="0.5" />
    <circle cx="400" cy="150" r="12" fill="#0ea5e9" opacity="0.4" />
    <circle cx="420" cy="300" r="7" fill="#34d399" opacity="0.6" />
    <defs>
      <linearGradient id="fg1" x1="170" y1="220" x2="310" y2="360" gradientUnits="userSpaceOnUse">
        <stop stopColor="#065f46" />
        <stop offset="1" stopColor="#10b981" />
      </linearGradient>
      <linearGradient id="fg2" x1="170" y1="220" x2="240" y2="360" gradientUnits="userSpaceOnUse">
        <stop stopColor="#047857" />
        <stop offset="1" stopColor="#059669" />
      </linearGradient>
    </defs>
  </svg>
);

const Slide3Illustration = () => (
  <svg viewBox="0 0 480 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-2xl">
    <ellipse cx="240" cy="370" rx="160" ry="16" fill="#0a3f68" opacity="0.3" />
    {/* Shield */}
    <path d="M240 40 L380 100 L380 220 Q380 320 240 370 Q100 320 100 220 L100 100 Z" fill="url(#sg1)" />
    <path d="M240 40 L380 100 L380 220 Q380 320 240 370 L240 40 Z" fill="url(#sg2)" opacity="0.5" />
    {/* Check mark */}
    <path d="M175 215 L220 260 L305 175" stroke="white" strokeWidth="18" strokeLinecap="round" strokeLinejoin="round" opacity="0.9" />
    {/* Stars */}
    <circle cx="80" cy="150" r="10" fill="#38bdf8" opacity="0.5" />
    <circle cx="400" cy="250" r="14" fill="#34d399" opacity="0.4" />
    <circle cx="420" cy="80" r="7" fill="#7dd3fc" opacity="0.6" />
    <circle cx="60" cy="300" r="8" fill="#6ee7b7" opacity="0.5" />
    <defs>
      <linearGradient id="sg1" x1="100" y1="200" x2="380" y2="200" gradientUnits="userSpaceOnUse">
        <stop stopColor="#1e3a8a" />
        <stop offset="1" stopColor="#006fb8" />
      </linearGradient>
      <linearGradient id="sg2" x1="240" y1="40" x2="380" y2="370" gradientUnits="userSpaceOnUse">
        <stop stopColor="#1d4ed8" opacity="0.8" />
        <stop offset="1" stopColor="#0ea5e9" opacity="0.3" />
      </linearGradient>
    </defs>
  </svg>
);

const ILLUSTRATIONS = {
  slide1: Slide1Illustration,
  slide2: Slide2Illustration,
  slide3: Slide3Illustration,
};

// Stat badges shown in hero
const HERO_STATS = [
  { icon: ShieldCheck, label: 'GMP Certified', value: 'ISO 9001' },
  { icon: Award, label: 'Products', value: '200+' },
  { icon: Microscope, label: 'Dosage Forms', value: '11 Types' },
];

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef(null);

  const totalSlides = HERO_SLIDES.length;

  const goToSlide = useCallback((index) => {
    setCurrentSlide((index + totalSlides) % totalSlides);
  }, [totalSlides]);

  const goNext = useCallback(() => goToSlide(currentSlide + 1), [currentSlide, goToSlide]);
  const goPrev = useCallback(() => goToSlide(currentSlide - 1), [currentSlide, goToSlide]);

  // Auto-slide every 5 seconds
  useEffect(() => {
    if (isPaused) return;
    intervalRef.current = setInterval(goNext, 5000);
    return () => clearInterval(intervalRef.current);
  }, [isPaused, goNext]);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [goNext, goPrev]);

  const slide = HERO_SLIDES[currentSlide];
  const theme = THEME_MAP[slide.theme];
  const Illustration = ILLUSTRATIONS[slide.IllustrationComponent];

  return (
    <section
      className={`relative min-h-screen flex items-center bg-gradient-to-br ${theme.bg} overflow-hidden`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="Hero section"
    >
      {/* Decorative background circles */}
      <div className={`absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full ${theme.circle1} blur-3xl pointer-events-none`} />
      <div className={`absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full ${theme.circle2} blur-3xl pointer-events-none`} />

      {/* Subtle dot grid pattern */}
      <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:28px_28px] pointer-events-none" />

      <Container className="relative z-10 py-20 sm:py-24 lg:py-0 lg:min-h-screen lg:flex lg:items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center w-full">

          {/* LEFT: Text Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`text-${currentSlide}`}
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: -20, transition: { duration: 0.3 } }}
              className="flex flex-col gap-6 max-w-xl"
            >
              {/* Badge */}
              <motion.span
                variants={fadeUp}
                custom={0}
                className={`inline-flex items-center gap-2 self-start px-4 py-2 rounded-full border text-xs font-bold uppercase tracking-wider backdrop-blur-sm ${theme.badge}`}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                {slide.badge}
              </motion.span>

              {/* Main Heading */}
              <motion.h1
                variants={fadeUp}
                custom={0.1}
                className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold leading-[1.15] tracking-tight text-white font-heading"
              >
                {slide.heading}
              </motion.h1>

              {/* Sub description */}
              <motion.p
                variants={fadeUp}
                custom={0.2}
                className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-lg"
              >
                {slide.subheading}
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                variants={fadeUp}
                custom={0.3}
                className="flex flex-wrap gap-4 pt-2"
              >
                <Link to="/products">
                  <Button
                    variant="primary"
                    size="lg"
                    icon={ArrowRight}
                    iconPosition="right"
                    className="shadow-xl shadow-primary-600/30 hover:scale-[1.03] active:scale-[0.98]"
                  >
                    Explore Products
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button
                    variant="white"
                    size="lg"
                    className="hover:scale-[1.03] active:scale-[0.98]"
                  >
                    Contact Us
                  </Button>
                </Link>
              </motion.div>

              {/* Stats Row */}
              <motion.div
                variants={fadeUp}
                custom={0.4}
                className="flex flex-wrap gap-5 pt-4 border-t border-white/10 mt-2"
              >
                {HERO_STATS.map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                      <Icon className="w-4 h-4 text-sky-300" />
                    </div>
                    <div>
                      <div className="text-white font-bold text-sm leading-none">{value}</div>
                      <div className="text-slate-400 text-[11px] mt-0.5">{label}</div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* RIGHT: SVG Illustration */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`art-${currentSlide}`}
              initial={{ opacity: 0, scale: 0.9, x: 40 }}
              animate={{ opacity: 1, scale: 1, x: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } }}
              exit={{ opacity: 0, scale: 0.95, x: 20, transition: { duration: 0.3 } }}
              className="hidden lg:flex items-center justify-center relative"
              aria-hidden="true"
            >
              {/* Glowing ring behind illustration */}
              <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${theme.accent} blur-2xl scale-90`} />
              <div className="relative w-full max-w-md xl:max-w-lg aspect-square">
                <Illustration />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </Container>

      {/* Slider Controls */}
      <div className="absolute bottom-8 left-0 right-0 z-20">
        <Container>
          <div className="flex items-center justify-between">

            {/* Dot Indicators */}
            <div className="flex items-center gap-2" role="tablist" aria-label="Slide indicators">
              {HERO_SLIDES.map((_, idx) => (
                <button
                  key={idx}
                  role="tab"
                  aria-selected={idx === currentSlide}
                  aria-label={`Go to slide ${idx + 1}`}
                  onClick={() => goToSlide(idx)}
                  className={`transition-all duration-300 rounded-full focus:outline-none focus:ring-2 focus:ring-white/50 ${
                    idx === currentSlide
                      ? `w-8 h-2.5 ${theme.dot}`
                      : 'w-2.5 h-2.5 bg-white/30 hover:bg-white/50'
                  }`}
                />
              ))}
            </div>

            {/* Prev / Next Arrows */}
            <div className="flex items-center gap-2">
              <button
                onClick={goPrev}
                aria-label="Previous slide"
                className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/15 hover:border-white/30 transition-all focus:outline-none focus:ring-2 focus:ring-white/50 backdrop-blur-sm"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={goNext}
                aria-label="Next slide"
                className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/15 hover:border-white/30 transition-all focus:outline-none focus:ring-2 focus:ring-white/50 backdrop-blur-sm"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </Container>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 hidden sm:flex flex-col items-center gap-1 text-white/40"
        aria-hidden="true"
      >
        <span className="text-[10px] font-semibold uppercase tracking-widest">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
