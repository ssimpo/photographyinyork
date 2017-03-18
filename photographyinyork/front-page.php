<?php get_header(); ?>
<main>
	<?php echo piy_get_slider(array(
		'class' => 'row medium-12 columns',
		'interval' => 3,
		'duration' => 1,
		'terms' => 'homepage',
		'content' => piy_get_testimonials()
	)); ?>

	<article class="home-content row medium-12 columns">
		<div class="row"><?php echo piy_get_section_block(); ?></div>
			<div class="row medium-12 columns">
			<p>
				Nunc ultricies orci id efficitur bibendum. Nulla accumsan sodales eleifend. Phasellus orci nulla, dapibus vel ante quis, sodales rutrum neque. In a volutpat tortor. Cras feugiat neque et lacus ultrices consequat. Nam consequat a mauris et ullamcorper. Nam condimentum ultrices lectus non gravida. Phasellus pellentesque malesuada aliquet. Aliquam ornare nisl et pellentesque tempus. Donec tempor elit a est lobortis ullamcorper. Morbi sapien massa, pellentesque sed finibus nec, elementum vel nisi. Cras ultrices lectus leo, in congue magna maximus ac. Donec lacus tortor, tincidunt eu pretium ac, convallis et sem.
			</p>
			<p>Cras magna velit, venenatis ut arcu a, imperdiet sodales odio. Suspendisse convallis, tellus vitae facilisis eleifend, arcu nisi tincidunt ex, id venenatis neque mauris et odio. Aliquam erat volutpat. Donec fringilla ullamcorper porttitor. Nulla imperdiet cursus tellus vel mollis. Nulla est quam, tempus at pulvinar et, vulputate a justo. Curabitur rutrum libero quis posuere vestibulum. Donec eget erat vel elit bibendum consequat at ut ipsum. Nam faucibus dui libero, a vestibulum augue congue non. Phasellus sollicitudin risus id sapien ultrices consectetur.</p>

			<p>Donec imperdiet nibh nulla, vitae condimentum nunc vulputate ac. In dictum sem at ornare laoreet. Morbi bibendum rutrum justo id sodales. Quisque lectus tortor, bibendum sit amet laoreet id, eleifend sit amet est. In a ullamcorper sapien. Suspendisse scelerisque nisl nec arcu blandit viverra. Sed vel viverra purus. Aliquam eget gravida ipsum. Ut neque nulla, porta sit amet eros nec, lobortis consectetur urna. Suspendisse pharetra dignissim nunc non tincidunt. Sed erat velit, volutpat scelerisque neque non, rhoncus interdum mauris. Vestibulum ut varius mi, ullamcorper sollicitudin augue. Quisque volutpat ante sit amet elementum accumsan. Aliquam in sapien quam. Donec dapibus lacinia finibus. Aenean pharetra id dolor ac ullamcorper.</p>

			<p>Praesent quam diam, posuere eu lobortis ut, lacinia sed leo. Phasellus finibus est in felis placerat ornare. Duis non magna sed mauris consequat maximus. Praesent ante velit, blandit vel bibendum non, accumsan ut dui. Nullam in ornare odio. In ipsum nisi, ultrices condimentum sollicitudin eu, porta nec odio. Suspendisse potenti. Donec et eleifend sem. Curabitur sed tempus sapien, quis dignissim felis. Maecenas volutpat ante sit amet lobortis maximus. Vivamus sed nibh at leo commodo sodales. Nullam venenatis diam ultricies elit pharetra, id tempor erat condimentum. Proin non sollicitudin eros. Aenean erat tellus, bibendum non porttitor quis, finibus at justo. Duis egestas tortor non lectus dignissim interdum. Vestibulum tincidunt scelerisque dui, in pulvinar justo fringilla a.
</p>
				<p>Aliquam eu massa vitae velit tempus tempor. Sed scelerisque quis justo nec sollicitudin. Nam ornare, sem semper tincidunt fermentum, ipsum magna vulputate dui, commodo faucibus lacus dolor vitae mi. Praesent finibus accumsan ipsum, vel auctor diam egestas ac. Quisque pretium tincidunt tellus ut pulvinar. Nunc eget sapien a purus efficitur viverra quis non augue. Nulla dignissim volutpat turpis, in efficitur dui ultricies pharetra. Donec euismod enim dui, ut scelerisque ligula porta id. Sed mollis nisi vel finibus blandit. Morbi pharetra elit eu lectus sodales, quis lobortis mauris cursus. Etiam aliquet lectus a facilisis rutrum. Nunc ac elementum diam, at egestas arcu. Suspendisse venenatis lectus id dolor vulputate, eget convallis arcu facilisis.</p>
		</div>
		</div></article>
</main>
<?php get_footer();
