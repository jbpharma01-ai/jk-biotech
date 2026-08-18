const productService = require('../services/productService');
const asyncHandler = require('../utils/asyncHandler');
const { successResponse, errorResponse } = require('../utils/response');

// Get all products
const getAllProducts = asyncHandler(async (req, res) => {
  const products = await productService.getAllProducts();

  return successResponse(
    res,
    'Products fetched successfully',
    products,
    200
  );
});

// Get active products for public website
const getActiveProducts = asyncHandler(async (req, res) => {
  const products = await productService.getActiveProducts();

  return successResponse(
    res,
    'Active products fetched successfully',
    products,
    200
  );
});

// Get single product
const getProductById = asyncHandler(async (req, res) => {
  const product = await productService.getProductById(req.params.id);

  if (!product) {
    return errorResponse(res, 'Product not found', 404);
  }

  return successResponse(
    res,
    'Product fetched successfully',
    product,
    200
  );
});

// Create product
const createProduct = asyncHandler(async (req, res) => {
  const product = await productService.createProduct(
    req.body,
    req.file
  );

  return successResponse(
    res,
    'Product created successfully',
    product,
    201
  );
});

// Update product
const updateProduct = asyncHandler(async (req, res) => {
  const product = await productService.updateProduct(
    req.params.id,
    req.body,
    req.file
  );

  if (!product) {
    return errorResponse(res, 'Product not found', 404);
  }

  return successResponse(
    res,
    'Product updated successfully',
    product,
    200
  );
});

// Deactivate product
const deactivateProduct = asyncHandler(async (req, res) => {
  const product = await productService.deactivateProduct(req.params.id);

  if (!product) {
    return errorResponse(res, 'Product not found', 404);
  }

  return successResponse(
    res,
    'Product deactivated successfully',
    product,
    200
  );
});

module.exports = {
  getAllProducts,
  getActiveProducts,
  getProductById,
  createProduct,
  updateProduct,
  deactivateProduct,
};