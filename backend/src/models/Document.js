const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Document title is required'],
      trim: true,
    },

    // important 
    documentCategoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'DocumentCategory',
      required: [true, 'Document category is required'],
    },

    description: {
      type: String,
      trim: true,
      default: '',
    },

    file: {
      url: {
        type: String,
        required: [true, 'Document file URL is required'],
      },
      publicId: {
        type: String,
        default: '',
      },
      fileName: {
        type: String,
        default: '',
      },
      fileType: {
        type: String,
        default: '',
      },
    },

    displayOrder: {
      type: Number,
      default: 0,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Document = mongoose.model('Document', documentSchema);

module.exports = Document;