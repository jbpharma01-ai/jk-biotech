/**
 * Utility for optimizing image URLs for production performance.
 * Supports Cloudinary automatic format/quality/resize transformations
 * and safe fallbacks for missing or local images.
 */

export const getOptimizedImageUrl = (imageSource, width = 600) => {
  if (!imageSource) {
    return '/images/products/capsule/IMG_1539.JPG';
  }

  const url = typeof imageSource === 'string' ? imageSource : imageSource?.url || '';

  if (!url) {
    return '/images/products/capsule/IMG_1539.JPG';
  }

  // Cloudinary image auto-optimization (f_auto, q_auto, width limit)
  if (url.includes('res.cloudinary.com') && url.includes('/upload/')) {
    if (!url.includes('f_auto') && !url.includes('q_auto')) {
      return url.replace('/upload/', `/upload/f_auto,q_auto,w_${width},c_limit/`);
    }
  }

  return url;
};

export default getOptimizedImageUrl;
