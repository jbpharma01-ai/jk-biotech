const express = require('express');
const {
  getAllDocumentCategories,
  getActiveDocumentCategories,
  getDocumentCategoryById,
  getDocumentCategoryBySlug,
  createDocumentCategory,
  updateDocumentCategory,
  deactivateDocumentCategory,
  deleteDocumentCategory,
} = require('../controllers/documentCategoryController');
const { protect } = require('../middleware/authMiddleware');
const { validateObjectId } = require('../middleware/validation');

const router = express.Router();

// Public routes
router.get('/', getActiveDocumentCategories);
router.get('/all', protect, getAllDocumentCategories);
router.get('/slug/:slug', getDocumentCategoryBySlug);
router.get('/:id', validateObjectId('id'), getDocumentCategoryById);

// Protected Admin routes
router.post('/', protect, createDocumentCategory);
router.put('/:id', protect, validateObjectId('id'), updateDocumentCategory);
router.patch('/:id/deactivate', protect, validateObjectId('id'), deactivateDocumentCategory);
router.delete('/:id', protect, validateObjectId('id'), deleteDocumentCategory);

module.exports = router;