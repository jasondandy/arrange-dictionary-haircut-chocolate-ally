function fetchRandomImages(number_of_images = 20, offset = 0, visitedImageIDs = []) {
    return jQuery.ajax({
        url: collage_gallery_ajax.ajax_url,
        method: "GET",
        dataType: "json",
        data: {
            action: "get_collage_gallery_images",
            nonce: collage_gallery_ajax.nonce,
            number_of_images: number_of_images,
            offset: offset,
            visited_image_ids: visitedImageIDs.join(","),
        },
    });
}
