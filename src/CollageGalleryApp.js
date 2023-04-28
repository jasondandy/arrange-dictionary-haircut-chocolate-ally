import React, { useState, useEffect } from "react";
import CollageGallery from "./CollageGallery";

function CollageGalleryApp() {
    const [images, setImages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [imageIds, setImageIds] = useState([]);
    const [hasFetchedImageIds, setHasFetchedImageIds] = useState(false);

    const fetchImageIds = async () => {
        const response = await fetch(`${ajaxInfo.ajax_url}?action=fetch_image_ids`);
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return await response.json();
    };

    // Fetch image IDs
    useEffect(() => {
        if (!hasFetchedImageIds) {
            fetchImageIds()
                .then((imageIds) => {
                    setShuffledImageIds(shuffleArray(imageIds));
                    setHasFetchedImageIds(true);
                })
                .catch((error) => {
                    console.error("Failed to fetch image IDs:", error);
                });
        }
    }, [hasFetchedImageIds]);

    useEffect(() => {
        // Fetch image IDs
        async function fetchImageIds() {
            try {
                const response = await fetch(ajax_object.ajax_url, {
                    method: "POST",
                    headers: { "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8" },
                    body: new URLSearchParams({
                        action: "fetch_image_ids",
                        nonce: ajax_object.nonce,
                    }),
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                setImageIds(data.image_ids);
            } catch (error) {
                setError(`Failed to fetch image IDs: ${error}`);
            }
        }

        fetchImageIds();
    }, []);

    useEffect(() => {
        if (imageIds.length > 0) {
            // Shuffle image IDs
            const shuffledImageIds = imageIds.sort(() => Math.random() - 0.5);

            // Fetch images in chunks
            const fetchImages = async () => {
                try {
                    const response = await fetch(ajax_object.ajax_url, {
                        method: "POST",
                        headers: { "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8" },
                        body: new URLSearchParams({
                            action: "fetch_images",
                            nonce: ajax_object.nonce,
                            image_ids: JSON.stringify(shuffledImageIds.slice(0, 20)),
                        }),
                    });

                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }

                    const data = await response.json();
                    setImages(data.images);
                    setIsLoading(false);
                } catch (error) {
                    setError(`Failed to fetch images: ${error}`);
                }
            };

            fetchImages();
        }
    }, [imageIds]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <CollageGallery images={images} />
        </div>
    );
}

export default CollageGalleryApp;
