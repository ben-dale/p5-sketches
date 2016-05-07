var points
var geneticAlg;
var currentBestFitness;
var fitnessNotChangedCount;
var now;
var then;

function setup() {
	var canvas = createCanvas(900,600);
	canvas.parent("canvas");

	frameRate(40);
	smooth();
	textSize(15);

	drawBackground();
	initTSP();
}

function draw() {
	drawBackground();

	if(fitnessNotChangedCount <= 400) {
		geneticAlg.evolve();
		if(currentBestFitness == geneticAlg.getBestSolution().fitness) {
			fitnessNotChangedCount++;
		} else {
			fitnessNotChangedCount = 0;
			currentBestFitness = geneticAlg.getBestSolution().fitness;
		}
		geneticAlg.drawBestSolution();
	} else {
		geneticAlg.drawFinishedSolution();
		if(now == 0 && then == 0) {
			now = floor(millis() / 1000);
			then = now + 5;
		} else {
			if(now >= then) {
				initTSP();
			} else {
				now = floor(millis() / 1000);
				noStroke();
				fill(236, 240, 241);
				text("Starting next TSP in " + (then - now), 25, this.height - 75);
			}
		}
	}

	noStroke();
	fill(236, 240, 241);
	text("Generation: " + geneticAlg.generation, 25, this.height - 50);
	text("Distance: " + floor(currentBestFitness), 25, this.height - 25);
}

function initTSP() {
	now = 0;
	then = 0;
	fitnessNotChangedCount = 0;
	currentBestFitness = 0;
	
	points = [];	
	for(var i = 0; i < floor(random(30, 70)); i++) {
		var randomX = floor(random(50, this.width - 50));
		var randomY = floor(random(50, this.height - 100));
		points.push(new Point(randomX, randomY, i));
	}

	geneticAlg = new GA(points);
	geneticAlg.init();
}

function drawBackground() {
	fill(44, 62, 80);
	rect(-1, -1, this.width + 1, this.height + 1);

	noFill();
	stroke(114, 157, 198);
	strokeWeight(12);
	rect(-1, -1, this.width + 1, this.height + 1);
}

//**************************************************
//********** Magic Array Helper Functions **********
//**************************************************

function getAdjacentElements(arr, i) {
	var elements = [];
	if(i == arr.length - 1) {
		elements.push(arr[i-1])
		elements.push(arr[0])
	} else if(i == 0) {
		elements.push(arr[arr.length-1])
		elements.push(arr[1])
	} else {
		elements.push(arr[i-1])
		elements.push(arr[i+1])
	}
	return elements;
}

function swapArrayElements(arr, indexA, indexB) {
  var temp = arr[indexA];
  arr[indexA] = arr[indexB];
  arr[indexB] = temp;
}

function containsDuplicates(array) {
	var count = 0;
	for(var i = 0; i < array.length; i++) {
		for(var j = 0; j < array.length; j++) {
			if(array[i] == array[j]) count++;
			if(count >= 2) return true;
		}
		count = 0;
	}
	return false;
}