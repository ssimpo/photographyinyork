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
			$(".off-canvas-content").css({"min-height": "calc(100vh - "+adminBarHeight+"px)"});
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

	let $doc = $(document);

	$doc.foundation();
	$doc.ready(()=>{
		// We no-longer want to remove these as we need to space the screen.
		//removeBlankArticles();

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

		setMainContentMargins();
	});
})(jQuery || $, window);