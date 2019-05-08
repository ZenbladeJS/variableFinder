const varFind = function(predicate, array, object) {
	const oldVars = {
		postMessage: true,
		blur: true,
		focus: true,
		close: true,
		frames: true,
		self: true,
		window: true,
		parent: true,
		opener: true,
		top: true,
		length: true,
		closed: true,
		location: true,
		document: true,
		origin: true,
		name: true,
		history: true,
		locationbar: true,
		menubar: true,
		personalbar: true,
		scrollbars: true,
		statusbar: true,
		toolbar: true,
		status: true,
		frameElement: true,
		navigator: true,
		customElements: true,
		external: true,
		screen: true,
		innerWidth: true,
		innerHeight: true,
		scrollX: true,
		pageXOffset: true,
		scrollY: true,
		pageYOffset: true,
		screenX: true,
		screenY: true,
		outerWidth: true,
		outerHeight: true,
		devicePixelRatio: true,
		clientInformation: true,
		screenLeft: true,
		screenTop: true,
		defaultStatus: true,
		defaultstatus: true,
		styleMedia: true,
		onanimationend: true,
		onanimationiteration: true,
		onanimationstart: true,
		onsearch: true,
		ontransitionend: true,
		onwebkitanimationend: true,
		onwebkitanimationiteration: true,
		onwebkitanimationstart: true,
		onwebkittransitionend: true,
		isSecureContext: true,
		onabort: true,
		onblur: true,
		oncancel: true,
		oncanplay: true,
		oncanplaythrough: true,
		onchange: true,
		onclick: true,
		onclose: true,
		oncontextmenu: true,
		oncuechange: true,
		ondblclick: true,
		ondrag: true,
		ondragend: true,
		ondragenter: true,
		ondragleave: true,
		ondragover: true,
		ondragstart: true,
		ondrop: true,
		ondurationchange: true,
		onemptied: true,
		onended: true,
		onerror: true,
		onfocus: true,
		oninput: true,
		oninvalid: true,
		onkeydown: true,
		onkeypress: true,
		onkeyup: true,
		onload: true,
		onloadeddata: true,
		onloadedmetadata: true,
		onloadstart: true,
		onmousedown: true,
		onmouseenter: true,
		onmouseleave: true,
		onmousemove: true,
		onmouseout: true,
		onmouseover: true,
		onmouseup: true,
		onmousewheel: true,
		onpause: true,
		onplay: true,
		onplaying: true,
		onprogress: true,
		onratechange: true,
		onreset: true,
		onresize: true,
		onscroll: true,
		onseeked: true,
		onseeking: true,
		onselect: true,
		onstalled: true,
		onsubmit: true,
		onsuspend: true,
		ontimeupdate: true,
		ontoggle: true,
		onvolumechange: true,
		onwaiting: true,
		onwheel: true,
		onauxclick: true,
		ongotpointercapture: true,
		onlostpointercapture: true,
		onpointerdown: true,
		onpointermove: true,
		onpointerup: true,
		onpointercancel: true,
		onpointerover: true,
		onpointerout: true,
		onpointerenter: true,
		onpointerleave: true,
		onafterprint: true,
		onbeforeprint: true,
		onbeforeunload: true,
		onhashchange: true,
		onlanguagechange: true,
		onmessage: true,
		onmessageerror: true,
		onoffline: true,
		ononline: true,
		onpagehide: true,
		onpageshow: true,
		onpopstate: true,
		onrejectionhandled: true,
		onstorage: true,
		onunhandledrejection: true,
		onunload: true,
		performance: true,
		stop: true,
		open: true,
		alert: true,
		confirm: true,
		prompt: true,
		print: true,
		requestAnimationFrame: true,
		cancelAnimationFrame: true,
		requestIdleCallback: true,
		cancelIdleCallback: true,
		captureEvents: true,
		releaseEvents: true,
		getComputedStyle: true,
		matchMedia: true,
		moveTo: true,
		moveBy: true,
		resizeTo: true,
		resizeBy: true,
		getSelection: true,
		find: true,
		webkitRequestAnimationFrame: true,
		webkitCancelAnimationFrame: true,
		fetch: true,
		btoa: true,
		atob: true,
		setTimeout: true,
		clearTimeout: true,
		setInterval: true,
		clearInterval: true,
		createImageBitmap: true,
		scroll: true,
		scrollTo: true,
		scrollBy: true,
		onappinstalled: true,
		onbeforeinstallprompt: true,
		crypto: true,
		ondevicemotion: true,
		ondeviceorientation: true,
		ondeviceorientationabsolute: true,
		indexedDB: true,
		webkitStorageInfo: true,
		sessionStorage: true,
		localStorage: true,
		visualViewport: true,
		speechSynthesis: true,
		webkitRequestFileSystem: true,
		webkitResolveLocalFileSystemURL: true,
		openDatabase: true,
		chrome: true,
		applicationCache: true,
		ontouchcancel: true,
		ontouchend: true,
		ontouchmove: true,
		ontouchstart: true,
		i: true,
		oldVars: true,
		newVars: true,
		TEMPORARY: true,
		PERSISTENT: true,
		addEventListener: true,
		removeEventListener: true,
		dispatchEvent: true,
	};
	const newVars = {};
	for (var i in window) {
		if (typeof(oldVars[i]) === "undefined") {
			newVars[i] = window[i];
		}
	}
	const varSearch = function(obj, predicate) { // The function 
		const discoveredObjects = []; // For checking for cyclic object
		const path = []; // The current path being searched
		const results = []; // The array of paths that satify the predicate === true
		if (!obj && (typeof obj !== "object" || Array.isArray(obj))) {
			throw new TypeError("First argument of finPropPath is not the correct type Object");
		}
		if (typeof predicate !== "function") {
			throw new TypeError("Predicate is not a function");
		}
		(function find(obj) {
			for (const key of Object.keys(obj)) { // use only enumrable own properties.
				if (predicate(key, path, obj) === true) { // Found a path
					path.push('["' + key + '"]'); // push the key
					results.push(path.join("")); // Add the found path to results
					path.pop(); // remove the key.
				}
				const o = obj[key]; // The next object to be searched
				if (o && typeof o === "object") { // check for null then type object
					if (!discoveredObjects.find(obj => obj === o)) { // check for cyclic link
						path.push('["' + key + '"]');
						discoveredObjects.push(o);
						find(o);
						path.pop();
					}
				}
			}
		}(obj));
		for (var i in results) {
			results[i] = "window" + results[i]
		}
		return results;
	};
	const similarities = function(array1, array2) {
		const samePaths = [];
		for (var i in array1) {
			for (var j in array2) {
				if (array1[i] === array2[j]) {
					samePaths.push(array1[i]);
				}
			}
		}
		return samePaths;
	};
	const paths = [
		[],
		array
	];
	if (typeof(object) === "undefined") {
		paths[0] = varSearch(newVars, predicate);
	} else {
		paths[0] = varSearch(object, predicate);
	}
	if (typeof(array) === "undefined") {
		return paths[0];
	} else {
		return similarities(paths[0], paths[1]);
	}
};
