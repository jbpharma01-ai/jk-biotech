const mongoose = require('mongoose');

const companySettingSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: [true, 'Company name is required'],
      trim: true,
    },

    tagline: {
      type: String,
      trim: true,
      default: '',
    },

    email: {
      type: String,
      trim: true,
      lowercase: true,
      default: '',
    },

    phone: {
      type: String,
      trim: true,
      default: '',
    },

    address: {
      type: String,
      trim: true,
      default: '',
    },

    workingHours: {
      type: String,
      trim: true,
      default: '',
    },

    socialLinks: {
      facebook: {
        type: String,
        trim: true,
        default: '',
      },
      instagram: {
        type: String,
        trim: true,
        default: '',
      },
      linkedin: {
        type: String,
        trim: true,
        default: '',
      },
      youtube: {
        type: String,
        trim: true,
        default: '',
      },
    },

    logo: {
      url: {
        type: String,
        default: '',
      },
      publicId: {
        type: String,
        default: '',
      },
      alt: {
        type: String,
        default: '',
      },
    },
  },
  {
    timestamps: true,
  }
);

const CompanySetting = mongoose.model(
  'CompanySetting',
  companySettingSchema
);

module.exports = CompanySetting;