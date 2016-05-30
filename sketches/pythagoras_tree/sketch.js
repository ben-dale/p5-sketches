// This L-System starts with the axiom "0"
var sentence = "0";
var rules = [];
var length = 100;
var stoppingGeneration = 8;
var currentGeneration = 0;

function setup() {
	var canvas = createCanvas(800, 600);
	canvas.parent("canvas");
	canvas.mousePressed(reset);

	frameRate(1.5);
	background(255);

	rules.push({ a: "1", b: "11" });
	rules.push({ a: "0", b: "1[0]0" });
}

function reset() {
	sentence = "0";
	currentGeneration = 0;
	length = 100;
}

function generate() {
	var newSentence = "";
	for (var i = 0; i < sentence.length; i++) {
		var matchedRule = false;
		for (var j = 0; j < rules.length; j++) {
			if(sentence[i] === rules[j].a && !matchedRule) {
				matchedRule = true;
				newSentence = newSentence.concat(rules[j].b);
			}
		}
		if(!matchedRule) {
			newSentence = newSentence.concat(sentence[i]);
		}
	}
	sentence = newSentence;
	currentGeneration++;
	length *= 0.62;
}

function draw() {
	background(255);
	strokeWeight(5);
	noFill();
	stroke(90);
	resetMatrix();
	rect(0, 0, width-1, height-1);

	if(currentGeneration < stoppingGeneration) {
		generate();
	}

	translate(width/2, height-4);
	
	for (var i = 0; i < sentence.length; i++) {
		switch(sentence[i]) {
			case "0":
				noStroke();
				fill(46, 204, 113, 2);
				ellipse(0, 0, 200, 200);
				translate(0, -length);
				break;
			case "1":
				stroke(140, 114, 104);
				strokeWeight(2.2);
				line(0, 0, 0, -length);
				translate(0, -length);
				break;
			case "[":
				push();
				rotate(45);
				break;
			case "]":
				pop();
				rotate(-45);
				break;
		}
	}
}