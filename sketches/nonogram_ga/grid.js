function Grid(rows, columns) {

	this.rows = rows;
	this.columns = columns;
	this.grid = [];
	this.squareSize = 40;

	this.init = function() {
		for(var i = 0; i < this.rows * this.columns; i++) {
			if (random(1) <= 0.6) {
				this.grid.push(1);
			} else {
				this.grid.push(0);
			}
			
		}
	};

	this.shuffle = function() {
		this.grid = shuffle(this.grid.slice(0));
	};

	this.drawRules = function(x, y) {
		var currentX = x - this.squareSize / 3;
		var currentY = y - this.squareSize / 10;
		
		noStroke();
		fill(0);
		textSize(this.squareSize/2.5);

		// Draw row rules along the side
		for (var i = 0; i < this.rows; i++) {
			var rules = this.getRowRules(i);

			for (var j = rules.length - 1; j >= 0; j--) {
				text(rules[j], currentX, currentY);
				currentX -= this.squareSize / 2;
			}

			currentX = x - this.squareSize / 3;
			currentY += this.squareSize;
		}

		// Draw column rules along the top
		currentX = x + this.squareSize - 4;
		currentY = y - this.squareSize * 1.2;
		for (var i = 0; i < this.columns; i++) {
			var rules = this.getColumnRules(i);

			for (var j = rules.length - 1; j >= 0; j--) {
				text(rules[j], currentX, currentY);
				currentY -= this.squareSize/1.5;
			}

			currentY = y - this.squareSize * 1.2;
			currentX += this.squareSize;
		}
	};

	this.draw = function(x, y) {
		var currentX = x;
		var currentY = y;
		var padding = 10;

		for(var i = 0; i < this.grid.length; i++) {
			if (i != 0 && i % this.columns === 0) {
				currentY += this.squareSize;
				currentX = x;
			}

			if (this.grid[i] === 0) {
				this.drawX(currentX, currentY, this.squareSize - padding);
			} else {
				this.drawFilled(currentX, currentY, this.squareSize - padding);
			}

			currentX += this.squareSize;
		}
	}

	this.drawFilled = function(x, y, s) {
		fill(0);
		noStroke();
		rect(x, y, s, s);
	};

	this.drawX = function(x, y, s) {
		stroke(200, 0, 0);
		strokeWeight(2);
		line(x, y, x + s, y + s)
		line(x + s, y, x, y + s)
	};

	this.getRow = function(index) {
		return this.grid.slice(index * this.columns, index * this.columns + this.columns);
	};

	this.getColumn = function(index) {
		var buffer = [];
		for(var i = 0; i < this.rows; i++) {
			buffer.push(this.getRow(i)[index])
		}
		return buffer;
	};

	this.getRowRules = function(index) {
		return this.getRules(this.getRow(index));
	};

	this.getColumnRules = function(index) {
		return this.getRules(this.getColumn(index));
	};

	this.getAllRowRules = function() {
		var buffer = [];
		for (var i = 0; i < this.rows; i++) {
			buffer.push(this.getRowRules(i));
		}
		return buffer;
	};

	this.getAllColumnRules = function() {
		var buffer = [];
		for (var i = 0; i < this.columns; i++) {
			buffer.push(this.getColumnRules(i));
		}
		return buffer;
	};

	this.getRules = function(columnOrRow) {
		var rules = [];
		var count = 0;
		for(var i = 0; i < columnOrRow.length; i++) {
			if (columnOrRow[i] === 1) {
				count++;
			} else {
				rules.push(count);
				count = 0;
			}
			if (i === columnOrRow.length - 1) {
				rules.push(count)
			}
		}
		return this.removeZeroValuesFrom(rules);	
	};

	this.removeZeroValuesFrom = function(array) {
		var buffer = [];
		for (var i = 0; i < array.length; i++) {
			if (array[i] !== 0) {
				buffer.push(array[i]);
			}
		}
		return buffer;
	};

	this.clone = function() {
		var g = new Grid(this.rows, this.columns);
		g.grid = this.grid.slice(0);
		return g;
	};

	this.mutate = function() {
		for (var i = 0; i < this.grid.length; i++) {
			if (random(1) <= 0.2) {
				this.grid[i] = floor(random(2));
			}
		}
	};
}