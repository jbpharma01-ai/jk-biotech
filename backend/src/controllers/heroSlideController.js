const heroSlideService = require('../services/heroSlideService');
const asyncHandler = require('../utils/asyncHandler');
const { successResponse, errorResponse } = require('../utils/response');

// Get active hero slides (Public)
const getActiveHeroSlides = asyncHandler(async (req, res) => {
  const slides = await heroSlideService.getActiveHeroSlides();
  return successResponse(res, 'Hero slides fetched successfully', slides, 200);
});

// Get all hero slides (Admin)
const getAllHeroSlides = asyncHandler(async (req, res) => {
  const slides = await heroSlideService.getAllHeroSlides();
  return successResponse(res, 'Hero slides fetched successfully', slides, 200);
});

// Get hero slide by ID
const getHeroSlideById = asyncHandler(async (req, res) => {
  const slide = await heroSlideService.getHeroSlideById(req.params.id);
  if (!slide) {
    return errorResponse(res, 'Hero slide not found', 404);
  }
  return successResponse(res, 'Hero slide fetched successfully', slide, 200);
});

// Create hero slide
const createHeroSlide = asyncHandler(async (req, res) => {
  const slide = await heroSlideService.createHeroSlide(req.body, req.file);
  return successResponse(res, 'Hero slide created successfully', slide, 201);
});

// Update hero slide
const updateHeroSlide = asyncHandler(async (req, res) => {
  const slide = await heroSlideService.updateHeroSlide(req.params.id, req.body, req.file);
  if (!slide) {
    return errorResponse(res, 'Hero slide not found', 404);
  }
  return successResponse(res, 'Hero slide updated successfully', slide, 200);
});

// Deactivate hero slide
const deactivateHeroSlide = asyncHandler(async (req, res) => {
  const slide = await heroSlideService.deactivateHeroSlide(req.params.id);
  if (!slide) {
    return errorResponse(res, 'Hero slide not found', 404);
  }
  return successResponse(res, 'Hero slide deactivated successfully', slide, 200);
});

// Delete hero slide
const deleteHeroSlide = asyncHandler(async (req, res) => {
  const slide = await heroSlideService.deleteHeroSlide(req.params.id);
  if (!slide) {
    return errorResponse(res, 'Hero slide not found', 404);
  }
  return successResponse(res, 'Hero slide deleted successfully', null, 200);
});

module.exports = {
  getActiveHeroSlides,
  getAllHeroSlides,
  getHeroSlideById,
  createHeroSlide,
  updateHeroSlide,
  deactivateHeroSlide,
  deleteHeroSlide,
};
