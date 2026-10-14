const cloudinary = require('../config/cloudinary');
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

// View / Download Document File directly
const viewDocumentFile = asyncHandler(async (req, res) => {
  const document = await documentService.getRawDocumentById(req.params.id);
  if (!document) {
    return errorResponse(res, 'Document not found', 404);
  }

  // Check if active (if not active, only admin can view)
  if (!document.isActive && !req.user) {
    return errorResponse(res, 'Document is not currently available', 403);
  }

  const isDownload = req.query.download === 'true';
  const disposition = isDownload ? 'attachment' : 'inline';
  const fileName = document.file?.fileName || `${document.title}.pdf`;
  const encodedFileName = encodeURIComponent(fileName);

  // Case 1: Cloudinary asset (private/restricted delivery)
  if (document.file?.publicId) {
    try {
      const resourceType = document.file.resourceType || 'image';
      let format = 'pdf';
      if (fileName.includes('.')) {
        format = fileName.split('.').pop().toLowerCase();
      }

      const downloadUrl = cloudinary.utils.private_download_url(
        document.file.publicId,
        format,
        {
          resource_type: resourceType,
          type: 'upload',
          expires_at: Math.floor(Date.now() / 1000) + 3600,
        }
      );

      const upstreamResponse = await fetch(downloadUrl);
      if (!upstreamResponse.ok) {
        console.error(`Cloudinary stream error for ${document.file.publicId}:`, upstreamResponse.status);
        return errorResponse(res, 'Failed to retrieve document from storage', upstreamResponse.status);
      }

      const contentType = document.file.fileType || upstreamResponse.headers.get('content-type') || 'application/pdf';
      res.setHeader('Content-Type', contentType);
      res.setHeader(
        'Content-Disposition',
        `${disposition}; filename="${encodedFileName}"; filename*=UTF-8''${encodedFileName}`
      );
      res.setHeader('Cache-Control', 'public, max-age=86400');

      const arrayBuffer = await upstreamResponse.arrayBuffer();
      return res.send(Buffer.from(arrayBuffer));
    } catch (err) {
      console.error('Error streaming document from Cloudinary:', err);
      return errorResponse(res, 'Error streaming document', 500);
    }
  }

  // Case 2: External URL (legacy document or absolute URL)
  if (document.file?.url) {
    return res.redirect(document.file.url);
  }

  return errorResponse(res, 'No file attachment associated with this document', 404);
});

module.exports = {
  getAllDocuments,
  getActiveDocuments,
  getDocumentsByCategory,
  getDocumentById,
  viewDocumentFile,
  createDocument,
  updateDocument,
  deactivateDocument,
  deleteDocument,
};