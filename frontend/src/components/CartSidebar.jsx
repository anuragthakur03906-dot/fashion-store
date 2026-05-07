// Shopping cart sidebar component with quantity controls and total calculation
import React from 'react';
import {
  Drawer,
  IconButton,
  Button,
  Divider,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import { useCart } from '../context/CartContext';

const CartSidebar = ({ open, onClose }) => {
  const { cart, updateQuantity, removeFromCart, clearCart, loading } = useCart();

  const handleUpdateQuantity = (itemId, currentQuantity, change) => {
    const newQuantity = currentQuantity + change;
    if (newQuantity >= 1) {
      updateQuantity(itemId, newQuantity);
    }
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        className: "w-full sm:w-96 bg-beige-50 dark:bg-gray-900",
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-beige-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white flex items-center">
          <ShoppingBagOutlinedIcon className="mr-2" />
          Your Cart
          <span className="ml-2 text-sm text-gray-500">
            ({cart.items?.length || 0} items)
          </span>
        </h2>
        <IconButton onClick={onClose} className="text-gray-600 dark:text-gray-400">
          <CloseIcon />
        </IconButton>
      </div>

      {/* Cart Items */}
      <div className="flex-1 overflow-y-auto p-4">
        {loading ? (
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-beige-500"></div>
          </div>
        ) : cart.items?.length === 0 ? (
          <div className="text-center py-12">
            <ShoppingBagOutlinedIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400">Your cart is empty</p>
            <button
              onClick={onClose}
              className="mt-4 text-beige-500 hover:text-beige-600 font-semibold"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {cart.items.map((item) => (
              <div
                key={item._id}
                className="flex gap-4 p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm"
              >
                {/* Product Image */}
                <div className="w-20 h-20 bg-beige-100 dark:bg-gray-700 rounded-md overflow-hidden flex-shrink-0">
                  <img
                    src={item.product?.image}
                    alt={item.product?.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Product Details */}
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h3 className="font-semibold text-gray-800 dark:text-white text-sm">
                      {item.product?.name}
                    </h3>
                    <IconButton
                      size="small"
                      onClick={() => removeFromCart(item._id, item.product?.name)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <DeleteOutlineIcon fontSize="small" />
                    </IconButton>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {item.product?.description}
                  </p>
                  <div className="flex justify-between items-center mt-2">
                    <span className="font-bold text-gray-800 dark:text-white">
                      ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                    </span>
                    <div className="flex items-center space-x-2 border border-beige-200 dark:border-gray-600 rounded-lg">
                      <button
                        onClick={() => handleUpdateQuantity(item._id, item.quantity, -1)}
                        className="px-2 py-1 text-gray-600 dark:text-gray-400 hover:text-beige-500"
                      >
                        <RemoveIcon fontSize="small" />
                      </button>
                      <span className="w-8 text-center text-gray-800 dark:text-white">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => handleUpdateQuantity(item._id, item.quantity, 1)}
                        className="px-2 py-1 text-gray-600 dark:text-gray-400 hover:text-beige-500"
                      >
                        <AddIcon fontSize="small" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      {cart.items?.length > 0 && (
        <div className="border-t border-beige-200 dark:border-gray-700 p-4">
          {/* Subtotal */}
          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-gray-600 dark:text-gray-400">
              <span>Subtotal</span>
              <span>₹{cart.totalAmount?.toLocaleString('en-IN') || 0}</span>
            </div>
            <div className="flex justify-between text-gray-600 dark:text-gray-400">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <Divider className="my-2" />
            <div className="flex justify-between text-xl font-bold text-gray-800 dark:text-white">
              <span>Total</span>
              <span>₹{cart.totalAmount?.toLocaleString('en-IN') || 0}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2">
            <Button
              variant="contained"
              fullWidth
              className="bg-beige-500 hover:bg-beige-600 normal-case"
              onClick={() => {
                toast.success('Checkout coming soon!');
              }}
            >
              Proceed to Checkout
            </Button>
            <Button
              variant="outlined"
              fullWidth
              className="border-red-500 text-red-500 hover:border-red-600 hover:text-red-600 normal-case"
              onClick={clearCart}
            >
              Clear Cart
            </Button>
          </div>
        </div>
      )}
    </Drawer>
  );
};

// Add missing toast import
import toast from 'react-hot-toast';

export default CartSidebar;