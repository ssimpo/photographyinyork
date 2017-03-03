<?php
require_once('inc/constants.php');
require_once('inc/helper.php');
require_once('inc/enqueue.php');

function piy_enqueue() {
	wp_register_style( 'main', PIY_DIR . '/style.css', array(), PIY_VERSION, 'all' );

	piy_register_lib('react', '/react/react-with-addons', PIY_REACT_VERSION);
	piy_register_lib('react-dom', '/react/react-dom', PIY_REACT_VERSION);
	piy_register_app_script('photography-in-york', '/index.js', array('react','react-dom'));

	piy_enqueuer('style', array('main'));
	piy_enqueuer('script', array('react', 'react-dom', 'photography-in-york'));
}
add_action( 'wp_enqueue_scripts', 'piy_enqueue' );

?>