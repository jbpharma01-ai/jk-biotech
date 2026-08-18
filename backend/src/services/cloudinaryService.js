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

const deleteImage = async (publicId) => {
  if (!publicId) {
    return {
      success: false,
      message: 'No public ID provided',
    };
  }

  const result = await cloudinary.uploader.destroy(publicId);

  return {
    success: result.result === 'ok',
    result: result.result,
    publicId,
  };
};

module.exports = {
  uploadImage,
  deleteImage,
};