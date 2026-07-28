const express = require('express');
const router = express.Router();

// Health Check Endpoint
router.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    service: 'Pharmaceutical Backend API Service',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

/*
 * REST API Endpoints Route Mounting Stubs
 * (Business logic to be implemented in subsequent phases)
 *
 * router.use('/auth', require('./auth.routes'));
 * router.use('/products', require('./product.routes'));
 * router.use('/categories', require('./category.routes'));
 * router.use('/blogs', require('./blog.routes'));
 * router.use('/gallery', require('./gallery.routes'));
 * router.use('/certificates', require('./certificate.routes'));
 * router.use('/contact', require('./contact.routes'));
 * router.use('/careers', require('./career.routes'));
 * router.use('/settings', require('./setting.routes'));
 */

module.exports = router;
