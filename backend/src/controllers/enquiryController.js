const enquiryService = require('../services/enquiryService');
const asyncHandler = require('../utils/asyncHandler');
const { successResponse, errorResponse } = require('../utils/response');

// Submit enquiry (Public)
const createEnquiry = asyncHandler(async (req, res) => {
  const enquiry = await enquiryService.createEnquiry(req.body);
  return successResponse(
    res,
    'Thank you! Your enquiry has been submitted successfully.',
    enquiry,
    201
  );
});

// Get all enquiries (Admin)
const getAllEnquiries = asyncHandler(async (req, res) => {
  const { status } = req.query;
  const enquiries = await enquiryService.getAllEnquiries(status);
  return successResponse(
    res,
    'Enquiries fetched successfully',
    enquiries,
    200
  );
});

// Get enquiry by ID (Admin)
const getEnquiryById = asyncHandler(async (req, res) => {
  const enquiry = await enquiryService.getEnquiryById(req.params.id);
  if (!enquiry) {
    return errorResponse(res, 'Enquiry not found', 404);
  }
  return successResponse(res, 'Enquiry fetched successfully', enquiry, 200);
});

// Update enquiry status (Admin)
const updateEnquiryStatus = asyncHandler(async (req, res) => {
  const { status, adminNote } = req.body;
  const enquiry = await enquiryService.updateEnquiryStatus(
    req.params.id,
    status,
    adminNote
  );

  if (!enquiry) {
    return errorResponse(res, 'Enquiry not found', 404);
  }

  return successResponse(
    res,
    'Enquiry status updated successfully',
    enquiry,
    200
  );
});

// Delete enquiry (Admin)
const deleteEnquiry = asyncHandler(async (req, res) => {
  const enquiry = await enquiryService.deleteEnquiry(req.params.id);
  if (!enquiry) {
    return errorResponse(res, 'Enquiry not found', 404);
  }
  return successResponse(res, 'Enquiry deleted successfully', null, 200);
});

module.exports = {
  createEnquiry,
  getAllEnquiries,
  getEnquiryById,
  updateEnquiryStatus,
  deleteEnquiry,
};
