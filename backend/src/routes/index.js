const express = require('express');

const healthRoutes = require('./healthRoutes');
const authRoutes = require('./authRoutes');
const categoryRoutes = require('./categoryRoutes');
const productRoutes = require('./productRoutes');
const heroSlideRoutes = require('./heroSlideRoutes');
const documentCategoryRoutes = require('./documentCategoryRoutes');
const documentRoutes = require('./documentRoutes');
const enquiryRoutes = require('./enquiryRoutes');
const companyRoutes = require('./companyRoutes');
const cloudinaryRoutes = require('./cloudinaryRoutes');

const router = express.Router();

router.use(healthRoutes);
router.use('/auth', authRoutes);
router.use('/categories', categoryRoutes);
router.use('/products', productRoutes);
router.use('/hero-slides', heroSlideRoutes);
router.use('/document-categories', documentCategoryRoutes);
router.use('/documents', documentRoutes);
router.use('/enquiries', enquiryRoutes);
router.use('/company', companyRoutes);
router.use('/cloudinary', cloudinaryRoutes);

module.exports = router;