const express = require("express");
const multer = require("multer");
const Photo = require("./Photo"); // Ensure this path is correct
const router = express.Router();

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Ensure this folder exists
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + file.originalname;
    cb(null, uniqueSuffix);
  },
});

const upload = multer({ storage: storage });

// Route to handle multiple file uploads
router.post("/upload", upload.single("photo"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const newPhoto = new Photo({
      filename: req.file.filename,
      filepath: req.file.path,
    });

    await newPhoto.save();
    res
      .status(201)
      .json({ message: "Photo uploaded successfully", photo: newPhoto });
  } catch (err) {
    console.error("Error saving photo:", err); // Log error details
    res.status(500).json({ message: "Error saving photo", error: err.message });
  }
});

// Export the router
module.exports = router;
