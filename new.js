const varFind = function (predicate, object) {
	const results = [];
	const isElement = function (element) {
		return element instanceof Element || element instanceof HTMLDocument;  
	}
	const varSearch = function (obj, path, cyclicDetect) {
		if(typeof(path) == "undefined") {
			path = [
				"window"
			];
			cyclicDetect = [];
		}
		for (var key of Object.keys(obj)) {
			path.push(key);
			if(predicate(obj,  key, path) === true) {
				var editedPath = path
				for (var i in path) {
					if (i != 0) {
						editedPath[i] = "['" + editedPath[i] + "']";
					}
				}
				results.push(editedPath.join(""));
				path.pop();
			}
			var isCyclic = false;
			const o = obj[key];
			if (o && typeof o === "object" && !isElement(o)) {
				for(var i in cyclicDetect) {
					if(cyclicDetect[i] == o) {
						isCyclic = true;
					}
				}
				if (!isCyclic) {
					cyclicDetect.push(obj);
					varSearch(o, path, cyclicDetect);
				}
			}
		}
	}
	varSearch(object)
	return results;
}
