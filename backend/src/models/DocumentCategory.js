const mongoose = require('mongoose');

const documentCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Document category name is required'],
      trim: true,
    },

    slug: {
      type: String,
      required: [true, 'Document category slug is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
      default: '',
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

// High performance query index
documentCategorySchema.index({ isActive: 1, displayOrder: 1, createdAt: -1 });

const DocumentCategory = mongoose.model(
  'DocumentCategory',
  documentCategorySchema
);

module.exports = DocumentCategory;