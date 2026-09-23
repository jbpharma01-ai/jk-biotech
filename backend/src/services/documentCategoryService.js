const DocumentCategory = require('../models/DocumentCategory');

// Get all document categories (Admin)
const getAllDocumentCategories = async () => {
  return await DocumentCategory.find().sort({
    displayOrder: 1,
    createdAt: -1,
  });
};

// Get active document categories (Public)
const getActiveDocumentCategories = async () => {
  return await DocumentCategory.find({ isActive: true }).sort({
    displayOrder: 1,
    createdAt: -1,
  });
};

// Get single document category by ID
const getDocumentCategoryById = async (id) => {
  return await DocumentCategory.findById(id);
};

// Get single document category by Slug
const getDocumentCategoryBySlug = async (slug) => {
  return await DocumentCategory.findOne({
    slug: slug.toLowerCase(),
    isActive: true,
  });
};

// Create document category
const createDocumentCategory = async (categoryData) => {
  if (!categoryData.slug && categoryData.name) {
    categoryData.slug = categoryData.name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }
  return await DocumentCategory.create(categoryData);
};

// Update document category
const updateDocumentCategory = async (id, categoryData) => {
  if (categoryData.name && !categoryData.slug) {
    categoryData.slug = categoryData.name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }
  return await DocumentCategory.findByIdAndUpdate(id, categoryData, {
    new: true,
    runValidators: true,
  });
};

// Deactivate document category
const deactivateDocumentCategory = async (id) => {
  return await DocumentCategory.findByIdAndUpdate(
    id,
    { isActive: false },
    {
      new: true,
      runValidators: true,
    }
  );
};

// Delete document category
const deleteDocumentCategory = async (id) => {
  return await DocumentCategory.findByIdAndDelete(id);
};

module.exports = {
  getAllDocumentCategories,
  getActiveDocumentCategories,
  getDocumentCategoryById,
  getDocumentCategoryBySlug,
  createDocumentCategory,
  updateDocumentCategory,
  deactivateDocumentCategory,
  deleteDocumentCategory,
};
