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

const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  const result = await authService.changeAdminPassword(
    req.admin._id,
    currentPassword,
    newPassword
  );

  return successResponse(
    res,
    result.message,
    null,
    200
  );
});

const resetPassword = asyncHandler(async (req, res) => {
  const { email, recoveryCode, newPassword } = req.body;

  const result = await authService.resetAdminPasswordWithRecoveryCode(
    email,
    recoveryCode,
    newPassword
  );

  return successResponse(
    res,
    result.message,
    null,
    200
  );
});


module.exports = {
  login,
  getMe,
  changePassword,
  resetPassword,
};
