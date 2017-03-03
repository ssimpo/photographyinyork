<?php
function piy_register_lib($name, $path, $version, $deps=array(), $footer=true) {
	wp_register_script( $name, PIY_APP_LIB_DIR . $path . '.' . PIY_LIB_JS_EXT, $deps, $version, $footer );
}

function piy_register_app_script($name, $path, $deps=array(), $version=PIY_VERSION, $footer=true) {
	wp_register_script( $name, PIY_APP_SCRIPTS_DIR . $path, $deps, $version, $footer );
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