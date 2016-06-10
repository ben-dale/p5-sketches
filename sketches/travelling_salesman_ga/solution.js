function Solution(points) {
  this.points = points;
  this.fitness = 0;

  this.drawSolution = function () {
    this.draw(color(114, 157, 198));
  };

  this.drawFinishedSolution = function () {
    this.draw(color(255));
  };

  this.draw = function (color) {
    for (var i = 0; i < this.points.length; i++) {
      var current = this.points[i];
      var next;

      if (i == this.points.length - 1) {
        next = this.points[0];
      } else {
        next = this.points[i + 1];
      }

      stroke(color);
      strokeWeight(1.5);
      line(current.x, current.y, next.x, next.y);

      fill(color);
      noStroke();
      ellipse(current.x, current.y, 12, 12);
    }
  };

  this.calculateFitness = function () {
    var totalDistance = 0;
    for (var i = 0; i < this.points.length; i++) {
      var current = this.points[i];
      var next;

      if (i == this.points.length - 1) {
        next = this.points[0];
      } else {
        next = this.points[i + 1];
      }

      totalDistance += dist(current.x, current.y, next.x, next.y);
    }

    this.fitness = totalDistance;
  };

  this.mutate = function () {
    if (floor(random(0, 100)) <= 60) {
      swapArrayElements(this.points,
        floor(random(this.points.length)),
        floor(random(this.points.length)));
    }
  };
}
