const express = require('express');
const cloudinary = require('../config/cloudinary');

const router = express.Router();

router.get('/cloudinary-test', async (req, res) => {
  try {
    const result = await cloudinary.api.ping();

    return res.status(200).json({
      success: true,
      message: 'Cloudinary connected successfully',
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Cloudinary connection failed',
      data: error.message,
    });
  }
});

module.exports = router;