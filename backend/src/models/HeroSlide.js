const mongoose = require('mongoose');

const heroSlideSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Hero slide title is required'],
      trim: true,
    },

    titleLines: {
      type: [String],
      default: [],
    },

    badge: {
      type: String,
      trim: true,
      default: '',
    },

    subtitle: {
      type: String,
      trim: true,
      default: '',
    },

    image: {
      url: {
        type: String,
        required: [true, 'Hero slide image URL is required'],
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

    cta: {
      label: {
        type: String,
        trim: true,
        default: '',
      },
      link: {
        type: String,
        trim: true,
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

// High performance query index
heroSlideSchema.index({ isActive: 1, displayOrder: 1, createdAt: -1 });

const HeroSlide = mongoose.model('HeroSlide', heroSlideSchema);

module.exports = HeroSlide;