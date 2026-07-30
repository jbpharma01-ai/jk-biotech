import React from 'react';
import HeroSection from './HeroSection';
import FeatureCardsSection from './FeatureCardsSection';
import AboutPreviewSection from './AboutPreviewSection';
import ProductsSection from './ProductsSection';

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <FeatureCardsSection />
      <ProductsSection />
      <AboutPreviewSection />
    </div>
  );
};

export default HomePage;
