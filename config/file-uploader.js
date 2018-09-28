const cloudinary = require("cloudinary");
const cloudinaryStorage = require("multer-storage-cloudinary");
const multer = require("multer");


// "cloudinary" is the npm package to use the Cloudinary API
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

// "cloudinaryStorage" tells "multer" to send uploaded files to Cloudinary
const storage = cloudinaryStorage({
  cloudinary,
  folder: "app-images",
  // in case you want to upload files OTHER than images
  // params: {
  //   resource_type: "raw",
  // },
});

// "multer" is the one that integrates with your Express routes directly
const fileUploader = multer({ storage });


module.exports = fileUploader;
