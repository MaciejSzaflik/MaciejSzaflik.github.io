(function (console) { "use strict";
var HxOverrides = function() { };
HxOverrides.__name__ = true;
HxOverrides.cca = function(s,index) {
	var x = s.charCodeAt(index);
	if(x != x) return undefined;
	return x;
};
HxOverrides.indexOf = function(a,obj,i) {
	var len = a.length;
	if(i < 0) {
		i += len;
		if(i < 0) i = 0;
	}
	while(i < len) {
		if(a[i] === obj) return i;
		i++;
	}
	return -1;
};
var Lambda = function() { };
Lambda.__name__ = true;
Lambda.array = function(it) {
	var a = [];
	var $it0 = it.iterator();
	while( $it0.hasNext() ) {
		var i = $it0.next();
		a.push(i);
	}
	return a;
};
Math.__name__ = true;
var Random = function() { };
Random.__name__ = true;
Random.bool = function() {
	return Math.random() < 0.5;
};
Random["int"] = function(from,to) {
	return from + Math.floor((to - from + 1) * Math.random());
};
Random["float"] = function(from,to) {
	return from + (to - from) * Math.random();
};
Random.string = function(length,charactersToUse) {
	if(charactersToUse == null) charactersToUse = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
	var str = "";
	var _g = 0;
	while(_g < length) {
		var i = _g++;
		str += charactersToUse.charAt(Math.floor((charactersToUse.length - 1 + 1) * Math.random()));
	}
	return str;
};
Random.date = function(earliest,latest) {
	var t = Random["float"](earliest.getTime(),latest.getTime());
	var d = new Date();
	d.setTime(t);
	return d;
};
Random.fromArray = function(arr) {
	if(arr != null && arr.length > 0) return arr[Math.floor((arr.length - 1 + 1) * Math.random())]; else return null;
};
Random.shuffle = function(arr) {
	if(arr != null) {
		var _g1 = 0;
		var _g = arr.length;
		while(_g1 < _g) {
			var i = _g1++;
			var j = Math.floor((arr.length - 1 + 1) * Math.random());
			var a = arr[i];
			var b = arr[j];
			arr[i] = b;
			arr[j] = a;
		}
	}
	return arr;
};
Random.fromIterable = function(it) {
	if(it != null) return Random.fromArray(Lambda.array(it)); else return null;
};
Random.enumConstructor = function(e) {
	if(e != null) return Random.fromArray(Type.allEnums(e)); else return null;
};
var Reflect = function() { };
Reflect.__name__ = true;
Reflect.field = function(o,field) {
	try {
		return o[field];
	} catch( e ) {
		return null;
	}
};
var Std = function() { };
Std.__name__ = true;
Std.string = function(s) {
	return js_Boot.__string_rec(s,"");
};
Std.parseInt = function(x) {
	var v = parseInt(x,10);
	if(v == 0 && (HxOverrides.cca(x,1) == 120 || HxOverrides.cca(x,1) == 88)) v = parseInt(x);
	if(isNaN(v)) return null;
	return v;
};
var Type = function() { };
Type.__name__ = true;
Type.allEnums = function(e) {
	return e.__empty_constructs__;
};
var algo_BrowserElements = function() {
	var _g = this;
	this.addParagraph("DP Binary Knapsack Solver");
	this.addParagraph("Weights Input:");
	this.weightInput = this.addInputElement("70, 73, 77, 80, 82, 87, 90, 94, 98, 106, 110, 113, 115, 118, 120");
	this.addParagraph("Values Input:");
	this.valueInput = this.addInputElement("135, 139, 149, 150, 156, 163, 173, 184, 192, 201, 210, 214, 221, 229, 240");
	this.addParagraph("Capacity Input:");
	this.capacityInput = this.addInputElement("750");
	this.addParagraph("Elements Count (only for generation):");
	this.countInput = this.addInputElement("5");
	this.addParagraph("Iteration counter (only for meta):");
	this.iterationInput = this.addInputElement("2000");
	window.document.body.appendChild((function($this) {
		var $r;
		var _this = window.document;
		$r = _this.createElement("hr");
		return $r;
	}(this)));
	this.addButton("calculate DP",function(event) {
		_g.creationDecide();
		_g.calculate();
	});
	var _this1 = window.document;
	this.checkboxGenerate = _this1.createElement("input");
	this.checkboxGenerate.type = "checkbox";
	this.checkboxGenerate.title = "generate";
	window.document.body.appendChild(this.checkboxGenerate);
	var _this2 = window.document;
	this.keepCreated = _this2.createElement("input");
	this.keepCreated.type = "checkbox";
	this.keepCreated.title = "keep";
	window.document.body.appendChild(this.keepCreated);
	this.addButton("test",function(event1) {
		_g.creationDecide();
		_g.generateOneAndPrint();
	});
	this.addButton("random search",function(event2) {
		_g.creationDecide();
		_g.randomSearchInput();
	});
	this.addButton("random search",function(event3) {
		_g.creationDecide();
		_g.randomSearchInput();
	});
};
algo_BrowserElements.__name__ = true;
algo_BrowserElements.prototype = {
	creationDecide: function() {
		if(this.keepCreated.checked && this.instance != null) return;
		if(this.checkboxGenerate.checked) this.parseAndRandom(); else this.parseAndFromValues();
	}
	,randomSearchInput: function() {
		var iterations = Std.parseInt(this.iterationInput.value);
		var randomSearch = new algo_problems_RandomSearch(this.instance);
		var result = randomSearch.solve(iterations,true);
		if(this.randomSearchPara == null) {
			this.randomSearchPara = this.addParagraph();
			window.document.body.appendChild((function($this) {
				var $r;
				var _this = window.document;
				$r = _this.createElement("hr");
				return $r;
			}(this)));
		}
		this.randomSearchPara.textContent = "R: " + result.value + " || I: " + Std.string(result.resultVector) + " || W:" + result.weight;
		this.fillGraphWithHistory(randomSearch.history);
	}
	,fillGraphWithHistory: function(history) {
		var h = Reflect.field(window,"data");
		var strings = [];
		var index = 1;
		var _g = 0;
		while(_g < history.length) {
			var value = history[_g];
			++_g;
			strings.push(index + "");
			index++;
		}
		h.labels = strings;
		h.series[0] = history;
		init();
	}
	,parseAndRandom: function() {
		var randsW = this.weightInput.value.split(",").map(function(f) {
			return Std.parseInt(f);
		});
		var randsV = this.valueInput.value.split(",").map(function(f1) {
			return Std.parseInt(f1);
		});
		var capacity = Std.parseInt(this.capacityInput.value);
		var count = Std.parseInt(this.countInput.value);
		this.instance = algo_problems_BinaryKnapsack.generateInstance(capacity,count,randsW[0],randsW[1],randsV[0],randsV[1]);
	}
	,parseAndFromValues: function() {
		var weights = this.weightInput.value.split(",").map(function(f) {
			return Std.parseInt(f);
		});
		var values = this.valueInput.value.split(",").map(function(f1) {
			return Std.parseInt(f1);
		});
		var capacity = Std.parseInt(this.capacityInput.value);
		if(capacity == null || weights == null || values == null || weights.length != values.length) {
			js_Browser.alert("Bad arguments");
			return;
		}
		this.instance = algo_problems_BinaryKnapsack.initInstance(capacity,values,weights);
	}
	,calculate: function() {
		if(this.instance == null) return;
		this.solveAndPrint(this.instance);
	}
	,generateOneAndPrint: function() {
		if(this.testOnePara == null) {
			this.testOnePara = this.addParagraph();
			window.document.body.appendChild((function($this) {
				var $r;
				var _this = window.document;
				$r = _this.createElement("hr");
				return $r;
			}(this)));
		}
		var v = this.instance.generateRandomSolution();
		this.testOnePara.textContent = "R: " + v.value + "|| I: " + Std.string(v.resultVector) + " || W:" + v.weight;
	}
	,solveAndPrint: function(instance) {
		if(this.weightPara == null) {
			this.resultPara = this.addParagraph();
			this.weightPara = this.addParagraph();
			this.valuePara = this.addParagraph();
			window.document.body.appendChild((function($this) {
				var $r;
				var _this = window.document;
				$r = _this.createElement("hr");
				return $r;
			}(this)));
		}
		var result = algo_problems_DPKnapsack.solve(instance);
		this.resultPara.textContent = "Result: " + result.value + " || " + Std.string(result.resultVector);
		this.weightPara.textContent = "Weights: " + instance.getWeightDebug();
		this.valuePara.textContent = "Values: " + instance.getValuesDebug();
	}
	,addButton: function(text,listener) {
		var button;
		var _this = window.document;
		button = _this.createElement("button");
		button.textContent = text;
		button.onclick = listener;
		window.document.body.appendChild(button);
		return button;
	}
	,addInputElement: function(initial) {
		if(initial == null) initial = "hello";
		var input;
		var _this = window.document;
		input = _this.createElement("input");
		input.size = 160;
		input.value = initial;
		window.document.body.appendChild(input);
		return input;
	}
	,addParagraph: function(text) {
		if(text == null) text = "yo";
		var paragraph;
		var _this = window.document;
		paragraph = _this.createElement("p");
		paragraph.textContent = text;
		window.document.body.appendChild(paragraph);
		return paragraph;
	}
};
var algo_Main = function() { };
algo_Main.__name__ = true;
algo_Main.main = function() {
	var browserElements = new algo_BrowserElements();
};
var algo_problems_BinaryKnapsack = function() {
};
algo_problems_BinaryKnapsack.__name__ = true;
algo_problems_BinaryKnapsack.initInstance = function(capacity,values,weights) {
	var knapsack = new algo_problems_BinaryKnapsack();
	knapsack.capacity = capacity;
	knapsack.values = values;
	knapsack.weights = weights;
	return knapsack;
};
algo_problems_BinaryKnapsack.generateInstance = function(capacity,numberOfItems,weightBottom,weightTop,valueBottom,valueTop) {
	var knapsack = new algo_problems_BinaryKnapsack();
	knapsack.capacity = capacity;
	knapsack.values = [];
	knapsack.weights = [];
	var index = 0;
	while(index < numberOfItems) {
		knapsack.values.push(valueBottom + Math.floor((valueTop - valueBottom + 1) * Math.random()));
		knapsack.weights.push(weightBottom + Math.floor((weightTop - weightBottom + 1) * Math.random()));
		index++;
	}
	return knapsack;
};
algo_problems_BinaryKnapsack.prototype = {
	toBinaryVector: function(items) {
		var binary = [];
		var index = 0;
		while(index < this.values.length) {
			binary[index] = HxOverrides.indexOf(this.values,items[index],0) != -1;
			index++;
		}
		return binary;
	}
	,generateRandomSolution: function() {
		var v;
		var this1;
		this1 = new Array(this.values.length);
		v = this1;
		var index = 0;
		var sum = 0;
		var valueSum = 0;
		while(index < v.length) {
			var result = Math.random() < 0.5;
			if(result) {
				v[index] = this.weights[index] + sum <= this.capacity;
				if(v[index]) {
					sum += this.weights[index];
					valueSum += this.values[index];
				}
			} else v[index] = false;
			index++;
		}
		return new algo_problems_Result(v,valueSum,sum);
	}
	,evaluateValue: function(items) {
		var sum = 0;
		var index = 0;
		var _g = 0;
		while(_g < items.length) {
			var item = items[_g];
			++_g;
			if(item) sum += this.values[index];
			index++;
		}
		return sum;
	}
	,getValuesDebug: function() {
		var sb_b = "";
		var _g = 0;
		var _g1 = this.values;
		while(_g < _g1.length) {
			var value = _g1[_g];
			++_g;
			if(value == null) sb_b += "null"; else sb_b += "" + value;
			sb_b += " ";
		}
		return sb_b;
	}
	,getWeightDebug: function() {
		var sb_b = "";
		var _g = 0;
		var _g1 = this.weights;
		while(_g < _g1.length) {
			var value = _g1[_g];
			++_g;
			if(value == null) sb_b += "null"; else sb_b += "" + value;
			sb_b += " ";
		}
		return sb_b;
	}
};
var algo_problems_DPKnapsack = function() { };
algo_problems_DPKnapsack.__name__ = true;
algo_problems_DPKnapsack.solve = function(knapsack) {
	var n = knapsack.values.length;
	var W = knapsack.capacity;
	var rows;
	var this1;
	this1 = new Array(n + 1);
	rows = this1;
	var i = 0;
	while(i <= n) {
		var val;
		var this2;
		this2 = new Array(W + 1);
		val = this2;
		rows[i] = val;
		var j = 0;
		while(j <= W) {
			rows[i][j] = 0;
			j++;
		}
		i++;
	}
	i = 1;
	while(i <= n) {
		var w = 0;
		while(w <= W) {
			var wi = knapsack.weights[i - 1];
			var bi = knapsack.values[i - 1];
			if(wi <= w) {
				if(bi + rows[i - 1][w - wi] > rows[i - 1][w]) rows[i][w] = bi + rows[i - 1][w - wi]; else rows[i][w] = rows[i - 1][w];
			} else rows[i][w] = rows[i - 1][w];
			w++;
		}
		i++;
	}
	var vector = algo_problems_DPKnapsack.traceResult(knapsack,rows);
	return new algo_problems_Result(vector,knapsack.evaluateValue(vector));
};
algo_problems_DPKnapsack.traceResult = function(knapsack,table) {
	var v;
	var this1;
	this1 = new Array(knapsack.values.length);
	v = this1;
	var j = 0;
	while(j < knapsack.values.length) {
		v[j] = false;
		j++;
	}
	var n = knapsack.values.length;
	var W = knapsack.capacity;
	var i = n;
	var k = W;
	while(i > 0 && k > 0) if(table[i][k] != table[i - 1][k]) {
		v[i - 1] = true;
		k = k - knapsack.weights[i - 1];
		i = i - 1;
	} else i = i - 1;
	return v;
};
var algo_problems_RandomSearch = function(knapsack) {
	this.knapsack = knapsack;
};
algo_problems_RandomSearch.__name__ = true;
algo_problems_RandomSearch.prototype = {
	solve: function(iterations,withHistory) {
		this.history = [];
		var bestResult = new algo_problems_Result((function($this) {
			var $r;
			var this1;
			this1 = new Array(1);
			$r = this1;
			return $r;
		}(this)),-1);
		var index = 0;
		while(index < iterations) {
			var tryV = this.knapsack.generateRandomSolution();
			if(tryV.value > bestResult.value) bestResult = tryV;
			index++;
			if(withHistory) this.history.push(bestResult.value);
		}
		return bestResult;
	}
};
var algo_problems_Result = function(resultVector,value,weight) {
	if(weight == null) weight = 0;
	this.resultVector = resultVector;
	this.value = value;
	this.weight = weight;
};
algo_problems_Result.__name__ = true;
var js_Boot = function() { };
js_Boot.__name__ = true;
js_Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__) {
				if(o.length == 2) return o[0];
				var str2 = o[0] + "(";
				s += "\t";
				var _g1 = 2;
				var _g = o.length;
				while(_g1 < _g) {
					var i1 = _g1++;
					if(i1 != 2) str2 += "," + js_Boot.__string_rec(o[i1],s); else str2 += js_Boot.__string_rec(o[i1],s);
				}
				return str2 + ")";
			}
			var l = o.length;
			var i;
			var str1 = "[";
			s += "\t";
			var _g2 = 0;
			while(_g2 < l) {
				var i2 = _g2++;
				str1 += (i2 > 0?",":"") + js_Boot.__string_rec(o[i2],s);
			}
			str1 += "]";
			return str1;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			return "???";
		}
		if(tostr != null && tostr != Object.toString && typeof(tostr) == "function") {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) {
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str.length != 2) str += ", \n";
		str += s + k + " : " + js_Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str += "\n" + s + "}";
		return str;
	case "function":
		return "<function>";
	case "string":
		return o;
	default:
		return String(o);
	}
};
var js_Browser = function() { };
js_Browser.__name__ = true;
js_Browser.alert = function(v) {
	window.alert(js_Boot.__string_rec(v,""));
};
if(Array.prototype.indexOf) HxOverrides.indexOf = function(a,o,i) {
	return Array.prototype.indexOf.call(a,o,i);
};
String.__name__ = true;
Array.__name__ = true;
Date.__name__ = ["Date"];
if(Array.prototype.map == null) Array.prototype.map = function(f) {
	var a = [];
	var _g1 = 0;
	var _g = this.length;
	while(_g1 < _g) {
		var i = _g1++;
		a[i] = f(this[i]);
	}
	return a;
};
algo_Main.main();
})(typeof console != "undefined" ? console : {log:function(){}});
