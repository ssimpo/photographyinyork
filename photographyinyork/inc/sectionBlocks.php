<?php
function piy_get_section_block( $atts=array() ) {
	global $post;
	$html = '<div class="row homepage-section-blocks">';

	$loop = new WP_Query(array(
		'post_type' => 'page',
		'meta_key' => 'wpcf-add-to-homepage',
		'meta_value' => '1'
	));
	if ($loop->have_posts()) {
		while ( $loop->have_posts() ) : $loop->the_post();
			$html .= '<div class="medium-4 columns"><h2>' . get_the_title() . '</h2>' . get_the_post_thumbnail($post->ID, 'homepage-block-image') . '<p>' . get_the_excerpt() . '</p></div>';
		endwhile;
		wp_reset_postdata();
	}

	return $html .'</div>';
}
add_shortcode( 'section-block', 'piy_get_section_block' );
?>