(function($, global) {
	'use strict';

	function createSliderImage(options) {
		return $("<img class=\"slider-image-"+options.no+"\">")
			.css({
				height:options.height,
				width: "100%",
				"z-index": ((options.no === 1) ? 1 : 0)
			})
			.attr("src", options.images[0])
			.appendTo(options.node);
	}

	function nextSlide(options) {
		options.image1.animate({opacity:0}, {duration:options.duration, done:()=>{
			options.image1.attr("src", options.images[options.pos]);
			options.pos++;
			if (options.pos >= options.images.length) options.pos = 0;
			options.image1.css({opacity:1});
			options.image2.attr("src", options.images[options.pos]);
		}});
	}

	function applySlider() {
		$("slider").each((n, _node)=>{
			let node = $(_node);
			let height = parseInt((node.width()*9)/16, 10);
			let duration = parseInt(node.attr("duration") || 1, 10) * 1000;
			let interval = parseInt(node.attr("interval") || 3, 10) * 10;
			let images = node.attr("images").split(",");
			let pos = 1;

			node.css({height});

			let image1 = createSliderImage({no:1, images, node, height});
			let image2 = createSliderImage({no:2, images, node, height});
			let slideOptions = {pos, image1, image2, duration, images};

			let play = ()=>nextSlide(slideOptions);
			play.period = interval;
			global.intervalCallbacks.add(play);
		});
	}

	$(document).ready(()=>applySlider());

})(jQuery || $, window);