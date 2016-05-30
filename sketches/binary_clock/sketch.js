var grid = [];
var fullScreen = false;
var secondsInBin = 0;
var minutesInBin = 0;
var hoursInBin = 0;

function setup() {
	var canvas = createCanvas(600, 400);
	canvas.parent("canvas");
	smooth();
	frameRate(20);

	bitWidth = width/6;
	bitHeight = height/4;

	for (var x = 0; x < width; x+=bitWidth) {
		for (var y = 0; y < height; y+=bitHeight) {
			grid.push(new Bit(x, y, bitWidth, bitHeight));
		}
	}

}

function isFullScreen() {
	return !document.fullscreenElement && !document.mozFullScreenElement && 
	!document.webkitFullscreenElement && !document.msFullscreenElement;
}

function keyPressed() {
	if (keyCode === 70) {
		if (!isFullScreen()) {
			if (document.exitFullscreen) {
		      document.exitFullscreen();
		    } else if (document.msExitFullscreen) {
		      document.msExitFullscreen();
		    } else if (document.mozCancelFullScreen) {
		      document.mozCancelFullScreen();
		    } else if (document.webkitExitFullscreen) {
		      document.webkitExitFullscreen();
		    }
		} else {
			if (canvas.requestFullscreen) {
			  canvas.requestFullscreen();
			} else if (canvas.msRequestFullscreen) {
			  canvas.msRequestFullscreen();
			} else if (canvas.mozRequestFullScreen) {
			  canvas.mozRequestFullScreen();
			} else if (canvas.webkitRequestFullscreen) {
			  canvas.webkitRequestFullscreen();
			}
		}
	}
}

function draw() {
	background(0);

	calculateTimeInBin(hour(), 3, 7);
	calculateTimeInBin(minute(), 11, 15);
	calculateTimeInBin(second(), 19, 23);
	
	for (var i = 0; i < grid.length; i++) {
		grid[i].draw();
		grid[i].state = 0;
	}
	
}

function calculateTimeInBin(timeUnit, firstIndex, secondIndex) {
	var firstCol = [];
	var secondCol = [];

	var timeUnitSplit = timeUnit.toString().split("");
	if(timeUnitSplit.length === 2) {
		firstCol = toBinaryArr(timeUnitSplit[0]);
		secondCol = toBinaryArr(timeUnitSplit[1]);
	} else {
		secondCol = toBinaryArr(timeUnitSplit[0]);
	}

	var currentFirstCol = firstIndex;
	for (var i = firstCol.length - 1; i >= 0; i--) {
		grid[currentFirstCol].state = parseInt(firstCol[i]);
		currentFirstCol--;
	}

	var currentSecondCol = secondIndex;
	for (var i = secondCol.length - 1; i >= 0; i--) {
		grid[currentSecondCol].state = parseInt(secondCol[i]);
		currentSecondCol--;
	}
}

function toBinaryArr(num) {
	return parseInt(num).toString(2).split("");
}

function Bit(x, y, w, h) {
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	this.state = 0;

	this.draw = function() {
		if(this.state === 0) {
			fill(0);
		} else {
			fill(231, 76, 60);
		}
		noStroke();
		rect(x, y, w, h);
	};
}