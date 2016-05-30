function GeneticAlgorithm(poolSize) {

	this.poolSize = poolSize;
	this.solutions = [];
	this.generation = 0;

	// Keep track of the row and column count
	// and the problems rules
	this.rows;
	this.columns;
	this.rowRules;
	this.columnRules;

	this.init = function(rows, columns, rowRules, columnRules) {
		this.rows = rows;
		this.columns = columns;
		this.rowRules = rowRules;
		this.columnRules = columnRules;

		for (var i = 0; i < poolSize; i++) {
			var solution = new NonogramSolution();
			solution.init(rows, columns);
			this.solutions.push(solution);
		}
		this.calculateFitnessScores(rowRules, columnRules);
	};

	// Called when the GA is stuck. This may help the GA get unstuck by mass 
	// mutating all solutions apart from the fittest 
	this.performMassMutation = function() {
		for (var i = 0; i < this.solutions.length; i++) {
			if (this.getBestSolution() !== this.solutions[i]) {
				this.solutions[i].grid.shuffle();
			}
		}
	}

	// Called when the GA seriously stuck
	this.reset = function() {
		var newSolutions = [];
		for (var i = 0; i < poolSize; i++) {
			var solution = new NonogramSolution();
			solution.init(this.rows, this.columns);
			newSolutions.push(solution);
		}
		this.solutions = newSolutions;
		this.calculateFitnessScores(this.rowRules, this.columnRules);
	};

	this.converged = function() {
		var fitness = this.solutions[0].fitness;
		for (var i = 0; i < this.solutions.length; i++) {
			if (this.solutions[i].fitness !== fitness) {
				return false;
			}
		}
		return true;
	};

	this.evolve = function() {
		// Copy over best solution
		var newSolutions = [];
		for(var i = 0; i < this.solutions.length; i++) {
			if (i === 0) {
				newSolutions.push(this.getBestSolution());
			} else {
				var parentA = this.tourSelect();
				var parentB = this.tourSelect();
				var child = this.crossover(parentA, parentB);child.mutate();
				newSolutions.push(child);
			}
		}

		this.solutions = shuffle(newSolutions.slice(0));
		this.calculateFitnessScores();
		this.generation++;
	};

	this.tourSelect = function() {
		var tournament = shuffle(this.solutions).slice(0, 5);
		var sorted = this.solutions.sort(function(a, b) { return a.fitness - b.fitness });
		return sorted[0];
	};

	this.crossover = function(parentA, parentB) {
		var grid = [];
		var gridA = parentA.grid.clone();
		var gridB = parentB.grid.clone();
		
		for (var i = 0; i < gridA.grid.length; i++) {
			if (random(1) <= 0.5) {
				grid.push(gridA.grid[i]);
			} else {
				grid.push(gridB.grid[i]);
			}
		}

		var newGrid = new Grid(gridA.rows, gridB.columns);
		newGrid.grid = grid;

		return new NonogramSolution(newGrid);
	};

	this.calculateFitnessScores = function() {
		for (var i = 0; i < this.solutions.length; i++) {
			this.solutions[i].calculateFitness(this.rowRules, this.columnRules);
		}
	};

	this.getBestSolution = function() {
		var solutionsSortedOnFitness = this.solutions.sort(function(a, b) { return a.fitness - b.fitness });
		return solutionsSortedOnFitness[0];
	};
}