(function($){
	'use strict';

	$(document).ready(()=>{
		$('.home-content').each((n, _node)=>{
			let node = $(_node);
			node.css({'margin-top': parseInt($(window).outerHeight() * 0.8, 10)});
		});

		$('background-slider').each((n, _node)=>{
			let node = $(_node);
			let pos = 1;
			let timer;
			let interval = parseInt(node.attr('interval') || 3, 10) * 1000;
			let duration = parseInt(node.attr('duration') || 1, 10) * 1000;
			let images = node.attr('images').split(',');

			node.height($(window).outerHeight());
			node.width($(window).outerWidth());


			let image1 = $('<div class="background-slider-image1"></div>')
				.attr('style', 'background-image:url("'+images[1]+'");z-index:-1;')
				.appendTo(node);

			let image2 = $('<div class="background-slider-image2"></div>')
				.attr('style', 'background-image:url("'+images[0]+'");z-index:-2;')
				.appendTo(node);

			function next() {
				window.clearTimeout(timer);
				image2.animate({opacity: 0, 'z-index':-2}, {duration, done: ()=>{
					image2.attr('style', image1.attr('style'));
					image2.css({opacity: 1, 'z-index':-2});
					pos++;
					if (pos >= images.length) pos = 0;
					image1.attr('style', 'background-image:url("'+images[pos]+'");');
					timer = window.setTimeout(next, interval);
				}});
			}

			timer = window.setTimeout(next, interval);
		});
	});
})(jQuery);