class Arc {
  constructor(radius, length, speed, weight) {
    this.size = radius * 2.0;
    this.length = length;
    this.speed = speed / (length * weight);
    this.weight = weight;
    this.offset = Math.random() * TWO_PI;
  }

  draw() {
    stroke('rgba(20%, 50%, 100%, 0.7)');
    strokeWeight(this.weight);
    noFill();
    arc(200, 200, this.size, this.size, this.offset, this.offset + this.length);
  }

  tick() {
    this.offset += this.speed;
    if (this.offset > TWO_PI) {
      this.offset = this.offset - TWO_PI;
    } else if (this.offset < 0) {
      this.offset = TWO_PI + this.offset;
    }
  }
}

let arcsToDraw = [];

function createArcs() {
  console.log("Creating Arcs");

  const maximumLenth = PI / 3;
  const minimumLength = PI / 6;
  const minimumSpeed = 0.02;
  const maximumSpeed = 0.08;
  const maximumWeight = 12;
  const minimumWeight = 8;

  arcsToDraw = new Array();
  let radius = 25;
  while (arcsToDraw.length < 20) {
    let length = Math.random() * (maximumLenth - minimumLength) + minimumLength;
    let speed = (Math.random() > 0.9 ? 1 : -1) * (Math.random() * (maximumSpeed - minimumSpeed) + minimumSpeed);
    let weight = Math.random() * (maximumWeight - minimumWeight) + minimumWeight;
    arcsToDraw.push(new Arc(radius, length, speed, weight));
    radius += 7;
  }
}

function mouseClicked() {
  createArcs();
}

function setup() {
  createArcs();
  createCanvas(400, 400);
}


function draw() {
  background(240);
  for (let a of arcsToDraw) {
    a.draw();
    a.tick();
  }
}