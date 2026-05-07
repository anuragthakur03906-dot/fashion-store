// Cart context for global cart state management with localStorage persistence
import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const API_URL = 'http://localhost:5000/api';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ items: [], totalAmount: 0 });
  const [loading, setLoading] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  // Load cart from backend or localStorage
  const loadCart = useCallback(async () => {
    setLoading(true);
    try {
      // First try to get from localStorage (for offline mode)
      const localCart = localStorage.getItem('cart');
      if (localCart) {
        setCart(JSON.parse(localCart));
      }
      
      // Then sync with backend
      const response = await axios.get(`${API_URL}/cart`);
      if (response.data) {
        setCart(response.data);
        localStorage.setItem('cart', JSON.stringify(response.data));
      }
    } catch (error) {
      console.error('Error loading cart:', error);
      // If backend fails, use localStorage data
      const localCart = localStorage.getItem('cart');
      if (localCart) {
        setCart(JSON.parse(localCart));
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCart();
  }, [loadCart]);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (cart.items.length > 0 || cart.totalAmount > 0) {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }, [cart]);

  // Add item to cart
  const addToCart = async (product, quantity = 1) => {
    try {
      const response = await axios.post(`${API_URL}/cart`, {
        productId: product._id,
        quantity,
      });
      setCart(response.data);
      localStorage.setItem('cart', JSON.stringify(response.data));
      toast.success(`${product.name} added to cart!`);
      setCartOpen(true); // Open cart sidebar when adding item
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Failed to add item to cart');
    }
  };

  // Update cart item quantity
  const updateQuantity = async (itemId, quantity) => {
    try {
      const response = await axios.put(`${API_URL}/cart/${itemId}`, { quantity });
      setCart(response.data);
      localStorage.setItem('cart', JSON.stringify(response.data));
    } catch (error) {
      console.error('Error updating quantity:', error);
      toast.error('Failed to update quantity');
    }
  };

  // Remove item from cart
  const removeFromCart = async (itemId, productName) => {
    try {
      const response = await axios.delete(`${API_URL}/cart/${itemId}`);
      setCart(response.data);
      localStorage.setItem('cart', JSON.stringify(response.data));
      toast.success(`${productName || 'Item'} removed from cart`);
    } catch (error) {
      console.error('Error removing from cart:', error);
      toast.error('Failed to remove item from cart');
    }
  };

  // Clear cart
  const clearCart = async () => {
    try {
      await axios.delete(`${API_URL}/cart`);
      setCart({ items: [], totalAmount: 0 });
      localStorage.removeItem('cart');
      toast.success('Cart cleared');
    } catch (error) {
      console.error('Error clearing cart:', error);
      toast.error('Failed to clear cart');
    }
  };

  const toggleCart = () => setCartOpen(!cartOpen);

  return (
    <CartContext.Provider value={{
      cart,
      loading,
      cartOpen,
      toggleCart,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
      totalItems: cart.items?.reduce((total, item) => total + item.quantity, 0) || 0,
    }}>
      {children}
    </CartContext.Provider>
  );
};