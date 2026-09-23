const jwt = require('jsonwebtoken');
const config = require('../config/env');
const Admin = require('../models/Admin');
const asyncHandler = require('../utils/asyncHandler');
const { errorResponse } = require('../utils/response');

// Protect routes - verify JWT token
const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return errorResponse(res, 'Not authorized to access this route', 401);
  }

  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    const admin = await Admin.findById(decoded.id).select('-password');

    if (!admin) {
      return errorResponse(res, 'Admin account no longer exists', 401);
    }

    if (admin.status !== 'active') {
      return errorResponse(res, 'Admin account is deactivated', 403);
    }

    req.admin = admin;
    next();
  } catch (error) {
    return errorResponse(res, 'Invalid or expired authentication token', 401);
  }
});

// Authorize specific roles (e.g. superadmin)
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.admin || !roles.includes(req.admin.role)) {
      return errorResponse(
        res,
        `User role '${req.admin?.role}' is not authorized to perform this action`,
        403
      );
    }
    next();
  };
};

module.exports = {
  protect,
  authorize,
};
