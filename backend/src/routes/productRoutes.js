const express = require('express');

const {
  getAllProducts,
  getActiveProducts,
  getProductById,
  createProduct,
  updateProduct,
  deactivateProduct,
} = require('../controllers/productController');

const upload = require('../middleware/upload');

const router = express.Router();

// Get all products
router.get('/', getAllProducts);

// Get active products for public website
router.get('/active', getActiveProducts);

// Get single product
router.get('/:id', getProductById);

// Create product
router.post('/', upload.single('image'), createProduct);

// Update product
router.put('/:id', upload.single('image'), updateProduct);

// Deactivate product
router.delete('/:id', deactivateProduct);

module.exports = router;