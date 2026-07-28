import React from 'react';
import PageBanner from '../components/common/PageBanner';
import Container from '../components/common/Container';
import SectionHeading from '../components/common/SectionHeading';
import ProductCard from '../components/common/ProductCard';
import FeatureCard from '../components/common/FeatureCard';
import Button from '../components/common/Button';
import { Pill, FileText, CheckCircle2, ArrowRight, Shield, Download } from 'lucide-react';
import { Link } from 'react-router-dom';

const PlaceholderPage = ({
  title,
  subtitle,
  breadcrumbs = [],
  type = 'general', // 'general' | 'product' | 'download'
}) => {
  return (
    <div className="min-h-[70vh] bg-slate-50 pb-20">
      {/* Page Header Banner */}
      <PageBanner
        title={title}
        subtitle={subtitle || `J K BIOTECH - Premium ${title} Solutions & Healthcare Excellence`}
        breadcrumbs={breadcrumbs}
      />

      <Container className="pt-12 sm:pt-16">
        {/* Phase 2 Architecture Indicator Badge */}
        <div className="mb-10 p-4 sm:p-6 rounded-2xl bg-white border border-primary-100 shadow-soft flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                {title} Route Initialized
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Path: <code className="bg-slate-100 px-2 py-0.5 rounded text-primary-700 font-mono text-xs">{breadcrumbs[breadcrumbs.length - 1]?.path || '#'}</code>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-primary-50 text-primary-700 border border-primary-200 text-xs font-semibold">
              Phase 2 Layout & Routing Ready
            </span>
          </div>
        </div>

        {/* Dynamic Placeholder Content based on Type */}
        {type === 'product' && (
          <div className="space-y-12">
            <SectionHeading
              subtitle={`${title} Dosage Form`}
              title={`High Quality ${title} Formulations`}
              description={`Explore J K BIOTECH's range of WHO-GMP compliant ${title} products engineered for maximum therapeutic efficacy.`}
              align="center"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <ProductCard
                title={`Premium ${title} Sample Formula A`}
                category={title}
                composition="Active Pharmaceutical Ingredients - High Efficacy Grade"
                dosageForm={`${title} Dosage`}
              />
              <ProductCard
                title={`Advanced ${title} Sample Formula B`}
                category={title}
                composition="Therapeutic Compound - Fast Absorption Matrix"
                dosageForm={`${title} Dosage`}
              />
              <ProductCard
                title={`Specialty ${title} Sample Formula C`}
                category={title}
                composition="Sustained Release Quality Formulation"
                dosageForm={`${title} Dosage`}
              />
            </div>
          </div>
        )}

        {type === 'download' && (
          <div className="space-y-12">
            <SectionHeading
              subtitle="Specialty Literature"
              title={`${title} Visual Aids & Product Cards`}
              description={`Download high-resolution product catalogs, visual aids, and medical literature tailored for ${title} practitioners.`}
              align="center"
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FeatureCard
                icon={FileText}
                title={`${title} Product Brochure 2026`}
                description="Comprehensive PDF catalog containing detailed dosage charts, compositions, and clinical indications."
                linkText="Download Catalog (PDF)"
                linkTo="#"
                variant="secondary"
              />
              <FeatureCard
                icon={Download}
                title={`${title} Visual Aid Cards`}
                description="High-definition visual aid flipcards designed for medical representative presentations."
                linkText="Download Visual Aid"
                linkTo="#"
                variant="primary"
              />
              <FeatureCard
                icon={Shield}
                title="Quality Compliance Certificate"
                description="Official GMP & ISO 9001:2015 accreditation documents and laboratory test reports."
                linkText="Download Certificate"
                linkTo="#"
                variant="secondary"
              />
            </div>
          </div>
        )}

        {type === 'general' && (
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-soft text-center max-w-3xl mx-auto space-y-6">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-primary-50 text-primary-600 flex items-center justify-center">
              <Pill className="w-8 h-8" />
            </div>
            
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Welcome to {title} Page
            </h2>

            <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
              The global layout, header navigation, responsive mobile menu, sticky navbar, and footer are active for this page. Full content sections will be added in upcoming phases.
            </p>

            <div className="pt-4 flex flex-wrap justify-center gap-4">
              <Link to="/contact">
                <Button variant="primary" size="md" icon={ArrowRight} iconPosition="right">
                  Inquire Corporate Details
                </Button>
              </Link>
              <Link to="/products">
                <Button variant="outline" size="md">
                  Browse All Products
                </Button>
              </Link>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
};

export default PlaceholderPage;
