import React from "react";
import { Link } from "react-router-dom";
import Container from "../common/Container";
import jkLogo from '../../assets/images/logo/jk-logo.png';
import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
} from "lucide-react";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "../../animations/variants";

const QUICK_LINKS = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Products", path: "/products" },
  { name: "Downloads", path: "/downloads" },
  { name: "Contact", path: "/contact" },
];

const PRODUCT_LINKS = [
  "Tablets",
  "Capsules",
  "Syrups",
  "Injectables",
  "Drops",
  "Powders",
];

const CONTACT = {
  address: "Office no 22, First floor, Satyam Arcade, Near Intas Pharma, Opposite Moraiya patiya, Ahmedabad-382213",
  phone: "+91 7383936095",
  email: "info@jkbiotech.in",
};

const SOCIAL_LINKS = [
  {
    icon: Facebook,
    href: "#",
  },
  {
    icon: Instagram,
    href: "#",
  },
  {
    icon: Linkedin,
    href: "#",
  },
  {
    icon: Youtube,
    href: "#",
  },
];

const Footer = () => {
  return (
    <motion.footer
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="relative bg-gradient-to-b from-[#FFF9F3] via-white to-[#FFF4EA] text-slate-900 overflow-hidden border-t border-orange-100"
    >
      <motion.div
        animate={{
          scale: [1, 1.12, 1],
          opacity: [0.15, 0.35, 0.15],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -top-32 left-0 w-72 h-72 bg-orange-300 blur-[120px]"
      />
      <motion.div
        animate={{
          scale: [1.08, 1, 1.08],
          opacity: [0.2, 0.08, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-0 right-0 w-80 h-80 bg-orange-200 blur-[120px]"
      />

      {/* Premium Top Gradient */}
      <div className="h-[2px] bg-gradient-to-r from-transparent via-premium-orange to-transparent" />


      <Container>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-y-14 gap-x-20 py-20">
          <div className="lg:pr-8">

            {/* Logo */}

            <Link
              to="/"
              className="inline-block"
            >
              <img
                src={jkLogo}
                alt="JK Biotech"
                className="h-24 w-auto transition-all duration-500 hover:scale-105 hover:rotate-1"
              />
            </Link>

            {/* Description */}

            <p className="mt-6 max-w-[280px] text-[15px] leading-7 text-slate-600 font-semibold">
              Better healthcare for everyone.
            </p>

            <div className="mt-7 inline-flex items-center rounded-full border border-orange-200 bg-orange-50 px-4 py-2 text-xs font-semibold tracking-wide text-premium-orange shadow-sm">
              WHO-GMP Certified
            </div>

            <div className="mt-8 flex gap-4">

              {SOCIAL_LINKS.map(({ icon: Icon, href }, index) => (

                <a
                  key={index}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className=" group relative flex h-12 w-12 items-center justify-center rounded-full border border-orange-200 bg-white shadow-sm overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:rotate-6 hover:border-premium-orange hover:shadow-orangeLg "  >

                  <>
                    <span className="absolute inset-0 bg-premium-orange scale-0 rounded-full transition-transform duration-500 group-hover:scale-100"></span>

                    <Icon className="relative z-10 h-5 w-5 text-slate-700 transition-all duration-500 group-hover:text-white group-hover:scale-110" />
                  </>
                </a>

              ))}

            </div>
          </div>

          {/* Quick Links */}

          <motion.div
            variants={fadeUp}
          >

            <h3 className="text-lg uppercase tracking-wide font-heading font-bold text-slate-900 mb-7">
              Quick Links
            </h3>

            <ul className="space-y-5">

              {QUICK_LINKS.map((link) => (

                <li key={link.name}>

                  <Link
                    to={link.path}
                    className="group flex items-center gap-2 text-slate-600 hover:text-premium-orange transition-all duration-300"
                  >
                    <span className="text-premium-orange transition-transform duration-300 group-hover:translate-x-1">
                      ›
                    </span>
                    <span>{link.name}</span>

                  </Link>

                </li>

              ))}

            </ul>

          </motion.div>

          {/* Products */}

          <motion.div
            variants={fadeUp}
          >

            <h3 className="text-lg font-heading font-bold text-slate-900 mb-6">
              Our Products
            </h3>

            <ul className="space-y-4">

              {PRODUCT_LINKS.map((item) => (

                <li key={item}>

                  <Link
                    to="/products"
                    className="group flex items-center gap-2 text-slate-600 hover:text-premium-orange transition-all duration-300"
                  >
                    <span className="w-0 group-hover:w-3 h-[2px] bg-premium-orange transition-all duration-300 rounded-full"></span>

                    <span>{item}</span>

                  </Link>

                </li>

              ))}

            </ul>

          </motion.div>

          {/* Contact */}

          <motion.div variants={fadeUp}>

            <h3 className="text-lg font-heading font-bold text-slate-900 mb-6">
              Contact Us
            </h3>

            <div className="space-y-5">

              <div className="flex items-start gap-3">

                <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-orange-50 border border-orange-100 shadow-sm">
                  <MapPin className="w-5 h-5 text-premium-orange" />
                </div>

                <p className="text-slate-600 leading-6">
                  {CONTACT.address}
                </p>

              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50 border border-orange-100 shadow-sm">

                  <Phone className="w-5 h-5 text-premium-orange flex-shrink-0" />

                </div>
                <a
                  href={`tel:${CONTACT.phone}`}
                  className="text-slate-600 hover:text-premium-orange hover:translate-x-1 inline-flex transition-all duration-300 transition-colors"
                >
                  {CONTACT.phone}
                </a>

              </div>

              <div className="flex items-center gap-3">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50 border border-orange-100 shadow-sm">
                  <Mail className="w-5 h-5 text-premium-orange flex-shrink-0" />
                </div>

                <a
                  href={`mailto:${CONTACT.email}`}
                  className="text-slate-600 hover:text-premium-orange hover:translate-x-1 inline-flex transition-all duration-300 transition-colors"
                >
                  {CONTACT.email}
                </a>

              </div>

            </div>

          </motion.div>

        </div>

      </Container>

      <div className="border-t border-orange-100/80 bg-white/60 backdrop-blur-sm">

        <Container>

          <div className="py-6 flex flex-col md:flex-row justify-between items-center gap-4">

            <p className="text-sm text-slate-500">

              © {new Date().getFullYear()} JK Biotech Pvt. Ltd.
              All Rights Reserved.

            </p>

            <div className="flex gap-10 text-sm">

              <Link
                to="/privacy-policy"
                className="text-slate-500 hover:text-premium-orange transition-colors"
              >
                Privacy Policy
              </Link>

              <Link
                to="/terms"
                className="text-slate-500 hover:text-premium-orange transition-colors font-medium"
              >
                Terms & Conditions
              </Link>

            </div>

          </div>

        </Container>

      </div>

    </motion.footer>
  );
};

export default Footer;