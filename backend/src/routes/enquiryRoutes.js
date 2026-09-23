const express = require('express');
const {
  createEnquiry,
  getAllEnquiries,
  getEnquiryById,
  updateEnquiryStatus,
  deleteEnquiry,
} = require('../controllers/enquiryController');
const { protect } = require('../middleware/authMiddleware');
const { validateEnquiry, validateObjectId } = require('../middleware/validation');

const router = express.Router();

// Public route: submit contact enquiry
router.post('/', validateEnquiry, createEnquiry);

// Protected Admin routes
router.get('/', protect, getAllEnquiries);
router.get('/:id', protect, validateObjectId('id'), getEnquiryById);
router.patch('/:id/status', protect, validateObjectId('id'), updateEnquiryStatus);
router.delete('/:id', protect, validateObjectId('id'), deleteEnquiry);

module.exports = router;
