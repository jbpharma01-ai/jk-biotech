/**
 * Optimizes Cloudinary image URLs with automatic format (WebP/AVIF),
 * automatic quality, and scaled dimensions for thumbnails.
 * 
 * @param {string} url - Original image URL
 * @param {object} options - Sizing and cropping options
 * @returns {string} - Optimized image URL
 */
export const getThumbnailUrl = (url, { width = 100, height = 100, mode = "fill" } = {}) => {
  if (!url || typeof url !== "string") return "";

  // Check if it's a Cloudinary URL
  if (url.includes("res.cloudinary.com") && url.includes("/upload/")) {
    const transformStr = `w_${width},h_${height},c_${mode},q_auto,f_auto/`;
    return url.replace("/upload/", `/upload/${transformStr}`);
  }

  return url;
};

export const getHeroImageUrl = (url, { width = 1280 } = {}) => {
  if (!url || typeof url !== "string") return "";

  if (url.includes("res.cloudinary.com") && url.includes("/upload/")) {
    const transformStr = `w_${width},q_auto,f_auto/`;
    return url.replace("/upload/", `/upload/${transformStr}`);
  }

  return url;
};
