const Document = require('../models/Document');
const DocumentCategory = require('../models/DocumentCategory');
const { uploadFile, deleteImage } = require('./cloudinaryService');

// Get all documents (Admin)
const getAllDocuments = async () => {
  return await Document.find()
    .populate('documentCategoryId')
    .sort({
      displayOrder: 1,
      createdAt: -1,
    });
};

// Get active documents (Public)
const getActiveDocuments = async () => {
  return await Document.find({ isActive: true })
    .populate('documentCategoryId')
    .sort({
      displayOrder: 1,
      createdAt: -1,
    });
};

// Get documents by category (by ID or Slug)
const getDocumentsByCategory = async (categoryIdentifier) => {
  let categoryId = categoryIdentifier;

  if (!DocumentCategory.base.Types.ObjectId.isValid(categoryIdentifier)) {
    const category = await DocumentCategory.findOne({
      slug: categoryIdentifier.toLowerCase(),
    });

    if (!category) return [];
    categoryId = category._id;
  }

  return await Document.find({
    documentCategoryId: categoryId,
    isActive: true,
  })
    .populate('documentCategoryId')
    .sort({
      displayOrder: 1,
      createdAt: -1,
    });
};

// Get single document by ID
const getDocumentById = async (id) => {
  return await Document.findById(id).populate('documentCategoryId');
};

// Create document (with optional file upload)
const createDocument = async (documentData, file = null) => {
  let fileData = {
    url: documentData.pdfUrl || documentData.fileUrl || '',
    publicId: '',
    fileName: documentData.fileName || '',
    fileType: 'application/pdf',
  };

  if (file) {
    const uploadedFile = await uploadFile(file, 'jk-biotech/documents');
    fileData = {
      url: uploadedFile.url,
      publicId: uploadedFile.publicId,
      fileName: uploadedFile.fileName,
      fileType: uploadedFile.fileType,
    };
  }

  const newDoc = await Document.create({
    ...documentData,
    file: fileData,
  });

  return await Document.findById(newDoc._id).populate('documentCategoryId');
};

// Update document
const updateDocument = async (id, documentData, file = null) => {
  const existingDoc = await Document.findById(id);
  if (!existingDoc) return null;

  if (file) {
    if (existingDoc.file?.publicId) {
      await deleteImage(existingDoc.file.publicId, 'raw');
    }

    const uploadedFile = await uploadFile(file, 'jk-biotech/documents');
    documentData.file = {
      url: uploadedFile.url,
      publicId: uploadedFile.publicId,
      fileName: uploadedFile.fileName,
      fileType: uploadedFile.fileType,
    };
  } else if (documentData.pdfUrl || documentData.fileUrl) {
    documentData.file = {
      url: documentData.pdfUrl || documentData.fileUrl,
      publicId: existingDoc.file?.publicId || '',
      fileName: documentData.fileName || existingDoc.file?.fileName || '',
      fileType: 'application/pdf',
    };
  }

  return await Document.findByIdAndUpdate(id, documentData, {
    new: true,
    runValidators: true,
  }).populate('documentCategoryId');
};

// Deactivate document
const deactivateDocument = async (id) => {
  return await Document.findByIdAndUpdate(
    id,
    { isActive: false },
    {
      new: true,
      runValidators: true,
    }
  ).populate('documentCategoryId');
};

// Delete document
const deleteDocument = async (id) => {
  const doc = await Document.findById(id);
  if (!doc) return null;

  if (doc.file?.publicId) {
    await deleteImage(doc.file.publicId, 'raw');
  }

  return await Document.findByIdAndDelete(id);
};

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