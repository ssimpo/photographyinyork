<?php

function phtographyinyork_enqueue() {
	wp_register_style(
		'main',
		get_template_directory_uri() . '/style.css',
		array(),
		'0.0.1',
		'all'
	);

	wp_register_script(
		'react',
		get_template_directory_uri() . '/app/lib/react/react-with-addons.min.js',
		array(),
		'15.4.2',
		true
	);
	wp_register_script(
		'react-dom',
		get_template_directory_uri() . '/app/lib/react/react-dom.min.js',
		array('react'),
		'15.4.2',
		true
	);
	wp_register_script(
		'photography-in-york',
		get_template_directory_uri() . '/app/scripts/index.js',
		array('react','react-dom'),
		'0.0.1',
		true
	);

	wp_enqueue_style('main');

	wp_enqueue_script('react');
	wp_enqueue_script('react-dom');
	wp_enqueue_script('photography-in-york');
}
add_action( 'wp_enqueue_scripts', 'phtographyinyork_enqueue' );

?>