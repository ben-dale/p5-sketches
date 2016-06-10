function Piece(x, y, size, value) {
  this.value = value;
  this.currentLoc = createVector(x, y);
  this.targetLoc = createVector(x, y);
  this.velocity = createVector(x, y);
  this.size = size;

  this.finishedMoving = function () {
    return this.currentLoc.x === this.targetLoc.x && this.currentLoc.y === this.targetLoc.y;
  };

  this.draw = function (solved) {
    if (this.value === -1) {
      noFill();
    } else if (solved) {
      fill(119, 255, 105);
    } else {
      fill(100, 176, 247);
    }

    if (this.value !== -1) {
      stroke(60);
      strokeWeight(1);
      rect(this.currentLoc.x, this.currentLoc.y, this.size, this.size);
    }

    if (this.value > -1) {
      fill(40);
      noStroke();
      textSize(25);
      textFont('Helvetica');
      text(this.value, this.currentLoc.x + this.size / 2.2, this.currentLoc.y + this.size / 1.8);
    }
  };

  this.move = function () {
    if (!this.finishedMoving()) {
      this.currentLoc.add(this.velocity);
    }
  };

  this.instamove = function () {
    this.currentLoc.x = this.targetLoc.x;
    this.currentLoc.y = this.targetLoc.y;
  };

  this.setTargetLocation = function (x, y, instamove) {
    if (this.finishedMoving()) {
      this.targetLoc = createVector(x, y);
      this.velocity = p5.Vector.sub(this.targetLoc, this.currentLoc);
      this.velocity.normalize();
      this.velocity.mult(7);
      if (instamove === true) {
        this.instamove();
      }
    }
  };
}
