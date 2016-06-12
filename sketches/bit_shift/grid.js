function Grid(x, y, w, h, cellSize) {
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.cellSize = cellSize;
  this.cellData = [];

  this.draw = function (solved) {
    if (this.cellData.length > 0) {
      for (var x = 0; x < this.h; x++) {
        for (var y = 0; y < this.w; y++) {
          this.cellData[x][y].draw(solved);
        }
      }
    }
  };

  this.moveUp = function (stats) {
    var hasMoved = false;
    for (var x = 0; x < this.h; x++) {
      for (var y = 0; y < this.w; y++) {
        var currentCell = this.cellData[x][y];
        if (currentCell.state === 1 && y > 0) {
          var cellAbove = this.cellData[x][y - 1];
          if (cellAbove.state === 0) {
            hasMoved = true;
            currentCell.state = 0;
            cellAbove.state = 1;
          }
        }
      }
    }

    if (hasMoved && stats) stats.increaseMoveCount();
  };

  this.moveDown = function (stats) {
    var hasMoved = false;
    for (var x = this.h - 1; x >= 0; x--) {
      for (var y = this.w - 1; y >= 0; y--) {
        var currentCell = this.cellData[x][y];
        if (currentCell.state === 1 && y < this.h - 1) {
          var cellBelow = this.cellData[x][y + 1];
          if (cellBelow.state === 0) {
            hasMoved = true;
            currentCell.state = 0;
            cellBelow.state = 1;
          }
        }
      }
    }

    if (hasMoved && stats) stats.increaseMoveCount();
  };

  this.moveLeft = function (stats) {
    var hasMoved = false;
    for (var x = 0; x < this.h; x++) {
      for (var y = 0; y < this.w; y++) {
        var currentCell = this.cellData[x][y];
        if (currentCell.state === 1 && x > 0) {
          var cellToLeft = this.cellData[x - 1][y];
          if (cellToLeft.state === 0) {
            hasMoved = true;
            currentCell.state = 0;
            cellToLeft.state = 1;
          }
        }
      }
    }

    if (hasMoved && stats) stats.increaseMoveCount();
  };

  this.moveRight = function (stats) {
    var hasMoved = false;
    for (var x = this.h - 1; x >= 0; x--) {
      for (var y = this.w - 1; y >= 0; y--) {
        var currentCell = this.cellData[x][y];
        if (currentCell.state === 1 && x < this.w - 1) {
          var cellToRight = this.cellData[x + 1][y];
          if (cellToRight.state === 0) {
            hasMoved = true;
            currentCell.state = 0;
            cellToRight.state = 1;
          }
        }
      }
    }

    if (hasMoved && stats) stats.increaseMoveCount();
  };

  this.loadBits = function (bits) {
    this.cellData = [];
    var i = 0;
    for (var x = 0; x < this.h; x++) {
      var row = [];
      for (var y = 0; y < this.w; y++) {
        var xLocation = this.x + (x * this.cellSize);
        var yLocation = this.y + (y * this.cellSize);
        row.push(new Cell(xLocation, yLocation, this.cellSize, bits[i]));
        i++;
      }

      this.cellData.push(row);
    }
  };

  this.getBits = function () {
    var bits = [];
    for (var x = 0; x < this.h; x++) {
      for (var y = 0; y < this.w; y++) {
        bits.push(this.cellData[x][y].state);
      }
    }

    return bits;
  };
}
