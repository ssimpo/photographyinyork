<?php
function piy_get_gallery_start( $atts = array() ) {
	$html = '<gallery';

	$html .= array_key_exists('class', $atts) ? ' class="' . $atts['class'] . '"' : '';
	$html .= array_key_exists('cols', $atts) ? ' cols="' . $atts['cols'] . '"' : '';
	$html .= '>';

	return $html;
}

add_shortcode( 'gallery-start', 'piy_get_gallery_start' );

function piy_get_gallery_end() {
	$html = '</gallery>';

	return $html;
}

add_shortcode( 'gallery-end', 'piy_get_gallery_end' );
?>