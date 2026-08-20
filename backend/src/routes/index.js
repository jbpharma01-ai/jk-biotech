const express = require('express');

const healthRoutes = require('./healthRoutes');
const categoryRoutes = require('./categoryRoutes');
const productRoutes = require('./productRoutes');
const cloudinaryRoutes = require('./cloudinaryRoutes');
const documentCategoryRoutes = require('./documentCategoryRoutes');

const router = express.Router();

router.use(healthRoutes);
router.use('/categories', categoryRoutes);
router.use('/products', productRoutes);
router.use('/cloudinary', cloudinaryRoutes);
router.use('/document-categories', documentCategoryRoutes);

module.exports = router;