(function($, global){
	"use strict";

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
			if (!setMainContentMargins.initialMargin) {
				setMainContentMargins.initialMargin = getOuterboxDimensions(node, "top") + parseInt(header.outerHeight(), 10);
			}

			if (node.attr("shift-content") === "include-admin") {
				node.css({'padding-top': setMainContentMargins.initialMargin + adminBarHeight});
			} else {
				node.css({'padding-top': setMainContentMargins.initialMargin});
			}
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