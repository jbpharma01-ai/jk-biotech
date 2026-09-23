const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const config = require('../config/env');

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, config.jwtSecret, {
    expiresIn: config.jwtExpiresIn,
  });
};

// Login admin
const loginAdmin = async (email, password) => {
  const admin = await Admin.findOne({ email: email.toLowerCase() }).select(
    '+password'
  );

  if (!admin) {
    const error = new Error('Invalid email or password');
    error.statusCode = 401;
    throw error;
  }

  if (admin.status !== 'active') {
    const error = new Error('Your account is deactivated. Please contact Super Admin.');
    error.statusCode = 403;
    throw error;
  }

  const isMatch = await admin.comparePassword(password);

  if (!isMatch) {
    const error = new Error('Invalid email or password');
    error.statusCode = 401;
    throw error;
  }

  // Update last login
  admin.lastLogin = new Date();
  await admin.save();

  const token = generateToken(admin._id);

  return {
    admin: {
      id: admin._id,
      name: admin.name,
      email: admin.email,
      role: admin.role,
      status: admin.status,
      lastLogin: admin.lastLogin,
    },
    token,
  };
};

// Get current admin profile
const getAdminProfile = async (adminId) => {
  const admin = await Admin.findById(adminId).select('-password');
  if (!admin) {
    const error = new Error('Admin not found');
    error.statusCode = 404;
    throw error;
  }
  return admin;
};

module.exports = {
  loginAdmin,
  getAdminProfile,
};
