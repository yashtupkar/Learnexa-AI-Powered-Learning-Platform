
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const path = require("path");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "your_cloud_name",
  api_key: process.env.CLOUDINARY_API_KEY || "your_api_key",
  api_secret: process.env.CLOUDINARY_API_SECRET || "your_api_secret",
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: (req, file) => {
    return {
      folder: "learnexa-uploads",
      public_id: `${Date.now()}-${path.parse(file.originalname).name}`,
      allowed_formats: ["jpg", "jpeg", "png", "gif", "pdf", "mp4"],
      resource_type: "auto",
      transformation: [{ width: 1920, crop: "limit" }],
    };
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB file size limit
  },
  fileFilter: (req, file, cb) => {
    // Optional file type validation
    const filetypes = /jpeg|jpg|png|gif|pdf|mp4/;
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb(
        new Error(
          "Error: Only images (JPEG, JPG, PNG, GIF), PDFs, and MP4 videos are allowed!"
        )
      );
    }
  },
});

module.exports = upload;
