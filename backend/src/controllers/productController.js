const productService = require('../services/productService');
const asyncHandler = require('../utils/asyncHandler');
const { successResponse, errorResponse } = require('../utils/response');

// Get all products (Admin)
const getAllProducts = asyncHandler(async (req, res) => {
  const products = await productService.getAllProducts();
  return successResponse(res, 'Products fetched successfully', products, 200);
});

// Get active products for public website
const getActiveProducts = asyncHandler(async (req, res) => {
  const products = await productService.getActiveProducts();
  return successResponse(res, 'Active products fetched successfully', products, 200);
});

// Get single product by ID
const getProductById = asyncHandler(async (req, res) => {
  const product = await productService.getProductById(req.params.id);
  if (!product) {
    return errorResponse(res, 'Product not found', 404);
  }
  return successResponse(res, 'Product fetched successfully', product, 200);
});

// Get single product by Slug
const getProductBySlug = asyncHandler(async (req, res) => {
  const product = await productService.getProductBySlug(req.params.slug);
  if (!product) {
    return errorResponse(res, 'Product not found', 404);
  }
  return successResponse(res, 'Product fetched successfully', product, 200);
});

// Get products by Category Slug or Category ID
const getProductsByCategory = asyncHandler(async (req, res) => {
  const products = await productService.getProductsByCategory(req.params.categoryIdentifier);
  return successResponse(res, 'Products by category fetched successfully', products, 200);
});

// Get related products
const getRelatedProducts = asyncHandler(async (req, res) => {
  const products = await productService.getRelatedProducts(req.params.id, 3);
  return successResponse(res, 'Related products fetched successfully', products, 200);
});

// Create product
const createProduct = asyncHandler(async (req, res) => {
  const product = await productService.createProduct(req.body, req.file);
  return successResponse(res, 'Product created successfully', product, 201);
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

  return successResponse(res, 'Product updated successfully', product, 200);
});

// Deactivate product
const deactivateProduct = asyncHandler(async (req, res) => {
  const product = await productService.deactivateProduct(req.params.id);

  if (!product) {
    return errorResponse(res, 'Product not found', 404);
  }

  return successResponse(res, 'Product deactivated successfully', product, 200);
});

// Delete product
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await productService.deleteProduct(req.params.id);

  if (!product) {
    return errorResponse(res, 'Product not found', 404);
  }

  return successResponse(res, 'Product deleted successfully', null, 200);
});

module.exports = {
  getAllProducts,
  getActiveProducts,
  getProductById,
  getProductBySlug,
  getProductsByCategory,
  getRelatedProducts,
  createProduct,
  updateProduct,
  deactivateProduct,
  deleteProduct,
};