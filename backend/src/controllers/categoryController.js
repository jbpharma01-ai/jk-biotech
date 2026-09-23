const categoryService = require('../services/categoryService');
const asyncHandler = require('../utils/asyncHandler');
const { successResponse, errorResponse } = require('../utils/response');

// Get all categories
const getAllCategories = asyncHandler(async (req, res) => {
  const categories = await categoryService.getAllCategories();
  return successResponse(
    res,
    'Categories fetched successfully',
    categories,
    200
  );
});

// Get active categories for public website
const getActiveCategories = asyncHandler(async (req, res) => {
  const categories = await categoryService.getActiveCategories();
  return successResponse(
    res,
    'Active categories fetched successfully',
    categories,
    200
  );
});

// Get single category by ID
const getCategoryById = asyncHandler(async (req, res) => {
  const category = await categoryService.getCategoryById(req.params.id);
  if (!category) {
    return errorResponse(res, 'Category not found', 404);
  }
  return successResponse(
    res,
    'Category fetched successfully',
    category,
    200
  );
});

// Get single category by Slug
const getCategoryBySlug = asyncHandler(async (req, res) => {
  const category = await categoryService.getCategoryBySlug(req.params.slug);
  if (!category) {
    return errorResponse(res, 'Category not found', 404);
  }
  return successResponse(
    res,
    'Category fetched successfully',
    category,
    200
  );
});

// Create category
const createCategory = asyncHandler(async (req, res) => {
  const category = await categoryService.createCategory(
    req.body,
    req.file
  );
  return successResponse(
    res,
    'Category created successfully',
    category,
    201
  );
});

// Update category
const updateCategory = asyncHandler(async (req, res) => {
  const category = await categoryService.updateCategory(
    req.params.id,
    req.body,
    req.file
  );

  if (!category) {
    return errorResponse(res, 'Category not found', 404);
  }

  return successResponse(
    res,
    'Category updated successfully',
    category,
    200
  );
});

// Deactivate category
const deactivateCategory = asyncHandler(async (req, res) => {
  const category = await categoryService.deactivateCategory(req.params.id);

  if (!category) {
    return errorResponse(res, 'Category not found', 404);
  }

  return successResponse(
    res,
    'Category deactivated successfully',
    category,
    200
  );
});

// Delete category
const deleteCategory = asyncHandler(async (req, res) => {
  const category = await categoryService.deleteCategory(req.params.id);

  if (!category) {
    return errorResponse(res, 'Category not found', 404);
  }

  return successResponse(
    res,
    'Category deleted successfully',
    null,
    200
  );
});

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