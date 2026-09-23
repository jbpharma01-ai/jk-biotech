const express = require('express');
const {
  getCompanyInfo,
  updateCompanyInfo,
} = require('../controllers/companyController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Public route
router.get('/', getCompanyInfo);

// Protected Admin route
router.put('/', protect, updateCompanyInfo);

module.exports = router;
