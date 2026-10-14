const Document = require('../models/Document');
const DocumentCategory = require('../models/DocumentCategory');
const { uploadFile, deleteImage } = require('./cloudinaryService');

// Helper to format document object and ensure working delivery URL

const formatDocument = (doc) => {
  if (!doc) return null;

  const docObj = doc.toObject ? doc.toObject() : { ...doc };

  // Use the backend view endpoint for Cloudinary files in API responses.
  // This does not change the URL stored in MongoDB.
  if (docObj.file?.publicId && docObj._id) {
    docObj.file.url = `/api/documents/${docObj._id}/view`;
  }

  return docObj;
};


// Get all documents (Admin)
const getAllDocuments = async () => {
  const docs = await Document.find()
    .populate('documentCategoryId')
    .sort({
      displayOrder: 1,
      createdAt: -1,
    });
  return docs.map(formatDocument);
};

// Get active documents (Public)
const getActiveDocuments = async () => {
  const docs = await Document.find({ isActive: true })
    .populate('documentCategoryId')
    .sort({
      displayOrder: 1,
      createdAt: -1,
    });
  return docs.map(formatDocument);
};

// Get documents by category (by ID or Slug)
const getDocumentsByCategory = async (categoryIdentifier) => {
  let categoryId = categoryIdentifier;

  if (!DocumentCategory.base.Types.ObjectId.isValid(categoryIdentifier)) {
    let category = await DocumentCategory.findOne({
      slug: categoryIdentifier.toLowerCase(),
    });

    if (!category) {
      category = await DocumentCategory.findOne({
        name: { $regex: new RegExp(`^${categoryIdentifier}$`, 'i') },
      });
    }

    if (!category) return [];
    categoryId = category._id;
  }

  const docs = await Document.find({
    documentCategoryId: categoryId,
    isActive: true,
  })
    .populate('documentCategoryId')
    .sort({
      displayOrder: 1,
      createdAt: -1,
    });
  return docs.map(formatDocument);
};

// Get single document by ID
const getDocumentById = async (id) => {
  const doc = await Document.findById(id).populate('documentCategoryId');
  return formatDocument(doc);
};

// Get raw document by ID (internal use for file streaming)
const getRawDocumentById = async (id) => {
  return await Document.findById(id).populate('documentCategoryId');
};

// Create document (with optional file upload)
const createDocument = async (documentData, file = null) => {
  let fileData = {
    url: documentData.pdfUrl || documentData.fileUrl || '',
    publicId: '',
    fileName: documentData.fileName || '',
    fileType: 'application/pdf',
    resourceType: 'image',
  };

  if (file) {
    const uploadedFile = await uploadFile(file, 'jk-biotech/documents');
    fileData = {
      url: uploadedFile.url,
      publicId: uploadedFile.publicId,
      fileName: uploadedFile.fileName,
      fileType: uploadedFile.fileType,
      resourceType: uploadedFile.resourceType || 'image',
    };
  }

  const newDoc = await Document.create({
    ...documentData,
    file: fileData,
  });

  // Ensure url points to the view route if uploaded to Cloudinary
  // if (fileData.publicId) {
  //   newDoc.file.url = `/api/documents/${newDoc._id}/view`;
  //   await newDoc.save();
  // }

  const savedDoc = await Document.findById(newDoc._id).populate('documentCategoryId');
  return formatDocument(savedDoc);
};

// Update document
const updateDocument = async (id, documentData, file = null) => {
  const existingDoc = await Document.findById(id);
  if (!existingDoc) return null;

  if (file) {
    if (existingDoc.file?.publicId) {
      await deleteImage(existingDoc.file.publicId, existingDoc.file.resourceType || 'image');
    }

    const uploadedFile = await uploadFile(file, 'jk-biotech/documents');

    documentData.file = {
      url: uploadedFile.url,
      publicId: uploadedFile.publicId,
      fileName: uploadedFile.fileName,
      fileType: uploadedFile.fileType,
      resourceType: uploadedFile.resourceType,
    };

  } else if (documentData.pdfUrl || documentData.fileUrl) {
    documentData.file = {
      url: documentData.pdfUrl || documentData.fileUrl,
      publicId: existingDoc.file?.publicId || '',
      fileName: documentData.fileName || existingDoc.file?.fileName || '',
      fileType: 'application/pdf',
      resourceType: existingDoc.file?.resourceType || 'image',
    };
  }

  const updatedDoc = await Document.findByIdAndUpdate(id, documentData, {
    new: true,
    runValidators: true,
  }).populate('documentCategoryId');

  return formatDocument(updatedDoc);
};

// Deactivate document
const deactivateDocument = async (id) => {
  const doc = await Document.findByIdAndUpdate(
    id,
    { isActive: false },
    {
      new: true,
      runValidators: true,
    }
  ).populate('documentCategoryId');
  return formatDocument(doc);
};

// Delete document
const deleteDocument = async (id) => {
  const doc = await Document.findById(id);
  if (!doc) return null;

  if (doc.file?.publicId) {
    await deleteImage(doc.file.publicId, doc.file.resourceType || 'image');
  }

  return await Document.findByIdAndDelete(id);
};

module.exports = {
  getAllDocuments,
  getActiveDocuments,
  getDocumentsByCategory,
  getDocumentById,
  getRawDocumentById,
  createDocument,
  updateDocument,
  deactivateDocument,
  deleteDocument,
};