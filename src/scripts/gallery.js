(function($, global) {
	"use strict";

	function resizeToFitRows(gallery) {
		let rowWidth = gallery.parent().width();
		let colsPerRow = parseFloat(gallery.attr("cols") || 4);
		let rows = [[]];
		let cRow = 0;
		let cColCount = 0;
		let gutter = 10;

		gallery.find("a img").each((n, node)=>{
			let img = $(node);
			let cols = parseFloat(img.attr("cols"));

			if ((cColCount+cols) > colsPerRow) {
				cRow++;
				rows.push([]);
				cColCount = cols;
			} else {
				cColCount += cols;
			}

			rows[cRow].push(img);
		});


		rows.forEach(row=>{
			const _height = 100;
			let _width = 0;
			let _rowWidth = rowWidth - (gutter * (row.length-1));

			row.forEach(img=>{
				let aspect = aspectStringToValues(img.attr("aspect"), "object");
				_width += (aspect.width/aspect.height) * _height;
			});

			let _aspect = aspect(_width, _height, "object");
			let height = parseInt((_rowWidth < _aspect.width) ?
				(_rowWidth/_aspect.width)*_aspect.height :
				(_aspect.width/_rowWidth)*_aspect.height
			, 10);

			row.forEach((img, n)=>{
				let aspect = aspectStringToValues(img.attr("aspect"), "object");
				img.attr("height", height);
				img.attr("width", parseInt((height/aspect.height) * aspect.width));
				if (n === (row.length - 1)) img.addClass("last");
			});
		});
	}

	function aspectStringToValues(aspect, returnType="array") {
		let _aspect = aspect.split(":");
		let width = parseInt(_aspect[0], 10);
		let height = parseInt(_aspect[1], 10);
		let _returnType = returnType.toString().toLowerCase().trim();

		if (_returnType === "array") {
			return [width, width];
		} else if (_returnType === "object") {
			return {width, height};
		}
	}

	function aspect(width, height, returnType="string") {
		let gcd = (a, b)=>(a%b) ? gcd(b, a%b) : b;
		let _gcd = gcd(width, height);
		let _returnType = returnType.toString().toLowerCase().trim();

		if (_returnType === "array") {
			return [(width / _gcd), (height / _gcd)];
		} else if (_returnType === "object") {
			return {width: (width/_gcd), height: (height/_gcd)};
		} else if (_returnType === "string") {
			return (width/_gcd)+':'+(height/_gcd);
		}
	}

	function calcImageCols(width, height) {
		let aspect = width/height;

		if ((aspect > 0.98) && (aspect < 1.02)) return 1.5;
		if (aspect < 1) return ((aspect < 0.5) ? 0.5 : 1);
		if (aspect > 2) return (aspect < 4) ? 3 : 4;
		return 2;
	}

	function applyGallery() {
		$("gallery").each((n, node)=>{
			let gallery = $(node);

			gallery.find("img").each((n, node)=>{
				let img = $(node);
				let width = img.attr("width");
				let height = img.attr("height");


				img.attr("cols", calcImageCols(width, height));
				img.attr("aspect", aspect(width, height));

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