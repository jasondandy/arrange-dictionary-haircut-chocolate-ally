import React, { useState, useEffect } from 'react';

const CollageGallery = ({ images, fetchImages }) => {
  const [hasMoreImages, setHasMoreImages] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (!hasMoreImages) return;

      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 500
      ) {
        fetchImages(images.length);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [images, hasMoreImages, fetchImages]);

  useEffect(() => {
    if (images.length === 0) {
      setHasMoreImages(true);
      fetchImages();
    } else if (images.length > 0 && images.length % 20 !== 0) {
      setHasMoreImages(false);
    }
  }, [images, fetchImages]);

  return (
    <div>
      {images.map((image) => (
        <img key={image.id} src={image.url} alt="" />
      ))}
    </div>
  );
};

export default CollageGallery;
