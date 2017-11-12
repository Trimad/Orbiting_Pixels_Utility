let spinners = [];

var x = 0.01;
var y = 0.01;
var z = 0.01;

class Spinner {

  constructor(arr) {
    this.red = arr[0];
    this.green = arr[1];
    this.blue = arr[2];
    //arr[3] is the pixel brightness already calculated
    this.x = arr[4];
    this.y = arr[5];
    this.z = 0;
    this.yP;
    this.xP;
    this.angle = map(arr[3], 0, 255, 0, orbitPhases);
  }

}

// draw a regular n-gon with n sides
function ngon(n, x, y, d) {
  beginShape();
  for (let i = 0; i < n; i++) {
    let angle = TWO_PI / n * i;
    let px = x + sin(angle) * d / 2;
    let py = y - cos(angle) * d / 2;
    vertex(px, py);
  }
  endShape(CLOSE);
}

// draw a regular n-pointed star
function star(n, x, y, d1, d2) {
  beginShape();
  for (let i = 0; i < 2 * n; i++) {
    let d = (i % 2 === 1) ? d1 : d2;
    let angle = PI / n * i;
    let px = x + sin(angle) * d / 2;
    let py = y - cos(angle) * d / 2;
    vertex(px, py);
  }
  endShape(CLOSE);
}

Spinner.prototype.ellipticalMotion = function() {
  this.xP = orbitRadius * Math.cos(this.angle);
  this.yP = orbitRadius * Math.sin(this.angle);
  this.angle += orbitVelocity;
};

Spinner.prototype.LorenzMotion = function() {
  const sigma = 10.0;
  const rho = 28;
  const beta = 8 / 3.0;
  const dt = .001;
  let dx = (sigma * (y - x)) * dt;
  let dy = (x * (rho - z) - y) * dt;
  let dz = ((x * y) - (beta * z)) * dt;
  x += dx;
  y += dy;
  z += dz;
  this.angle += orbitVelocity;
  this.xP = orbitRadius * Math.cos(this.angle + x);
  this.yP = orbitRadius * Math.sin(this.angle + y);
};

Spinner.prototype.drawSpinner = function() {

  switch (motion) {
    case 'elliptical':
      this.ellipticalMotion();
      break;
    case 'lorenz':
      this.LorenzMotion();
      break;
  }

  //Debug
  if (debug) {
    strokeWeight(1);
    stroke(200, 200);
    line(this.x, this.y, this.x - this.xP, this.y - this.yP);
    noFill();
    strokeWeight(1);
    ellipse(this.x, this.y, orbitRadius * 2, orbitRadius * 2);
  }
  //Line
  if (lineEnabled) {
    strokeWeight(lineWeight);
    strokeCap(SQUARE);
    stroke(this.red, this.green, this.blue);
    drawingContext.beginPath();
    drawingContext.moveTo(this.x, this.y);
    drawingContext.lineTo(this.x - this.xP, this.y - this.yP);
    drawingContext.stroke();
  }
  //Stroke
  if (strokeEnabled) {
    stroke(0);
  } else {
    noStroke();
  }
  //Shape
  if (shapeEnabled) {
    switch (shape) {
      case 'curve':

        let x1 = this.x + shapeSize;
        let y1 = this.y + shapeSize;
        let x2 = this.x;
        let y2 = this.y;
        let x3 = this.x - this.xP;
        let y3 = this.y - this.yP;
        let x4 = this.x - shapeSize;
        let y4 = this.y - shapeSize;

        noFill();
        strokeWeight(lineWeight);
        stroke(this.red, this.green, this.blue);
        curve(x1, y1, x2, y2, x3, y3, x4, y4);

        break;
      case 'circle':
        fill(this.red, this.green, this.blue);
        ellipse(this.x - this.xP, this.y - this.yP, shapeSize, shapeSize);
        break;
      case 'square':
        fill(this.red, this.green, this.blue);
        rect(this.x - this.xP, this.y - this.yP, shapeSize, shapeSize);
        break;
      case 'triangle':
        fill(this.red, this.green, this.blue);
        ngon(3, this.x - this.xP, this.y - this.yP, shapeSize);
        break;
      case 'pentagon':
        fill(this.red, this.green, this.blue);
        ngon(5, this.x - this.xP, this.y - this.yP, shapeSize);
        break;
      case 'star':
        fill(this.red, this.green, this.blue);
        star(6, this.x - this.xP, this.y - this.yP, shapeSize / 3, shapeSize);
        break;
    }
  }

  if (imageEnabled) {
    if (imageTintEnabled) {
      tint(this.red, this.green, this.blue);
    }
    image(img, this.x - this.xP, this.y - this.yP, shapeSize, shapeSize);
  }
};
