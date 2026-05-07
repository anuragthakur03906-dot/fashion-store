import React from 'react';
import { Dialog, IconButton, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';

const ProductModal = ({ open, onClose, product }) => {
  const { addToCart } = useCart();

  if (!product) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        className: "rounded-2xl overflow-hidden m-4 sm:m-0"
      }}
    >
      <div className="relative bg-white dark:bg-gray-900">
        {/* Close button on top right */}
        <IconButton
          onClick={onClose}
          className="absolute top-3 right-3 z-10 bg-white dark:bg-gray-800 shadow-md hover:bg-gray-100 dark:hover:bg-gray-700"
          sx={{ 
            position: 'absolute',
            top: 10,
            right: 10,
            backgroundColor: 'white',
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
            '&:hover': { backgroundColor: '#f5f0e8' }
          }}
        >
          <CloseIcon />
        </IconButton>

        <div className="grid md:grid-cols-2 gap-6 p-4 sm:p-6">
          {/* Product Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="rounded-xl overflow-hidden bg-beige-50"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Product Details */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white pr-8">
              {product.name}
            </h2>
            
            <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base">
              {product.description}
            </p>

            <div className="flex items-center space-x-3">
              <span className="text-2xl md:text-3xl font-bold text-beige-600">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <>
                  <span className="text-base md:text-lg text-gray-400 line-through">
                    ₹{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                  <span className="text-xs md:text-sm text-green-600 font-semibold">
                    {product.discount}% OFF
                  </span>
                </>
              )}
            </div>

            <div className="flex items-center">
              <div className="flex text-yellow-400 text-sm md:text-base">
                {'★'.repeat(Math.floor(product.rating || 4))}
                {'☆'.repeat(5 - Math.floor(product.rating || 4))}
              </div>
              <span className="text-xs md:text-sm text-gray-500 ml-2">({product.rating || 4.5} reviews)</span>
            </div>

            <div className="border-t border-beige-200 dark:border-gray-700 pt-4">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                Category: <span className="font-semibold">{product.category}</span>
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Availability: {product.inStock ? 
                  <span className="text-green-600">In Stock</span> : 
                  <span className="text-red-600">Out of Stock</span>}
              </p>
            </div>

            <Button
              variant="contained"
              fullWidth
              onClick={() => {
                addToCart(product);
                onClose();
              }}
              startIcon={<ShoppingCartIcon />}
              sx={{
                backgroundColor: '#b8a99a',
                '&:hover': { backgroundColor: '#9e8d7c' },
                py: 1.5,
                borderRadius: '10px',
                textTransform: 'none'
              }}
            >
              Add to Cart
            </Button>
          </motion.div>
        </div>
      </div>
    </Dialog>
  );
};

export default ProductModal;