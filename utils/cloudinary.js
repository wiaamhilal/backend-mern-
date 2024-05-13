const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//cloudinary upload image
const cloudinaryUploadImage = async (myImage) => {
  try {
    const data = await cloudinary.uploader.upload(myImage, {
      resourse_type: "auto",
    });
    return data;
  } catch (error) {
    return error;
  }
};

//cloudinary remove image
const cloudinaryReoveImage = async (imagePublicId) => {
  try {
    const result = await cloudinary.uploader.destroy(imagePublicId);
    return result;
  } catch (error) {
    return error;
  }
};

module.exports = {
  cloudinaryUploadImage,
  cloudinaryReoveImage,
};
