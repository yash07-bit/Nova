const cloudinary = require("cloudinary").v2;
const multerStorageCloudinary = require("multer-storage-cloudinary");
const CloudinaryStorage =
  (multerStorageCloudinary && multerStorageCloudinary.CloudinaryStorage) ||
  (multerStorageCloudinary && multerStorageCloudinary.default) ||
  multerStorageCloudinary;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECERT,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "Ecommerce_Products",
    allowedFormats: ["jpeg", "png", "jpg"],
  },
});

module.exports = {
  cloudinary,
  storage,
};
