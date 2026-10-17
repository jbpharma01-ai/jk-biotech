import React from 'react';
import { Routes, Route, useParams } from 'react-router-dom';
import PlaceholderPage from '../pages/PlaceholderPage';
import HomePage from '../pages/home/HomePage';
import AboutPage from '../pages/about/AboutPage';
import ProductsPage from '../pages/ProductsPage';
import ProductDetailsPage from '../pages/ProductDetailsPage';
import PRODUCTS from '../constants/products';
import ContactPage from '../pages/contact/ContactPage';
import { fetchProductBySlug } from '../services/api';

const DynamicDownloadPage = () => {
  const { category } = useParams();
  const formattedTitle = category
    ? category.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
    : 'Downloads';

  return (
    <PlaceholderPage
      title={formattedTitle}
      subtitle={`${formattedTitle} Visual Aids, Product Catalogs & Prescribing Literature`}
      breadcrumbs={[
        { label: 'Downloads', path: '/downloads' },
        { label: formattedTitle, path: `/downloads/${category}` },
      ]}
      type="download"
    />
  );
};

// Route dispatcher that differentiates category pages (/products/:category) vs product details pages (/products/:slug)

const ProductRouteDispatcher = () => {
  const { identifier } = useParams();

  const [pageType, setPageType] = React.useState('loading');

  React.useEffect(() => {
    let isMounted = true;

    const checkProduct = async () => {
      if (!identifier) {
        if (isMounted) setPageType('catalog');
        return;
      }

      // First check existing static products
      const isStaticProduct = PRODUCTS.some(
        (p) =>
          p.slug &&
          p.slug.toLowerCase() === identifier.toLowerCase()
      );

      if (isStaticProduct) {
        if (isMounted) setPageType('details');
        return;
      }

      // Then check products added from the Admin Panel
      try {
        const apiData = await fetchProductBySlug(identifier);

        if (!isMounted) return;

        if (apiData) {
          setPageType('details');
        } else {
          // Not a product: treat it as a category
          setPageType('catalog');
        }
      } catch (error) {
        console.error('Error checking product slug:', error);

        if (isMounted) {
          setPageType('catalog');
        }
      }
    };

    checkProduct();

    return () => {
      isMounted = false;
    };
  }, [identifier]);

  if (pageType === 'loading') {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (pageType === 'details') {
    return <ProductDetailsPage />;
  }

  return <ProductsPage />;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Home Route */}
      <Route path="/" element={<HomePage />} />

      {/* About Route */}
      <Route path="/about" element={<AboutPage />} />

      {/* Main Products Catalog Route */}
      <Route path="/products" element={<ProductsPage />} />

      {/* Explicit Product Details Route (optional fallback) */}
      <Route path="/products/detail/:slug" element={<ProductDetailsPage />} />

      {/* Dynamic Products Route: Category Page (/products/:category) or Product Details Page (/products/:slug) */}
      <Route path="/products/:identifier" element={<ProductRouteDispatcher />} />

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

      {/* Dynamic Download Category Route */}
      <Route
        path="/downloads/:category"
        element={<DynamicDownloadPage />}
      />

      {/* Contact Route */}
      <Route
        path="/contact"
        element={<ContactPage />}
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
