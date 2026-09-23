const cloudinary = require('../config/cloudinary');

const uploadImage = (file, folder = 'jk-biotech/products') => {
  return new Promise((resolve, reject) => {
    if (!file) {
      return reject(new Error('Image file is required'));
    }

    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: 'image',
      },
      (error, result) => {
        if (error) {
          return reject(error);
        }

        resolve({
          url: result.secure_url,
          publicId: result.public_id,
        });
      }
    );

    uploadStream.end(file.buffer);
  });
};

const uploadFile = (file, folder = 'jk-biotech/documents') => {
  return new Promise((resolve, reject) => {
    if (!file) {
      return reject(new Error('File is required'));
    }

    const isImage = file.mimetype.startsWith('image/');
    const resourceType = isImage ? 'image' : 'auto';

    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: resourceType,
      },
      (error, result) => {
        if (error) {
          return reject(error);
        }

        resolve({
          url: result.secure_url,
          publicId: result.public_id,
          fileName: file.originalname,
          fileType: file.mimetype,
        });
      }
    );

    uploadStream.end(file.buffer);
  });
};

const deleteImage = async (publicId, resourceType = 'image') => {
  if (!publicId) {
    return {
      success: false,
      message: 'No public ID provided',
    };
  }

  try {
    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: resourceType,
    });

    return {
      success: result.result === 'ok',
      result: result.result,
      publicId,
    };
  } catch (error) {
    console.error(`Error deleting Cloudinary asset ${publicId}:`, error);
    return {
      success: false,
      error: error.message,
    };
  }
};

module.exports = {
  uploadImage,
  uploadFile,
  deleteImage,
};