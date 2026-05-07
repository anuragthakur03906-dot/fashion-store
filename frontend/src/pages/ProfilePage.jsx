import React from 'react';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';

const ProfilePage = () => {
  const { user } = useAuth();
  const { toggleCart } = useCart();

  return (
    <>
      <Navbar onCartClick={toggleCart} />
      <div className="min-h-screen bg-beige-50 dark:bg-gray-900 pt-20">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8"
          >
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">My Profile</h1>
            
            <div className="space-y-4">
              <div className="border-b border-beige-200 dark:border-gray-700 pb-4">
                <p className="text-sm text-gray-500 dark:text-gray-400">Full Name</p>
                <p className="text-lg font-semibold text-gray-800 dark:text-white">{user?.name}</p>
              </div>
              
              <div className="border-b border-beige-200 dark:border-gray-700 pb-4">
                <p className="text-sm text-gray-500 dark:text-gray-400">Email Address</p>
                <p className="text-lg font-semibold text-gray-800 dark:text-white">{user?.email}</p>
              </div>
              
              <div className="border-b border-beige-200 dark:border-gray-700 pb-4">
                <p className="text-sm text-gray-500 dark:text-gray-400">Member Since</p>
                <p className="text-lg font-semibold text-gray-800 dark:text-white">
                  {new Date().toLocaleDateString()}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProfilePage;