(function($, global) {
	"use strict";

	function resizeToFitRows(gallery) {
		let rowWidth = gallery.width();
		let currentRow = 1;
		let lastHeight = 0;
		let lastLeft = 0;

		gallery.find("a").each((n, node)=>{
			let a = $(node);
			let _lastLeft = a.position().left;
			if (_lastLeft < lastLeft) currentRow++;
			lastLeft = _lastLeft;
			a.find("img").addClass("gallery-row-"+currentRow);
		});

		for (let n=1; n<=currentRow; n++) {
			let imgRow = gallery.find("img.gallery-row-"+n);
			if (imgRow.length > 1) {
				let lastImg = $(imgRow[imgRow.length-1]);
				let lastWidth = lastImg.parent().outerWidth();
				let breakout = 2000;

				let right = lastImg.parent().position().left+lastWidth;
				while (right < rowWidth) {
					imgRow.height(imgRow.height()+1);
					lastWidth = lastImg.parent().outerWidth();
					let _right = lastImg.parent().position().left+lastWidth;
					breakout--;
					if ((_right < right) || (breakout <= 0) || (_right >= rowWidth)) break;
					right = _right;
				}
				lastHeight = parseInt(imgRow.height()-2);
				imgRow.height(lastHeight);
			} else if (lastHeight && (imgRow.length === 1)) {
				$(imgRow[imgRow.length-1]).height(lastHeight);
			}
		}
	}

	function applyGallery() {
		$("gallery").each((n, node)=>{
			let gallery = $(node);

			gallery.find("img").each((n, node)=>{
				let img = $(node);
				if (img.attr("height")) img.removeAttr("height");
				if (img.attr("width")) img.removeAttr("width");
				if (img.parent().prop("tagName").toLowerCase() !== "a") $("<a></a>")
					.attr("href", img.attr("src"))
					.insertAfter(img)
					.append(img);
			});

			gallery.find("a").each((n, node)=>$(node).closest("gallery").append(node));
			gallery.find("br, p, div").remove();

			let overlay;
			gallery.find("a img[title]").each((n, node)=>{
				let img = $(node);
				overlay = $("<div></div>")
					.addClass("overlay")
					.html(img.attr("title"))
					.appendTo(img.parent());
			});

			gallery.attr("data-featherlight-filter", "a").featherlightGallery({
				afterContent: function() {
					this.$content.parent().find(".overlay").remove();
					let img = this.$currentTarget.find("img[title]");
					if (img.length) {
						overlay = $("<div></div>")
							.addClass("overlay")
							.html(img.attr("title"))
							.appendTo(this.$content.parent());
					}
				}
			});

			gallery.removeClass("hidden");
			resizeToFitRows(gallery);
			$(global).resize(()=>resizeToFitRows(gallery))
		});
	}

	$(document).ready(()=>applyGallery());

})(jQuery || $, window);