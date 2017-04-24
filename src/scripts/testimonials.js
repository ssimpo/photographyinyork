(function($, global) {
	"use strict";

	function applyTestimonial() {
		$("testimonials").each((n, _node)=>{
			let node = $(_node);
			let _testimonials = node.children();
			let interval = parseFloat(node.attr("interval") || 3) * 1000;

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
			play.description = "testimonials";
			global.intervalCallbacks.add(play);
			play();
		});
	}

	$(document).ready(()=>applyTestimonial());

})(jQuery || $, window);