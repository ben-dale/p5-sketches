function GA(points) {

	this.generation = 0;
	this.solutions = []

	this.init = function() {
		for(var i = 0; i < 40; i++) {
			this.solutions.push(new Solution(shuffle(points.slice(0))));
		}
		this.calculateFitnessScores();
	};

	this.evolve = function() {
		var newSolutions = [];
		for(var i = 0; i < this.solutions.length; i++) {
			if(i == 0) {
				newSolutions.push(this.getBestSolution());
			} else {
				var parentA = this.rouletteWheelSelection();
				var parentB = this.rouletteWheelSelection();
				var child = this.crossover(parentA, parentB);
				if(!containsDuplicates(child.points)) {
					child.mutate();
					newSolutions.push(child);
				} else {
					// Try again, the child has duplicates
					i--;
				}
			}
		}

		this.solutions = shuffle(newSolutions.slice(0));
		this.calculateFitnessScores();
		this.generation++;
	};

	this.rouletteWheelSelection = function() {
		var totalFitnessScore = 0;
		for(var i = 0; i < this.solutions.length; i++) {
			totalFitnessScore += this.solutions[i].fitness;
		}

		var scoresAsWheelDivisions = [];
		var totalScore = 0;
		for(var i = 0; i < this.solutions.length; i++) {
			var score = floor(totalFitnessScore / this.solutions[i].fitness);
			scoresAsWheelDivisions.push(score);
			totalScore += score;
		}

		var randomOffset = floor(random(0, totalScore));
		var scoreCounter = 0;
		for(var i = 0; i < scoresAsWheelDivisions.length; i++) {
			scoreCounter += scoresAsWheelDivisions[i];
			if(scoreCounter >= randomOffset) {
				return this.solutions[i];
			}
		}
	};

	this.crossover = function(a, b) {
		var childsPoints = [];
		var parentAPoints = a.points;
		var parentBPoints = b.points;

		var current = (floor(random(2)) == 0) ? parentAPoints : parentBPoints;
		var buffer;
		for(var i = 0; i < parentAPoints.length; i++) {
			if (i == 0) {
				childsPoints.push(current[0]);
				buffer = current[0];
			} else {
				var adjElements = getAdjacentElements(current, current.indexOf(buffer));
				var elementToPushIndex = floor(random(2));
				var otherElementIndex = (elementToPushIndex == 0) ? 1 : 0;

				var elementToPush = adjElements[elementToPushIndex];
				var alreadyIn = childsPoints.indexOf(elementToPush);

				if (alreadyIn > 0) elementToPush = adjElements[otherElementIndex];

				childsPoints.push(elementToPush);
				buffer = elementToPush;
			}

			current = (current == parentAPoints) ? parentBPoints : parentAPoints;
		}

		return new Solution(childsPoints);
	};

	this.calculateFitnessScores = function() {
		for(var i = 0; i < this.solutions.length; i++) {
			this.solutions[i].calculateFitness();
		}
	};

	this.drawBestSolution = function() {
		this.getBestSolution().drawSolution();
	};

	this.drawFinishedSolution = function() {
		this.getBestSolution().drawFinishedSolution();
	}

	this.getBestSolution = function() {
		var solutionsSortedOnFitness = this.solutions.sort(function(a, b) { return a.fitness - b.fitness });
		return solutionsSortedOnFitness[0];
	};
}