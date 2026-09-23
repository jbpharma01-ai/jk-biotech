import React, { useState, useEffect } from 'react';
import PageBanner from '../components/common/PageBanner';
import Container from '../components/common/Container';
import SectionHeading from '../components/common/SectionHeading';
import ProductCard from '../components/common/ProductCard';
import FeatureCard from '../components/common/FeatureCard';
import Button from '../components/common/Button';
import { Pill, FileText, ArrowRight, Shield, Download } from 'lucide-react';
import { Link } from 'react-router-dom';
import { fetchDocuments } from '../services/api';
import { DOWNLOAD_CATEGORIES } from '../constants/navigation';

const PlaceholderPage = ({
  title,
  subtitle,
  breadcrumbs = [],
  type = 'general', // 'general' | 'product' | 'download'
}) => {
  const [documents, setDocuments] = useState(null);

  useEffect(() => {
    if (type === 'download') {
      let isMounted = true;
      const catSlug = title.toLowerCase();
      fetchDocuments(catSlug).then((data) => {
        if (isMounted && data && Array.isArray(data) && data.length > 0) {
          setDocuments(data);
        }
      });
      return () => {
        isMounted = false;
      };
    }
  }, [type, title]);

  // Find fallback PDF URL from constant matching category title
  const fallbackCat = DOWNLOAD_CATEGORIES.find(
    (c) => c.name.toLowerCase() === title.toLowerCase()
  );
  const fallbackPdfUrl = fallbackCat?.pdfUrl || '#';

  return (
    <div className="min-h-[70vh] bg-slate-50 pb-20">
      {/* Page Header Banner */}
      <PageBanner
        title={title}
        subtitle={subtitle || `J K BIOTECH - Premium ${title} Solutions & Healthcare Excellence`}
        breadcrumbs={breadcrumbs}
      />

      <Container className="pt-12 sm:pt-16">
        {/* Dynamic Content based on Type */}
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
              title={`${title} Visual Aids & Product Catalogs`}
              description={`Download high-resolution product catalogs, visual aids, and medical literature tailored for ${title} practitioners.`}
              align="center"
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {documents && documents.length > 0 ? (
                documents.map((doc) => (
                  <FeatureCard
                    key={doc._id}
                    icon={FileText}
                    title={doc.title}
                    description={doc.description || 'Official product brochure and prescribing literature.'}
                    linkText="Download Catalog (PDF)"
                    linkTo={doc.file?.url || fallbackPdfUrl}
                    external={true}
                    variant="primary"
                  />
                ))
              ) : (
                <>
                  <FeatureCard
                    icon={FileText}
                    title={`${title} Product Brochure 2026`}
                    description="Comprehensive PDF catalog containing detailed dosage charts, compositions, and clinical indications."
                    linkText="Download Catalog (PDF)"
                    linkTo={fallbackPdfUrl}
                    external={true}
                    variant="primary"
                  />
                  <FeatureCard
                    icon={Download}
                    title={`${title} Visual Aid Cards`}
                    description="High-definition visual aid flipcards designed for medical representative presentations."
                    linkText="Download Visual Aid"
                    linkTo={fallbackPdfUrl}
                    external={true}
                    variant="secondary"
                  />
                  <FeatureCard
                    icon={Shield}
                    title="Quality Compliance Certificate"
                    description="Official GMP & ISO 9001:2015 accreditation documents and laboratory test reports."
                    linkText="Download Certificate"
                    linkTo={fallbackPdfUrl}
                    external={true}
                    variant="secondary"
                  />
                </>
              )}
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
              The global layout, header navigation, responsive mobile menu, sticky navbar, and footer are active for this page.
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
