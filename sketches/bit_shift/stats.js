function Stats(x, y) {
  this.x = x;
  this.y = y;
  this.moveCount = 0;
  this.maxInt = 10000;
  this.level = 0;

  this.draw = function () {
    fill(255);
    noStroke();
    textSize(20);
    textFont('monospace');

    text('^^^ TARGET ^^^', this.x + 16, this.y + 15);
    text('-----------------', this.x - 2, this.y + 45);
    text('LEVEL: ' + this.level, this.x + 45, this.y + 100);
    text('MOVES: ' + this.moveCount, this.x + 45, this.y + 130);
  };

  this.increaseMoveCount = function () {
    if (this.moveCount < this.maxInt) {
      this.moveCount++;
    }
  };

  this.increaseLevelCount = function () {
    if (this.level < this.maxInt) {
      this.level++;
    }
  };

  this.hasMovesLeft = function () {
    return this.moveCount < this.maxInt;
  };
}
