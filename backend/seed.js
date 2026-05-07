// backend/seed.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');
const products = require('./data/products');

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/fashion_store');
    console.log('MongoDB Connected');
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
};

const seedProducts = async () => {
  try {
    await connectDB();
    
    // Delete existing products
    await Product.deleteMany({});
    console.log('Existing products deleted');
    
    // Insert new products
    const inserted = await Product.insertMany(products);
    console.log(`${inserted.length} products seeded successfully`);
    
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seedProducts();