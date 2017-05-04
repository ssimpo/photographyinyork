(function($, global){
	"use strict";

	const margins = new WeakMap();

	function getOuterboxDimensions(node, position) {
		return parseInt(node.css("margin-top") || 0, 10) + parseInt(node.css("border-top-width") || 0, 10) + parseInt(node.css("padding-top") || 0, 10);
	}

	function setMainContentMargins(adminBar=$("#wpadminbar")) {
		let header = $(".off-canvas-content>header,body>header");

		let adminBarHeight = 0;
		if (adminBar.length) {
			adminBarHeight = parseInt(adminBar.outerHeight(), 10);
			header.css({top: adminBarHeight});
		}

		$("[shift-content]").each((n, _node)=>{
			let node = $(_node);
			if (!margins.has(_node)) margins.set(_node, getOuterboxDimensions(node, "top") + parseInt(header.outerHeight(), 10));
			let padding = margins.get(_node) + ((node.attr("shift-content") === "include-admin") ? adminBarHeight : 0);
			node.css("padding-top", padding + "px");
		});
	}

	function removeBlankArticles() {
		$("main article").each((n, node)=>{
			let article = $(node);
			if (article.text().trim() === "") article.remove();
		});
	}

	function fixOverlayOverflow() {
		$(".overlay").each((n, node)=>{
			let overlay = $(node);
			let bottom = overlay.position().top + overlay.height();
			if (!node._originalFontSize) {
				node._originalFontSize = overlay.css("font-size");
			} else {
				overlay.css("font-size", node._originalFontSize);
			}

			overlay.find("*").each((n, node)=>{
				let child = $(node);
				let breakout = 50;
				while ((breakout > 0) && ((child.position().top + child.height()) > bottom)) {
					breakout--;
					overlay.css("font-size", (parseInt(overlay.css("font-size"), 10) - 1) + "px");
				}
			});
		});
	}

	let $doc = $(document);

	$doc.foundation();
	$doc.ready(()=>{
		removeBlankArticles();

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

		fixOverlayOverflow();
		$(global).resize(fixOverlayOverflow);

		setMainContentMargins();
	});
})(jQuery || $, window);