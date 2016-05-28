let points = [];
let paused = false;

function setup() {
	let canvas = createCanvas(800, 500);
	canvas.parent("canvas");
	canvas.mouseClicked(function() { points.push(new Point(mouseX, mouseY)); });
	smooth();
	initPoints();
}

function draw() {
	background(52, 73, 94);

	for (let i = 0; i < points.length; i++) {
		let current = points[i];
		for (let j = 0; j < points.length; j++) {
			if (current !== points[j]) {
				let distance = distanceBetween(current, points[j]);
				if (distance <= 180) {
					drawConnection(current, points[j], distance);
				}
			}
		}
	}
	
	for (let i = 0; i < points.length; i++) {
		if (!paused) { points[i].update(); }
		points[i].draw();
	}
}

function keyPressed() {
	if (keyCode === 82) {
		points = [];
		initPoints();	
	} else if (keyCode === 32) {
		if (paused) {
			paused = false;
		} else {
			paused = true;
		}
	}
}

function initPoints() {
	for (let i = 0; i < 20; i++) {
		points.push(new Point(floor(random(width)), floor(random(height))));
	}
}

function drawConnection(pointA, pointB, distance) {
	noFill();
	stroke(241, 250, 238, map(distance, 0, 180, 200, 0));
	strokeWeight(1);
	line(pointA.loc.x, pointA.loc.y, pointB.loc.x, pointB.loc.y);
}

function distanceBetween(pointA, pointB) {
	return dist(pointA.loc.x, pointA.loc.y, pointB.loc.x, pointB.loc.y);
}

function Point(x, y) {
	this.loc = createVector(x, y);
	this.vel = createVector(random(-0.5, 0.5), random(-0.5, 0.5));
	this.size = 4;

	this.draw = function() {
		fill(241, 250, 238);
		noStroke();
		ellipse(this.loc.x, this.loc.y, this.size, this.size);
	};

	this.update = function() {
		if (this.loc.x >= width || this.loc.x <= 0) {
			this.vel.x *= -1;
		}

		if (this.loc.y >= height || this.loc.y <= 0) {
			this.vel.y *= -1;
		}

		this.loc.add(this.vel);
	};

}