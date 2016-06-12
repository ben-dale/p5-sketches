function Cell(x, y, size, state) {
  this.x = x;
  this.y = y;
  this.size = size;
  this.state = state;

  this.draw = function (solved) {
    var stateValue;
    if (solved) {
      stateValue = floor(random(3));
    } else {
      stateValue = this.state;
    }

    switch (stateValue) {
      case 0: fill(67, 127, 112); break; // empty
      case 1: fill(134, 255, 255); break; // active
      case 2: fill(34, 64, 56); break; // blocking
    }

    noStroke();
    rect(this.x, this.y, this.size, this.size);
  };
}
