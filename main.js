const varFind = function(predicate, object) {
	const isElement = function (element) {
    		return element instanceof Element || element instanceof HTMLDocument;  
	}
	const varSearch = function(obj, predicate) { // The function 
		const discoveredObjects = []; // For checking for cyclic object
		const path = []; // The current path being searched
		const results = []; // The array of paths that satify the predicate === true
		var pathNumber = 0;
		if (!obj && (typeof obj !== "object" || Array.isArray(obj))) {
			throw new TypeError("Third argument of varFind is not the correct type Object");
		}
		if (typeof predicate !== "function") {
			throw new TypeError("Predicate is not a function");
		}
		const find = function (obj, cyclicDetect) {
			for (const key of Object.keys(obj)) { // use only enumrable own properties.
				if (predicate(key, path, obj) === true) { // Found a path
					path.push('["' + key + '"]'); // push the key
					results.push(path.join("")); // Add the found path to results
					path.pop(); // remove the key.
				}
				var newCyclicDetect = [];
				if(cyclicDetect && typeof(cyclicDetect) === "object"){
					newCyclicDetect = cyclicDetect;
				}
				const o = obj[key]; // The next object to be searched
				if (o && typeof o === "object" && !isElement(o)) { // check for null then type object
					if (!discoveredObjects.find(obj => obj === o)) { // check for cyclic link
						path.push('["' + key + '"]');
						discoveredObjects.push(o);
						find(o, newCyclicDetect.push(o));
						path.pop();
					}
				}
			}
		};
		find(obj);
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
		object.array
	];
	if (typeof(object.object) === "undefined") {
		paths[0] = varSearch(window, predicate);
	} else {
		paths[0] = varSearch(object.object, predicate);
	}
	if (typeof(object.array) === "undefined") {
		return paths[0];
	} else {
		return similarities(paths[0], paths[1]);
	}
};
