(function($, global){
	'use strict';

	function getOuterboxDimensions(node, position) {
		return parseInt(node.css("margin-top") || 0, 10) + parseInt(node.css("border-top-width") || 0, 10) + parseInt(node.css("padding-top") || 0, 10);
	}


	function setMainContentMargins(adminBar=$("#wpadminbar")) {
		let header = $("body>header");

		let adminBarHeight = 0;
		if (adminBar.length) {
			adminBarHeight = parseInt(adminBar.outerHeight(), 10);
			header.css({top: adminBarHeight});
		}

		$("[shift-content]").each((n, _node)=>{
			let node = $(_node);
			if (!setMainContentMargins.initialMargin) {
				setMainContentMargins.initialMargin = getOuterboxDimensions(node, "top") + parseInt(header.outerHeight(), 10);
				node.css({'padding-top': setMainContentMargins.initialMargin + adminBarHeight});
			} else {
				node.css({'padding-top': setMainContentMargins.initialMargin + adminBarHeight});
			}
		});
	}

	$(document).ready(()=>{
		let toggle = -1;
		let checkAdminBar = ()=>{
			let adminBar = $("#wpadminbar");
			if (adminBar.length && (adminBar.length !== toggle)) {
				toggle = adminBar.length;
				setMainContentMargins(adminBar);
			}
		};
		checkAdminBar.period = 500;
		checkAdminBar.description = "Check Admin bar";
		global.intervalCallbacks.add(checkAdminBar);

		$(".gallery-layout img").each((n, node)=>{
			let img = $(node);
			if (img.attr("height")) img.removeAttr("height");
			if (img.attr("width")) img.removeAttr("width");
			if (img.parent().prop("tagName").toLowerCase() !== "a") $("<a></a>")
				.attr("href", img.attr("src"))
				.insertAfter(img)
				.append(img);
		});
		$(".gallery-layout a").each((n, node)=>$(node).closest(".gallery-layout").append(node));
		$(".gallery-layout div, .gallery-layout p, .gallery-layout br").remove();
		$(".gallery-layout a img[title]").each((n, node)=>{
			let img = $(node);
			let overlay = $("<div></div>").addClass("overlay").html(img.attr("title"));
			img.parent().append(overlay);
		});
		$(".gallery-layout").each((n, node)=>{
			let gallery = $(node);
			gallery.attr("data-featherlight-filter", "a").featherlightGallery({});
		});
		$(".gallery-layout.hidden").removeClass("hidden");



		setMainContentMargins();
	});
})(jQuery || $, window);