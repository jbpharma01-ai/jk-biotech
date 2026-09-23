const Product = require('../models/Product');
const Category = require('../models/Category');
const { uploadImage, deleteImage } = require('./cloudinaryService');

// Get all products (Admin)
const getAllProducts = async () => {
  return await Product.find()
    .populate('categoryId')
    .sort({ displayOrder: 1, createdAt: -1 });
};

// Get active products for public website (with optional filter query)
const getActiveProducts = async (filters = {}) => {
  const query = { isActive: true, ...filters };
  return await Product.find(query)
    .populate('categoryId')
    .sort({ displayOrder: 1, createdAt: -1 });
};

// Get single product by ID
const getProductById = async (id) => {
  return await Product.findById(id).populate('categoryId');
};

// Get single product by Slug
const getProductBySlug = async (slug) => {
  return await Product.findOne({
    slug: slug.toLowerCase(),
    isActive: true,
  }).populate('categoryId');
};

// Get products by Category Slug or Category ID
const getProductsByCategory = async (categoryIdentifier) => {
  let categoryId = categoryIdentifier;

  // If passed a category slug instead of ObjectId
  if (!Category.base.Types.ObjectId.isValid(categoryIdentifier)) {
    const category = await Category.findOne({
      slug: categoryIdentifier.toLowerCase(),
    });

    if (!category) {
      return [];
    }
    categoryId = category._id;
  }

  return await Product.find({ categoryId, isActive: true })
    .populate('categoryId')
    .sort({ displayOrder: 1, createdAt: -1 });
};

// Get related products in the same category
const getRelatedProducts = async (productId, limit = 3) => {
  const product = await Product.findById(productId);
  if (!product) return [];

  return await Product.find({
    categoryId: product.categoryId,
    _id: { $ne: product._id },
    isActive: true,
  })
    .populate('categoryId')
    .limit(limit)
    .sort({ displayOrder: 1, createdAt: -1 });
};

// Create new product
const createProduct = async (productData, file = null) => {
  const category = await Category.findById(productData.categoryId);

  if (!category) {
    const error = new Error('Category not found');
    error.statusCode = 404;
    throw error;
  }

  if (!productData.slug && productData.name) {
    productData.slug = productData.name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  let imageData = { url: '', publicId: '', alt: productData.name || '' };

  if (file) {
    const uploadedImage = await uploadImage(file, 'jk-biotech/products');
    imageData = {
      url: uploadedImage.url,
      publicId: uploadedImage.publicId,
      alt: productData.name || '',
    };
  }

  const newProduct = await Product.create({
    ...productData,
    image: imageData,
  });

  return await Product.findById(newProduct._id).populate('categoryId');
};

// Update product
const updateProduct = async (id, productData, file = null) => {
  if (productData.categoryId) {
    const category = await Category.findById(productData.categoryId);
    if (!category) {
      const error = new Error('Category not found');
      error.statusCode = 404;
      throw error;
    }
  }

  const existingProduct = await Product.findById(id);
  if (!existingProduct) {
    const error = new Error('Product not found');
    error.statusCode = 404;
    throw error;
  }

  if (productData.name && !productData.slug) {
    productData.slug = productData.name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  if (file) {
    if (existingProduct.image?.publicId) {
      await deleteImage(existingProduct.image.publicId);
    }

    const uploadedImage = await uploadImage(file, 'jk-biotech/products');
    productData.image = {
      url: uploadedImage.url,
      publicId: uploadedImage.publicId,
      alt: productData.name || existingProduct.name || '',
    };
  }

  return await Product.findByIdAndUpdate(id, productData, {
    new: true,
    runValidators: true,
  }).populate('categoryId');
};

// Deactivate product
const deactivateProduct = async (id) => {
  return await Product.findByIdAndUpdate(
    id,
    { isActive: false },
    {
      new: true,
      runValidators: true,
    }
  ).populate('categoryId');
};

// Delete product permanently
const deleteProduct = async (id) => {
  const product = await Product.findById(id);
  if (!product) return null;

  if (product.image?.publicId) {
    await deleteImage(product.image.publicId);
  }

  return await Product.findByIdAndDelete(id);
};

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