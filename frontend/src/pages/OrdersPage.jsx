import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';
import { ShoppingBagOutlined } from '@mui/icons-material';

const OrdersPage = () => {
  const { toggleCart } = useCart();
  const orders = []; // Will be populated from backend

  return (
    <>
      <Navbar onCartClick={toggleCart} />
      <div className="min-h-screen bg-beige-50 dark:bg-gray-900 pt-20">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">My Orders</h1>
            
            {orders.length === 0 ? (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-12 text-center">
                <ShoppingBagOutlined className="w-20 h-20 text-gray-400 mx-auto mb-4" />
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">No Orders Yet</h2>
                <p className="text-gray-600 dark:text-gray-400">Start shopping to see your orders here</p>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Orders will be listed here */}
              </div>
            )}
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default OrdersPage;