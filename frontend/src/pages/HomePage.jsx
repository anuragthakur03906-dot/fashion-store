// Main homepage component with all sections
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import HeroSection from '../components/HeroSection';
import FeaturedProducts from '../components/FeaturedProducts';
import CategoriesSection from '../components/CategoriesSection';
import TrendingProducts from '../components/TrendingProducts';
import OffersSection from '../components/OffersSection';
import { useCart } from '../context/CartContext';
import CartSidebar from '../components/CartSidebar';

const HomePage = () => {
  const { cartOpen, toggleCart } = useCart();

  return (
    <div className="overflow-x-hidden">
      <Navbar onCartClick={toggleCart} />
      <CartSidebar open={cartOpen} onClose={toggleCart} />
      <HeroSection />
      <FeaturedProducts />
      <CategoriesSection />
      <TrendingProducts />
      <OffersSection />
      <Footer />
    </div>
  );
};

export default HomePage;