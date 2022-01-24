const DEBUG = false;

let lines = new Array();

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  normalize() {
    let length = this.length();
    this.x = this.x / length;
    this.y = this.y / length;
  }

  scale(factor) {
    this.x = this.x * factor;
    this.y = this.y * factor;
  }
}

class Line {
  constructor(point, length) {
    this.point = point;
    this.length = length;
  }

  draw(mousePoint) {
    let distance = this._distanceBetweenPointAndPoint(mousePoint);
    let weight = this._mapValueInRangeToRange(distance, 0, 600, 1, 12);

    colorMode(HSB, 255);
    let hue = this._mapValueInRangeToRange(distance, 0, 800, 140, 200);
    stroke(hue, 180, 255);
    strokeCap(SQUARE);
    strokeWeight(weight);

    let pointMouseVector = new Point(mousePoint.x - this.point.x, mousePoint.y - this.point.y);
    pointMouseVector.normalize();

    let pointMouseVectorNormal1 = new Point(-pointMouseVector.y, pointMouseVector.x);
    let pointMouseVectorNormal2 = new Point(pointMouseVector.y, -pointMouseVector.x);

    const halfLength = this.length / 2.0;

    // line(
    //   this.point.x - halfLength,
    //   this.point.y,
    //   this.point.x + halfLength,
    //   this.point.y);
    line(
      this.point.x + pointMouseVectorNormal1.x * halfLength,
      this.point.y + pointMouseVectorNormal1.y * halfLength,
      this.point.x + pointMouseVectorNormal2.x * halfLength,
      this.point.y + pointMouseVectorNormal2.y * halfLength);

    if (DEBUG) {
      let pointMouseVectorNormal1 = new Point(-pointMouseVector.y, pointMouseVector.x);
      let pointMouseVectorNormal2 = new Point(pointMouseVector.y, -pointMouseVector.x);

      strokeWeight(1);

      stroke('red');
      line(
        this.point.x,
        this.point.y,
        this.point.x + pointMouseVector.x * halfLength,
        this.point.y + pointMouseVector.y * halfLength);

      stroke('blue');
      line(
        this.point.x,
        this.point.y,
        this.point.x + pointMouseVectorNormal1.x * halfLength,
        this.point.y + pointMouseVectorNormal1.y * halfLength);

      stroke('orange');
      line(
        this.point.x,
        this.point.y,
        this.point.x + pointMouseVectorNormal2.x * halfLength,
        this.point.y + pointMouseVectorNormal2.y * halfLength);
    }
  }

  /// Compute the Euclidean distance between @c this.point and the argument.
  /// @see https://en.wikipedia.org/wiki/Euclidean_distance
  _distanceBetweenPointAndPoint(point) {
    return Math.sqrt(Math.pow(this.point.x - point.x, 2) + Math.pow(this.point.y - point.y, 2));
  }

  /// Map an input value in an input range to a value in the output range.
  /// @see https://stackoverflow.com/questions/5731863/mapping-a-numeric-range-onto-another
  _mapValueInRangeToRange(input, inputStart, inputEnd, outputStart, outputEnd) {
    return outputStart + ((outputEnd - outputStart) / (inputEnd - inputStart)) * (input - inputStart);
  }
}

function createLines() {
  for (let x = 8; x < 800; x += 24) {
    for (let y = 8; y < 600; y += 24) {
      lines.push(new Line(new Point(x, y), 16));
    }
  }
}

function setup() {
  createLines();
  createCanvas(800, 600);
}

function draw() {
    background(240);
    let mousePoint = new Point(mouseX, mouseY);
    for (let l of lines) {
      l.draw(mousePoint);
    }
}
