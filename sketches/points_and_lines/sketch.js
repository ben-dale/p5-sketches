var points = [];

var noOfPointsSlider;
var noOfConnectionsSlider;

function setup() {
	var canvas = createCanvas(800, 500);
	canvas.parent("canvas");
	smooth();
	frameRate(30);

	noOfPointsSlider = createSlider(4, 20, 4);
	noOfPointsSlider.parent("controls");

	noOfConnectionsSlider = createSlider(1, 10, 4);
	noOfConnectionsSlider.parent("controls");
}

function draw() {
	background(43, 58, 66);
	stroke(0, 0, 20);
	strokeWeight(10);
	noFill();
	rect(0, 0, width, height);

	while(noOfPointsSlider.value() > points.length) {
		points.push(new Point(random(20, width), random(20, height)));
	}
	while(noOfPointsSlider.value() < points.length) {
		points.pop();
	}

	for (var i = 0; i < points.length; i++) {
		points[i].move();
		points[i].drawLines(points);
	}

}

function Point(x, y) {
	this.r = 5;
	this.loc = createVector(x, y);
	this.vel = createVector(random(-0.5, 0.5), random(-0.2, 0.2));
	
	this.drawLines = function(allPoints) {
		stroke(189,212,222);
		strokeWeight(1);
		for (var i = 0; i < noOfConnectionsSlider.value(); i++) {
			if(i < allPoints.length) {
				line(this.loc.x, this.loc.y, allPoints[i].loc.x, allPoints[i].loc.y);
			}
		}
	}

	this.move = function() {
		this.loc.add(this.vel);
		if(this.loc.x <= this.r || this.loc.x >= width - this.r) {
			this.vel.x *= -1;
		}
		if(this.loc.y <= this.r || this.loc.y >= height - this.r) {
			this.vel.y *= -1;
		}
	}

}