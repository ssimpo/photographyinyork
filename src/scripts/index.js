(function($, global){
	"use strict";

	const margins = new WeakMap();
	let homeLink;
	let headerTop;
	let slideMenuOpen = false;

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
			if (!margins.has(_node)) margins.set(_node, getOuterboxDimensions(node, "top"));
			let padding = margins.get(_node) + ((node.attr("shift-content") === "include-admin") ? adminBarHeight : 0);
			padding += parseInt(header.outerHeight(), 10);
			node.css("padding-top", padding + "px");
		});
	}

	function markBlankArticles() {
		$("main article").each((n, node)=>{
			let article = $(node).clone();
			article.find(".small-overlay").each((n, node)=>$(node).remove());
			if (article.text().trim() === "") $(node).addClass("empty");
		});
	}

	function removeLogoLinkOnMobile() {
		let a = $("a.logo-wrap");
		if (a.length) {
			if (!homeLink) homeLink = a.attr("href");
			if (Foundation.MediaQuery.current === "small") {
				a.removeAttr("href");
			} else {
				a.attr("href", homeLink);
			}
		}
	}

	let $doc = $(document);

	$doc.foundation();
	$doc.ready(()=>{
		// We no-longer want to remove these as we need to space the screen.
		markBlankArticles();

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
		$(global).resize(setMainContentMargins);
		$(global).on('changed.zf.mediaquery', ()=>{
			removeLogoLinkOnMobile();
			if ((slideMenuOpen) && (Foundation.MediaQuery.current !== "small")) $(".off-canvas-content").foundation("close");
		});
		removeLogoLinkOnMobile();

		$(global).on("opened.zf.offcanvas", ()=>{
			let header = $(".off-canvas-content>header,body>header");
			if (header.length && (headerTop === undefined)) headerTop = header.css("top");
			header.css("top", 0);
			slideMenuOpen = true;
		});
		$(global).on("closed.zf.offcanvas", ()=>{
			let header = $(".off-canvas-content>header,body>header");
			if (header.length && headerTop) header.css("top", headerTop);
			slideMenuOpen = false;
		});
	});
})(jQuery || $, window);