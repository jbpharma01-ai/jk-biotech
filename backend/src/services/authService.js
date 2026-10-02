const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
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


// Change admin password
const changeAdminPassword = async (
  adminId,
  currentPassword,
  newPassword
) => {
  const admin = await Admin.findById(adminId).select('+password');

  if (!admin) {
    const error = new Error('Admin not found');
    error.statusCode = 404;
    throw error;
  }

  // Check current password
  const isMatch = await admin.comparePassword(currentPassword);

  if (!isMatch) {
    const error = new Error('Current password is incorrect');
    error.statusCode = 401;
    throw error;
  }

  // Prevent using the same password
  const isSamePassword = await admin.comparePassword(newPassword);

  if (isSamePassword) {
    const error = new Error(
      'New password must be different from your current password'
    );
    error.statusCode = 400;
    throw error;
  }

  // Set new password
  admin.password = newPassword;

  await admin.save();

  return {
    message: 'Password changed successfully',
  };
};


// Reset password using recovery code
const resetAdminPasswordWithRecoveryCode = async (
  email,
  recoveryCode,
  newPassword
) => {
  const admin = await Admin.findOne({
    email: email.toLowerCase(),
  }).select('+password +recoveryCode');

  if (!admin) {
    const error = new Error('Invalid email or recovery code');
    error.statusCode = 401;
    throw error;
  }

  // Check recovery code
  const isRecoveryCodeValid = await bcrypt.compare(
    recoveryCode,
    admin.recoveryCode
  );

  if (!isRecoveryCodeValid) {
    const error = new Error('Invalid email or recovery code');
    error.statusCode = 401;
    throw error;
  }

  // Check whether new password is same as current password
  const isSamePassword = await bcrypt.compare(
    newPassword,
    admin.password
  );

  if (isSamePassword) {
    const error = new Error(
      'New password must be different from your current password'
    );
    error.statusCode = 400;
    throw error;
  }

  // Set new password
  admin.password = newPassword;

  await admin.save();

  return {
    message: 'Password reset successfully',
  };
};

module.exports = {
  loginAdmin,
  getAdminProfile,
  changeAdminPassword,
  resetAdminPasswordWithRecoveryCode,
};
