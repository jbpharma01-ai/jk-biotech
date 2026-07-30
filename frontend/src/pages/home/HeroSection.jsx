import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowRight, ChevronDown, ShieldCheck, Award, Microscope } from 'lucide-react';
import Container from '../../components/common/Container';
import Button from '../../components/common/Button';
import { fadeUp, staggerContainer } from '../../animations/variants';
import heroCapsule from '../../assets/images/hero/hero-capsule.png';
import womenHealthcare  from '../../assets/images/hero/women-healthcare.png';
import heroPediatric  from '../../assets/images/hero/pediatric-care.png';

// Slide data – each slide has its own headline, description and gradient theme
const HERO_SLIDES = [
  {
    id: 1,
    badge: 'WHO & GMP Certified Manufacturer',
    titleLines: [
      "Advancing",
      "Healthcare",
      "Through",
      "Quality Solutions"
    ],
    subheading:
      'J K BIOTECH delivers precisely engineered, safe, and effective pharmaceutical formulations to healthcare professionals and patients across India and beyond.',
    theme: 'blue',
    // Illustrated SVG pharmacy scene
    IllustrationComponent: 'slide1',
  },
  {
     id: 2,
  badge: 'Women\'s Healthcare Solutions',

  titleLines: [
    "Empowering",
    "Women's",
    "Health",
    "Every Day"
  ],

  subheading:
    'Advanced formulations designed to support women\'s health with quality, safety, and innovation across every stage of life.',

  theme: 'orange',

  IllustrationComponent: 'womenHealthcare',
  },
  {
    id: 3,
    badge: "PEDIATRIC CARE SOLUTIONS",

    titleLines: [
    "Healthy",
    "Childhood",
    "Starts With",
    "Trusted Care"
  ],

    subheading:
      "Safe, effective and child-friendly formulations designed to support healthy growth, immunity and pediatric wellness with trusted pharmaceutical quality.",

    IllustrationComponent: 'heroPediatric',
  },
];

// Theme gradients per slide
const THEME_MAP = {
  premium: {
    bg: "from-[#09090B] via-[#111111] to-[#2A1E16]",

    accent: "from-[#FF7B00]/25 via-[#FF7B00]/10 to-transparent",

    badge:
      "bg-[#FF7B00]/10 border-[#FF7B00]/30 text-[#FFB15E]",

    dot: "bg-[#FF7B00]",

    circle1: "bg-[#FF7B00]/15",

    circle2: "bg-[#FF7B00]/8",
  },
};

// Inline SVG pharmaceutical illustrations for each slide
const Slide1Illustration = () => (
  <img
    src={heroCapsule}
    alt="Hero Capsule"
    className="w-full h-full object-contain animate-heroFloat"
    draggable={false}
  />
);

const WomenHealthcareIllustration = () => (
  <img
    src={womenHealthcare}
    alt="Women's Healthcare"
    className="w-full h-full object-contain animate-heroFloat"
    draggable={false}
  />
);

const PediatricCareIllustration = () => (
  <img
    src={heroPediatric}
    alt="Pediatric Care"
    className="w-full h-full object-contain animate-heroFloat"
    draggable={false}
  />
);


const ILLUSTRATIONS = {
  slide1: Slide1Illustration,
  womenHealthcare: WomenHealthcareIllustration,
  heroPediatric: PediatricCareIllustration,
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
      console.log("Auto Slider Running", isPaused);

    if (isPaused) return;
    
    intervalRef.current = setInterval(goNext, 5000);
        console.log("Next Slide");

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
  const theme = THEME_MAP.premium;
  const Illustration = ILLUSTRATIONS[slide.IllustrationComponent];
// const handleMouseEnter = () => {
//   if (window.innerWidth >= 1024) {
//     setIsPaused(true);
//   }
// };

// const handleMouseLeave = () => {
//   if (window.innerWidth >= 1024) {
//     setIsPaused(false);
//   }
// };
  return (
    <section
      className={`relative min-h-screen flex items-center overflow-hidden bg-[#09090B]`}
      // onMouseEnter={() => setIsPaused(true)}
      // onMouseLeave={() => setIsPaused(false)}
      aria-label="Hero section"
    >
      {/* Decorative background circles */}
      {/* Main Orange Glow */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[650px] h-[650px] rounded-full bg-[#FF7B00]/20 blur-[170px]" />

      {/* Small Glow Top */}
      <div className="absolute top-20 right-40 w-72 h-72 rounded-full bg-[#FFB15E]/10 blur-[120px]" />

      {/* Bottom Glow */}
      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-[#FF7B00]/10 blur-[150px]" />

      {/* Subtle dot grid pattern */}
      <div className="absolute inset-0 opacity-[0.025] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:34px_34px]" />

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
              className="flex flex-col gap-8 max-w-2xl"
            >
              {/* Badge */}
              <motion.span
                variants={fadeUp}
                custom={0}
                className={`inline-flex items-center gap-2 self-start px-5 py-2.5 rounded-full border text-sm font-bold uppercase tracking-wider backdrop-blur-sm ${theme.badge}`}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                {slide.badge}
              </motion.span>

              {/* Main Heading */}
              <motion.h1
                variants={fadeUp}
                custom={0.1}
                className="font-heading text-white font-extrabold leading-[1.05] tracking-tight"
              >
                {slide.titleLines.map((line, index) => (
                  <span
                    key={index}
                    className={`block text-4xl sm:text-5xl lg:text-6xl xl:text-7xl ${index === slide.titleLines.length - 1
                        ? "text-premium-orange"
                        : "text-white"
                      }`}
                  >
                    {line}
                  </span>
                ))}
              </motion.h1>

              {/* Sub description */}
              <motion.p
                variants={fadeUp}
                custom={0.2}
                className="text-gray-300 text-lg lg:text-xl leading-8 leading-relaxed max-w-lg"
              >
                {slide.subheading}
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                variants={fadeUp}
                custom={0.3}
                className="flex flex-wrap gap-4 pt-4"
              >
                <Link to="/products">
                  <Button
                    variant="primary"
                    size="lg"
                    icon={ArrowRight}
                    iconPosition="right"
                    className="shadow-orange hover:shadow-orangeLg hover:scale-[1.03] active:scale-[0.98]"
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
                      <Icon className="w-4 h-4 text-premium-orange" />
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
              {/* Main Orange Glow */}
              <div className="absolute w-[520px] h-[520px] rounded-full bg-[#FF7B00]/20 blur-[140px]" />

              {/* Green Medical Glow */}
              <div className="absolute top-16 right-10 w-44 h-44 rounded-full bg-[#22C55E]/10 blur-[90px]" />

              {/* Soft White Glow */}
              <div className="absolute bottom-10 left-10 w-32 h-32 rounded-full bg-white/5 blur-[70px]" />
              <div className="relative w-full max-w-[620px] aspect-square animate-heroFloat drop-shadow-[0_35px_80px_rgba(255,123,0,.35)]">
                {/* <img
                  src={Illustration}
                  alt={slide.heading}
                  className="w-full h-full object-contain select-none"
                  draggable={false}
                /> */}
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
