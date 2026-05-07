// Footer component - Updated with correct info and social links
import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Email, LocationOn, LinkedIn, GitHub } from '@mui/icons-material';

const Footer = () => {
  return (
    <footer className="bg-beige-100 dark:bg-gray-900 pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
              Fashion<span className="text-beige-500">Store</span>
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Your premier destination for trendy and quality fashion.
            </p>
            <div className="flex space-x-3">
              <a href="https://linkedin.com/in/anuragthakur" target="_blank" rel="noopener noreferrer" className="p-2 bg-beige-200 dark:bg-gray-800 rounded-full hover:bg-beige-300 transition">
                <LinkedIn className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              </a>
              <a href="https://github.com/anuragthakur" target="_blank" rel="noopener noreferrer" className="p-2 bg-beige-200 dark:bg-gray-800 rounded-full hover:bg-beige-300 transition">
                <GitHub className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-gray-800 dark:text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-600 dark:text-gray-400 hover:text-beige-500">Home</Link></li>
              <li><Link to="/products" className="text-gray-600 dark:text-gray-400 hover:text-beige-500">Products</Link></li>
              <li><Link to="/about" className="text-gray-600 dark:text-gray-400 hover:text-beige-500">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-600 dark:text-gray-400 hover:text-beige-500">Contact</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-semibold text-gray-800 dark:text-white mb-4">Categories</h4>
            <ul className="space-y-2">
              <li><Link to="/products?category=Women" className="text-gray-600 dark:text-gray-400 hover:text-beige-500">Women's Fashion</Link></li>
              <li><Link to="/products?category=Men" className="text-gray-600 dark:text-gray-400 hover:text-beige-500">Men's Collection</Link></li>
              <li><Link to="/products?category=Accessories" className="text-gray-600 dark:text-gray-400 hover:text-beige-500">Accessories</Link></li>
              <li><Link to="/products?category=Shoes" className="text-gray-600 dark:text-gray-400 hover:text-beige-500">Footwear</Link></li>
            </ul>
          </div>

          {/* Contact Info - Updated */}
          <div>
            <h4 className="font-semibold text-gray-800 dark:text-white mb-4">Contact Info</h4>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3 text-gray-600 dark:text-gray-400">
                <Phone className="w-5 h-5" />
                <span>+91 8580909512</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-600 dark:text-gray-400">
                <Email className="w-5 h-5" />
                <span>anuragthakur03906@gmail.com</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-600 dark:text-gray-400">
                <LocationOn className="w-5 h-5" />
                <span>Himachal Pradesh, India</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-beige-200 dark:border-gray-800 pt-6 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            &copy; 2024 FashionStore. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;