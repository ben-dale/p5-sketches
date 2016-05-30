function NonogramSolution(grid) {
	
	this.grid = grid;
	this.fitness = 0;

	this.init = function(rows, columns) {
		var g = new Grid(rows, columns);
		g.init();
		this.grid = g;
	};

	this.mutate = function() {
		this.grid.mutate();
	};

	this.draw = function(x, y) {
		this.grid.draw(x, y);
	};

	// Here we compare the rules from the goal grid against
	// the rules that are generated from this particular solution
	// rowRules and columnRules are 2D arrays
	this.calculateFitness = function(goalRowRules, goalColumnRules) {
		var score = 0;
		score += this.calculateColumnFitness(goalColumnRules);
		score += this.calculateRowFitness(goalRowRules);
		this.fitness = score;
	};

	this.calculateRowFitness = function(goalRowRules) {
		return this.calculateFitnessFor(goalRowRules, this.grid.getAllRowRules());
	};

	this.calculateColumnFitness = function(goalColumnRules) {
		return this.calculateFitnessFor(goalColumnRules, this.grid.getAllColumnRules());
	};

	this.calculateFitnessFor = function(allGoalRules, allSolutionRules) {
		var score = 0;
		for (var i = 0; i < allGoalRules.length; i++) {
			var goalRules = allGoalRules[i];
			var solutionRules = allSolutionRules[i];

			if (goalRules.length == solutionRules.length) {
				// Same size, compare directly against each other
				score += this.calculateDifferenceBetween(goalRules, solutionRules);
			} else if (goalRules.length > solutionRules.length) {
				// Not enough entries, pad the row with 0 values and compare
				for(var j = 0; j < goalRules.length - solutionRules.length; j++) {
					solutionRules.push(0);
				}
				score += this.calculateDifferenceBetween(goalRules, solutionRules);
			} else {
				var strippedRules = solutionRules.slice(goalRules.length - 1, solutionRules.length - 1);
				for (var j = 0; j < strippedRules.length; j++) {
					score += strippedRules[j];
				}
				score += this.calculateDifferenceBetween(goalRules, solutionRules.slice(0, goalRules.length));
			}
		}
		return score;
	};

	// Calculates the difference in all values between two arrays of integers
	// E.g. [1, 0] and [2, 4] have a difference of 5 ((2 - 1) + (4 - 0))
	this.calculateDifferenceBetween = function(goalRules, solutionRules) {
		var score = 0;
		for(var i = 0; i < solutionRules.length; i++) {
			var difference = goalRules[i] - solutionRules[i];
			if (difference <= -1) difference *= -1
			score += difference;
		}
		return score;
	};

}