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
			$link = '<a href="'.get_permalink(get_the_ID()).'">';
			$html .= '<div class="medium-4 columns"><h2>' . $link . get_the_title() . '</a></h2>' . $link . get_the_post_thumbnail($post->ID, 'homepage-block-image') . '</a><p>' . $link . get_the_excerpt() . '</a></p></div>';
		endwhile;
		wp_reset_postdata();
	}

	return $html .'</div>';
}
add_shortcode( 'section-block', 'piy_get_section_block' );
?>