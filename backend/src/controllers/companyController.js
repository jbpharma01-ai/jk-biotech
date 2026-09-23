const companyService = require('../services/companyService');
const asyncHandler = require('../utils/asyncHandler');
const { successResponse } = require('../utils/response');

// Get company information (Public)
const getCompanyInfo = asyncHandler(async (req, res) => {
  const companyInfo = await companyService.getCompanySetting();
  return successResponse(
    res,
    'Company information fetched successfully',
    companyInfo,
    200
  );
});

// Update company information (Admin)
const updateCompanyInfo = asyncHandler(async (req, res) => {
  const companyInfo = await companyService.updateCompanySetting(req.body);
  return successResponse(
    res,
    'Company information updated successfully',
    companyInfo,
    200
  );
});

module.exports = {
  getCompanyInfo,
  updateCompanyInfo,
};
