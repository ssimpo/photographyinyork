(function($, global){
	'use strict';

	function getOuterboxDimensions(node, position) {
		return parseInt(node.css("margin-top") || 0, 10) + parseInt(node.css("border-top-width") || 0, 10) + parseInt(node.css("padding-top") || 0, 10);
	}


	function setMainContentMargins(adminBar=$("#wpadminbar")) {
		$('.home-content').each((n, _node)=>{
			let node = $(_node);
			let header = $("body>header");
			let adminBarHeight = 0;

			if (adminBar.length) {
				adminBarHeight = parseInt(adminBar.outerHeight(), 10);
				header.css({top: adminBarHeight});
			}

			if (!setMainContentMargins.initialMargin) {
				//setMainContentMargins.initialMargin = getOuterboxDimensions(node, "top") + parseInt(header.outerHeight(), 10);
				//node.css({'margin-top': setMainContentMargins.initialMargin + adminBarHeight});
			} else {
				//node.css({'margin-top': setMainContentMargins.initialMargin + adminBarHeight});
			}
		});
	}

	$(document).ready(()=>{
		global.intervalCallbacks.add(()=>{
			let adminBar = $("#wpadminbar");
			if (adminBar.length) setMainContentMargins(adminBar);
		});

		setMainContentMargins();
	});
})(jQuery || $, window);