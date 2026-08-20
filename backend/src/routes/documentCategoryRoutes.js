const express = require('express');

const {
  getAllDocumentCategories,
  getActiveDocumentCategories,
  getDocumentCategoryById,
  createDocumentCategory,
  updateDocumentCategory,
  deactivateDocumentCategory,
} = require('../controllers/documentCategoryController');

const router = express.Router();

// Get all document categories
router.get('/', getAllDocumentCategories);

// Get active document categories for public website
router.get('/active', getActiveDocumentCategories);

// Get single document category
router.get('/:id', getDocumentCategoryById);

// Create document category
router.post('/', createDocumentCategory);

// Update document category
router.put('/:id', updateDocumentCategory);

// Deactivate document category
router.delete('/:id', deactivateDocumentCategory);

module.exports = router;