(function($, global) {
	'use strict';

	global.intervalCallbacks = new Set();
	const intervalPeriod = 100;
	let intervalCount = 0;
	let intervalFunc;

	(function interval() {
		if (intervalFunc) global.clearTimeout(intervalFunc);
		intervalCount++;
		global.intervalCallbacks.forEach(callback=>{
			if (callback.period) {
				if ((intervalCount % callback.period) === 0) callback();
			} else {
				callback();
			}
		});
		intervalFunc = global.setTimeout(interval, intervalPeriod);
	})();

})(jQuery || $, window);