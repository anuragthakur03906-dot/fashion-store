import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';

const AboutPage = () => {
  const { toggleCart } = useCart();

  const features = [
    { 
      icon: (
        <svg className="w-12 h-12 mx-auto text-beige-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
        </svg>
      ), 
      title: "Free Shipping", 
      desc: "Free delivery on orders above ₹999" 
    },
    { 
      icon: (
        <svg className="w-12 h-12 mx-auto text-beige-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      ), 
      title: "Easy Returns", 
      desc: "30-day return policy on all items" 
    },
    { 
      icon: (
        <svg className="w-12 h-12 mx-auto text-beige-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ), 
      title: "Secure Payment", 
      desc: "100% secure payment methods" 
    },
    { 
      icon: (
        <svg className="w-12 h-12 mx-auto text-beige-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      ), 
      title: "Quality Guarantee", 
      desc: "Premium quality products" 
    },
    { 
      icon: (
        <svg className="w-12 h-12 mx-auto text-beige-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
        </svg>
      ), 
      title: "Rewards Program", 
      desc: "Earn points on every purchase" 
    },
    { 
      icon: (
        <svg className="w-12 h-12 mx-auto text-beige-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ), 
      title: "24/7 Support", 
      desc: "Dedicated customer support" 
    },
  ];

  return (
    <>
      <Navbar onCartClick={toggleCart} />
      <div className="min-h-screen bg-beige-50 dark:bg-gray-900 pt-20">
        {/* Hero Section */}
        <div className="relative h-[400px] overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1920"
            alt="About Us"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center text-white"
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-4">About Us</h1>
              <p className="text-xl">Your Trusted Fashion Partner Since 2020</p>
            </motion.div>
          </div>
        </div>

        {/* Our Story */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">Our Story</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Founded in 2020, FashionStore began with a simple vision: to make premium 
                  fashion accessible to everyone. We believe that style should never be 
                  compromised, and quality should never be an afterthought.
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  Today, we're proud to serve thousands of happy customers across India, 
                  offering curated collections that blend contemporary trends with timeless elegance.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="rounded-2xl overflow-hidden shadow-xl"
              >
                <img
                  src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600"
                  alt="Our Story"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center p-8 rounded-2xl bg-beige-50 dark:bg-gray-700"
              >
                <svg className="w-16 h-16 mx-auto text-beige-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-3">Our Mission</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  To empower individuals through fashion by providing high-quality, 
                  trendy clothing that boosts confidence and expresses personality.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-center p-8 rounded-2xl bg-beige-50 dark:bg-gray-700"
              >
                <svg className="w-16 h-16 mx-auto text-beige-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-3">Our Vision</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  To become India's most loved fashion destination, known for quality, 
                  style, and exceptional customer service.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features with Custom SVGs */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-12">
              Why Choose Us?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition"
                >
                  {feature.icon}
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2 mt-4">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default AboutPage;