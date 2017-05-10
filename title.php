<?php global $hide_title; ?>
<?php if (($hide_title != "1") && (!defined('TITLE_DONE'))) { ?>
	<h1><?php the_title(); ?></h1>
	<?php define('TITLE_DONE', true); ?>
<?php } ?>