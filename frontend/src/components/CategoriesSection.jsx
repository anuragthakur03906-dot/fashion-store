import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const categories = [
  {
    id: 1,
    name: "Women",
    displayName: "Women's Fashion",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600",
    count: "245+ Products",
  },
  {
    id: 2,
    name: "Men",
    displayName: "Men's Collection",
    image: "https://images.unsplash.com/photo-1617137968427-85924c800a5a?w=600",
    count: "189+ Products",
  },
  {
    id: 3,
    name: "Kids",
    displayName: "Kids Collection",
    image: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=600",
    count: "156+ Products",
  },
  {
    id: 4,
    name: "Accessories",
    displayName: "Accessories",
    image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=600",
    count: "156+ Products",
  },
  {
    id: 5,
    name: "Shoes",
    displayName: "Footwear",
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600",
    count: "98+ Products",
  },
];

const CategoriesSection = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryName) => {
    // Correctly navigate to products page with category filter
    navigate(`/products?category=${categoryName}`);
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-beige-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto overflow-x-hidden">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
            Shop by Category
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-sm sm:text-base px-4">
            Explore our curated collections across different categories
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              onClick={() => handleCategoryClick(category.name)}
              className="relative group cursor-pointer overflow-hidden rounded-2xl shadow-lg"
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={category.image}
                  alt={category.displayName}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=600';
                  }}
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-4 sm:p-6">
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-1">{category.displayName}</h3>
                <p className="text-white/80 text-xs sm:text-sm">{category.count}</p>
                <button className="mt-2 text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                  Shop Now →
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;