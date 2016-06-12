var level;

function setup() {
  var canvas = createCanvas(660, 440);
  canvas.parent('canvas');
  smooth();
  frameRate(20);

  level = new Level();
  level.init();
}

function draw() {
  background(23, 43, 38);
  level.draw();
  level.update();
}

function keyPressed() {
  level.move(keyCode);
}
