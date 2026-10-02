const express = require('express');
const { login, getMe, changePassword, resetPassword, } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const { validateAuthLogin } = require('../middleware/validation');

const router = express.Router();

router.post('/login', validateAuthLogin, login);
router.get('/me', protect, getMe);
router.post('/change-password', protect, changePassword);
router.post('/reset-password', resetPassword);

module.exports = router;
