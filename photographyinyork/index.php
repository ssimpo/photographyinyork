<?php get_header(); ?>
	<main>
		<?php $header_block = types_render_field( 'header-block', array('output' => 'raw')); ?>
		<?php $hide_title = types_render_field( 'hide-title', array()); ?>
		<?php echo $header_block; ?>
		<?php while ( have_posts() ) : the_post(); ?>
			<article<?php echo (($header_block == '') ? ' shift-content' : ''); ?> class="row medium-12 columns">
				<?php if ($hide_title != "1") { ?>
					<h1><?php the_title(); ?></h1>
				<?php } ?>
				<?php the_content(); ?>
			</article>
		<?php endwhile; ?>
	</main>
<?php get_footer();
