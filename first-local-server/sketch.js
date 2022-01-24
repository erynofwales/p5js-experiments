class Arc {
  constructor(radius, length, speed, weight) {
    this.size = radius * 2.0;
    this.length = length;
    this.speed = speed / weight;
    this.weight = weight;
    this.offset = Math.random() * TWO_PI;
  }

  draw() {
    stroke('rgba(20%, 50%, 100%, 0.7)');
    strokeWeight(this.weight);
    noFill();
    arc(200, 200, this.size, this.size, this.offset, this.offset + QUARTER_PI);
  }

  tick() {
    this.offset += this.speed;
    if (this.offset > TWO_PI) {
      this.offset = this.offset - TWO_PI;
    }
  }
}

let arcsToDraw = [];

function createArcs() {
  console.log("Creating Arcs");

  const maximumLenth = PI;
  const minimumLength = PI / 4;

  arcsToDraw = new Array();
  let radius = 25;
  while (arcsToDraw.length < 20) {
    let length = Math.random() * (maximumLenth - minimumLength) + minimumLength;
    let speed = Math.random() * 0.05;
    let weight = Math.random() * (15 - 8) + 8;
    arcsToDraw.push(new Arc(radius, length, speed, weight));
    radius += 7.5;
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