const express = require('express');
const { login, getMe } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const { validateAuthLogin } = require('../middleware/validation');

const router = express.Router();

router.post('/login', validateAuthLogin, login);
router.get('/me', protect, getMe);

module.exports = router;
