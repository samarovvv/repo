const mongoose = require("mongoose");

const photoSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  data: { type: Buffer, required: true },
  contentType: { type: String, required: true },
  uploadDate: { type: Date, default: Date.now },
});

const Photo = mongoose.model("Photo", photoSchema);

module.exports = Photo;
