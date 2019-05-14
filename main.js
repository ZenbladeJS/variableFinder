const varFind = function(predicate, array, object) {
	const varSearch = function(obj, predicate) { // The function 
		const discoveredObjects = []; // For checking for cyclic object
		const path = []; // The current path being searched
		const results = []; // The array of paths that satify the predicate === true
		var counter = 0;
		if (!obj && (typeof obj !== "object" || Array.isArray(obj))) {
			throw new TypeError("First argument of varFind is not an object");
		}
		if (typeof predicate !== "function") {
			throw new TypeError("Predicate is not a function");
		}
		(function find(obj) {
			if(counter === 500) {
				break;
			}
			try {	
				counter++;
				for (const key of Object.keys(obj)) { // use only enumrable own properties.
					if (predicate(key, obj, path) === true) { // Found a path
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
			}
			catch(e){
			
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
		paths[0] = varSearch(window, predicate);
	} else {
		paths[0] = varSearch(object, predicate);
	}
	if (typeof(array) === "undefined") {
		return paths[0];
	} else {
		return similarities(paths[0], paths[1]);
	}
};
