import {
  Pill,
  Droplet,
  Syringe,
  Boxes,
  FileSpreadsheet,
  ShieldAlert,
  Sparkles,
  FlaskConical,
  Wine,
  Tablets,
  TestTube,
  Baby,
  Bone,
  HeartHandshake
} from 'lucide-react';

export const PRODUCT_CATEGORIES = [
  { name: 'Capsule', slug: 'capsule', path: '/products/capsule', icon: Pill, desc: 'High-grade gelatin encapsulated formulations' },
  { name: 'Drop', slug: 'drop', path: '/products/drop', icon: Droplet, desc: 'Pediatric & ophthalmic oral/topical liquid drops' },
  { name: 'Injection', slug: 'injection', path: '/products/injection', icon: Syringe, desc: 'Sterile IV/IM parenteral injectables' },
  { name: 'Powder', slug: 'powder', path: '/products/powder', icon: Boxes, desc: 'Effervescent & oral rehydration powder formulas' },
  { name: 'Sachet', slug: 'sachet', path: '/products/sachet', icon: FileSpreadsheet, desc: 'Single-dose nutritional & probiotic sachets' },
  { name: 'Suppository', slug: 'suppository', path: '/products/suppository', icon: ShieldAlert, desc: 'Targeted rectal/vaginal therapeutic suppositories' },
  { name: 'Soft Gel Capsule', slug: 'soft-gel-capsule', path: '/products/soft-gel-capsule', icon: Sparkles, desc: 'Softgel lipid-based nutrient capsules' },
  { name: 'Suspension', slug: 'suspension', path: '/products/suspension', icon: FlaskConical, desc: 'Oral pediatric & adult liquid suspensions' },
  { name: 'Syrup', slug: 'syrup', path: '/products/syrup', icon: Wine, desc: 'Flavored therapeutic cough & multivitamin syrups' },
  { name: 'Tablet', slug: 'tablet', path: '/products/tablet', icon: Tablets, desc: 'Film-coated, chewable & sustained release tablets' },
  { name: 'Liquid', slug: 'liquid', path: '/products/liquid', icon: TestTube, desc: 'Oral liquids & antiseptic solutions' }
];

export const DOWNLOAD_CATEGORIES = [
  { name: 'Pediatrician', slug: 'pediatrician', path: '/downloads/pediatrician', icon: Baby, desc: 'Pediatric dosage charts, product brochures & visual aids' },
  { name: 'Orthopedic', slug: 'orthopedic', path: '/downloads/orthopedic', icon: Bone, desc: 'Joint care, calcium & bone health product catalogs' },
  { name: 'Gynecologist', slug: 'gynecologist', path: '/downloads/gynecologist', icon: HeartHandshake, desc: 'Women’s health, iron & prenatal care literature' }
];

export const COMPANY_INFO = {
  name: 'J K BIOTECH',
  tagline: 'Delivering Excellence in Healthcare & Pharmaceuticals',
  phone: '+91 (0) 7383936095',
  altPhone: '+91 (0) 12345 67890',
  email: 'info@jkbiotech.in',
  salesEmail: 'sales@jkbiotech.com',
  address: 'Office no 22, First floor, Satyam Arcade, Near Intas Pharma, Opposite Moraiya patiya, Ahmedabad-382213',
  // workingHours: 'Mon - Sat: 10:00 AM - 7:00 PM',
  certifications: ['GMP Certified', 'WHO Compliant', 'ISO 9001:2015'],
  social: {
    linkedin: 'https://linkedin.com',
    facebook: 'https://facebook.com',
    twitter: 'https://twitter.com',
    instagram: 'https://instagram.com'
  }
};
