var goalGrid;
var geneticAlgorithm;

var fitnessNotChangedCount;
var now;
var then;
var finished;
var bestSolution;
var solved;
var lastTimeFitnessChanged;
var timesReset;
var massMutationCount;

function setup() {
  var canvas = createCanvas(600, 600);
  canvas.parent('canvas');
  smooth();
  drawBackground();
  init();
}

function draw() {
  drawBackground();

  if (!finished) {
    if (fitnessNotChangedCount >= 200) {
      // Mass mutation on gene pool when stuck
      geneticAlgorithm.performMassMutation();
      massMutationCount++;
      fitnessNotChangedCount = 0;
    }

    if (massMutationCount >= 5) {
      // GA is really stuck, restart it
      geneticAlgorithm.reset();
      timesReset++;
      massMutationCount = 0;
    }

    if (timesReset >= 3) {
      solved = false;
      finished = true;
    } else {
      // Evolve and get the best solution
      geneticAlgorithm.evolve();
      bestSolution = geneticAlgorithm.getBestSolution();

      if (bestSolution.fitness === bestSolution.fitness) {
        fitnessNotChangedCount++;
      }

      if (bestSolution.fitness === 0) {
        finished = true;
        solved = true;
      }

      if (geneticAlgorithm.converged()) {
        finished = true;
        solved = false;
      }
    }

  } else if (now === 0 && then === 0) {
    // Finished solving, start the countdown timer
    now = floor(millis() / 1000);
    then = now + 5;
  } else {
    if (solved) {
      strokeWeight(2);
      fill(0, 200, 0);
      textSize(20);
      noStroke();
      text('SOLVED', 25, this.height - 100);
    } else {
      strokeWeight(2);
      fill(200, 0, 0);
      textSize(20);
      noStroke();
      text('FAILED', 25, this.height - 100);
    }

    if (now >= then) {
      // Start next solution
      init();
    } else {
      // Tick down the countdown timer
      now = floor(millis() / 1000);
      noStroke();
      fill(0);
      textSize(15);
      text('Starting next Nonogram in ' + (then - now), 25, this.height - 75);
    }
  }

  var gridx = ((((this.width / goalGrid.squareSize) - goalGrid.columns) / 2) * goalGrid.squareSize);
  var gridy = 170;

  goalGrid.drawRules(gridx, gridy);
  bestSolution.draw(gridx + 25, gridy - 25);
  drawStats(bestSolution, 25, this.height - 50);
}

function init() {
  now = 0;
  then = 0;
  lastTimeFitnessChanged = 0;
  fitnessNotChangedCount = 0;
  timesReset = 0;
  massMutationCount = 0;

  // Setup a goal grid. This is used simply to generate some random
  // row and column rules for the GA each check solution against.
  goalGrid = new Grid(floor(random(4, 8)), floor(random(4, 8)));
  goalGrid.init();

  // Note that the solution grid is never seen by the genetic algorithm.
  // Only the solution grid's rules are passed in so that each
  // nonogram solution can be scored.

  // Setup the genetic algorithm
  geneticAlgorithm = new GeneticAlgorithm(50);
  geneticAlgorithm.init(goalGrid.rows, goalGrid.columns,
    goalGrid.getAllRowRules(), goalGrid.getAllColumnRules());

  finished = false;
  solved = false;
}

function drawBackground() {
  fill(255);
  rect(-1, -1, this.width + 1, this.height + 1);
  noFill();
  stroke(100);
  strokeWeight(12);
  rect(-1, -1, this.width + 1, this.height + 1);
}

function drawStats(bestSolution, x, y) {
  noStroke();
  textSize(15);
  fill(0);
  text('Generation: ' + geneticAlgorithm.generation, x, y);
  text('Mistakes: ' + bestSolution.fitness, x, y + 25);
}
