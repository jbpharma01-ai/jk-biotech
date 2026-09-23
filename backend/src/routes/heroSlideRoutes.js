const express = require('express');
const {
  getActiveHeroSlides,
  getAllHeroSlides,
  getHeroSlideById,
  createHeroSlide,
  updateHeroSlide,
  deactivateHeroSlide,
  deleteHeroSlide,
} = require('../controllers/heroSlideController');
const upload = require('../middleware/upload');
const { protect } = require('../middleware/authMiddleware');
const { validateObjectId } = require('../middleware/validation');

const router = express.Router();

// Public route
router.get('/', getActiveHeroSlides);
router.get('/all', protect, getAllHeroSlides);
router.get('/:id', validateObjectId('id'), getHeroSlideById);

// Protected Admin routes
router.post('/', protect, upload.single('image'), createHeroSlide);
router.put('/:id', protect, validateObjectId('id'), upload.single('image'), updateHeroSlide);
router.patch('/:id/deactivate', protect, validateObjectId('id'), deactivateHeroSlide);
router.delete('/:id', protect, validateObjectId('id'), deleteHeroSlide);

module.exports = router;
