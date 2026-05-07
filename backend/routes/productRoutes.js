// Product routes
const express = require('express');
const router = express.Router();
const {
  getProducts,
  getProductById,
  seedProducts,
} = require('../controllers/productController');

router.route('/').get(getProducts);
router.route('/seed').post(seedProducts);
router.route('/:id').get(getProductById);

module.exports = router;