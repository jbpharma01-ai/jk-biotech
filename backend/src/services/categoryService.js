const Category = require('../models/Category');

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
const createCategory = async (categoryData) => {
  return await Category.create(categoryData);
};

// Update category
const updateCategory = async (id, categoryData) => {
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