// Products page with filtering and sorting - Updated for mobile
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { getProducts } from '../services/api';
import { useCart } from '../context/CartContext';
import { TextField, MenuItem, Select, FormControl, InputLabel, Pagination, Drawer, IconButton } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const { toggleCart } = useCart();
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  
  const [category, setCategory] = useState(searchParams.get('category') || 'all');
  const [sortBy, setSortBy] = useState('default');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    filterAndSortProducts();
  }, [products, category, sortBy, searchQuery]);

  const fetchProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortProducts = () => {
    let filtered = [...products];

    if (category !== 'all') {
      filtered = filtered.filter(p => p.category === category);
    }

    if (searchQuery) {
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'discount':
        filtered.sort((a, b) => (b.discount || 0) - (a.discount || 0));
        break;
      default:
        break;
    }

    setFilteredProducts(filtered);
    setCurrentPage(1);
  };

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    setSearchParams({ category: newCategory });
    setFilterDrawerOpen(false);
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

const categories = ['all', 'Women', 'Men', 'Kids', 'Accessories', 'Shoes'];

  const FilterContent = () => (
    <div className="p-4 w-72">
      <div className="mb-4 flex justify-between items-center">
        <h3 className="font-bold text-lg">Filters</h3>
        <IconButton onClick={() => setFilterDrawerOpen(false)}>
          <FilterListIcon />
        </IconButton>
      </div>
      
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Search</label>
        <TextField
          fullWidth
          size="small"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Category</label>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => handleCategoryChange(cat)}
            className={`block w-full text-left px-3 py-2 rounded-md mb-1 ${
              category === cat 
                ? 'bg-beige-500 text-white' 
                : 'hover:bg-beige-100 dark:hover:bg-gray-700'
            }`}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Sort By</label>
        <Select
          fullWidth
          size="small"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <MenuItem value="default">Default</MenuItem>
          <MenuItem value="price-low">Price: Low to High</MenuItem>
          <MenuItem value="price-high">Price: High to Low</MenuItem>
          <MenuItem value="rating">Top Rated</MenuItem>
          <MenuItem value="discount">Biggest Discount</MenuItem>
        </Select>
      </div>
    </div>
  );

  return (
    <>
      <Navbar onCartClick={toggleCart} />
      <div className="min-h-screen bg-beige-50 dark:bg-gray-900 pt-20 overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 sm:mb-8"
          >
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-white mb-2">Our Collection</h1>
            <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">Discover our latest fashion collection</p>
          </motion.div>

          {/* Mobile Filter Button */}
          <div className="md:hidden mb-4">
            <button
              onClick={() => setFilterDrawerOpen(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-beige-500 text-white rounded-lg"
            >
              <FilterListIcon />
              <span>Filters & Sort</span>
            </button>
          </div>

          <div className="flex flex-col md:flex-row gap-6">
            {/* Desktop Sidebar */}
            <div className="hidden md:block w-64 flex-shrink-0">
              <div className="sticky top-24 bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">Search</label>
                  <TextField
                    fullWidth
                    size="small"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">Category</label>
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => handleCategoryChange(cat)}
                      className={`block w-full text-left px-3 py-2 rounded-md mb-1 ${
                        category === cat 
                          ? 'bg-beige-500 text-white' 
                          : 'hover:bg-beige-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </button>
                  ))}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Sort By</label>
                  <Select
                    fullWidth
                    size="small"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <MenuItem value="default">Default</MenuItem>
                    <MenuItem value="price-low">Price: Low to High</MenuItem>
                    <MenuItem value="price-high">Price: High to Low</MenuItem>
                    <MenuItem value="rating">Top Rated</MenuItem>
                    <MenuItem value="discount">Biggest Discount</MenuItem>
                  </Select>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className="flex-1">
              <div className="mb-4 text-gray-600 dark:text-gray-400 text-sm">
                Showing {currentProducts.length} of {filteredProducts.length} products
              </div>

              {loading ? (
                <LoadingSpinner />
              ) : (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {currentProducts.map((product, index) => (
                      <motion.div
                        key={product._id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <ProductCard product={product} />
                      </motion.div>
                    ))}
                  </div>

                  {totalPages > 1 && (
                    <div className="flex justify-center mt-8 overflow-x-auto pb-2">
                      <Pagination
                        count={totalPages}
                        page={currentPage}
                        onChange={(e, value) => setCurrentPage(value)}
                        color="primary"
                        size="large"
                        siblingCount={window.innerWidth < 640 ? 0 : 1}
                      />
                    </div>
                  )}

                  {filteredProducts.length === 0 && (
                    <div className="text-center py-12">
                      <p className="text-gray-500 dark:text-gray-400 text-lg">
                        No products found matching your criteria.
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      <Drawer
        anchor="left"
        open={filterDrawerOpen}
        onClose={() => setFilterDrawerOpen(false)}
      >
        <FilterContent />
      </Drawer>
      <Footer />
    </>
  );
};

export default ProductsPage;