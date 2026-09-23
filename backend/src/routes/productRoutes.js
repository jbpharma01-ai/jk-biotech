const express = require('express');
const {
  getAllProducts,
  getActiveProducts,
  getProductById,
  getProductBySlug,
  getProductsByCategory,
  getRelatedProducts,
  createProduct,
  updateProduct,
  deactivateProduct,
  deleteProduct,
} = require('../controllers/productController');
const upload = require('../middleware/upload');
const { protect } = require('../middleware/authMiddleware');
const { validateObjectId } = require('../middleware/validation');

const router = express.Router();

// Public routes
router.get('/', getActiveProducts);
router.get('/all', getAllProducts);
router.get('/slug/:slug', getProductBySlug);
router.get('/category/:categoryIdentifier', getProductsByCategory);
router.get('/:id/related', validateObjectId('id'), getRelatedProducts);
router.get('/:id', validateObjectId('id'), getProductById);

// Protected Admin routes
router.post('/', protect, upload.single('image'), createProduct);
router.put('/:id', protect, validateObjectId('id'), upload.single('image'), updateProduct);
router.patch('/:id/deactivate', protect, validateObjectId('id'), deactivateProduct);
router.delete('/:id', protect, validateObjectId('id'), deleteProduct);

module.exports = router;