import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Container from '../common/Container';
import Button from '../common/Button';
import { PRODUCT_CATEGORIES, DOWNLOAD_CATEGORIES, COMPANY_INFO } from '../../constants/navigation';
import {
  Menu,
  X,
  ChevronDown,
  Phone,
  Mail,
  Award,
  Clock,
  ArrowRight,
  Sparkles,
  Pill
} from 'lucide-react';
import jkLogo from '../../assets/images/logo/jk-logo.png';


const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null); // 'products' | 'downloads' | null
  const [mobileAccordion, setMobileAccordion] = useState(null); // 'products' | 'downloads' | null
  
  const location = useLocation();

  // Scroll listener for sticky navbar shadow
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
    setMobileAccordion(null);
  }, [location.pathname]);

  // Active link helper
  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300 ease-out">
      {/* Top Corporate Information Bar */}
        <div className="hidden lg:block bg-premium-black text-gray-300 py-2 border-b border-premium-border text-xs font-medium">        <Container className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <a href={`tel:${COMPANY_INFO.phone}`} className="flex items-center gap-1.5 hover:text-premium-orange transition-colors">
              <Phone className="w-3.5 h-3.5 text-premium-orange" />
              <span>{COMPANY_INFO.phone}</span>
            </a>
            <a href={`mailto:${COMPANY_INFO.email}`} className="flex items-center gap-1.5 hover:text-premium-orange transition-colors">
              <Mail className="w-3.5 h-3.5 text-premium-orange" />
              <span>{COMPANY_INFO.email}</span>
            </a>
            {/* <div className="flex items-center gap-1.5 text-slate-400">
              <Clock className="w-3.5 h-3.5 text-emerald-400" />
              <span>{COMPANY_INFO.workingHours}</span>
            </div> */}
          </div>

          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1 bg-premium-orange/10 border border-premium-orange/30 text-premium-orange text-[11px] px-2.5 py-0.5 rounded-full">
              <Award className="w-3 h-3 text-premium-orange" />
              GMP & WHO Compliant Certified
            </span>
          </div>
        </Container>
      </div>

      {/* Main Navbar */}
      <nav className={`w-full transition-all duration-300 ease-out ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-md py-3 border-b border-slate-200/80'
          : 'bg-white py-4 border-b border-slate-100'
      }`}>
        <Container className="flex items-center justify-between">
          
          {/* Logo Section */}
          <Link
  to="/"
  className="group flex items-center focus:outline-none focus:ring-2 focus:ring-premium-orange rounded-lg"
>
  <img
    src={jkLogo}
    alt="J K Biotech"
    className="w-[50px] lg:w-[70px] h-auto object-contain transition-transform duration-300 group-hover:scale-105"
    draggable={false}
  />
</Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1">
            
            {/* HOME */}
            <Link
              to="/"
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ease-out ${
                isActive('/') && location.pathname === '/'
                  ? 'bg-orange-50 text-premium-orange font-bold'
                  : 'text-slate-700 hover:text-premium-orange hover:bg-orange-50 '
              }`}
            >
              HOME
            </Link>

            {/* ABOUT */}
            <Link
              to="/about"
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ease-out ${
                isActive('/about')
                  ? 'bg-orange-50 text-premium-orange font-bold'
                  : 'text-slate-700 hover:text-premium-orange hover:bg-orange-50'
              }`}
            >
              ABOUT
            </Link>

            {/* PRODUCTS Dropdown Trigger */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown('products')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                type="button"
                onClick={() => setActiveDropdown(activeDropdown === 'products' ? null : 'products')}
                className={`px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-1.5 transition-all duration-300 ease-out focus:outline-none ${
                  isActive('/products')
                    ? 'bg-orange-50 text-premium-orange font-bold'
                    : 'text-slate-700 hover:text-premium-orange hover:bg-orange-50'
                }`}
              >
                <span>PRODUCTS</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${
                  activeDropdown === 'products' ? 'rotate-180 text-premium-orange' : 'text-slate-400'
                }`} />
              </button>

              {/* PRODUCTS Animated Dropdown Menu */}
              <AnimatePresence>
                {activeDropdown === 'products' && (
                  <motion.div
                    initial={{ opacity: 0, y: 12, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                    transition={{ duration: 0.18, ease: 'easeOut' }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[680px] bg-white rounded-2xl shadow-black border border-orange-100 p-5 grid grid-cols-2 gap-2 z-50"
                  >
                    <div className="col-span-2 pb-2 mb-2 border-b border-slate-100 flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-premium-orange flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-premium-orange" />
                        Dosage Form Formulations (11 Categories)
                      </span>
                      <Link to="/products" className="text-xs font-semibold text-premium-orange hover:underline flex items-center gap-1">
                        View All Products <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>

                    {PRODUCT_CATEGORIES.map((cat) => {
                      const Icon = cat.icon;
                      return (
                        <Link
                          key={cat.slug}
                          to={cat.path}
                          className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-orange-50/70 transition-all duration-300 ease-out group/item"
                        >
                          <div className="w-9 h-9 rounded-lg bg-orange-100 group-hover/item:bg-premium-orange text-premium-orange group-hover/item:text-white flex items-center justify-center flex-shrink-0 transition-colors">
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-sm font-bold text-slate-800 group-hover/item:text-premium-orange transition-colors">
                              {cat.name}
                            </div>
                            <div className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                              {cat.desc}
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* DOWNLOADS Dropdown Trigger */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown('downloads')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                type="button"
                onClick={() => setActiveDropdown(activeDropdown === 'downloads' ? null : 'downloads')}
                className={`px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-1.5 transition-all duration-300 ease-out focus:outline-none ${
                  isActive('/downloads')
                    ? 'bg-orange-50 text-premium-orange font-bold'
                    : 'text-slate-700 hover:text-premium-orange hover:bg-orange-50'
                }`}
              >
                <span>DOWNLOADS</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${
                  activeDropdown === 'downloads' ? 'rotate-180 text-premium-orange' : 'text-slate-400'
                }`} />
              </button>

              {/* DOWNLOADS Animated Dropdown Menu */}
              <AnimatePresence>
                {activeDropdown === 'downloads' && (
                  <motion.div
                    initial={{ opacity: 0, y: 12, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                    transition={{ duration: 0.18, ease: 'easeOut' }}
                    className="absolute top-full left-0 mt-2 w-80 bg-white rounded-2xl shadow-dropdown border border-orange-100 p-4 space-y-1 z-50"
                  >
                    <div className="pb-2 mb-2 border-b border-slate-100 text-xs font-bold uppercase tracking-wider text-premium-orange">
                      Specialty Product Literature
                    </div>

                    {DOWNLOAD_CATEGORIES.map((item) => {
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.slug}
                          to={item.path}
                          className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#FFF7ED] transition-all duration-300 ease-out group/item"
                        >
                          <div className="w-8 h-8 rounded-lg bg-orange-100 text-premium-orange group-hover/item:bg-premium-orange group-hover/item:text-white flex items-center justify-center flex-shrink-0 transition-all duration-300">
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-sm font-bold text-slate-800 group-hover/item:text-premium-orange transition-colors">
                              {item.name}
                            </div>
                            <div className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                              {item.desc}
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* CONTACT */}
            <Link
              to="/contact"
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ease-out ${
                isActive('/contact')
                  ? 'bg-orange-50 text-premium-orange font-bold'
                  : 'text-slate-700 hover:text-premium-orange hover:bg-orange-50'
              }`}
            >
              CONTACT
            </Link>
          </div>

          {/* Desktop Right Action Button */}
          <div className="hidden lg:flex items-center gap-3">
            <Link to="/contact">
              <Button variant="primary" size="md" icon={ArrowRight} iconPosition="right">
                Get In Touch
              </Button>
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="lg:hidden p-2.5 rounded-xl text-slate-700 hover:text-premium-orange hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </Container>
      </nav>

      {/* Mobile Animated Drawer Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden bg-white border-b border-slate-200 overflow-hidden shadow-xl"
          >
            <Container className="py-5 space-y-3">
              <Link
                to="/"
                className="block px-4 py-2.5 rounded-xl text-base font-bold text-slate-800 hover:bg-orange-50 hover:text-premium-orange"
              >
                HOME
              </Link>

              <Link
                to="/about"
                className="block px-4 py-2.5 rounded-xl text-base font-bold text-slate-800 hover:bg-orange-50 hover:text-premium-orange"
              >
                ABOUT
              </Link>

              {/* PRODUCTS Mobile Accordion */}
              <div className="border border-slate-100 rounded-2xl overflow-hidden">
                <button
                  type="button"
                  onClick={() => setMobileAccordion(mobileAccordion === 'products' ? null : 'products')}
                  className="w-full px-4 py-3 bg-slate-50/80 flex items-center justify-between text-base font-bold text-slate-800"
                >
                  <span>PRODUCTS</span>
                  <ChevronDown className={`w-5 h-5 transition-transform ${
                    mobileAccordion === 'products' ? 'rotate-180 text-premium-orange' : 'text-slate-400'
                  }`} />
                </button>

                {mobileAccordion === 'products' && (
                  <div className="p-3 bg-white space-y-1 max-h-64 overflow-y-auto">
                    {PRODUCT_CATEGORIES.map((cat) => {
                      const Icon = cat.icon;
                      return (
                        <Link
                          key={cat.slug}
                          to={cat.path}
                          className="flex items-center gap-3 p-2 rounded-lg hover:bg-orange-50 text-sm font-medium text-slate-700"
                        >
                          <Icon className="w-4 h-4 text-premium-orange" />
                          <span>{cat.name}</span>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* DOWNLOADS Mobile Accordion */}
              {/* <div className="border border-slate-100 rounded-2xl overflow-hidden">
                <button
                  type="button"
                  onClick={() => setMobileAccordion(mobileAccordion === 'downloads' ? null : 'downloads')}
                  className="w-full px-4 py-3 bg-slate-50/80 flex items-center justify-between text-base font-bold text-slate-800"
                >
                  <span>DOWNLOADS</span>
                  <ChevronDown className={`w-5 h-5 transition-transform ${
                    mobileAccordion === 'downloads' ? 'rotate-180 text-premium-orange' : 'text-slate-400'
                  }`} />
                </button>

                {mobileAccordion === 'downloads' && (
                  <div className="p-3 bg-white space-y-1">
                    {DOWNLOAD_CATEGORIES.map((item) => {
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.slug}
                          to={item.path}
                          className="flex items-center gap-3 p-2 rounded-lg text-sm font-medium text-slate-700"
                        >
                          <Icon className="w-4 h-4 text-premium-orange" />
                          <span>{item.name}</span>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div> */}

              <Link
                to="/contact"
                className="block px-4 py-2.5 rounded-xl text-base font-bold text-slate-800 hover:bg-orange-50 "
              >
                CONTACT
              </Link>

              <div className="pt-3">
                <Link to="/contact" className="w-full block">
                  <Button variant="primary" size="lg" className="w-full justify-center">
                    Contact Us Today
                  </Button>
                </Link>
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
