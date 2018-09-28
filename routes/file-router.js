const express = require("express");

const fileUploader = require("../config/file-uploader.js");

const router = express.Router();


router.post("/upload-image",
  fileUploader.single("imageFile"),
  (req, res, next) => {
    // multer puts all the information about the uploaded file in "req.file"
    console.log("New FILE UPLOAD", req.file);

    if (!req.file) {
      next(new Error("No image uploaded! 🤦‍♀️"));
    }
    else {
      const { originalname, secure_url, format, width, height } = req.file;
      res.json({
        imageName: originalname,
        imageUrl: secure_url,
        format,
        width,
        height,
      });
    }
  });


module.exports = router;
