// Cart page component
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button, IconButton } from '@mui/material';
import { DeleteOutline, Add, Remove, ShoppingBagOutlined } from '@mui/icons-material';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';

const CartPage = () => {
  const { cart, updateQuantity, removeFromCart, clearCart, toggleCart } = useCart();

  if (!cart.items?.length) {
    return (
      <>
        <Navbar onCartClick={toggleCart} />
        <div className="min-h-screen bg-beige-50 dark:bg-gray-900 pt-32 flex items-center justify-center px-4">
          <div className="text-center max-w-md">
            <ShoppingBagOutlined className="w-24 h-24 text-gray-400 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Your Cart is Empty</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Looks like you haven't added any items to your cart yet.
            </p>
            <Link to="/products">
              <Button variant="contained" className="bg-beige-500 hover:bg-beige-600">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar onCartClick={toggleCart} />
      <div className="min-h-screen bg-beige-50 dark:bg-gray-900 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Shopping Cart</h1>
            <p className="text-gray-600 dark:text-gray-400">{cart.items.length} items in your cart</p>
          </motion.div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart Items */}
            <div className="flex-1">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                <div className="hidden md:grid grid-cols-12 gap-4 p-4 bg-beige-100 dark:bg-gray-700 font-semibold text-gray-800 dark:text-white">
                  <div className="col-span-6">Product</div>
                  <div className="col-span-2 text-center">Price</div>
                  <div className="col-span-2 text-center">Quantity</div>
                  <div className="col-span-2 text-center">Total</div>
                </div>

                {cart.items.map((item, index) => (
                  <motion.div
                    key={item._id}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 border-b border-beige-200 dark:border-gray-700"
                  >
                    {/* Product Info */}
                    <div className="md:col-span-6 flex gap-4">
                      <img
                        src={item.product?.image}
                        alt={item.product?.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div>
                        <h3 className="font-semibold text-gray-800 dark:text-white">{item.product?.name}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{item.product?.description}</p>
                        <button
                          onClick={() => removeFromCart(item._id, item.product?.name)}
                          className="text-red-500 text-sm mt-1 hover:text-red-600 flex items-center gap-1"
                        >
                          <DeleteOutline className="w-4 h-4" /> Remove
                        </button>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="md:col-span-2 flex items-center justify-start md:justify-center">
                      <span className="font-semibold text-gray-800 dark:text-white">
                        ₹{item.price.toLocaleString('en-IN')}
                      </span>
                    </div>

                    {/* Quantity */}
                    <div className="md:col-span-2 flex items-center justify-start md:justify-center">
                      <div className="flex items-center space-x-2 border border-beige-200 dark:border-gray-600 rounded-lg">
                        <button
                          onClick={() => updateQuantity(item._id, item.quantity - 1)}
                          className="px-3 py-1 hover:bg-beige-100 dark:hover:bg-gray-700"
                        >
                          <Remove className="w-4 h-4" />
                        </button>
                        <span className="w-12 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item._id, item.quantity + 1)}
                          className="px-3 py-1 hover:bg-beige-100 dark:hover:bg-gray-700"
                        >
                          <Add className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Total */}
                    <div className="md:col-span-2 flex items-center justify-start md:justify-center">
                      <span className="font-bold text-beige-600 dark:text-beige-400">
                        ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-4 flex justify-between">
                <Link to="/products">
                  <Button variant="outlined" className="border-beige-500 text-beige-500">
                    Continue Shopping
                  </Button>
                </Link>
                <Button variant="outlined" onClick={clearCart} className="border-red-500 text-red-500">
                  Clear Cart
                </Button>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:w-96">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 sticky top-24"
              >
                <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Order Summary</h2>
                
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between text-gray-600 dark:text-gray-400">
                    <span>Subtotal</span>
                    <span>₹{cart.totalAmount?.toLocaleString('en-IN') || 0}</span>
                  </div>
                  <div className="flex justify-between text-gray-600 dark:text-gray-400">
                    <span>Shipping</span>
                    <span className="text-green-600">Free</span>
                  </div>
                  <div className="border-t border-beige-200 dark:border-gray-700 pt-3">
                    <div className="flex justify-between text-lg font-bold text-gray-800 dark:text-white">
                      <span>Total</span>
                      <span>₹{cart.totalAmount?.toLocaleString('en-IN') || 0}</span>
                    </div>
                  </div>
                </div>

                <Button
                  variant="contained"
                  fullWidth
                  className="bg-beige-500 hover:bg-beige-600 py-3"
                  sx={{ borderRadius: '8px', textTransform: 'none' }}
                >
                  Proceed to Checkout
                </Button>

                <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-4">
                  Free shipping on all orders
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CartPage;