import React, { useState, useEffect } from 'react';
import CollageGallery from './CollageGallery';

const CollageGalleryApp = () => {
  const [images, setImages] = useState([]);

  const fetchImages = async (offset = 0) => {
    try {
      const fetchedImages = await window.fetchRandomImages(20, offset);
      if (fetchedImages.length > 0) {
        setImages((prevImages) => [...prevImages, ...fetchedImages]);
      }
    } catch (error) {
      console.error('Failed to fetch images:', error);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <div>
      <h2>Collage Gallery</h2>
      <CollageGallery images={images} fetchImages={fetchImages} />
    </div>
  );
};

export default CollageGalleryApp;
