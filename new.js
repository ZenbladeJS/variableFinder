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
			if(predicate(key, obj, path) === true) {
				var editedPath = [...path];
				for (var i in path) {
					if (i != 0) {
						editedPath[i] = "['" + editedPath[i] + "']";
					}
				}
				results.push(editedPath.join(""));
			}
			var isCyclic = false;
			const o = obj[key];
			if (o && typeof o === "object" && !isElement(o)) {
				cyclicDetect.push(obj);
				for(var i in cyclicDetect) {
					if(cyclicDetect[i] == o) {
						isCyclic = true;
					}
				}
				if (!isCyclic) {
					varSearch(o, path, cyclicDetect);
				}
			}
			path.pop();
		}
	}
	varSearch(object || window)
	return results;
}
