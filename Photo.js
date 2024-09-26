const mongoose = require("mongoose");

const photoSchema = new mongoose.Schema({
  filename: String,
  data: Buffer, // Buffer type to store binary image data
  contentType: String, // The MIME type of the image (e.g., image/jpeg, image/png)
});

const Photo = mongoose.model("Photo", photoSchema);

module.exports = Photo;
