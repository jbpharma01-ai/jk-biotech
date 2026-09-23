const HeroSlide = require('../models/HeroSlide');
const { uploadImage, deleteImage } = require('./cloudinaryService');

// Get all hero slides (Admin)
const getAllHeroSlides = async () => {
  return await HeroSlide.find().sort({ displayOrder: 1, createdAt: -1 });
};

// Get active hero slides (Public)
const getActiveHeroSlides = async () => {
  return await HeroSlide.find({ isActive: true }).sort({
    displayOrder: 1,
    createdAt: -1,
  });
};

// Get single hero slide by ID
const getHeroSlideById = async (id) => {
  return await HeroSlide.findById(id);
};

// Create hero slide
const createHeroSlide = async (slideData, file = null) => {
  let imageData = { url: '', publicId: '', alt: slideData.title || '' };

  if (file) {
    const uploadedImage = await uploadImage(file, 'jk-biotech/hero');
    imageData = {
      url: uploadedImage.url,
      publicId: uploadedImage.publicId,
      alt: slideData.title || '',
    };
  } else if (slideData.imageUrl) {
    imageData = {
      url: slideData.imageUrl,
      publicId: '',
      alt: slideData.title || '',
    };
  }

  // Parse titleLines if passed as JSON string
  if (typeof slideData.titleLines === 'string') {
    try {
      slideData.titleLines = JSON.parse(slideData.titleLines);
    } catch (e) {
      slideData.titleLines = [slideData.title];
    }
  }

  return await HeroSlide.create({
    ...slideData,
    image: imageData,
  });
};

// Update hero slide
const updateHeroSlide = async (id, slideData, file = null) => {
  const existingSlide = await HeroSlide.findById(id);
  if (!existingSlide) return null;

  if (file) {
    if (existingSlide.image?.publicId) {
      await deleteImage(existingSlide.image.publicId);
    }
    const uploadedImage = await uploadImage(file, 'jk-biotech/hero');
    slideData.image = {
      url: uploadedImage.url,
      publicId: uploadedImage.publicId,
      alt: slideData.title || existingSlide.title || '',
    };
  }

  if (typeof slideData.titleLines === 'string') {
    try {
      slideData.titleLines = JSON.parse(slideData.titleLines);
    } catch (e) {
      // keep original or split by lines
    }
  }

  return await HeroSlide.findByIdAndUpdate(id, slideData, {
    new: true,
    runValidators: true,
  });
};

// Deactivate hero slide
const deactivateHeroSlide = async (id) => {
  return await HeroSlide.findByIdAndUpdate(
    id,
    { isActive: false },
    {
      new: true,
      runValidators: true,
    }
  );
};

// Delete hero slide
const deleteHeroSlide = async (id) => {
  const slide = await HeroSlide.findById(id);
  if (!slide) return null;

  if (slide.image?.publicId) {
    await deleteImage(slide.image.publicId);
  }

  return await HeroSlide.findByIdAndDelete(id);
};

module.exports = {
  getAllHeroSlides,
  getActiveHeroSlides,
  getHeroSlideById,
  createHeroSlide,
  updateHeroSlide,
  deactivateHeroSlide,
  deleteHeroSlide,
};
