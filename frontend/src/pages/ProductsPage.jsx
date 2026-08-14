import React, { useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ChevronRight, Pill } from 'lucide-react';
import Container from '../components/common/Container';
import ProductCard from '../components/common/ProductCard';
import Button from '../components/common/Button';
import PRODUCTS from '../constants/products';
import { PRODUCT_CATEGORIES } from '../constants/navigation';
import { fadeUp, staggerContainer } from '../animations/variants';

const ProductsPage = () => {
  const { identifier } = useParams();

  const categoryParam = identifier;
  const navigate = useNavigate();

  // Helper to normalize category slugs for comparison
  const normalizeSlug = (slug) => {
    if (!slug) return '';
    return slug
      .toLowerCase()
      .trim()
      .replace(/s$/, '') // handle plural/singular (e.g., drops -> drop)
      .replace(/[^a-z0-9]/g, '');
  };

  const currentCategorySlug = categoryParam ? normalizeSlug(categoryParam) : 'all';

  // Find active category object metadata from navigation constants
  const activeCategoryMeta = useMemo(() => {
    if (!categoryParam || currentCategorySlug === 'all') return null;
    return PRODUCT_CATEGORIES.find(
      (cat) => normalizeSlug(cat.slug) === currentCategorySlug
    );
  }, [categoryParam, currentCategorySlug]);

  // Filter products based on active category slug and search term
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const productCatSlug = normalizeSlug(product.category);

      return (
        currentCategorySlug === "all" ||
        productCatSlug === currentCategorySlug
      );
    });
  }, [currentCategorySlug]);

  // Dynamic Header Title & Description
  const pageTitle = activeCategoryMeta
    ? `${activeCategoryMeta.name} Products`
    : categoryParam && categoryParam !== 'all'
      ? `${categoryParam.replace(/-/g, ' ').toUpperCase()} Formulations`
      : 'All Pharmaceutical Products';

  const pageSubtitle = activeCategoryMeta
    ? activeCategoryMeta.desc
    : 'Explore JK BIOTECH’s comprehensive portfolio of WHO-GMP certified high-potency formulations across 11 therapeutic dosage forms.';

  // Handle Tab Navigation
  const handleCategoryChange = (slug) => {
    if (slug === 'all') {
      navigate('/products');
    } else {
      navigate(`/products/${slug}`);
    }
  };

  return (
    <div className="text-gray-100 min-h-screen pt-4 pb-24">
      {/* Hero Header Section */}
      <section className="relative overflow-hidden py-14 lg:py-20 border-b border-premium-border/60 bg-gradient-to-b from-black via-premium-surface to-premium-black">
        {/* Background glow graphics */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-premium-orange/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-orange-600/5 rounded-full blur-3xl pointer-events-none" />

        <Container className="relative z-10">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs font-medium text-gray-400 mb-8 uppercase tracking-[0.12em]">
            <Link to="/" className="hover:text-premium-orange transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-gray-600" />
            <Link
              to="/products"
              className={`hover:text-premium-orange transition-colors ${!categoryParam ? 'text-premium-orange font-bold' : ''
                }`}
            >
              Products
            </Link>
            {activeCategoryMeta && (
              <>
                <ChevronRight className="w-3.5 h-3.5 text-gray-600" />
                <span className="text-premium-orange font-bold">
                  {activeCategoryMeta.name}
                </span>
              </>
            )}
          </nav>

          <div className="max-w-3xl">
            {/* Tag Badge */}
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-400/25 text-orange-300 text-[11px] font-semibold tracking-[0.16em] uppercase mb-5">
              <Sparkles className="w-3.5 h-3.5 text-premium-orange" />
              WHO-GMP Certified Products
            </span>

            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-[-0.02em] leading-[1.1]">
              {pageTitle}
            </h1>

            <p className="mt-5 max-w-2xl text-sm sm:text-base text-gray-300/90 leading-7">
              {pageSubtitle}
            </p>

            <div className="mt-6 inline-flex items-center gap-3 rounded-full border border-orange-400/30 bg-orange-500/10 px-5 py-2 backdrop-blur-sm">
              <div className="h-2.5 w-2.5 rounded-full bg-premium-orange animate-pulse"></div>

              <span className="text-sm font-semibold text-orange-200">
                {filteredProducts.length} Product{filteredProducts.length > 1 ? "s" : ""} Available
              </span>
            </div>
            
          </div>
        </Container>
      </section>

      {/* Main Content Area */}
      <section className="relative overflow-hidden bg-[#FAFAFA] py-16 sm:py-20">

        <div className="pointer-events-none absolute -top-24 left-1/2 h-48 w-[70%] -translate-x-1/2 rounded-full bg-orange-200/20 blur-3xl" />

        <Container>
          {/* Search & Category Filter Navigation Bar */}

          {/* Product Grid / Empty State */}
          <AnimatePresence mode="wait">
            {filteredProducts.length > 0 ? (
              <motion.div
                key={currentCategorySlug}
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10 justify-items-center"
              >
                {filteredProducts.map((product) => (
                  <motion.div key={product.id} variants={fadeUp}  className="w-full max-w-[360px]">
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                className="bg-premium-surface/80 border border-premium-border/80 rounded-3xl p-12 text-center max-w-xl mx-auto my-12"
              >
                <div className="w-16 h-16 rounded-2xl bg-premium-orange/10 border border-premium-orange/30 text-premium-orange flex items-center justify-center mx-auto mb-4">
                  <Pill className="w-8 h-8" />
                </div>

                <h3 className="font-heading text-xl font-bold text-white mb-2">
                  No Products Found
                </h3>

                <p className="text-sm text-gray-400 leading-relaxed mb-6">
                  No products are currently available in this category.
                </p>

                <div className="flex justify-center gap-3">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleCategoryChange('all')}
                  >
                    View All Products
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </Container>
      </section>
    </div>
  );
};

export default ProductsPage;
