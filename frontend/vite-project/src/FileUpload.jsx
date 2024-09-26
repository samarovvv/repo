import React, { useEffect, useState } from "react";
import axios from "axios";

const FileUpload = () => {
  const [images, setImages] = useState([]);
  const [file, setFile] = useState(null); // State to hold the selected file

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/photos");
        setImages(response.data);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, []);

  const handleImageError = (filename) => {
    console.warn(`Image file not found for: ${filename}`);
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]); // Set the selected file
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("photos", file); // Append the selected file to form data

    try {
      await axios.post("http://localhost:3000/api/photos/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      // Optionally fetch images again to see the newly uploaded image
      const response = await axios.get("http://localhost:3000/api/photos");
      setImages(response.data);
    } catch (error) {
      console.error("Error uploading files:", error);
    }
  };

  return (
    <div>
      {/* File upload form */}
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload Image</button>
      </form>

      {/* Displaying fetched images */}
      {images.map((image) => (
        <div key={image._id}>
          <h3>{image.filename}</h3>
          {image.data ? (
            // For base64 data
            <img
              src={`data:${image.contentType};base64,${image.data.toString(
                "base64"
              )}`}
              alt={image.filename}
              style={{ width: "200px", height: "auto" }}
              onError={() => handleImageError(image.filename)} // Handle image error
            />
          ) : image.imageUrl ? (
            // For images stored as URLs
            <img
              src={image.imageUrl}
              alt={image.filename}
              style={{ width: "200px", height: "auto" }}
              onError={() => handleImageError(image.filename)} // Handle image error
            />
          ) : (
            <p>Image not available</p> // In case no src is available
          )}
        </div>
      ))}
    </div>
  );
};

export default FileUpload;
