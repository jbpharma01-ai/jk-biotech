const mongoose = require('mongoose');

const enquirySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },

    email: {
      type: String,
      required: [true, 'Email is required'],
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      trim: true,
      default: '',
    },

    subject: {
      type: String,
      trim: true,
      default: '',
    },

    message: {
      type: String,
      trim: true,
      default: '',
    },

    status: {
      type: String,
      enum: ['new', 'read', 'replied', 'closed'],
      default: 'new',
      required: true,
    },

    adminNote: {
      type: String,
      trim: true,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

const Enquiry = mongoose.model('Enquiry', enquirySchema);

module.exports = Enquiry;