const express = require('express');

const {
  getAllCategories,
  getActiveCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deactivateCategory,
} = require('../controllers/categoryController');

const upload = require('../middleware/upload');

const router = express.Router();

// Get all categories
router.get('/', getAllCategories);

router.get('/active', getActiveCategories);

// Get single category
router.get('/:id', getCategoryById);

// Create category
router.post('/', upload.single('image'), createCategory);

// Update category
router.put('/:id', upload.single('image'), updateCategory);

// Deactivate category
router.delete('/:id', deactivateCategory);

module.exports = router;