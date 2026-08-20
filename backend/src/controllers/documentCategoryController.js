const documentCategoryService = require('../services/documentCategoryService');

const asyncHandler = require('../utils/asyncHandler');

const { successResponse, errorResponse } = require('../utils/response');

// Get all document categories
const getAllDocumentCategories = asyncHandler(async (req, res) => {
  const categories =
    await documentCategoryService.getAllDocumentCategories();

  return successResponse(
    res,
    'Document categories fetched successfully',
    categories,
    200
  );
});

// Get active document categories
const getActiveDocumentCategories = asyncHandler(async (req, res) => {
  const categories =
    await documentCategoryService.getActiveDocumentCategories();

  return successResponse(
    res,
    'Active document categories fetched successfully',
    categories,
    200
  );
});

// Get single document category
const getDocumentCategoryById = asyncHandler(async (req, res) => {
  const category =
    await documentCategoryService.getDocumentCategoryById(req.params.id);

  if (!category) {
    return errorResponse(res, 'Document category not found', 404);
  }

  return successResponse(
    res,
    'Document category fetched successfully',
    category,
    200
  );
});

// Create document category
const createDocumentCategory = asyncHandler(async (req, res) => {
  const category =
    await documentCategoryService.createDocumentCategory(req.body);

  return successResponse(
    res,
    'Document category created successfully',
    category,
    201
  );
});

// Update document category
const updateDocumentCategory = asyncHandler(async (req, res) => {
  const category =
    await documentCategoryService.updateDocumentCategory(
      req.params.id,
      req.body
    );

  if (!category) {
    return errorResponse(res, 'Document category not found', 404);
  }

  return successResponse(
    res,
    'Document category updated successfully',
    category,
    200
  );
});

// Deactivate document category
const deactivateDocumentCategory = asyncHandler(async (req, res) => {
  const category =
    await documentCategoryService.deactivateDocumentCategory(
      req.params.id
    );

  if (!category) {
    return errorResponse(res, 'Document category not found', 404);
  }

  return successResponse(
    res,
    'Document category deactivated successfully',
    category,
    200
  );
});

module.exports = {
  getAllDocumentCategories,
  getActiveDocumentCategories,
  getDocumentCategoryById,
  createDocumentCategory,
  updateDocumentCategory,
  deactivateDocumentCategory,
};