async function fetchRandomizedImageIds() {
    const ajax_url = window.ajax_object?.ajax_url;
    const nonce = window.ajax_object?.nonce;

    if (!ajax_url) {
        throw new Error("Ajax URL is not defined.");
    }

    const response = await fetch(ajax_url, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
        },
        body: new URLSearchParams({
            action: "collage_gallery_fetch_randomized_image_ids",
            nonce: nonce,
        }),
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.randomized_image_ids;
}
