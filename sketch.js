//Image
var img;
var imageDropped = false;
var imageEnabled = false;

//Background Image
var imgBG;
var imageBGDropped = false;
var imagebackgroundEnabled = false;
var imageTintEnabled = false;
var backgroundColorEnabled = false;
var backgroundColor = '#000000';

var brightnessCutoff = 0;
var vScale = 4;
var orbitPhases = 4;
var orbitRadius = Math.pow(vScale, 2);
var orbitVelocity = 0.1;

var debug = false;
var lineEnabled = true;
var lineWeight = 1;
var shapeEnabled = false;
var shape = ['circle', 'triangle', 'square', 'pentagon', 'star'];
var shapeWidth = Math.pow(vScale, 2);
var shapeHeight = Math.pow(vScale, 2);
var strokeEnabled = false;

var flashingTextEnabled = false;
var flashingText = "STILL PRESIDENT";

function setup() {

  createCanvas(0, 0);
  frameRate(30);

  imageMode(CENTER);
  ellipseMode(CENTER);
  rectMode(CENTER);

  QuickSettings.useExtStyleSheet();

  //Setup
  gui1 = QuickSettings.create(0, 0, "Canvas Setup")
    .addFileChooser("Image Chooser", "Choose a primary image...", "image/*", imgChosen)
    .addImage("Image", "")
    .addFileChooser("Background Chooser", "Choose a background image...", "image/*", imgBGChosen)
    .addImage("Background Image", "")
    .addBoolean('Enable Background Image', imagebackgroundEnabled, changeBackgroundImageEnabled)
    .addBoolean('Enable Background Color', backgroundColorEnabled, changeBackgroundColorEnabled)
    .addColor("Background Color", backgroundColor, changeBackgroundColor)
    .addRange("Scale", 2, 8, vScale, 1, changeVScale)
    .addBoolean('Enable Flashing Text', flashingTextEnabled, changeFlashingTextEnabled)
    .addText("Flashing Text", flashingText, changeFlashingText);

  //Visual Menu
  gui2 = QuickSettings.create(800, 0, "Graphics Menu")
    .addBoolean('Enable Orbiting Image', imageEnabled, changeImageEnabled)
    .addBoolean("Enable Image Tint (UNSTABLE)", imageTintEnabled, changeImageTintEnabled)
    .addRange("Brightness Cutoff", 0, 255, brightnessCutoff, 1, changeBrightnessCutoff)
    .addBoolean("Enable Orbiting Line", lineEnabled, changeLineEnabled)
    .addRange("Line Weight", 1, 32, lineWeight, 1, changeLineWeight)
    .addBoolean('Enable Orbiting Shape', shapeEnabled, changeShapeEnabled)
    .addDropDown("Shape", shape, changeShape)
    .addRange("Shape Width", 1, 1024, shapeWidth, 1, changeShapeWidth)
    .addRange("Shape Height", 1, 1024, shapeHeight, 1, changeShapeHeight)
    .addBoolean('Enable Line Stroke', strokeEnabled, changeStrokeEnabled);
  //Motion Menu
  gui3 = QuickSettings.create(800, 500, "Motion Menu")
    .addRange("Orbit Phases", 0, 180, orbitPhases, 1, changeOrbitPhases)
    .addRange("Orbit Radius", 0, 4096, orbitRadius, 1, changeOrbitRadius)
    .addRange("Orbit Velocity", 0, 1, orbitVelocity, 0.05, changeOrbitVelocity)
    .addBoolean("debug", debug, changeDebug);

  //Frame Exporter Menu
  gui4 = QuickSettings.create(800, 760, "Frame Exporter")
    .addBoolean('Draw From Scratch', drawFromScratch, changeDrawFromScratch)
    .addNumber("Number of Frames", 1, 128, 64, 1)
    .addButton("Export Frames", changeExportFrames);

}

function drawImg() {

  resizeCanvas(img.width * vScale, img.height * vScale);

  img.loadPixels();

  for (var y = 0; y < img.height / vScale; y++) {
    for (var x = 0; x < img.width / vScale; x++) {

      var index = (x + y * img.width) * 4 * vScale;
      var r = img.pixels[index + 0];
      var g = img.pixels[index + 1];
      var b = img.pixels[index + 2];
      var bright = (r + g + b) / 3;

      if (bright > brightnessCutoff) {
        append(spinners, new Spinner(x * vScale * vScale, y * vScale * vScale, color(r, g, b), bright));
      }
    }
  }
}

function redrawImg() {

  spinners.splice(0, spinners.length);
  drawImg();

}

function draw() {

  if (imageDropped) {

    if (backgroundColorEnabled) {
      background(backgroundColor);
    }

    if (imagebackgroundEnabled && imageBGDropped) {
      image(imgBG, width / 2, height / 2, width, height);
    }

    for (var i = 0; i < spinners.length; i++) {
      spinners[i].update();
    }

  }

  if (flashingTextEnabled && frameCount % 10 < 5) {
    textSize(width / flashingText.length * 2);
    textAlign(CENTER, CENTER);
    textStyle(BOLD);
    stroke(0);
    strokeWeight(5);
    fill(255);
    textFont("Impact");
    text(flashingText, width / 2, height / 2);
  }

  exportFrames();

}