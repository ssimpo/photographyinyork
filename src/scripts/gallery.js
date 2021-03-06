(function($, global) {
	"use strict";

	function resizeToFitRows(gallery) {
		let rowWidth = gallery.parent().width();
		let colsPerRow = getAttribute(gallery, "cols", 4);
		let gutter = getAttribute(gallery, "gutter", 10);
		let rows = [];
		let cColCount = 0;

		gallery.find("a img").each((n, node)=>{
			let img = $(node);
			let cols = parseFloat(img.attr("cols"));

			if ((n === 0) || ((cColCount+cols) > colsPerRow)) {
				rows.push([]);
				cColCount = cols;
			} else {
				cColCount += cols;
			}

			rows[rows.length-1].push(img);
		});

		rows.forEach((row, n)=>{
			let height = calcRowHeight(rows, n, rowWidth, gutter);
			row.forEach((img, n)=>{
				let _aspect = aspectStringToValues(img.attr("aspect"), "object");
				let width = parseInt((height/_aspect.height) * _aspect.width);
				setImageWidthHeight(img, width, height);
				if (n === (row.length - 1)) {
					img.addClass("last");
				} else {
					img.removeClass("last");
				}
			});
		});
	}

	function getAttribute(node, name, defaultValue) {
		let gridSize = Foundation.MediaQuery.current;
		return node.attr(name+"-"+gridSize) || node.attr(name) || defaultValue;
	}

	function calcRowHeight(rows, n, rowWidth, gutter) {
		let _rowWidth = rowWidth - (gutter * rows[n].length);
		if ((rows[n].length === 1) && (n > 0) && (rows[n-1].length > 1)) _rowWidth /= 2;
		let aspect = calcRowAspect(rows[n]);
		return  parseInt((_rowWidth/aspect.width)*aspect.height, 10);
	}

	function calcRowAspect(row, height=100, returnType="object") {
		let width = 0;
		row.forEach(img=>{
			let aspect = aspectStringToValues(img.attr("aspect"), "object");
			width += (aspect.width/aspect.height) * height;
		});

		return aspect(width, height, returnType);
	}

	function setImageWidthHeight(img, width, height) {
		img.attr("height", height);
		img.attr("width", width);
		img.css({width, height});
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

	function applyGallery(gallery=this) {
		gallery.each((n, node)=>{
			let gallery = $(node);

			if (gallery.attr("parent-class")) $("<div></div>")
				.addClass(gallery.attr("parent-class"))
				.addClass("gallery-parent")
				.insertAfter(gallery)
				.append(gallery);

			gallery.find("img").each((n, node)=>{
				let img = $(node);
				let width = img.attr("width");
				let height = img.attr("height");


				img.attr("cols", calcImageCols(width, height));
				img.attr("aspect", aspect(width, height));

				if (img.attr("height")) img.removeAttr("height");
				if (img.attr("width")) img.removeAttr("width");
				img.removeClass("aligncenter alignleft alignright alignnone");

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
							.attr("resizer", "")
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

	$.fn.piyGallery = applyGallery;

	$(document).ready(()=>$("gallery").piyGallery());

})(jQuery || $, window);