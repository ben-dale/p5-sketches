let points = [];

let noOfPointsSlider;
let noOfPointsMapped;

let noOfConnectionsSlider;
let noOfConnections;

function setup() {
	let canvas = createCanvas(windowWidth-20, windowHeight-20);
	canvas.parent("canvas");
	smooth();
	frameRate(30);

	noOfPointsSlider = createSlider("noOfPoints");
	noOfPointsSlider.position(20, 20);
	noOfPointsSlider.value(30);

	noOfConnectionsSlider = createSlider("noOfConnections");
	noOfConnectionsSlider.value(30);
	noOfConnectionsSlider.position(20, 60);
}

function draw() {
	background(43, 58, 66);

	noOfConnections = map(noOfConnectionsSlider.value(), 0, 100, 1, 10);
	noOfPointsMapped = map(noOfPointsSlider.value(), 0, 100, 4, 20);
	while(noOfPointsMapped > points.length) {
		points.push(new Point(random(20, width-20), random(20, height-20)));
	}
	while(noOfPointsMapped < points.length) {
		points.pop();
	}

	for (let i = 0; i < points.length; i++) {
		points[i].move();
		points[i].drawLines(points);
	}

}

function windowResized() {
  resizeCanvas(windowWidth-20, windowHeight-20);
}

function Point(x, y) {
	this.r = 3;
	this.loc = createVector(x, y);
	this.vel = createVector(random(-0.5, 0.5), random(-0.2, 0.2));
	

	// Draws lines to two closest points
	this.drawLines = function(allPoints) {
		stroke(189,212,222);
		strokeWeight(1);
		for (let i = 0; i < noOfConnections; i++) {
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