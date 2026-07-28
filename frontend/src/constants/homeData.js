// Static data for Home Page Phase 3 Part 2 sections
// These will be replaced by backend API calls in future phases

import { Eye, Target, Scale } from 'lucide-react';

// ── Section 1: Vision / Mission / Ethics ─────────────────────────────────────
export const VME_CARDS = [
  {
    id: 'vision',
    icon: Eye,
    title: 'Our Vision',
    tagline: 'Seeing a Healthier Tomorrow',
    description:
      'To become a globally recognised pharmaceutical leader, delivering innovative, affordable, and quality-driven healthcare solutions that improve the quality of life for every patient we serve.',
    color: 'blue',
  },
  {
    id: 'mission',
    icon: Target,
    title: 'Our Mission',
    tagline: 'Committed to Excellence Every Day',
    description:
      'To research, develop, manufacture, and supply the highest-quality pharmaceutical formulations while upholding the strictest WHO-GMP standards — putting patient safety and therapeutic efficacy at the forefront of everything we do.',
    color: 'teal',
  },
  {
    id: 'ethics',
    icon: Scale,
    title: 'Our Ethics',
    tagline: 'Integrity at Every Step',
    description:
      'We are committed to absolute transparency, regulatory compliance, and ethical business practices. Every product we manufacture carries the full weight of our integrity, from raw material sourcing to final dispensing.',
    color: 'navy',
  },
];

// ── Section 3: Featured Products (static placeholder — backend later) ─────────
export const FEATURED_PRODUCTS = [
  {
    id: 'fp-1',
    title: 'Amoxicillin 500mg Capsule',
    category: 'Capsule',
    composition: 'Amoxicillin Trihydrate IP equivalent to Amoxicillin 500mg',
    dosageForm: 'Hard Gelatin Capsule',
    indication: 'Broad-spectrum antibiotic for bacterial infections',
    color: 'blue',
  },
  {
    id: 'fp-2',
    title: 'Pediatric Multivitamin Syrup',
    category: 'Syrup',
    composition: 'Vitamins A, C, D3, E, B-Complex with Zinc & Iron',
    dosageForm: 'Oral Syrup',
    indication: 'Complete nutritional support for growing children',
    color: 'teal',
  },
  {
    id: 'fp-3',
    title: 'Calcium + Vitamin D3 Tablets',
    category: 'Tablet',
    composition: 'Calcium Carbonate 500mg + Vitamin D3 250IU',
    dosageForm: 'Film-Coated Tablet',
    indication: 'Bone health support, calcium deficiency treatment',
    color: 'navy',
  },
  {
    id: 'fp-4',
    title: 'Ceftriaxone 1g Injection',
    category: 'Injection',
    composition: 'Ceftriaxone Sodium IP equivalent to Ceftriaxone 1g',
    dosageForm: 'Sterile Powder for Injection',
    indication: 'Third-generation cephalosporin for severe infections',
    color: 'blue',
  },
  {
    id: 'fp-5',
    title: 'Omega-3 Soft Gel Capsule',
    category: 'Soft Gel Capsule',
    composition: 'Fish Oil 1000mg (EPA 180mg + DHA 120mg)',
    dosageForm: 'Soft Gelatin Capsule',
    indication: 'Cardiovascular health, cholesterol management',
    color: 'teal',
  },
  {
    id: 'fp-6',
    title: 'ORS Lemon Flavour Sachet',
    category: 'Sachet',
    composition: 'Sodium Chloride, Potassium Chloride, Glucose, Sodium Citrate',
    dosageForm: 'Oral Rehydration Salts',
    indication: 'Rapid rehydration in diarrhoea and dehydration',
    color: 'navy',
  },
];
