<footer class="row medium-12 columns">
	<div class="footer-main row">
		<div class="medium-3 columns footer-main-block1">
			<a href="<?php echo get_home_url(); ?>" class="logo-wrap"><img src="<?php echo PIY_DIR.'/images/logo.png'; ?>" class="logo" /></a>
		</div>
		<div class="medium-6 columns footer-main-block2"><i class="fa fa-phone" aria-hidden="true"></i> Make a booking 01234 56789</div>
		<div class="medium-3 columns footer-main-block3">
			<?php echo wp_nav_menu( array(
				'theme_location' => 'social',
				'container' => false,
				'walker' => new piy_walker
			) ); ?>
		</div>
		<?php wp_footer(); ?>
	</div>
</footer>
<div class="copyright-notice">
	Copyright and design &copy; 2017 by <a href="http://whitebolt.net/templates/photographyinyork">Whitebolt LTD</a>
</div>
</div>
</div>
</body>
</html>
