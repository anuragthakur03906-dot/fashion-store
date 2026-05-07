import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button, IconButton } from '@mui/material';
import { ChevronLeft, ChevronRight, Star, StarBorder } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Fashion Blogger",
    content: "Absolutely love the quality and style of their collection! Fast shipping and great customer service.",
    rating: 5,
    image: "https://randomuser.me/api/portraits/women/1.jpg",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Business Professional",
    content: "Best online shopping experience. The products are exactly as described and the fit is perfect.",
    rating: 5,
    image: "https://randomuser.me/api/portraits/men/2.jpg",
  },
  {
    id: 3,
    name: "Emma Watson",
    role: "Style Influencer",
    content: "My go-to store for trendy fashion! The prices are reasonable and quality is premium.",
    rating: 4,
    image: "https://randomuser.me/api/portraits/women/3.jpg",
  },
];

const offers = [
  { 
    discount: "30% OFF", 
    code: "FASHION30", 
    valid: "Limited Time",
    bgImage: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=800",
    title: "Summer Sale"
  },
  { 
    discount: "Free Shipping", 
    code: "FREESHIP", 
    valid: "Above ₹999",
    bgImage: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800",
    title: "Premium Delivery"
  },
];

const OffersSection = () => {
  const navigate = useNavigate();
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto">
        {/* Offers Banner with Background Images */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 dark:text-white mb-8">
            Special Offers
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {offers.map((offer, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                onClick={() => navigate('/products')}
                className="relative overflow-hidden rounded-2xl cursor-pointer h-64"
                style={{
                  backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${offer.bgImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                <div className="relative z-10 h-full flex flex-col items-center justify-center text-center p-8">
                  <h3 className="text-5xl font-bold text-white mb-2">{offer.discount}</h3>
                  <p className="text-white/90 text-lg mb-2">{offer.title}</p>
                  <p className="text-white/80 mb-4">Use Code: <span className="font-mono bg-white/20 px-3 py-1 rounded">{offer.code}</span></p>
                  <p className="text-white/70 text-sm mb-6">{offer.valid}</p>
                  <Button
                    variant="contained"
                    onClick={() => navigate('/products')}
                    sx={{
                      backgroundColor: 'white',
                      color: '#b8a99a',
                      borderRadius: '50px',
                      textTransform: 'none',
                      '&:hover': { backgroundColor: '#f5f0e8' }
                    }}
                  >
                    Shop Now
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
            What Our Customers Say
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Join thousands of happy customers who love shopping with us
          </p>

          <div className="max-w-3xl mx-auto relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="bg-beige-50 dark:bg-gray-700 rounded-2xl p-8 shadow-lg"
              >
                <div className="flex justify-center mb-4">
                  <img
                    src={testimonials[currentTestimonial].image}
                    alt={testimonials[currentTestimonial].name}
                    className="w-20 h-20 rounded-full object-cover border-4 border-beige-400"
                  />
                </div>
                <div className="flex justify-center mb-3">
                  {[...Array(5)].map((_, i) => (
                    i < testimonials[currentTestimonial].rating ? (
                      <Star key={i} className="text-yellow-500 w-5 h-5" />
                    ) : (
                      <StarBorder key={i} className="text-gray-400 w-5 h-5" />
                    )
                  ))}
                </div>
                <p className="text-gray-700 dark:text-gray-300 text-lg italic mb-4">
                  "{testimonials[currentTestimonial].content}"
                </p>
                <h4 className="font-bold text-gray-800 dark:text-white">
                  {testimonials[currentTestimonial].name}
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {testimonials[currentTestimonial].role}
                </p>
              </motion.div>
            </AnimatePresence>

            <IconButton
              onClick={prevTestimonial}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 -ml-2 md:-ml-4 bg-white dark:bg-gray-800 shadow-lg"
              sx={{ boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
            >
              <ChevronLeft />
            </IconButton>
            <IconButton
              onClick={nextTestimonial}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 -mr-2 md:-mr-4 bg-white dark:bg-gray-800 shadow-lg"
              sx={{ boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
            >
              <ChevronRight />
            </IconButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default OffersSection;