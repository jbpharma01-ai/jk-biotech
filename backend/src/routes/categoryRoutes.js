const express = require('express');

const {
  getAllCategories,
  getActiveCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deactivateCategory,
} = require('../controllers/categoryController');

const router = express.Router();

// Get all categories
router.get('/', getAllCategories);

router.get('/active', getActiveCategories);

// Get single category
router.get('/:id', getCategoryById);

// Create category
router.post('/', createCategory);

// Update category
router.put('/:id', updateCategory);

// Deactivate category
router.delete('/:id', deactivateCategory);

module.exports = router;