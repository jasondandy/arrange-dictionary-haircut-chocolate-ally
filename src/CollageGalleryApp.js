import React, { useState, useEffect } from "react";
import CollageGallery from "./CollageGallery";

const CollageGalleryApp = () => {
    const [imageIds, setImageIds] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchAndSetImageIds() {
            try {
                const fetchedImageIds = await fetchImageIds();
                setImageIds(fetchedImageIds);
                setLoading(false);
            } catch (e) {
                setError(e);
                setLoading(false);
            }
        }

        fetchAndSetImageIds();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return <CollageGallery imageIds={imageIds} />;
};

async function fetchImageIds() {
    const response = await fetch(window.ajaxInfo.ajax_url, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
            action: "fetch_image_ids",
            nonce: window.ajaxInfo.nonce,
        }),
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch image IDs: ${response.statusText}`);
    }

    const data = await response.json();

    if (data.success) {
        return data.data.image_ids;
    } else {
        throw new Error(`Failed to fetch image IDs: ${data.data.message}`);
    }
}

export default CollageGalleryApp;
