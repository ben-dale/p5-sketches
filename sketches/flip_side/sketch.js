let board;

function setup() {
	let canvas = createCanvas(780, 250);
	canvas.parent("canvas");
	smooth();

	board = new Board(20, 20);
	board.init();
}

function draw() {
	background(160);
	board.update();
	board.draw();
}

function keyPressed() {
	board.move(keyCode);
}