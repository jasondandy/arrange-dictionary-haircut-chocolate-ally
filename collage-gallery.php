<?php

/**
 * Plugin Name: Collage Gallery
 * Description: A custom collage gallery plugin with React-based frontend
 * Version: 1.0
 * Author: Your Name
 * Author URI: https://establishedweb.com
 * License: GPLv2 or later
 * Text Domain: collage-gallery
 */

/**
 * Create the admin menu - NOT NEEDED?
 */
function collage_gallery_admin_menu()
{
    add_menu_page(
        'Collage Gallery',
        'Collage Gallery',
        'manage_options',
        'collage-gallery',
        'collage_gallery_admin_page',
        'dashicons-format-gallery',
        30
    );
}
add_action('admin_menu', 'collage_gallery_admin_menu');

/**
 * Render the admin page - NOT NEEDED?
 */
function collage_gallery_admin_page()
{
    echo '<h1>Collage Gallery Settings</h1>';
}

/**
 * Shortcode to display React frame on front end
 */
function collage_gallery_shortcode($atts)
{
    return '<div id="collage-gallery-react-app"></div>';
}
add_shortcode('collage_gallery', 'collage_gallery_shortcode');


/**
 * Create the Collage Gallery Settings admin page
 */
function collage_gallery_create_settings_page()
{
    add_menu_page(
        'Collage Gallery Settings',
        'Collage Gallery',
        'manage_options',
        'collage-gallery-settings',
        'collage_gallery_render_settings_page',
        'dashicons-format-gallery'
    );
}
add_action('admin_menu', 'collage_gallery_create_settings_page');


/**
 * Render content to the Collage Gallery Settings admin page
 */
function collage_gallery_render_settings_page()
{
?>
    <div class="wrap">
        <h1>Collage Gallery Settings</h1>
        <form method="post" action="options.php">
            <?php
            settings_fields('collage-gallery-settings-group');
            do_settings_sections('collage-gallery-settings');
            submit_button();
            ?>
        </form>
    </div>
<?php
}

/**
 * Handle the Collage Gallery Settings gallery, to select/deselect images to be used in the front end gallery
 */
function collage_gallery_register_settings()
{
    register_setting('collage-gallery-settings-group', 'collage_gallery_images');

    add_settings_section(
        'collage-gallery-images-section',
        'Collage Gallery Images',
        null,
        'collage-gallery-settings'
    );

    add_settings_field(
        'collage-gallery-images',
        'Images',
        'collage_gallery_images_callback',
        'collage-gallery-settings',
        'collage-gallery-images-section'
    );
}
add_action('admin_init', 'collage_gallery_register_settings');



function collage_gallery_images_callback()
{
    $images = get_option('collage_gallery_images', []);
    $images = !empty($images) ? explode(',', $images) : []; // Convert the saved comma-separated string to an array
    wp_enqueue_media();
?>
    <div id="collage-gallery-images-container">
        <?php foreach ($images as $image_id) : ?>
            <?php $image = wp_get_attachment_image_src($image_id, 'thumbnail'); ?>
            <div class="collage-gallery-image-wrapper">
                <img src="<?php echo $image[0]; ?>" data-image-id="<?php echo $image_id; ?>" class="collage-gallery-image" />
                <div class="collage-gallery-remove-image">×</div>
            </div>
        <?php endforeach; ?>
    </div>
    <input type="hidden" name="collage_gallery_images" id="collage-gallery-images-input" value="<?php echo implode(',', $images); ?>" />
    <button type="button" class="button" id="collage-gallery-add-images">Add Images</button>
    <script>
        jQuery(document).ready(function($) {
            var imageIds = <?php echo json_encode(array_map('intval', $images)); ?>; // Use the saved images from the option and convert them to integers
            var frame;

            function removeImage(event) {
                var imageWrapper = $(event.target).closest('.collage-gallery-image-wrapper');
                var imageId = parseInt(imageWrapper.find('.collage-gallery-image').data('image-id'), 10);
                var index = imageIds.indexOf(imageId);

                console.log('Before removal:', imageIds); // Add this line

                if (index !== -1) {
                    imageIds.splice(index, 1);
                    imageWrapper.remove();
                    $('#collage-gallery-images-input').val(imageIds.join(','));
                }

                console.log('After removal:', imageIds); // Add this line
            }


            // Initialize the removeImage click event for existing images
            $('.collage-gallery-remove-image').on('click', removeImage);

            $('#collage-gallery-add-images').on('click', function(event) {
                event.preventDefault();

                if (frame) {
                    frame.open();
                    return;
                }

                frame = wp.media({
                    title: 'Select Images',
                    button: {
                        text: 'Add to Collage Gallery'
                    },
                    library: {
                        type: 'image'
                    },
                    multiple: 'add'
                });

                frame.on('select', function() {
                    var images = frame.state().get('selection').toJSON();
                    var container = $('#collage-gallery-images-container');
                    var input = $('#collage-gallery-images-input');

                    images.forEach(function(image) {
                        if (!imageIds.includes(image.id)) {
                            imageIds.push(image.id);
                            var imageWrapper = $('<div>').addClass('collage-gallery-image-wrapper');
                            $('<img>')
                                .attr('src', image.sizes.thumbnail.url)
                                .attr('data-image-id', image.id)
                                .addClass('collage-gallery-image')
                                .appendTo(imageWrapper);
                            $('<div>')
                                .addClass('collage-gallery-remove-image')
                                .text('×')
                                .appendTo(imageWrapper)
                                .on('click', removeImage); // Add the removeImage click event for the new image
                            imageWrapper.appendTo(container);
                        }
                    });

                    input.val(imageIds.join(','));
                });

                frame.open();
            });

        });
    </script>
    <style>
        .collage-gallery-image-wrapper {
            display: inline-block;
            position: relative;
            margin: 5px;
        }

        .collage-gallery-image {
            display: block;
        }

        .collage-gallery-remove-image {
            display: none;
            position: absolute;
            top: 0;
            right: 0;
            background-color: rgba(0, 0, 0, 0.5);
            color: #fff;
            font-weight: bold;
            padding: 2px 5px;
            cursor: pointer;
        }

        .collage-gallery-image-wrapper:hover .collage-gallery-image {
            opacity: 0.5;
        }

        .collage-gallery-image-wrapper:hover .collage-gallery-remove-image {
            display: block;
        }
    </style>

<?php
}

/**
 * Create AJAX handler for front end frame
 */
add_action('wp_ajax_get_collage_gallery_images', 'get_collage_gallery_images');
add_action('wp_ajax_nopriv_get_collage_gallery_images', 'get_collage_gallery_images');

function get_collage_gallery_images() {
    $images = get_option('collage_gallery_images', []);
    $images = !empty($images) ? explode(',', $images) : [];

    $number_of_images = isset($_GET['number_of_images']) ? (int)$_GET['number_of_images'] : 20;

    $offset = isset($_GET['offset']) ? (int)$_GET['offset'] : 0;

    shuffle($images);
    $random_images = array_slice($images, $offset, $number_of_images);

    $response = [];

    foreach ($random_images as $image_id) {
        $image_src = wp_get_attachment_image_src($image_id, 'large');
        $response[] = [
            'id' => $image_id,
            'url' => $image_src[0]
        ];
    }

    wp_send_json($response);
}

/**
 * Enqueue custom script
 */
function collage_gallery_enqueue_scripts()
{
    // Enqueue jQuery
    wp_enqueue_script('jquery');

    // Enqueue your custom React script
    wp_enqueue_script('collage-gallery-react', plugin_dir_url(__FILE__) . 'dist/collage-gallery-react.js', array('jquery'), '1.0', true);

    // Include the AJAX code directly in the PHP file
    echo '<script>
    function fetchRandomImages(number_of_images = 20, offset = 0) {
        return jQuery.ajax({
            url: collage_gallery_ajax.ajax_url,
            method: "GET",
            dataType: "json",
            data: {
                action: "get_collage_gallery_images",
                nonce: collage_gallery_ajax.nonce,
                number_of_images: number_of_images,
                offset: offset
            }
        });
    }
    </script>';

    // Localize the AJAX script
    wp_localize_script('collage-gallery-react', 'collage_gallery_ajax', [
        'ajax_url' => admin_url('admin-ajax.php'),
        'nonce' => wp_create_nonce('collage-gallery-ajax-nonce')
    ]);
}
add_action('wp_enqueue_scripts', 'collage_gallery_enqueue_scripts');

