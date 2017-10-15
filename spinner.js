var pixels;
var spinners = [];

function Spinner(x, y, colorDawg, bright) {

  this.red = red(colorDawg);
  this.green = green(colorDawg);
  this.blue = blue(colorDawg);
  this.angle = map(bright, 0, 255, 0, orbitPhases);

  this.update = function() {

    var xP = orbitRadius * Math.cos(this.angle);
    var yP = orbitRadius * Math.sin(this.angle);
    var d = shapeWidth + shapeHeight / 2;
    this.angle = this.angle + orbitVelocity;

    push();

    //Debug

    if (debug) {
      strokeWeight(1);
      stroke(200, 200);
      
      line(x, y, x - xP, y - yP);
      noFill();
      strokeWeight(1);
      ellipse(x, y, orbitRadius * 2, orbitRadius * 2);
    }

    //Line

    if (lineEnabled) {
      strokeWeight(lineWeight);
      strokeCap(SQUARE);
      stroke(this.red, this.green, this.blue);
      line(x, y, x - xP, y - yP);
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

        case 'circle':
          fill(this.red, this.green, this.blue);

          ellipse(x - xP, y - yP, shapeWidth, shapeHeight);
          break;

        case 'square':
          fill(this.red, this.green, this.blue);

          rect(x - xP, y - yP, shapeWidth, shapeHeight);
          break;

        case 'triangle':
          fill(this.red, this.green, this.blue);
          ngon(3, x - xP, y - yP, d);
          break;

        case 'pentagon':
          fill(this.red, this.green, this.blue);
          ngon(5, x - xP, y - yP, d);
          break;

        case 'star':
          fill(this.red, this.green, this.blue);
          star(6, x - xP, y - yP, d / sqrt(3), d);
          break;

      }

    }

    pop();

    if (imageEnabled) {
      if (imageTintEnabled) {
        tint(this.red, this.green, this.blue);
      }
      image(img, x - xP, y - yP, shapeWidth, shapeHeight);
    }

  }

}

// draw a regular n-gon with n sides
function ngon(n, x, y, d) {
  beginShape();
  for (var i = 0; i < n; i++) {
    var angle = TWO_PI / n * i;
    var px = x + sin(angle) * d / 2;
    var py = y - cos(angle) * d / 2;
    vertex(px, py);
  }
  endShape(CLOSE);
}

// draw a regular n-pointed star
function star(n, x, y, d1, d2) {
  beginShape();
  for (var i = 0; i < 2 * n; i++) {
    var d = (i % 2 === 1) ? d1 : d2;
    var angle = PI / n * i;
    var px = x + sin(angle) * d / 2;
    var py = y - cos(angle) * d / 2;
    vertex(px, py);
  }
  endShape(CLOSE);
}