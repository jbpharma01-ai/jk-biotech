const express = require('express');
const {
  getAllCategories,
  getActiveCategories,
  getCategoryById,
  getCategoryBySlug,
  createCategory,
  updateCategory,
  deactivateCategory,
  deleteCategory,
} = require('../controllers/categoryController');
const upload = require('../middleware/upload');
const { protect } = require('../middleware/authMiddleware');
const { validateObjectId } = require('../middleware/validation');

const router = express.Router();

// Public routes
router.get('/', getActiveCategories);
router.get('/all', getAllCategories);
router.get('/slug/:slug', getCategoryBySlug);
router.get('/:id', validateObjectId('id'), getCategoryById);

// Protected Admin routes
router.post('/', protect, upload.single('image'), createCategory);
router.put('/:id', protect, validateObjectId('id'), upload.single('image'), updateCategory);
router.patch('/:id/deactivate', protect, validateObjectId('id'), deactivateCategory);
router.delete('/:id', protect, validateObjectId('id'), deleteCategory);

module.exports = router;