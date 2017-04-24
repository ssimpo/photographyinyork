<?php

function PIY_addLi($item) {
	return '<li'.$item;
}

function PIY_get_menu_parts($options) {
	$options['echo'] = false;
	$menuHtml = wp_nav_menu($options);
	$lis = explode('<li', $menuHtml);
	array_shift($lis);
	$ul = '<ul>';
	$lis[count($lis)-1] = explode('</li>', $lis[count($lis)-1]);
	$lis[count($lis)-1] = array_shift($lis[count($lis)-1]);
	$lis[count($lis)-1] .= '</li>';
	$lis = array_map( "PIY_addLi", $lis);

	return array( 'ul' => $ul, 'li' => $lis );
}

function PIY_split_menu_in_two($menu, $options=array()) {
	$liTotal = count($menu['li']);
	$menu['li'] = array(
		array_slice($menu['li'], 0, $liTotal / 2),
		array_slice($menu['li'], $liTotal / 2)
	);

	if ((($liTotal%2) != 0) && array_key_exists('balance', $options)) {
		if ($options['balance'] == 'left') {
			array_push($menu['li'][0], array_shift($menu['li'][1]));
		}
	}

	return $menu;
}

function PIY_get_menu_html_part($menu, $options, $part) {
	$ul = $menu['ul'];
	if (array_key_exists('menu_class_'.$part, $options) && ($options['menu_class_'.$part] != '')) {
		if (array_key_exists('menu_class', $options) && ($options['menu_class'] != '')) {
			$ul = str_replace('class="'.$options['menu_class'].'"', ' class="'.$options['menu_class_'.$part].' '.$options['menu_class'].'"', $ul);
		} else {
			$ul = str_replace('>', ' class="'.$options['menu_class_'.$part].'">', $ul);
		}
	}
	return $ul.implode('', $menu['li'][($part == 'left')?0:1]).'</ul>';
}

function wp_nav_menu_split($options) {
	$menu = PIY_split_menu_in_two( PIY_get_menu_parts($options), $options );
	$html = PIY_get_menu_html_part($menu, $options, 'left');
	if (array_key_exists('middle_html', $options)) {
		$html .= $options['middle_html'];
	}
	$html .= PIY_get_menu_html_part($menu, $options, 'right');

	return $html;
}


class piy_custom_menu {

	function __construct() {
		add_filter( 'wp_setup_nav_menu_item', array( $this, 'piy_add_custom_nav_fields' ) );
		add_action( 'wp_update_nav_menu_item', array( $this, 'piy_update_custom_nav_fields'), 10, 3 );
		add_filter( 'wp_edit_nav_menu_walker', array( $this, 'piy_edit_walker'), 10, 2 );

	}

	function piy_add_custom_nav_fields( $menu_item ) {
		$menu_item->icon = get_post_meta( $menu_item->ID, '_menu-item-icon', true );
		$menu_item->hide_title = get_post_meta( $menu_item->ID, '_menu-item-hide-title', true );
		return $menu_item;

	}

	function piy_update_custom_nav_fields( $menu_id, $menu_item_db_id, $args ) {
		if (!array_key_exists('menu-item-hide-title', $_REQUEST) ) $_REQUEST['menu-item-hide-title'] = array();
		if ( is_array( $_REQUEST['menu-item-hide-title']) ) {
			if (!array_key_exists($menu_item_db_id, $_REQUEST['menu-item-hide-title']) ) $_REQUEST['menu-item-hide-title'][$menu_item_db_id] = 'no';
			$hide_title_value = $_REQUEST['menu-item-hide-title'][$menu_item_db_id];
			update_post_meta( $menu_item_db_id, '_menu-item-hide-title', $hide_title_value );
		}

		if ( is_array( $_REQUEST['menu-item-icon']) ) {
			$icon_value = $_REQUEST['menu-item-icon'][$menu_item_db_id];
			update_post_meta( $menu_item_db_id, '_menu-item-icon', $icon_value );
		}
	}

	function piy_edit_walker($walker,$menu_id) {
		return 'PIY_Walker_Nav_Menu_Edit';
	}
}

$GLOBALS['piy_custom_menu'] = new piy_custom_menu();
include_once( 'menu/edit_custom_walker.php' );
include_once( 'menu/custom_walker.php' );