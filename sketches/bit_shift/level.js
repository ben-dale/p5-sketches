// Have different size levels by changing the grid size?
// Dynamic sizing of grids and cells?

function Level() {
  this.whenToReset = millis();

  // Stores the possible sizes for different sized grids.
  // [numberOfCells, goalCellSize, playerCellSize]
  this.sizes = [[4, 50, 100], [5, 40, 80], [6, 33, 66], [8, 25, 50]];

  this.playerGrid = new Grid(20, 20, this.sizes[0][0], this.sizes[0][0], this.sizes[0][2]);
  this.goalGrid = new Grid(440, 20, this.sizes[0][0], this.sizes[0][0], this.sizes[0][1]);
  this.stats =  new Stats(440, 240);

  this.startBits = [];
  this.goalBits = [];

  this.init = function () {
    this.generate();
  };

  this.draw = function () {
    var solved = this.isSolved();
    this.playerGrid.draw(solved);
    this.goalGrid.draw(solved);
    this.stats.draw();
  };

  this.update = function () {
    if (this.isSolved() && this.whenToReset < millis()) {
      this.generate();
    }
  };

  this.move = function (kc) {
    if (!this.isSolved() && this.startBits && this.goalBits) {
      switch (kc) {
        case 37: this.playerGrid.moveLeft(this.stats); break;
        case 38: this.playerGrid.moveUp(this.stats); break;
        case 39: this.playerGrid.moveRight(this.stats); break;
        case 40: this.playerGrid.moveDown(this.stats); break;
        case 82: this.restart(this.stats); break;
      }
    }

    if (this.isSolved()) {
      this.whenToReset = millis() + 1000;
      this.stats.moveCount = 0;
    }
  };

  this.generate = function () {
    var sizeIndex;
    if (this.stats.level < 10) {
      sizeIndex = 0;
    } else if (this.stats.level < 20) {
      sizeIndex = 1;
    } else if (this.stats.level < 30) {
      sizeIndex = 2;
    } else {
      sizeIndex = 3;
    }

    this.playerGrid = new Grid(20, 20, this.sizes[sizeIndex][0],
      this.sizes[sizeIndex][0], this.sizes[sizeIndex][2]);

    this.goalGrid = new Grid(440, 20, this.sizes[sizeIndex][0],
      this.sizes[sizeIndex][0], this.sizes[sizeIndex][1]);

    this.stats.moveCount = 0;
    this.stats.increaseLevelCount();

    this.startBits = [];
    for (var i = 0; i < this.playerGrid.w * this.playerGrid.h; i++) {
      this.startBits.push(floor(random(3)));
    }

    this.goalBits = this.startBits.slice();
    this.playerGrid.loadBits(this.startBits);
    this.goalGrid.loadBits(this.goalBits);

    // Here we scramble the goal grid.
    // This is so that it is N random moves ahead of the player's grid.
    this.scramble();
    this.goalBits = this.goalGrid.getBits();
  };

  this.scramble = function () {
    while (this.goalGrid.getBits().toString() === this.startBits.toString()) {
      var steps = floor(random(40, 60));
      for (var i = 0; i < steps; i++) {
        switch (floor(random(4))) {
          case 0: this.goalGrid.moveUp(); break;
          case 1: this.goalGrid.moveDown(); break;
          case 2: this.goalGrid.moveLeft(); break;
          case 3: this.goalGrid.moveRight(); break;
        }
      }
    }
  };

  this.restart = function () {
    this.stats.moveCount = 0;
    this.playerGrid.loadBits(this.startBits);
  };

  this.isSolved = function () {
    var currentPlayerBits = this.playerGrid.getBits();
    for (var i = 0; i < currentPlayerBits.length; i++) {
      if (currentPlayerBits[i] !== this.goalBits[i]) {
        return false;
      }
    }

    return true;
  };

}
