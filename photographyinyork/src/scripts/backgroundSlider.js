(function($){
	'use strict';

	function getOuterboxDimensions(node, position) {
		return parseInt(node.css("margin-top") || 0, 10) + parseInt(node.css("border-top-width") || 0, 10) + parseInt(node.css("padding-top") || 0, 10);
	}


	const intervalCallbacks = new Set();
	const intervalPeriod = 100;
	let intervalCount = 0;
	let intervalFunc;

	(function interval() {
		if (intervalFunc) window.clearTimeout(intervalFunc);
		intervalCount++;
		intervalCallbacks.forEach(callback=>{
			if (callback.period) {
				if ((intervalCount % callback.period) === 0) callback();
			} else {
				callback();
			}
		});
		intervalFunc = window.setTimeout(interval, intervalPeriod);
	})();

	intervalCallbacks.add(()=>{
		let adminBar = $("#wpadminbar");
		if (adminBar.length) setMainContentMargins(adminBar);
	});

	function setMainContentMargins(adminBar=$("#wpadminbar")) {
		$('.home-content').each((n, _node)=>{
			let node = $(_node);
			let header = $("body>header");
			let adminBarHeight = 0;

			if (adminBar.length) {
				adminBarHeight = parseInt(adminBar.outerHeight(), 10);
				header.css({top: adminBarHeight});
			}

			if (!setMainContentMargins.initialMargin) {
				//setMainContentMargins.initialMargin = getOuterboxDimensions(node, "top") + parseInt(header.outerHeight(), 10);
				//node.css({'margin-top': setMainContentMargins.initialMargin + adminBarHeight});
			} else {
				//node.css({'margin-top': setMainContentMargins.initialMargin + adminBarHeight});
			}
		});
	}

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
			intervalCallbacks.add(play);
		});
	}

	function applyTestimonial() {
		$("testimonials").each((n, _node)=>{
			let node = $(_node);
			let _testimonials = node.children();
			let interval = parseInt(node.attr("interval") || 3, 10) * 10;

			let testimonials = [];
			_testimonials.each((n, _node)=>{
				let node = $(_node);
				if (node.text().trim() !== "") testimonials.push(node);
			});
			let pos = testimonials.length -1;
			if (pos < 0) pos = 0;

			let play = ()=>{
				_testimonials.hide();
				pos++;
				if (pos >= testimonials.length) pos = 0;
				testimonials[pos].show();
			};
			play.period = interval;
			intervalCallbacks.add(play);
			play();
		});
	}


	$(document).ready(()=>{
		setMainContentMargins();
		applySlider();
		applyTestimonial();
	});
})(jQuery);