const documentService = require('../services/documentService');
const asyncHandler = require('../utils/asyncHandler');
const { successResponse, errorResponse } = require('../utils/response');

// Get all documents (Admin)
const getAllDocuments = asyncHandler(async (req, res) => {
  const documents = await documentService.getAllDocuments();
  return successResponse(res, 'Documents fetched successfully', documents, 200);
});

// Get active documents (Public)
const getActiveDocuments = asyncHandler(async (req, res) => {
  const documents = await documentService.getActiveDocuments();
  return successResponse(res, 'Active documents fetched successfully', documents, 200);
});

// Get documents by category slug or ID
const getDocumentsByCategory = asyncHandler(async (req, res) => {
  const categoryIdentifier = req.params.categoryIdentifier || req.params.categoryId;
  const documents = await documentService.getDocumentsByCategory(categoryIdentifier);
  return successResponse(res, 'Documents fetched successfully', documents, 200);
});

// Get single document by ID
const getDocumentById = asyncHandler(async (req, res) => {
  const document = await documentService.getDocumentById(req.params.id);
  if (!document) {
    return errorResponse(res, 'Document not found', 404);
  }
  return successResponse(res, 'Document fetched successfully', document, 200);
});

// Create document
const createDocument = asyncHandler(async (req, res) => {
  const document = await documentService.createDocument(req.body, req.file);
  return successResponse(res, 'Document created successfully', document, 201);
});

// Update document
const updateDocument = asyncHandler(async (req, res) => {
  const document = await documentService.updateDocument(
    req.params.id,
    req.body,
    req.file
  );
  if (!document) {
    return errorResponse(res, 'Document not found', 404);
  }
  return successResponse(res, 'Document updated successfully', document, 200);
});

// Deactivate document
const deactivateDocument = asyncHandler(async (req, res) => {
  const document = await documentService.deactivateDocument(req.params.id);
  if (!document) {
    return errorResponse(res, 'Document not found', 404);
  }
  return successResponse(res, 'Document deactivated successfully', document, 200);
});

// Delete document
const deleteDocument = asyncHandler(async (req, res) => {
  const document = await documentService.deleteDocument(req.params.id);
  if (!document) {
    return errorResponse(res, 'Document not found', 404);
  }
  return successResponse(res, 'Document deleted successfully', null, 200);
});

module.exports = {
  getAllDocuments,
  getActiveDocuments,
  getDocumentsByCategory,
  getDocumentById,
  createDocument,
  updateDocument,
  deactivateDocument,
  deleteDocument,
};