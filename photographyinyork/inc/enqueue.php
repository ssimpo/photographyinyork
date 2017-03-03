<?php
function piy_register_lib($name, $path, $version, $deps=array(), $footer=true) {
	$src = PIY_APP_LIB_DIR . $path . '.' . (PIY_USE_MIN?'min.js':'js');
	if (!PIY_PAGESPEED) $src = piy_add_query_param($src, 'PageSpeedNoop', (string) rand());
	wp_register_script( $name, $src, $deps, $version, $footer );
}

function piy_register_app_script($name, $path, $deps=array(), $version=PIY_VERSION, $footer=true) {
	$src = PIY_APP_SCRIPTS_DIR . $path;
	if (!PIY_PAGESPEED) $src = piy_add_query_param($src, 'PageSpeedNoop', (string) rand());
	wp_register_script( $name, $src, $deps, $version, $footer );
}

function piy_enqueuer($type, $items) {
	foreach($items as $item) {
		if ($type == 'script') {
			wp_enqueue_script($item);
		} elseif ($type == 'style') {
			wp_enqueue_style($item);
		}
	}
}
?>