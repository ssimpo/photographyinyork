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