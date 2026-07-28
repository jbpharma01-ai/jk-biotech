import React from 'react';
import { Link } from 'react-router-dom';
import Container from '../common/Container';
import { PRODUCT_CATEGORIES, DOWNLOAD_CATEGORIES, COMPANY_INFO } from '../../constants/navigation';
import {
  Pill,
  MapPin,
  Phone,
  Mail,
  Clock,
  ShieldCheck,
  ChevronRight,
  ArrowUp,
  Linkedin,
  Facebook,
  Twitter,
  Instagram
} from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-8 border-t border-slate-800 relative overflow-hidden">
      {/* Background Decorative Accent */}
      <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-primary-600/10 blur-3xl pointer-events-none"></div>

      <Container>
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Column 1: Company Profile (2 cols on large screens) */}
          <div className="lg:col-span-2 space-y-5">
            <Link to="/" className="inline-flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white shadow-md">
                <Pill className="w-6 h-6 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-extrabold tracking-tight text-white font-heading">
                  J K BIOTECH
                </span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400">
                  Pharmaceuticals
                </span>
              </div>
            </Link>

            <p className="text-slate-400 text-sm leading-relaxed max-w-md">
              J K BIOTECH is a premier corporate pharmaceutical manufacturing enterprise dedicated to manufacturing high-quality WHO-GMP compliant formulations, empowering global healthcare through innovation and trust.
            </p>

            {/* Certifications Badges */}
            <div className="flex flex-wrap gap-2 pt-2">
              {COMPANY_INFO.certifications.map((cert, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-emerald-400"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  {cert}
                </span>
              ))}
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={COMPANY_INFO.social.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-primary-600 hover:border-primary-600 transition-all"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={COMPANY_INFO.social.facebook}
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-primary-600 hover:border-primary-600 transition-all"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={COMPANY_INFO.social.twitter}
                target="_blank"
                rel="noreferrer"
                aria-label="Twitter"
                className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-primary-600 hover:border-primary-600 transition-all"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href={COMPANY_INFO.social.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-primary-600 hover:border-primary-600 transition-all"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-white tracking-wider uppercase font-heading border-l-2 border-primary-500 pl-3">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="text-slate-400 hover:text-sky-400 flex items-center gap-1.5 transition-colors">
                  <ChevronRight className="w-3.5 h-3.5 text-primary-500" />
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-slate-400 hover:text-sky-400 flex items-center gap-1.5 transition-colors">
                  <ChevronRight className="w-3.5 h-3.5 text-primary-500" />
                  About J K Biotech
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-slate-400 hover:text-sky-400 flex items-center gap-1.5 transition-colors">
                  <ChevronRight className="w-3.5 h-3.5 text-primary-500" />
                  Product Formulations
                </Link>
              </li>
              <li>
                <Link to="/downloads" className="text-slate-400 hover:text-sky-400 flex items-center gap-1.5 transition-colors">
                  <ChevronRight className="w-3.5 h-3.5 text-primary-500" />
                  Visual Aids & Downloads
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-slate-400 hover:text-sky-400 flex items-center gap-1.5 transition-colors">
                  <ChevronRight className="w-3.5 h-3.5 text-primary-500" />
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Products Dosage Categories */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-white tracking-wider uppercase font-heading border-l-2 border-primary-500 pl-3">
              Dosage Formulations
            </h3>
            <ul className="grid grid-cols-1 gap-2 text-sm">
              {PRODUCT_CATEGORIES.slice(0, 7).map((cat) => (
                <li key={cat.slug}>
                  <Link to={cat.path} className="text-slate-400 hover:text-sky-400 flex items-center gap-1.5 transition-colors">
                    <ChevronRight className="w-3.5 h-3.5 text-secondary-500" />
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & Location */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-white tracking-wider uppercase font-heading border-l-2 border-primary-500 pl-3">
              Corporate Office
            </h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary-400 flex-shrink-0 mt-0.5" />
                <span>{COMPANY_INFO.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <a href={`tel:${COMPANY_INFO.phone}`} className="hover:text-white transition-colors">
                  {COMPANY_INFO.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-sky-400 flex-shrink-0" />
                <a href={`mailto:${COMPANY_INFO.email}`} className="hover:text-white transition-colors">
                  {COMPANY_INFO.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                {/* <Clock className="w-4 h-4 text-amber-400 flex-shrink-0" /> */}
                {/* <span>{COMPANY_INFO.workingHours}</span> */}
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Back To Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} J K BIOTECH. All Rights Reserved. Designed for Corporate Pharmaceutical Excellence.</p>
          
          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 hover:text-sky-400 transition-colors focus:outline-none"
          >
            <span>Back to top</span>
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
