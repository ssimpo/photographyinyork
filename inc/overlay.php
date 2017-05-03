<?php
function piy_get_overlay( $atts ) {
	$html = '<div class="overlay" shift-content>';
	ob_start();
	get_template_part('title');
	$html .= ob_get_contents();
	ob_end_clean();
	$html .= types_render_field('overlay', array('output' => 'html') );
	return $html.'</div>';
}
add_shortcode( 'overlay', 'piy_get_overlay' );
?>