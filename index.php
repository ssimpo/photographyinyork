<?php get_header(); ?>
	<main>
		<?php $header_block = types_render_field( 'header-block', array('output' => 'raw')); ?>
		<?php $hide_title = types_render_field( 'hide-title', array()); ?>
		<div id="small-content-header-block" shift-content></div>
		<div id="header-block" move-on-small="#small-content-header-block"><?php echo $header_block; ?></div>
		<div id="below-header-block"></div>
		<?php while ( have_posts() ) : the_post(); ?>
			<article<?php echo (($header_block == '') ? ' shift-content' : ''); ?> class="row medium-12 columns">
				<div class="small-overlay show-for-small-only"></div>
				<?php get_template_part('title'); ?>
				<?php the_content(); ?>
			</article>
		<?php endwhile; ?>
		<?php $footer_block = types_render_field( 'footer-block', array('output' => 'raw')); ?>
		<?php echo $footer_block; ?>
	</main>
<?php get_footer();
