// // Import 'path' module from Node.js to handle file paths
// import path from "path";

// // Import Express.js framework
// import express from "express";

// // Import multer for handling multipart/form-data (for file uploads)
// import multer from "multer";

// // Create a new Express router object
// const router = express.Router();

// // Format the current time (HH:MM), remove seconds, and replace ":" with "-" for filename safety
// // let formattedFileDate = date
// //   .toLocaleTimeString()
// //   .slice(0, -3)
// //   .replace(/:/g, "-");
// // Set up storage configuration for multer
// const storage = multer.diskStorage({
//   // Set destination folder for uploaded files
//   destination: (req, file, cb) => {
//     cb(null, "uploads/"); // Save files in "uploads" directory
//   },

//   // Set filename of uploaded file
//   filename: (req, file, cb) => {
//     // Use field name + current time + original file extension
//     cb(
//       null,
//       `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
//     );
//   },
// });
// // Filter to allow only certain image types
// const fileFilter = (req, file, cb) => {
//   const fileTypes = /jpeg|jpg|png|webp/; // Allowed extensions
//   const mimeTypes = /image\/jpeg|image\/jpg|image\/png|image\/webp/; // Allowed MIME types
//   const ext = path.extname(file.originalname).toLowerCase(); // Get file extension in lowercase
//   const mime = file.mimetype; // Get MIME type of the file

//   // Check if both extension and MIME type are valid
//   if (fileTypes.test(ext) && mimeTypes.test(mime)) {
//     cb(null, true); // Accept file
//   } else {
//     cb(new Error("Images only"), false); // Reject file with error
//   }
// };
// // Configure multer with custom storage and filter
// const upload = multer({ storage, fileFilter });

// // Define single file upload middleware for the "image" field
// const uploadSingleImage = upload.single("image");
// // Define POST route to upload an image
// router.post("/", (req, res) => {
//   // Call the multer middleware
//   uploadSingleImage(req, res, (err) => {
//     // Handle error during upload (wrong format, multer errors, etc.)
//     if (err) {
//       return res.status(400).json({
//         request: "fail", // Changed from "success" to indicate failure
//         message: err.message, // Error message from multer
//         MESSAGE: "ERROR_OCCURRED",
//       });
//     }
//     // If file is uploaded successfully
//     else if (req.file) {
//       return res.status(201).json({
//         request: "success",
//         message: "Image uploaded successfully",
//         image: `/${req.file.path.replace(/\\/g, "/")}`, //windows
//         //image: `${req.file.path}`,//linux
//         MESSAGE: "IMAGE_UPLOADED",
//       });
//     }
//     // If no file was found in the request
//     else {
//       return res.status(400).json({
//         request: "fail",
//         message: "No image found",
//         MESSAGE: "NO_IMAGE",
//       });
//     }
//   });
// });
// export default router;
import path from "path";
import fs from "fs";
import express from "express";
import multer from "multer";
import sharp from "sharp";

const router = express.Router();

// Multer storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  },
});

// Filter only images
const fileFilter = (req, file, cb) => {
  const fileTypes = /jpeg|jpg|png|webp/;
  const mimeTypes = /image\/jpeg|image\/jpg|image\/png|image\/webp/;
  const ext = path.extname(file.originalname).toLowerCase();
  const mime = file.mimetype;

  if (fileTypes.test(ext) && mimeTypes.test(mime)) {
    cb(null, true);
  } else {
    cb(new Error("Images only"), false);
  }
};

const upload = multer({ storage, fileFilter });
const uploadSingleImage = upload.single("image");

// Upload + convert to WebP
router.post("/", (req, res) => {
  uploadSingleImage(req, res, async (err) => {
    if (err) {
      return res.status(400).json({
        request: "fail",
        message: err.message,
        MESSAGE: "ERROR_OCCURRED",
      });
    } else if (req.file) {
      try {
        // Define new webp filename
        const webpFilename = `${path.basename(req.file.filename, path.extname(req.file.filename))}.webp`;
        const webpPath = path.join("uploads", webpFilename);

        // Convert uploaded file to WebP
        await sharp(req.file.path)
          .webp({ quality: 80 }) // Adjust quality (0–100)
          .toFile(webpPath);

        // Remove the original uploaded file to save space (optional)
        fs.unlinkSync(req.file.path);

        return res.status(201).json({
          request: "success",
          message: "Image uploaded and converted to WebP successfully",
          image: `/${webpPath.replace(/\\/g, "/")}`, // Ensure forward slashes
          MESSAGE: "IMAGE_UPLOADED",
        });
      } catch (conversionError) {
        return res.status(500).json({
          request: "fail",
          message: conversionError.message,
          MESSAGE: "CONVERSION_ERROR",
        });
      }
    } else {
      return res.status(400).json({
        request: "fail",
        message: "No image found",
        MESSAGE: "NO_IMAGE",
      });
    }
  });
});

export default router;
