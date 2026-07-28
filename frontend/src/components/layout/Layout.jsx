import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import ScrollToTopButton from '../common/ScrollToTopButton';
import ScrollToTopOnNavigate from '../../routes/ScrollToTopOnNavigate';

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-800 antialiased font-sans">
      <ScrollToTopOnNavigate />
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
      <ScrollToTopButton />
    </div>
  );
};

export default Layout;
