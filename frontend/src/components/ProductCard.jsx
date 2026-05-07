import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useCart } from '../context/CartContext';
import ProductModal from './ProductModal';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <motion.div
        className="relative bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md cursor-pointer"
        whileHover={{ y: -10, scale: 1.02 }}
        transition={{ duration: 0.3 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        <div className="relative overflow-hidden aspect-square" onClick={() => setModalOpen(true)}>
          <motion.img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ duration: 0.5 }}
          />
          
          {product.discount > 0 && (
            <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
              {product.discount}% OFF
            </div>
          )}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            className="absolute inset-0 bg-black/50 flex items-center justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.stopPropagation();
                addToCart(product);
              }}
              className="bg-white text-gray-800 px-6 py-2 rounded-full font-semibold flex items-center space-x-2 hover:bg-beige-100 transition-colors"
            >
              <ShoppingCartIcon className="w-5 h-5" />
              <span>Add to Cart</span>
            </motion.button>
          </motion.div>
        </div>

        <div className="p-4" onClick={() => setModalOpen(true)}>
          <h3 className="font-semibold text-gray-800 dark:text-white text-lg mb-1 line-clamp-1">
            {product.name}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2 line-clamp-1">
            {product.description}
          </p>
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold text-gray-800 dark:text-white">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <>
                <span className="text-sm text-gray-400 line-through">
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
                <span className="text-xs text-green-600 dark:text-green-400 font-semibold">
                  {product.discount}% off
                </span>
              </>
            )}
          </div>
          <div className="flex items-center mt-2">
            <div className="flex text-yellow-400">
              {'★'.repeat(Math.floor(product.rating || 4))}
              {'☆'.repeat(5 - Math.floor(product.rating || 4))}
            </div>
            <span className="text-xs text-gray-500 ml-1">({product.rating || 4.5})</span>
          </div>
        </div>
      </motion.div>

      <ProductModal 
        open={modalOpen} 
        onClose={() => setModalOpen(false)} 
        product={product} 
      />
    </>
  );
};

export default ProductCard;