const Product = require('../models/Product');
const Category = require('../models/Category');

// Get all products
const getAllProducts = async () => {
  return await Product.find()
    .populate('categoryId')
    .sort({ displayOrder: 1, createdAt: -1 });
};

// Get active products for public website
const getActiveProducts = async () => {
  return await Product.find({ isActive: true })
    .populate('categoryId')
    .sort({ displayOrder: 1, createdAt: -1 });
};

// Get single product by ID
const getProductById = async (id) => {
  return await Product.findById(id).populate('categoryId');
};

// Create new product
const createProduct = async (productData, file) => {
  const category = await Category.findById(productData.categoryId);

  if (!category) {
    const error = new Error('Category not found');
    error.statusCode = 404;
    throw error;
  }

  if (file) {
    const { uploadImage } = require('./cloudinaryService');

    const uploadedImage = await uploadImage(
      file,
      'jk-biotech/products'
    );

    productData.image = {
      url: uploadedImage.url,
      publicId: uploadedImage.publicId,
      alt: productData.name || '',
    };
  }

  return await Product.create(productData);
};

// Update product
const updateProduct = async (id, productData, file) => {
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

  if (file) {
    const { uploadImage, deleteImage } = require('./cloudinaryService');

    if (existingProduct.image?.publicId) {
      await deleteImage(existingProduct.image.publicId);
    }

    const uploadedImage = await uploadImage(
      file,
      'jk-biotech/products'
    );

    productData.image = {
      url: uploadedImage.url,
      publicId: uploadedImage.publicId,
      alt: productData.name || existingProduct.name || '',
    };
  }

  return await Product.findByIdAndUpdate(
    id,
    productData,
    {
      new: true,
      runValidators: true,
    }
  ).populate('categoryId');
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

module.exports = {
  getAllProducts,
  getActiveProducts,
  getProductById,
  createProduct,
  updateProduct,
  deactivateProduct,
};