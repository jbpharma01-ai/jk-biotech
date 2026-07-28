import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PlaceholderPage from '../pages/PlaceholderPage';
import HomePage from '../pages/home/HomePage';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Home Route */}
      <Route path="/" element={<HomePage />} />

      {/* About Route */}
      <Route
        path="/about"
        element={
          <PlaceholderPage
            title="About Us"
            subtitle="Pioneering Pharmaceutical Manufacturing, Research & Innovation"
            breadcrumbs={[{ label: 'About', path: '/about' }]}
            type="general"
          />
        }
      />

      {/* Main Products Catalog Route */}
      <Route
        path="/products"
        element={
          <PlaceholderPage
            title="All Products"
            subtitle="Comprehensive WHO-GMP Certified Pharmaceutical Formulations & Dosage Forms"
            breadcrumbs={[{ label: 'Products', path: '/products' }]}
            type="product"
          />
        }
      />

      {/* Specific Product Category Routes (11 Dosage Forms) */}
      <Route
        path="/products/capsule"
        element={
          <PlaceholderPage
            title="Capsule"
            subtitle="High-grade Gelatin & Hydroxypropyl Methylcellulose Capsules"
            breadcrumbs={[
              { label: 'Products', path: '/products' },
              { label: 'Capsule', path: '/products/capsule' },
            ]}
            type="product"
          />
        }
      />

      <Route
        path="/products/drop"
        element={
          <PlaceholderPage
            title="Drop"
            subtitle="Pediatric Oral Drops & Ophthalmic Therapeutic Drops"
            breadcrumbs={[
              { label: 'Products', path: '/products' },
              { label: 'Drop', path: '/products/drop' },
            ]}
            type="product"
          />
        }
      />

      <Route
        path="/products/injection"
        element={
          <PlaceholderPage
            title="Injection"
            subtitle="Sterile Intravenous & Intramuscular Parenteral Injections"
            breadcrumbs={[
              { label: 'Products', path: '/products' },
              { label: 'Injection', path: '/products/injection' },
            ]}
            type="product"
          />
        }
      />

      <Route
        path="/products/powder"
        element={
          <PlaceholderPage
            title="Powder"
            subtitle="Oral Rehydration & Antibiotic Dry Powder Formulations"
            breadcrumbs={[
              { label: 'Products', path: '/products' },
              { label: 'Powder', path: '/products/powder' },
            ]}
            type="product"
          />
        }
      />

      <Route
        path="/products/sachet"
        element={
          <PlaceholderPage
            title="Sachet"
            subtitle="Single-Dose Nutritional, Probiotic & Mineral Sachets"
            breadcrumbs={[
              { label: 'Products', path: '/products' },
              { label: 'Sachet', path: '/products/sachet' },
            ]}
            type="product"
          />
        }
      />

      <Route
        path="/products/suppository"
        element={
          <PlaceholderPage
            title="Suppository"
            subtitle="Targeted Therapeutic Rectal & Vaginal Suppositories"
            breadcrumbs={[
              { label: 'Products', path: '/products' },
              { label: 'Suppository', path: '/products/suppository' },
            ]}
            type="product"
          />
        }
      />

      <Route
        path="/products/soft-gel-capsule"
        element={
          <PlaceholderPage
            title="Soft Gel Capsule"
            subtitle="Lipid-based Micronutrient & Essential Oil Softgel Capsules"
            breadcrumbs={[
              { label: 'Products', path: '/products' },
              { label: 'Soft Gel Capsule', path: '/products/soft-gel-capsule' },
            ]}
            type="product"
          />
        }
      />

      <Route
        path="/products/suspension"
        element={
          <PlaceholderPage
            title="Suspension"
            subtitle="Flavored Pediatric & Adult Liquid Suspensions"
            breadcrumbs={[
              { label: 'Products', path: '/products' },
              { label: 'Suspension', path: '/products/suspension' },
            ]}
            type="product"
          />
        }
      />

      <Route
        path="/products/syrup"
        element={
          <PlaceholderPage
            title="Syrup"
            subtitle="Multivitamin, Cough & Anti-Allergic Syrups"
            breadcrumbs={[
              { label: 'Products', path: '/products' },
              { label: 'Syrup', path: '/products/syrup' },
            ]}
            type="product"
          />
        }
      />

      <Route
        path="/products/tablet"
        element={
          <PlaceholderPage
            title="Tablet"
            subtitle="Film-Coated, Chewable & Sustained-Release Tablets"
            breadcrumbs={[
              { label: 'Products', path: '/products' },
              { label: 'Tablet', path: '/products/tablet' },
            ]}
            type="product"
          />
        }
      />

      <Route
        path="/products/liquid"
        element={
          <PlaceholderPage
            title="Liquid"
            subtitle="Oral Solutions, Elixirs & Antiseptic Liquids"
            breadcrumbs={[
              { label: 'Products', path: '/products' },
              { label: 'Liquid', path: '/products/liquid' },
            ]}
            type="product"
          />
        }
      />

      {/* Downloads Main Route */}
      <Route
        path="/downloads"
        element={
          <PlaceholderPage
            title="Downloads"
            subtitle="Visual Aids, Product Catalogs, Prescribing Information & Certificates"
            breadcrumbs={[{ label: 'Downloads', path: '/downloads' }]}
            type="download"
          />
        }
      />

      {/* Specific Download Category Routes (3 Specialties) */}
      <Route
        path="/downloads/pediatrician"
        element={
          <PlaceholderPage
            title="Pediatrician"
            subtitle="Pediatric Visual Aids, Dosage Charts & Product Monographs"
            breadcrumbs={[
              { label: 'Downloads', path: '/downloads' },
              { label: 'Pediatrician', path: '/downloads/pediatrician' },
            ]}
            type="download"
          />
        }
      />

      <Route
        path="/downloads/orthopedic"
        element={
          <PlaceholderPage
            title="Orthopedic"
            subtitle="Bone & Joint Care Product Literature & Clinical Trials Summary"
            breadcrumbs={[
              { label: 'Downloads', path: '/downloads' },
              { label: 'Orthopedic', path: '/downloads/orthopedic' },
            ]}
            type="download"
          />
        }
      />

      <Route
        path="/downloads/gynecologist"
        element={
          <PlaceholderPage
            title="Gynecologist"
            subtitle="Women’s Healthcare, Prenatal Care & Gynecological Literature"
            breadcrumbs={[
              { label: 'Downloads', path: '/downloads' },
              { label: 'Gynecologist', path: '/downloads/gynecologist' },
            ]}
            type="download"
          />
        }
      />

      {/* Contact Route */}
      <Route
        path="/contact"
        element={
          <PlaceholderPage
            title="Contact Us"
            subtitle="Get in Touch with J K BIOTECH Corporate Sales & Franchise Team"
            breadcrumbs={[{ label: 'Contact', path: '/contact' }]}
            type="general"
          />
        }
      />

      {/* 404 Fallback Route */}
      <Route
        path="*"
        element={
          <PlaceholderPage
            title="404 Page Not Found"
            subtitle="The requested page could not be found. Please check the URL or navigate home."
            breadcrumbs={[{ label: '404 Error', path: '*' }]}
            type="general"
          />
        }
      />
    </Routes>
  );
};

export default AppRoutes;
