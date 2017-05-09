<!DOCTYPE html>
<html <?php language_attributes(); ?> class="no-js svg">
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width">
	<link rel="profile" href="http://gmpg.org/xfn/11">
	<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>">
	<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
<header>
	<nav class="row">
		<div class="medium-12 columns top-menu-wrapper" move-on-small="#off-canvas-content" move-on-small-target="ul">
			<?php
				$logo_html = '<img src="'.PIY_DIR.'/images/logo.png" class="logo" />';
				if (!is_home() && !is_front_page()) {
					$logo_html = '<a class="logo-wrap" href="'.get_home_url().'">' . $logo_html . '</a>';
				} else {
					$logo_html = '<span class="logo-wrap">' . $logo_html . '</span>';
				}
			?>
			<?php echo wp_nav_menu_split(array(
				'theme_location'  => 'top',
				'menu_class_left' => 'top-menu top-menu-left',
				'menu_class_right'=> 'top-menu top-menu-right',
				'menu_id'         => '',
				'echo'            => true,
				'before'          => '',
				'after'           => '',
				'link_before'     => '',
				'link_after'      => '',
				'items_wrap'      => '<ul id="%1$s" class="%2$s">%3$s</ul>',
				'depth'           => 0,
				'walker'          => '',
				'balance'         => 'left',
				'middle_html'     => '<div class="menu-button-wrapper show-for-small-only"><button class="menu-icon" type="button" data-toggle="offCanvas"></button></div>' . $logo_html
			));?>
		</div>
	</nav>
</header>
<div class="off-canvas-wrapper">
<div class="off-canvas position-left" id="offCanvas" data-off-canvas>
	<div id="off-canvas-content" shift-content="include-admin"></div>
</div>
<div class="off-canvas-content" data-off-canvas-content>