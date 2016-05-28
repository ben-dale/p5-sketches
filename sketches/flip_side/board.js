function Board(x, y, w, h) {
	this.loc = createVector(x, y);
	
	this.topRow = [];
	this.bottomRow = [];

	this.selectedRow = 0;
	this.pieceSize = 105;

	this.w = this.pieceSize * 7;
	this.h = this.pieceSize * 2;

	this.init = function() {
		this.topRow = this.createRow(0, this.loc.x, this.loc.y);
		this.bottomRow = this.createRow(5, this.loc.x, this.loc.y + this.pieceSize);
		this.scramble();
	};

	this.createRow = function(valueOffset, x, y) {
		let currentX = x;
		let currentNum = 0;
		let row = [];

		for (var i = 0; i < 7; i++) {
			if (i <= 1) {
				row.push(new Piece(currentX, y, this.pieceSize, -1));
			} else {
				row.push(new Piece(currentX, y, this.pieceSize, currentNum + valueOffset));
				currentNum++;
			}
			currentX += this.pieceSize;
		}

		return row;
	};

	this.update = function() {
		for (var i = 0; i < this.topRow.length; i++) {
			this.topRow[i].move();
			this.bottomRow[i].move();
		}
	};

	this.draw = function() {
		fill(255);
		stroke(60);
		strokeWeight(1);
		rect(this.loc.x, this.loc.y, this.w, this.h);

		// Draw pieces
		for (let i = 0; i < this.topRow.length; i++) {
			this.topRow[i].draw(this.isSolved());
			this.bottomRow[i].draw(this.isSolved());
		}

		// Draw highlight around selected row
		noFill();
		stroke(60);
		strokeWeight(3);
		if (this.selectedRow === 0) {
			rect(this.loc.x, this.loc.y, this.pieceSize * 7, this.pieceSize);
		} else {
			rect(this.loc.x, this.loc.y + this.pieceSize, this.pieceSize * 7, this.pieceSize);
		}

		// Draw middle box around flip-able pieces
		noStroke();
		fill(38, 50, 72, 42);
		rect(this.loc.x + (this.pieceSize * 2), this.loc.y, this.pieceSize * 3, this.pieceSize * 2);
	};

	this.scramble = function() {
		for (let i = 0; i < 50; i++) {
			switch(floor(random(2))) {
				case 0: this.moveLeft(true); break;
				case 1: this.moveRight(true); break;
			}

			this.flip(true);

			switch(floor(random(2))) {
				case 0: this.moveUp(); break;
				case 1: this.moveDown(); break;
			}
		}
	};	

	this.move = function(kc) {
		switch(kc) {
			case DOWN_ARROW: this.moveDown(); break;
			case UP_ARROW: this.moveUp(); break;
			case LEFT_ARROW:  if (!this.isMoving()) { this.moveLeft(false); } break;
			case RIGHT_ARROW: if (!this.isMoving()) { this.moveRight(false); } break;
			case 32: if (!this.isMoving()) { this.flip(false); } break;
			case 83: if (!this.isMoving()) { this.scramble(); } break;
		}
	};

	this.moveUp = function() {
		this.selectedRow = 0;
	};

	this.moveDown = function() {
		this.selectedRow = 1;
	};

	this.moveLeft = function(instamove) {
		if (this.selectedRow === 0 && this.topRow[0].value === -1) {
			let buffer = this.topRow.shift();
			this.topRow.push(buffer);
			this.calculateXTargetLocations(this.topRow, instamove);
		} else if (this.selectedRow === 1 && this.bottomRow[0].value === -1) {
			let buffer = this.bottomRow.shift();
			this.bottomRow.push(buffer);
			this.calculateXTargetLocations(this.bottomRow, instamove);
		}
	};

	this.moveRight = function(instamove) {
		if (this.selectedRow === 0 && this.topRow[this.topRow.length-1].value === -1) {
			let buffer = this.topRow.pop();
			this.topRow.unshift(buffer);
			this.calculateXTargetLocations(this.topRow, instamove);
		} else if (this.selectedRow === 1 && this.bottomRow[this.bottomRow.length-1].value === -1) {
			let buffer = this.bottomRow.pop();
			this.bottomRow.unshift(buffer);
			this.calculateXTargetLocations(this.bottomRow, instamove);
		}
	};

	this.flip = function(instamove) {
		// Get the y co-ord for the top and bottom rows
		var topRowY = this.topRow[2].currentLoc.y;
		var bottomRowY = this.bottomRow[2].currentLoc.y;

		// Set up the target locations
		for (let i = 2; i < 5; i++) {
			this.topRow[i].setTargetLocation(this.topRow[i].currentLoc.x, bottomRowY, instamove);
			this.bottomRow[i].setTargetLocation(this.bottomRow[i].currentLoc.x, topRowY, instamove);
		}		

		let topRowBuffer = [];
		for (let i = 0; i < this.topRow.length; i++) {
			topRowBuffer.push(this.topRow[i]);
		}

		for (let i = 2; i < 5; i++) {
			this.topRow[i] = this.bottomRow[i];
			this.bottomRow[i] = topRowBuffer[i];
		}
	};

	// Do something better with this
	this.calculateXTargetLocations = function(row, instamove) {
		let currentX = this.loc.x;
		for (var i = 0; i < row.length; i++) {
			row[i].setTargetLocation(currentX, row[i].currentLoc.y, instamove);
			currentX += this.pieceSize;
			if (row[i].value == -1 || instamove === true) {
				row[i].instamove();
			}
		}
	};

	this.isMoving = function() {
		for (let i = 0; i < this.topRow.length; i++) {
			if (!this.topRow[i].finishedMoving() || !this.bottomRow[i].finishedMoving()) {
				return true;
			}
		}
		return false;
	};

	this.isSolved = function() {
		let current = 0;
		
		for (let i = 0; i < this.topRow.length; i++) {
			if (this.topRow[i].value !== -1) {
				if (this.topRow[i].value !== current) {
					return false;
				} else {
					current++;
				}
			}
		}

		for (let i = 0; i < this.bottomRow.length; i++) {
			if (this.bottomRow[i].value !== -1) {
				if (this.bottomRow[i].value !== current) {
					return false;
				} else {
					current++;
				}
			}
		}

		return true;
	};
}