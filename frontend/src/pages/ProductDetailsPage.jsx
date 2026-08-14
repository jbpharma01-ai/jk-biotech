import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  ChevronRight,
  Pill,
  ShieldCheck,
  Award,
  Package,
  FileText,
  Send,
  Sparkles,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import Container from '../components/common/Container';
import ProductCard from '../components/common/ProductCard';
import Button from '../components/common/Button';
import PRODUCTS from '../constants/products';

const ProductDetailsPage = () => {
  // const { slug } = useParams();
  const { slug, identifier } = useParams();

  const productSlug = slug || identifier;
  const navigate = useNavigate();
  const [imageError, setImageError] = useState(false);

  // Find product by slug (case-insensitive)
  const product = PRODUCTS.find(
    (p) =>
      p.slug &&
      p.slug.toLowerCase() === (productSlug || '').toLowerCase()
  );

  // 404 State if product not found
  if (!product) {
    return (
      <div className="bg-premium-black text-gray-100 min-h-screen py-24 flex items-center justify-center">
        <Container>
          <div className="bg-premium-surface border border-premium-border rounded-3xl p-10 md:p-16 text-center max-w-xl mx-auto shadow-black">
            <div className="w-16 h-16 rounded-2xl bg-premium-orange/10 border border-premium-orange/30 text-premium-orange flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="w-8 h-8" />
            </div>

            <h1 className="font-heading text-2xl md:text-3xl font-black text-white mb-3">
              Product Not Found
            </h1>

            <p className="text-sm text-gray-400 leading-relaxed mb-8">
              The product you are looking for does not exist or may have been moved.
            </p>

            <Link to="/products">
              <Button variant="primary" size="md" icon={ArrowLeft} iconPosition="left">
                Return to Product Catalog
              </Button>
            </Link>
          </div>
        </Container>
      </div>
    );
  }

  // Related products from the same category
  const relatedProducts = PRODUCTS.filter(
    (p) =>
      p.category &&
      product.category &&
      p.category.toLowerCase() === product.category.toLowerCase() &&
      p.id !== product.id
  ).slice(0, 3);

  // Format Category Label
  const formattedCategory = product.category
    ? product.category.replace(/-/g, ' ').toUpperCase()
    : 'PHARMA';

  return (
    <div className="bg-[#FFF8F0] text-[#111827] min-h-screen pt-4 pb-24">
      {/* Breadcrumbs & Top Bar */}
      <section className="py-6 border-b border-[#E5E7EB] bg-[#FFF8F0]">
        <Container>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <nav className="flex items-center gap-2 text-xs font-medium text-[#6B7280] tracking-wide">
              <Link to="/" className="hover:text-premium-orange transition-colors">
                Home
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-gray-600" />
              <Link to="/products" className="hover:text-premium-orange transition-colors">
                Products
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-gray-600" />
              <Link
                to={`/products/${product.category}`}
                className="hover:text-premium-orange transition-colors"
              >
                {formattedCategory}
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-gray-600" />
              <span className="text-premium-orange font-semibold line-clamp-1">
                {product.name}
              </span>
            </nav>

            <button
              type="button"
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-[#111827]/20 bg-white px-3 py-2 text-xs font-semibold text-[#111827] shadow-sm hover:border-premium-orange hover:text-premium-orange transition-all duration-300"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Products</span>
            </button>
          </div>
        </Container>
      </section>

      {/* Main Single Product Details Section */}
      <section className="pt-8 pb-12 lg:pt-10 lg:pb-16 bg-[#FFF8F0]">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* Left Column: Product Showcase Banner & Image */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-5"
            >
              <div className="relative bg-gradient-to-br from-white via-[#FFF9F2] to-[#FFF1E2] rounded-3xl border border-orange-100 shadow-[0_15px_45px_rgba(0,0,0,0.08)] overflow-hidden p-6 sm:p-8 flex items-center justify-center min-h-[380px] lg:min-h-[460px] group">
                {/* Background decorative glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-premium-orange/10 rounded-full blur-3xl pointer-events-none" />

                {product.image && !imageError ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    onError={() => setImageError(true)}
                    className="w-full h-auto max-h-[340px] object-contain filter drop-shadow-[0_18px_25px_rgba(0,0,0,0.18)] z-10 transition-transform duration-500 hover:scale-105"
                  />
                ) : (
                  <div className="relative z-10 flex flex-col items-center justify-center text-center p-6">
                    <div className="w-24 h-24 rounded-3xl bg-premium-orange/15 border border-premium-orange/30 shadow-orange flex items-center justify-center text-premium-orange mb-4">
                      <Pill className="w-12 h-12" />
                    </div>
                    <h4 className="font-heading text-lg font-bold text-white mb-1">
                      {product.name}
                    </h4>
                    <span className="text-xs text-gray-400 uppercase tracking-widest">
                      JK BIOTECH FORMULATION
                    </span>
                  </div>
                )}

                {/* Badges */}
                <span className="absolute top-4 left-4 bg-premium-orange/10 border border-premium-orange/40 text-premium-orange text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider backdrop-blur-md">
                  {formattedCategory}
                </span>

                <span className="absolute top-4 right-4 bg-white border border-gray-200 text-[#111827] text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
                  <ShieldCheck className="w-4 h-4 text-premium-orange" />
                  WHO-GMP Certified
                </span>
              </div>
            </motion.div>

            {/* Right Column: Detailed Product Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:col-span-7 flex flex-col"
            >
              {/* Category & Dosage Tag */}
              <div className="flex items-center gap-3 mb-3">
                <span className="inline-flex items-center gap-1 text-xs font-extrabold text-premium-orange uppercase tracking-widest bg-premium-orange/10 border border-premium-orange/30 px-3 py-1 rounded-full">
                  <Sparkles className="w-3.5 h-3.5 text-premium-orange" />
                  {product.dosageForm || formattedCategory}
                </span>

                <span className="text-xs text-gray-400 font-semibold flex items-center gap-1">
                  <Award className="w-3.5 h-3.5 text-premium-orange" />
                  Standard Pharmaceutical Grade
                </span>
              </div>

              {/* Product Name */}
              <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black text-[#111827] tracking-tight leading-tight mb-4">
                {product.name}
              </h1>

              {/* Short Description */}
              <p className="text-base text-gray-600 leading-relaxed mb-6 font-medium">
                {product.shortDescription}
              </p>

              {/* Key Specs Card */}
              <div className="bg-white border border-orange-100 rounded-2xl p-5 mb-8 space-y-3.5 shadow-[0_10px_30px_rgba(0,0,0,0.06)]">
                {product.composition && (
                  <div className="flex items-start gap-3 text-sm">
                    <FileText className="w-4 h-4 text-premium-orange flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#111827] font-semibold">Active Composition:</strong>{' '}
                      <span className="text-gray-600">{product.composition}</span>
                    </div>
                  </div>
                )}

                {product.packaging && (
                  <div className="flex items-start gap-3 text-sm">
                    <Package className="w-4 h-4 text-premium-orange flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#111827] font-semibold">Packaging Size:</strong>{' '}
                      <span className="text-gray-600">{product.packaging}</span>
                    </div>
                  </div>
                )}

                {product.indications && (
                  <div className="flex items-start gap-3 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-premium-orange flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#111827] font-semibold">Therapeutic Indications:</strong>{' '}
                      <span className="text-gray-600">{product.indications}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Full Description Section */}
              <div className="mb-8">
                <h3 className="text-lg font-bold text-[#111827] font-heading mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-premium-orange" />
                  Product Description
                </h3>

                <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line bg-white border border-orange-100 rounded-2xl p-5 sm:p-6 shadow-[0_8px_25px_rgba(0,0,0,0.05)]">
                  {product.description ||
                    'Detailed therapeutic indications, prescribing guidance, and batch certificate available upon request through our sales office.'}
                </p>
              </div>

              {/* Action / Inquiry Button */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link to="/contact">
                  <Button
                    variant="primary"
                    size="lg"
                    icon={Send}
                    iconPosition="right"
                    className="shadow-orange hover:scale-[1.02]"
                  >
                    Inquire About This Product
                  </Button>
                </Link>

                <Link to="/products">
                  <Button
                    variant="outline"
                    size="lg"
                    className="!bg-white !text-[#111827] !border-[#111827] hover:!bg-[#111827] hover:!text-white hover:!border-[#111827]"
                  >
                    Explore All Products
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Related Products Grid */}
          {relatedProducts.length > 0 && (
            <div className="mt-16 pt-12 border-t border-[#E5E7EB]">
              <div className="flex items-center justify-between mb-6 sm:mb-8">
                <div>
                  <span className="text-xs font-bold text-premium-orange uppercase tracking-wider">
                    More in {formattedCategory}
                  </span>
                  <h3 className="font-heading text-2xl font-black text-[#111827] mt-1">
                    Related Products
                  </h3>
                </div>

                <Link
                  to={`/products/${product.category}`}
                  className="text-xs sm:text-sm font-bold text-premium-orange hover:underline flex items-center gap-1 shrink-0"
                >
                  <span>View Category</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {relatedProducts.map((relProduct) => (
                  <ProductCard key={relProduct.id} product={relProduct} />
                ))}
              </div>
            </div>
          )}
        </Container>
      </section>
    </div>
  );
};

export default ProductDetailsPage;
