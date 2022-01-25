const DEBUG = false;

let lines = new Array();

class Line {
  constructor(point, length) {
    this.point = point;
    this.length = length;
  }

  draw(mousePoint) {
    let distance = this.point.distanceTo(mousePoint);
    let weight = 1; //mapValueInRangeToRange(distance, 0, 600, 1, this.length, Clamp.Yes);

    colorMode(HSB, 255);
    let hue = mapValueInRangeToRange(distance, 0, 800, 140, 200, Clamp.Yes);
    stroke(hue, 180, 255);
    strokeCap(SQUARE);
    strokeWeight(weight);

    let pointMouseVector = new Point(mousePoint.x - this.point.x, mousePoint.y - this.point.y);
    pointMouseVector.normalize();

    let pointMouseVectorNormal1 = new Point(-pointMouseVector.y, pointMouseVector.x);
    let pointMouseVectorNormal2 = new Point(pointMouseVector.y, -pointMouseVector.x);

    const halfLength = this.length / 2.0;

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
