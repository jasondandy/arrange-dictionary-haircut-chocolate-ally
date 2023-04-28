import React, { useState, useEffect } from "react";
import Masonry from "react-masonry-css";

const CollageGallery = ({ images, fetchImages }) => {
    const [hasMoreImages, setHasMoreImages] = useState(true);

    useEffect(() => {

        const handleScroll = () => {
            if (!hasMoreImages) return;

            if (
                window.innerHeight + document.documentElement.scrollTop >=
                document.documentElement.offsetHeight - 500
            ) {
                fetchImages(images.length, images.map((image) => image.id).join(","));
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
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
            columnClassName="my-masonry-grid_column">
            {images.map((image) => (
                <img key={image.id} src={image.url} alt="" style={{ width: "100%" }} />
            ))}
        </Masonry>
    );
};

export default CollageGallery;
