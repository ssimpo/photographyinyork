(function($, global) {
	"use strict";

	function createSliderImage(options) {
		return $("<img class=\"slider-image-"+options.no+"\">")
			.css({
				height:options.height,
				width: "100%",
				"z-index": ((options.no === 1) ? 1 : 0)
			})
			.attr("src", options.images[0].src)
			.attr("srcset", options.images[0].srcset)
			.appendTo(options.node);
	}

	function addSrc(imageNode, data) {
		imageNode.attr("src", data.src);

		if (data.srcset.trim() !== "") {
			imageNode.attr("srcset", data.srcset);
		} else if (imageNode.attr("srcset")) {
			imageNode.removeAttr("srcset")
		}
	}

	function nextSlide(options) {
		options.image1.animate({opacity:0}, {duration:options.duration, done:()=>{
			if (options.pos >= options.images.length) options.pos = 0;
			addSrc(options.image1, options.images[options.pos]);
			options.pos++;
			if (options.pos >= options.images.length) options.pos = 0;
			options.image1.css({opacity:1});
			addSrc(options.image2, options.images[options.pos]);
		}});
	}

	function applySlider(sliders=this) {
		sliders.each((n, _node)=>{
			let node = $(_node);
			let height = parseInt((node.width()*9)/16, 10);
			let duration = parseFloat(node.attr("duration") || 1) * 1000;
			let interval = parseFloat(node.attr("interval") || 3) * 1000;
			let images = (node.attr("images") || "").split(",").filter(image=>(image.trim() !== ""));
			let sizes = (node.attr("sizes") || "").split(",").filter(size=>(size.trim() !== ""));

			const xAllImage = new RegExp(sizes.join("\.|") + "\.");

			node.find("img:not([slider-exclude],.slider-exclude)").each((n, node)=>{
				let img = $(node);

				images.push(img.attr("src"));

				if (img.parent().prop("tagName").toLowerCase() === "a") {
					img.parent().remove();
				} else {
					img.remove();
				}
			});

			images = images.map(image=>{
				let srcset = "";

				if (sizes.length && xAllImage.test(image)) {
					sizes.forEach(size=>{
						if (srcset !== "") srcset += ", ";
						srcset += image.replace(xAllImage, size+".") + " "+size.split("x").shift()+"w";
					});
				}

				return {src: image, srcset};
			});

			let pos = 1;

			node.css({height});

			let image1 = createSliderImage({no:1, images, node, height});
			let image2 = createSliderImage({no:2, images, node, height});
			let slideOptions = {pos, image1, image2, duration, images};

			let play = ()=>nextSlide(slideOptions);
			play.period = interval;
			play.description = "slider";
			global.intervalCallbacks.add(play);

			$(global).resize(()=>{
				height = parseInt((node.width()*9)/16, 10);
				image1.css({height});
				image2.css({height});
				node.css({height});
			});
		});
	}

	$.fn.piySlider = applySlider;

	$(document).ready(()=>$("slider").piySlider());

})(jQuery || $, window);