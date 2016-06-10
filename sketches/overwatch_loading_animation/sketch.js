var r;
var mainOrangeRingSize;
var mainOrangeRingSize2;
var mainOrangeRingSizeResizeValue;
var mainOrangeRingSizeResizeValue2;

function setup() {
  var canvas = createCanvas(600, 500);
  canvas.parent('canvas');
  smooth();
  frameRate(60);

  r = 1;
  mainOrangeRingSize = 300;
  mainOrangeRingSize2 = 10;
  mainOrangeRingSizeResizeValue = 1;
  mainOrangeRingSizeResizeValue2 = 1;
}

function draw() {
  background(65, 47, 47);

  // Main ring top and bottom
  noStroke();
  fill(200);
  arc(width / 2, height / 2, 300, 300, radians(-45), radians(225));
  arc(width / 2, height / 2, 300, 300, radians(-135), radians(-45));

  // Main ring center
  fill(65, 47, 47);
  ellipse(width / 2, height / 2, 210, 210);

  // Gaps in main ring
  noFill();
  strokeWeight(15);
  stroke(65, 47, 47);
  strokeCap(SQUARE);
  line(width / 2, height / 2, 189, 141);
  line(width / 2, height / 2, 409, 139);

  // Lines pointing to centre of main ring
  stroke(200);
  noFill();
  strokeWeight(35);
  strokeCap(SQUARE);
  line(205, 333, width / 2 - 20, height / 2 + 10);
  line(395, 333, width / 2 + 20, height / 2 + 10);

  // Triangle bits
  fill(200);
  noStroke();
  triangle(308.5, 273.5, 308.5, 185, 333, 249);
  triangle(292.5, 273.5, 292.5, 185, 268, 249);

  // Large transparent orange rotating ring
  push();
  translate(width / 2, height / 2);
  rotate(radians(r));
  noFill();
  strokeWeight(15);
  stroke(254, 202, 119, 100);
  arc(0, 0, 350, 350, radians(-100), radians(mainOrangeRingSize - 100));
  pop();

  // medium transparent orange rotating ring
  push();
  translate(width / 2, height / 2);
  rotate(radians(r + 2));
  noFill();
  strokeWeight(15);
  stroke(254, 202, 119);
  arc(0, 0, 350, 350, radians(0), radians((mainOrangeRingSize / 6) + 50));
  pop();

  // medium transparent orange rotating ring
  push();
  translate(width / 2, height / 2);
  rotate(radians(r + 250));
  noFill();
  strokeWeight(15);
  stroke(254, 202, 119);
  arc(0, 0, 350, 350, radians(-100), radians((mainOrangeRingSize2 - 100)));
  pop();

  // tiny orange rotating ring
  push();
  translate(width / 2, height / 2);
  rotate(radians(-r));
  noFill();
  strokeWeight(15);
  stroke(254, 202, 119);
  arc(0, 0, 350, 350, radians(100), radians(110));
  pop();

  // tiny white rotating ring
  push();
  translate(width / 2, height / 2);
  rotate(radians(-r));
  noFill();
  strokeWeight(10);
  stroke(200, 220);
  arc(0, 0, 405, 405, radians(0), radians(3));
  pop();

  // Small white rotating ring
  push();
  translate(width / 2, height / 2);
  rotate(radians(-r));
  noFill();
  strokeWeight(10);
  stroke(200, 180);
  arc(0, 0, 405, 405, radians(240), radians(250));
  pop();

  // Medium white rotating ring
  push();
  translate(width / 2, height / 2);
  rotate(radians(r));
  noFill();
  strokeWeight(10);
  stroke(200, 220);
  arc(0, 0, 405, 405, radians(0), radians(30));
  pop();

  // Large white rotating ring
  push();
  translate(width / 2, height / 2);
  rotate(radians(r));
  noFill();
  strokeWeight(10);
  stroke(200, 180);
  arc(0, 0, 405, 405, radians(180), radians(220));
  pop();

  if (r >= 360) { r = 0; } else { r += 2; }

  if (mainOrangeRingSize >= 355 || mainOrangeRingSize <= 5) {
    mainOrangeRingSizeResizeValue *= -1;
  }

  mainOrangeRingSize += (3 * mainOrangeRingSizeResizeValue);

  if (mainOrangeRingSize2 >= 100 || mainOrangeRingSize2 <= 5) {
    mainOrangeRingSizeResizeValue2 *= -1;
  }

  mainOrangeRingSize2 += (1.1 * mainOrangeRingSizeResizeValue2);
}
