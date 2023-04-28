import React, { useEffect, useState } from "react";
import CollageGallery from "./CollageGallery";

function CollageGalleryApp() {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAndSetImageIds();
    }, []);

    async function fetchAndSetImageIds() {
        try {
            const imageIds = await fetchImageIds();
            setImages(imageIds);
            setLoading(false);
        } catch (error) {
            console.error(`Failed to fetch image IDs: ${error}`);
        }
    }

    async function fetchImageIds() {
        console.log("ajaxInfo:", ajaxInfo);

        const response = await fetch(ajaxInfo.ajax_url, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
            },
            body: new URLSearchParams({
                action: "collage_gallery_fetch_image_ids",
                nonce: ajaxInfo.nonce, // Add the nonce field to the request body
            }),
        });

        console.log('Response:', response); 

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const imageIds = await response.json();
        return imageIds;
    }

    return <div className="CollageGalleryApp">{loading ? <p>Loading...</p> : <CollageGallery images={images} />}</div>;
}

export default CollageGalleryApp;
