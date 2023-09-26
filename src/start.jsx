import React, { useState } from 'react';

const Dashboard = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  };

  return (
    <div>
      <h1>Dashboard</h1>

      {/* Input for selecting an image */}
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        style={{ display: 'none' }}
        id="imageInput"
      />
      <label htmlFor="imageInput" className="image-label">
        {selectedImage ? (
          <img src={selectedImage} alt="Profile" className="profile-image" />
        ) : (
          'Select Profile Picture'
        )}
      </label>
    </div>
  );
};

export default Dashboard;
