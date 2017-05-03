<?php
function piy_get_overlay( $atts ) {
	$html = '<div class="overlay" shift-content>';
	if (!defined('TITLE_DONE')) {
		$html .= '<h1>'.get_the_title().'</h1>';
		define('TITLE_DONE', true);
	}
	$html .= types_render_field('overlay', array('output' => 'html') );
	return $html.'</div>';
}
add_shortcode( 'overlay', 'piy_get_overlay' );
?>