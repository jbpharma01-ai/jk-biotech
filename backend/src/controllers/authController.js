const authService = require('../services/authService');
const asyncHandler = require('../utils/asyncHandler');
const { successResponse } = require('../utils/response');

// Login Admin
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const result = await authService.loginAdmin(email, password);

  return successResponse(res, 'Login successful', result, 200);
});

// Get Current Admin Profile
const getMe = asyncHandler(async (req, res) => {
  const admin = await authService.getAdminProfile(req.admin._id);

  return successResponse(res, 'Admin profile fetched successfully', admin, 200);
});

module.exports = {
  login,
  getMe,
};
