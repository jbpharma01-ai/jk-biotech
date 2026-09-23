const Category = require('../models/Category');
const { uploadImage, deleteImage } = require('./cloudinaryService');

// Get all categories (Admin)
const getAllCategories = async () => {
  return await Category.find().sort({ displayOrder: 1, createdAt: -1 });
};

// Get active categories for public website
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

// Get single category by slug
const getCategoryBySlug = async (slug) => {
  return await Category.findOne({ slug: slug.toLowerCase(), isActive: true });
};

// Create new category
const createCategory = async (categoryData, imageFile = null) => {
  let imageData = {
    url: '',
    publicId: '',
    alt: '',
  };

  if (!categoryData.slug && categoryData.name) {
    categoryData.slug = categoryData.name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  if (imageFile) {
    const uploadedImage = await uploadImage(imageFile, 'jk-biotech/categories');
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

  if (categoryData.name && !categoryData.slug) {
    categoryData.slug = categoryData.name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
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

// Permanently delete category
const deleteCategory = async (id) => {
  const category = await Category.findById(id);
  if (!category) return null;

  if (category.image?.publicId) {
    await deleteImage(category.image.publicId);
  }

  return await Category.findByIdAndDelete(id);
};

module.exports = {
  getAllCategories,
  getActiveCategories,
  getCategoryById,
  getCategoryBySlug,
  createCategory,
  updateCategory,
  deactivateCategory,
  deleteCategory,
};