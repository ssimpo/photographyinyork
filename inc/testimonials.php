<?php
function piy_create_testimonial_post_type() {
	register_post_type( 'testimonial',
		array(
			'labels' => array(
				'name' => __( 'Testimonials' ),
				'singular_name' => __( 'Testimonial' )
			),
			'public' => true,
			'has_archive' => true,
			'supports' => array('title', 'editor', 'page-attributes'),
			'menu_icon'   => 'dashicons-format-status'
		)
	);
}
add_action( 'init', 'piy_create_testimonial_post_type' );

function piy_get_testimonials( $atts = array()) {
	$html = '<testimonials';
	foreach($atts as $key => $value) $html .= ' ' . $key .'="' . $value . '"';
	$html .= '>';

	$loop = new WP_Query( array(
		'post_type' => 'testimonial',
		'posts_per_page' => 9999,
		'order' => 'ASC',
		'order-by' => 'menu_order'
	) );
	if ($loop->have_posts()) {
		while ( $loop->have_posts() ) : $loop->the_post();
			$html .= '<div class="testimonal"><p>' . get_the_content() . '</p><p class="ref">' . get_the_title() . '</p></div>';
		endwhile;
		wp_reset_postdata();
	} else {
		return '';
	}

	return $html .'</testimonials>';
}
add_shortcode( 'testimonials', 'piy_get_testimonials' );
?>