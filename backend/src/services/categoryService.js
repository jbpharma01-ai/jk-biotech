const Category = require('../models/Category');

const { uploadImage , deleteImage, } = require('./cloudinaryService');

// Get all categories
const getAllCategories = async () => {
  return await Category.find().sort({ displayOrder: 1, createdAt: -1 });
};

const getActiveCategories = async () => {
  return await Category.find({ isActive: true }).sort({
    displayOrder: 1,
    createdAt: -1,
  });
};

// Get single category by ID
const getCategoryById = async (id) => {
  return await Category.findById(id);
};

// Create new category
const createCategory = async (categoryData, imageFile = null) => {
  let imageData = {
    url: '',
    publicId: '',
    alt: '',
  };

  if (imageFile) {
    const uploadedImage = await uploadImage(imageFile);

    imageData = {
      url: uploadedImage.url,
      publicId: uploadedImage.publicId,
      alt: categoryData.name || '',
    };
  }

  return await Category.create({
    ...categoryData,
    image: imageData,
  });
};

// Update category
const updateCategory = async (id, categoryData, imageFile = null) => {
  const existingCategory = await Category.findById(id);

  if (!existingCategory) {
    return null;
  }

  if (imageFile) {
    const uploadedImage = await uploadImage(
      imageFile,
      'jk-biotech/categories'
    );

    if (existingCategory.image?.publicId) {
      await deleteImage(existingCategory.image.publicId);
    }

    categoryData.image = {
      url: uploadedImage.url,
      publicId: uploadedImage.publicId,
      alt: categoryData.name || existingCategory.name || '',
    };
  }

  return await Category.findByIdAndUpdate(
    id,
    categoryData,
    {
      new: true,
      runValidators: true,
    }
  );
};

// Deactivate category
const deactivateCategory = async (id) => {
  return await Category.findByIdAndUpdate(
    id,
    { isActive: false },
    {
      new: true,
      runValidators: true,
    }
  );
};

module.exports = {
  getAllCategories,
  getActiveCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deactivateCategory,
};