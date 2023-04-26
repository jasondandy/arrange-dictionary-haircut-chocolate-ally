// import React, { useState, useEffect } from "react";
// import CollageGallery from "./CollageGallery";

// const CollageGalleryApp = () => {
//     // const [images, setImages] = useState([]);

//     // //   const fetchImages = async (offset = 0) => {
//     // //     try {
//     // //       const fetchedImages = await window.fetchRandomImages(20, offset);
//     // //       if (fetchedImages.length > 0) {
//     // //         setImages((prevImages) => [...prevImages, ...fetchedImages]);
//     // //       }
//     // //     } catch (error) {
//     // //       console.error('Failed to fetch images:', error);
//     // //     }
//     // //   };

//     // const fetchImages = async (offset = 0) => {
//     //     try {
//     //         const fetchedImages = await window.fetchRandomImages(20, offset);
//     //         if (fetchedImages.length > 0) {
//     //             const uniqueImages = fetchedImages.filter(
//     //                 (fetchedImage) => !images.some((image) => image.id === fetchedImage.id)
//     //             );
//     //             setImages((prevImages) => [...prevImages, ...uniqueImages]);
//     //         }
//     //     } catch (error) {
//     //         console.error("Failed to fetch images:", error);
//     //     }
//     // };

//     const [images, setImages] = useState([]);
//     // const [seenImageIds, setSeenImageIds] = useState(new Set());

//     // const fetchImages = async (offset = 0) => {
//     //     try {
//     //         const fetchedImages = await window.fetchRandomImages(20, offset);
//     //         if (fetchedImages.length > 0) {
//     //             const uniqueImages = fetchedImages.filter((fetchedImage) => !seenImageIds.has(fetchedImage.id));
//     //             setSeenImageIds((prevSeenImageIds) => {
//     //                 const newSeenImageIds = new Set(prevSeenImageIds);
//     //                 uniqueImages.forEach((image) => newSeenImageIds.add(image.id));
//     //                 return newSeenImageIds;
//     //             });
//     //             setImages((prevImages) => [...prevImages, ...uniqueImages]);
//     //         }
//     //     } catch (error) {
//     //         console.error("Failed to fetch images:", error);
//     //     }
//     // };

//     const fetchImages = async (offset = 0, shuffledImages = null) => {
//         try {
//           const fetchedImages = await window.fetchRandomImages(20, offset, shuffledImages);
//           if (fetchedImages.length > 0) {
//             setImages((prevImages) => [...prevImages, ...fetchedImages]);
//           }
//         } catch (error) {
//           console.error('Failed to fetch images:', error);
//         }
//       };

//     useEffect(() => {
//         fetchImages();
//     }, []);

//     return (
//         <div>
//             <h2>Collage Gallery</h2>
//             <CollageGallery images={images} fetchImages={fetchImages} />
//         </div>
//     );
// };

// export default CollageGalleryApp;

import React, { useState, useEffect } from "react";
import CollageGallery from "./CollageGallery";

const CollageGalleryApp = () => {
    const [images, setImages] = useState([]);
    const [visitedImageIDs, setVisitedImageIDs] = useState([]);

    const fetchImages = async (offset = 0, visitedIDs = []) => {
        try {
            const fetchedImages = await window.fetchRandomImages(20, offset, visitedIDs);
            console.log("Fetched images:", fetchedImages);

            if (fetchedImages.length > 0) {
                const newImages = [...images, ...fetchedImages];
                console.log("New images:", newImages);
                setImages(newImages);

                const newVisitedImageIDs = [...visitedImageIDs, ...fetchedImages.map((img) => img.id)];
                console.log("Updated visitedImageIDs:", newVisitedImageIDs);
                setVisitedImageIDs(newVisitedImageIDs);
            }
        } catch (error) {
            console.error("Failed to fetch images:", error);
        }
    };

    useEffect(() => {
        fetchImages();
    }, []);

    return (
        <div>
            <h2>Collage Gallery</h2>
            <CollageGallery images={images} fetchImages={() => fetchImages(images.length, visitedImageIDs)} />
        </div>
    );
};

export default CollageGalleryApp;
