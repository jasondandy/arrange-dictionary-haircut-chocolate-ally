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
  * Create the admin menu
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
 * Render the admin page
 */
function collage_gallery_admin_page() {
    echo '<h1>Collage Gallery Settings</h1>';
}

/**
 * Shortcode
 */
function collage_gallery_shortcode($atts) {
    return '<div id="collage-gallery-react-app"></div>';
}
add_shortcode('collage_gallery', 'collage_gallery_shortcode');
