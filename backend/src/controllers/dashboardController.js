const Product = require('../models/Product');
const Category = require('../models/Category');
const HeroSlide = require('../models/HeroSlide');
const Document = require('../models/Document');
const Enquiry = require('../models/Enquiry');
const asyncHandler = require('../utils/asyncHandler');
const { successResponse } = require('../utils/response');

// High-speed aggregated dashboard summary endpoint
const getDashboardStats = asyncHandler(async (req, res) => {
  const [
    productCount,
    categoryCount,
    heroSlideCount,
    // documentCount,
    totalEnquiries,
    newEnquiriesCount,
    recentEnquiries,
    recentProducts,
  ] = await Promise.all([
    Product.countDocuments(),
    Category.countDocuments(),
    HeroSlide.countDocuments(),
    // Document.countDocuments(),
    Enquiry.countDocuments(),
    Enquiry.countDocuments({ status: 'new' }),
    Enquiry.find()
      .select('name email phone subject message status createdAt')
      .sort({ createdAt: -1 })
      .limit(5)
      .lean(),
    Product.find()
      .select('name dosageForm composition image isActive categoryId')
      .populate('categoryId', 'name')
      .sort({ createdAt: -1 })
      .limit(5)
      .lean(),
  ]);

  const stats = {
    counts: {
      categories: categoryCount,
      products: productCount,
      heroSlides: heroSlideCount,
      // documents: documentCount,
      enquiries: totalEnquiries,
      newEnquiries: newEnquiriesCount,
    },
    recentEnquiries,
    recentProducts,
  };

  return successResponse(res, 'Dashboard statistics fetched successfully', stats, 200);
});

module.exports = {
  getDashboardStats,
};
