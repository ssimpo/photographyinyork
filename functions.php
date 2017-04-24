<?php
require_once('inc/constants.php');
require_once('inc/helper.php');
require_once('inc/menu.php');
require_once('inc/enqueue.php');
require_once('inc/testimonials.php');
require_once('inc/slider.php');
require_once('inc/sectionBlocks.php');

function piy_enqueue() {
	piy_register_style('foundation', PIY_LIB_DIR . '/foundation-sites/dist/css/foundation.min.css', '6.3.1');
	piy_register_style('font-awesome', PIY_LIB_DIR . '/font-awesome/css/font-awesome.min.css');
	piy_register_style('featherlight', PIY_LIB_DIR . '/featherlight/release/featherlight.min.css');
	piy_register_style('featherlight-gallery', PIY_LIB_DIR . '/featherlight/release/featherlight.gallery.min.css');
	piy_register_style('main', PIY_DIR . '/style.css');

	wp_deregister_script( 'jquery' );
	piy_register_lib('jquery', '/jquery/dist/jquery', '3.1.1');
	piy_register_lib('what-input', '/what-input/dist/what-input', '4.0.6');
	piy_register_lib('foundation', '/foundation-sites/dist/js/foundation', '6.3.1', array('what-input'));
	piy_register_lib('featherlight', '/featherlight/release/featherlight', '1.7.2');
	piy_register_lib('featherlight-gallery', '/featherlight/release/featherlight.gallery', '1.7.2');
	piy_register_script('piy', '/index', array('jquery', 'foundation'));

	piy_enqueuer('style', array('foundation', 'font-awesome', 'featherlight', 'featherlight-gallery', 'main'));
	piy_enqueuer('script', array(
		'jquery',
		'what-input',
		'foundation',
		'featherlight',
		'featherlight-gallery',
		'piy'
	));
}
add_action( 'wp_enqueue_scripts', 'piy_enqueue' );

function piy_add_excerpts_to_pages() {
     add_post_type_support( 'page', 'excerpt' );
}
add_action( 'init', 'piy_add_excerpts_to_pages' );


function piy_setup() {
	load_theme_textdomain( 'piy' );

	add_theme_support( 'post-thumbnails' );

	register_nav_menus( array(
		'top'    => __( 'Top Menu', 'piy' ),
		'social' => __( 'Social Menu', 'piy' ),
	) );
}
add_action( 'after_setup_theme', 'piy_setup' );

?>