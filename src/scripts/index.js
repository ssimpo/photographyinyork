(function($, global){
	"use strict";

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

	let $doc = $(document);

	$doc.foundation();
	$doc.ready(()=>{
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