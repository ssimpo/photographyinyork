<?php
function piy_get_gallery_start( $atts = array() ) {
	$html = '<gallery';

	$atts_to_copy = array(
		'class',
		'cols', 'cols-xxlarge', 'cols-xlarge', 'cols-large', 'cols-medium', 'cols-small',
		'gutter', 'gutter-xxlarge', 'gutter-xlarge', 'gutter-large', 'gutter-medium', 'gutter-small'
	);

	foreach($atts_to_copy as $att) {
		$html .= array_key_exists($att, $atts) ? ' '.$att.'="' . $atts[$att] . '"' : '';
	}

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