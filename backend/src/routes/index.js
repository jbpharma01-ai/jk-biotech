const express = require('express');

const healthRoutes = require('./healthRoutes');
const categoryRoutes = require('./categoryRoutes');
const productRoutes = require('./productRoutes');
const cloudinaryRoutes = require('./cloudinaryRoutes');

const router = express.Router();

router.use(healthRoutes);
router.use('/categories', categoryRoutes);
router.use('/products', productRoutes);
router.use(cloudinaryRoutes);

module.exports = router;