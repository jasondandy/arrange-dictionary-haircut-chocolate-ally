import React from 'react';
import ReactDOM from 'react-dom';
import CollageGalleryApp from './CollageGalleryApp';

document.addEventListener('DOMContentLoaded', () => {
  const collageGalleryAppDiv = document.getElementById('collage-gallery-react-app');

  if (collageGalleryAppDiv) {
    ReactDOM.render(<CollageGalleryApp />, collageGalleryAppDiv);
  }
});
