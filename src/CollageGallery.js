// import React, { useState, useEffect } from 'react';

// const CollageGallery = ({ images, fetchImages }) => {
//   const [hasMoreImages, setHasMoreImages] = useState(true);

//   useEffect(() => {
//     const handleScroll = () => {
//       if (!hasMoreImages) return;

//       if (
//         window.innerHeight + document.documentElement.scrollTop >=
//         document.documentElement.offsetHeight - 500
//       ) {
//         fetchImages(images.length);
//       }
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, [images, hasMoreImages, fetchImages]);

//   useEffect(() => {
//     if (images.length === 0) {
//       setHasMoreImages(true);
//       fetchImages();
//     } else if (images.length > 0 && images.length % 20 !== 0) {
//       setHasMoreImages(false);
//     }
//   }, [images, fetchImages]);

//   const collageGalleryStyles = {
//     collageGallery: {
//       display: 'grid',
//       gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
//       gridAutoRows: '180px',
//       gridGap: '10px',
//     },
//     img: {
//       width: '100%',
//       height: '100%',
//       objectFit: 'cover',
//     },
//   };

//   return (
//     <div style={collageGalleryStyles.collageGallery}>
//       {images.map((image) => (
//         <img key={image.id} src={image.url} alt="" style={collageGalleryStyles.img} />
//       ))}
//     </div>
//   );
// };

// export default CollageGallery;


import React, { useState, useEffect } from 'react';
import Masonry from 'react-masonry-css';

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

  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };

  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="my-masonry-grid"
      columnClassName="my-masonry-grid_column"
    >
      {images.map((image) => (
        <img key={image.id} src={image.url} alt="" style={{ width: '100%' }} />
      ))}
    </Masonry>
  );
};

export default CollageGallery;
