var varFind = function (predicate, object, layers) {
	//errors
	if (typeof(predicate) !== "function") {
		throw "First agrument is not a function. Example is (key, obj, path) => obj[key] == 234095843.";
	}
	if (typeof(object) !== "string") {
		throw "Second agrument is not a string. Example is \"myObj\".";
	}
	if (typeof(layers) !== "number" && layers !== undefined) {
		throw "Third agrument is not a number. Example is 15.";
	}
	var newEval = function (str) {
		try{
			return new Function("return " + str + ";")();
		} catch (e) {
			return null;
		}
	}
	//where result will be stored
	const results = [];
	//to prevent cors error
	const isElement = function (element) {
		try{
			return element instanceof Element || element instanceof HTMLDocument;
		} catch(e){
			return false;
		}	
	}
	//path finding function
	const varSearch = function (obj, path, cyclicDetect, layers) {
		//initial set up
		if(typeof(path) == "undefined") {
			path = [
				(newEval(object) || window) === window ? "window" : object
			];
			cyclicDetect = [];
		}
		//looping through object
		for (var key of Object.keys(obj)) {
			//to prevent errors
			try {
				//layers is used more in lag reduction
				layers = typeof(layers) == "number" ? layers : Infinity;
				//pushing current key to path
				path.push(key);
				//if matches predicate
				if(predicate(key, obj, path) === true) {
					//cloning path for modification
					var editedPath = [...path];
					//putting in propper formatt
					for (var i in path) {
						if (i != 0) {
							editedPath[i] = "['" + editedPath[i].replace(/'/g, "\\'") + "']";
						}
					}
					//pushing result to results
					results.push(editedPath.join(""));
				}
				//to help with cyclic detection
				var isCyclic = false;
				//for easier access
				const o = obj[key];
				//testing if element to prevent cors error and if it is an object
				if (o && typeof o === "object" && !isElement(o) && layers != 0) {
					//pushing object to cyclic detect
					cyclicDetect.push(obj);
					for(var i in cyclicDetect) {
						//checking if cyclic
						if(cyclicDetect[i] == o) {
							isCyclic = true;
						}
					}
					//recursion!
					if (!isCyclic) {
						varSearch(o, path, cyclicDetect, layers - 1);
					}
					//popping cyclicDetect for future objects not in that recursion
					cyclicDetect.pop(obj);
				}
				//popping path for the next possible path
				path.pop();
			} catch (e) {}
		}
	}
	//getting results
	varSearch(newEval(object) || window, undefined, undefined, layers)
	return results;
}
