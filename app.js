const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const mongoose = require("mongoose");
const cors = require("cors");
const Photo = require("./Photo"); // Photo model

// Connect to MongoDB
require("./db"); // Ensure you are importing the correct db.js connection

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set up multer to store file in memory as Buffer
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Upload endpoint to handle file uploads and store them in MongoDB
app.post("/api/photos/upload", upload.single("photos"), async (req, res) => {
  try {
    if (req.file) {
      // Create a new Photo document and store the file's binary data in MongoDB
      const newPhoto = new Photo({
        filename: req.file.originalname, // Use the original file name
        data: req.file.buffer, // Store the file as binary data (Buffer)
        contentType: req.file.mimetype, // Store the file's mimetype (image/jpeg, etc.)
        uploadDate: new Date(),
      });

      // Save the photo document to MongoDB
      await newPhoto.save();

      // Respond with success message
      res.json({ message: "File uploaded and saved to MongoDB successfully" });
    } else {
      res.status(400).json({ message: "No file uploaded" });
    }
  } catch (error) {
    console.error("Error saving photo to MongoDB:", error);
    res.status(500).json({ message: "Error saving photo", error });
  }
});

// Fetch and serve image
app.get("/api/photos/:id", async (req, res) => {
  try {
    const photo = await Photo.findById(req.params.id);

    if (!photo) {
      return res.status(404).json({ message: "Photo not found" });
    }

    // Serve the image
    res.set("Content-Type", photo.contentType);
    res.send(photo.data); // Send the binary data
  } catch (error) {
    console.error("Error fetching photo:", error);
    res.status(500).json({ message: "Error fetching photo", error });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
