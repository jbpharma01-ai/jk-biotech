const express = require('express');
const {
  getAllDocuments,
  getActiveDocuments,
  getDocumentsByCategory,
  getDocumentById,
  createDocument,
  updateDocument,
  deactivateDocument,
  deleteDocument,
} = require('../controllers/documentController');
const upload = require('../middleware/upload');
const { protect } = require('../middleware/authMiddleware');
const { validateObjectId } = require('../middleware/validation');

const router = express.Router();

// Public routes
router.get('/', getActiveDocuments);
router.get('/all', protect, getAllDocuments);
router.get('/category/:categoryIdentifier', getDocumentsByCategory);
router.get('/:id', validateObjectId('id'), getDocumentById);

// Protected Admin routes
router.post('/', protect, upload.single('file'), createDocument);
router.put('/:id', protect, validateObjectId('id'), upload.single('file'), updateDocument);
router.patch('/:id/deactivate', protect, validateObjectId('id'), deactivateDocument);
router.delete('/:id', protect, validateObjectId('id'), deleteDocument);

module.exports = router;