import React, { useState } from "react";
import axios from "axios";

const FileUpload = () => {
  const [files, setFiles] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);

  const handleFileChange = (event) => {
    setFiles(event.target.files); // Handle multiple file uploads
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("photos", file); // The key here must be "photos"

    try {
      const response = await axios.post(
        "http://localhost:3000/api/photos/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error uploading file:", error.response.data);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" name="photos" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>

      {/* Display uploaded images */}
      <div className="uploaded-images">
        {imageUrls.map((url, index) => (
          <img
            key={index}
            src={url}
            alt={`Uploaded ${index}`}
            style={{ width: "100px", margin: "10px" }}
          />
        ))}
      </div>
    </div>
  );
};

export default FileUpload;
