(function (console) { "use strict";
var HxOverrides = function() { };
HxOverrides.cca = function(s,index) {
	var x = s.charCodeAt(index);
	if(x != x) return undefined;
	return x;
};
var Std = function() { };
Std["int"] = function(x) {
	return x | 0;
};
Std.parseInt = function(x) {
	var v = parseInt(x,10);
	if(v == 0 && (HxOverrides.cca(x,1) == 120 || HxOverrides.cca(x,1) == 88)) v = parseInt(x);
	if(isNaN(v)) return null;
	return v;
};
var randomWalk_Main = function() { };
randomWalk_Main.main = function() {
	randomWalk_Main.randomWalk = new randomWalk_RandomWalk();
	randomWalk_Main.randomWalk.Init(500,32);
	window.requestAnimationFrame(randomWalk_Main.frame);
};
randomWalk_Main.frame = function(timestamp) {
	if(randomWalk_Main.randomWalk != null) randomWalk_Main.randomWalk.GoToNextPosition();
	window.requestAnimationFrame(randomWalk_Main.frame);
};
var randomWalk_RandomWalk = function() {
	this.speed = 1;
	this.running = false;
	this.currentY = 0;
	this.currentX = 0;
	this.rowsNumber = 16;
	this.columnsNumber = 32;
};
randomWalk_RandomWalk.prototype = {
	Init: function(canvasHeight,numerOfRows) {
		this.createCanvas(canvasHeight);
		this.rowsNumber = numerOfRows;
		this.columnsNumber = numerOfRows * 2;
		this.cellSize = canvasHeight / numerOfRows;
		this.drawPoints();
		this.addButtons();
		this.enableSteps(true);
	}
	,addButtons: function() {
		var _g = this;
		var clearButton;
		var _this = window.document;
		clearButton = _this.createElement("button");
		clearButton.onclick = function(event) {
			_g.drawPoints();
		};
		clearButton.textContent = "Clear";
		window.document.body.appendChild(clearButton);
		var stopButton;
		var _this1 = window.document;
		stopButton = _this1.createElement("button");
		stopButton.onclick = function(event1) {
			_g.enableSteps(!_g.running);
			if(_g.running) stopButton.textContent = "Stop"; else stopButton.textContent = "Start";
		};
		stopButton.textContent = "Stop";
		window.document.body.appendChild(stopButton);
		var input;
		var _this2 = window.document;
		input = _this2.createElement("input");
		input.value = this.speed + "";
		window.document.body.appendChild(input);
		var speedButton;
		var _this3 = window.document;
		speedButton = _this3.createElement("button");
		speedButton.onclick = function(event2) {
			var parse = Std.parseInt(input.value);
			if(parse != null) _g.speed = parse;
		};
		speedButton.textContent = "setSpeed";
		window.document.body.appendChild(speedButton);
	}
	,createCanvas: function(canvasHeight) {
		var _this = window.document;
		this.canvas = _this.createElement("canvas");
		this.canvas.height = canvasHeight + 20;
		this.canvas.width = canvasHeight * 2 + 20;
		this.ctx = this.canvas.getContext("2d",null);
		window.document.body.appendChild(this.canvas);
	}
	,enableSteps: function(enable) {
		this.running = enable;
	}
	,drawPoints: function() {
		this.currentX = 0;
		this.currentY = 0;
		this.ctx.fillStyle = "#FFFFFF";
		this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height);
		this.ctx.fillStyle = "#333333";
		var _g1 = 0;
		var _g = this.rowsNumber;
		while(_g1 < _g) {
			var i = _g1++;
			var _g3 = 0;
			var _g2 = this.columnsNumber;
			while(_g3 < _g2) {
				var j = _g3++;
				this.ctx.fillRect(j * this.cellSize + 10,i * this.cellSize + 10,2,2);
			}
		}
	}
	,getCurrentPosition: function(i,j) {
		return { x : i * this.cellSize + 10, y : j * this.cellSize + 10};
	}
	,GoToNextPosition: function() {
		if(!this.running) return;
		var _g1 = 0;
		var _g = this.speed;
		while(_g1 < _g) {
			var i = _g1++;
			var where = this.RandomRange(0,3);
			var pos = this.getCurrentPosition(this.currentX,this.currentY);
			this.ctx.lineWidth = 2;
			this.ctx.beginPath();
			this.ctx.moveTo(pos.x + 1,pos.y + 1);
			switch(where) {
			case 0:
				this.currentX = Std["int"](Math.min(this.currentX + 1,this.columnsNumber - 1));
				break;
			case 1:
				this.currentX = Std["int"](Math.max(this.currentX - 1,0));
				break;
			case 2:
				this.currentY = Std["int"](Math.min(this.currentY + 1,this.rowsNumber - 1));
				break;
			case 3:
				this.currentY = Std["int"](Math.max(this.currentY - 1,0));
				break;
			}
			pos = this.getCurrentPosition(this.currentX,this.currentY);
			this.ctx.lineTo(pos.x + 1,pos.y + 1);
			this.ctx.stroke();
		}
	}
	,RandomRange: function(min,max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
};
randomWalk_Main.main();
})(typeof console != "undefined" ? console : {log:function(){}});
