<?php
function piy_get_slider( $atts ) {
	global $post;
	$html = '<slider';

	$loop = new WP_Query(array(
		'post_type' => 'attachment',
		'post_status' => 'inherit',
		'tax_query' => array( array(
			'taxonomy' => 'gallery',
			'field' => 'slug',
			'terms' => $atts['terms']
		) )
	));
	$sliderImages = array();

	if ($loop->have_posts()) {
		while ( $loop->have_posts() ) : $loop->the_post();
			array_push($sliderImages, wp_get_attachment_image_src($post->ID, 'half-hd')[0]);
		endwhile;
		wp_reset_postdata();
	}

	$html .= array_key_exists('class', $atts) ? ' class="' . $atts['class'] . '"' : ' class="row medium-12 columns"';
	$html .= array_key_exists('interval', $atts) ? ' interval="' . $atts['interval'] . '"' : ' interval="3"';
	$html .= array_key_exists('duration', $atts) ? ' duration="' . $atts['duration'] . '"' : ' duration="1"';
	$html .= ' images="' . implode(',', $sliderImages) . '">';
	$html .= array_key_exists('content', $atts) ? do_shortcode(str_replace(array('<%','%>'), array('[', ']'), $atts['content'])) : '';
	$html .= '</slider>';

	return $html;
}
add_shortcode( 'slider', 'piy_get_slider' );
?>