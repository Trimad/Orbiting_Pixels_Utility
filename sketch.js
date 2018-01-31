//Canvas Setup
let img;
let imageDropped = false;
let imgBG;
let imageBGDropped = false;
let imagebackgroundEnabled = false;
let backgroundColorEnabled = true;
let backgroundColor = '#000000';
let vScale = 5;
let flashingTextEnabled = false;
let flashingText = "Type a message here...";

//Graphics
let imageEnabled = false;
let imageTintEnabled = false;
let blackCutoff = 0;
let whiteCutoff = 255;
let lineEnabled = false;
let lineWeight = 1;
let shapeEnabled = false;
let shape = ['curve', 'circle', 'triangle', 'square', 'pentagon', 'star'];
let shapeSize = vScale * 3;
let strokeEnabled = false;

//Motion
let debug = false;
let motion = ['elliptical', 'lorenz'];
let orbitPhases = vScale;
let orbitRadius = vScale * 2;
let orbitVelocity = 0.1;

//Frame Export
let counter = 0;
let drawFromScratch = false;
let exportCalled = false;
let framesToExport = 64;

//Misc
var maxFR = 0;

function setup() {

  createCanvas(0, 0);
  //frameRate(30);

  imageMode(CENTER);
  ellipseMode(CENTER);
  rectMode(CENTER);

  QuickSettings.useExtStyleSheet();

  //Canvas Setup Menu
  gui1 = QuickSettings.create(windowWidth - 780, 10, "Canvas Setup")
    .addFileChooser("Image Chooser", "Choose a primary image...", "image/*", imgChosen)
    .addImage("Image", "")
    .addFileChooser("Background Chooser", "Choose a background image...", "image/*", imgBGChosen)
    .addImage("Background Image", "")
    .addBoolean('Enable Background Image', imagebackgroundEnabled, changeBackgroundImageEnabled)
    .addBoolean('Enable Background Color', backgroundColorEnabled, changeBackgroundColorEnabled)
    .addColor("Background Color", backgroundColor, changeBackgroundColor)
    .addRange("Scale", 1, 16, vScale, 1, changeVScale)
    .addBoolean('Enable Flashing Text', flashingTextEnabled, changeFlashingTextEnabled)
    .addText("Flashing Text", flashingText, changeFlashingText);
  //Graphics Menu
  gui2 = QuickSettings.create(windowWidth - 520, 10, "Graphics Menu")
    .addBoolean('Enable Orbiting Image', imageEnabled, changeImageEnabled)
    .addBoolean("Enable Image Tint (UNSTABLE)", imageTintEnabled, changeImageTintEnabled)
    .addRange("Black Cutoff", 0, 255, blackCutoff, 1, changeBlackCutoff)
    .addRange("White Cutoff", 0, 255, whiteCutoff, 1, changeWhiteCutoff)
    .addBoolean("Enable Orbiting Line", lineEnabled, changeLineEnabled)
    .addRange("Line Weight", 1, 32, lineWeight, 1, changeLineWeight)
    .addBoolean('Enable Orbiting Shape', shapeEnabled, changeShapeEnabled)
    .addDropDown("Shape", shape, changeShape)
    .addRange("Shape Size", 1, 512, shapeSize, 1, changeShapeSize)
    .addBoolean('Enable Line Stroke', strokeEnabled, changeStrokeEnabled);
  //Motion Menu
  gui3 = QuickSettings.create(windowWidth - 260, 10, "Motion Menu")
    .addDropDown("Motion Type", motion, changeMotion)
    .addRange("Orbit Phases", 0, 90, orbitPhases, 1, changeOrbitPhases)
    .addRange("Orbit Radius", 0, 512, orbitRadius, 1, changeOrbitRadius)
    .addRange("Orbit Velocity", 0, 1, orbitVelocity, 0.01, changeOrbitVelocity)
    .addBoolean("debug", debug, changeDebug);
  //Frame Exporter Menu
  gui4 = QuickSettings.create(windowWidth - 260, 300, "Frame Exporter")
    .addBoolean('Draw From Scratch', drawFromScratch, changeDrawFromScratch)
    .addNumber("Number of Frames", 1, 128, 64, 1)
    .addButton("Export Frames", changeExportFrames);

  //gui2.collapse();
  //gui3.collapse();
  //gui4.collapse();
  //Hard-coded default motion, or else there is no motion upon loading an image.
  motion = gui3.getValue("Motion Type").value;

}

function windowResized() {

  background(255, 0, 0);
  gui1.setPosition(windowWidth - 780, 10);
  gui2.setPosition(windowWidth - 520, 10);
  gui3.setPosition(windowWidth - 260, 10);
  gui4.setPosition(windowWidth - 260, 300);

}

function convertPixelsToObjects() {

  if (spinners != undefined) {
    spinners.splice(0, spinners.length);
  }

  resizeCanvas(img.width, img.height);

  img.loadPixels();

  for (let x = 0; x < img.width / vScale; x += vScale) {
    for (let y = 0; y < img.height / vScale; y += vScale) {

      let index = (x + y * img.width) * 4 * vScale;
      let arr = []; //Contains all information needed for the object
      arr[0] = img.pixels[index + 0]; //Red
      arr[1] = img.pixels[index + 1]; //Green
      arr[2] = img.pixels[index + 2]; //Blue
      arr[3] = (arr[0] + arr[1] + arr[2]) / 3; //Brightness
      arr[4] = x * vScale; //x-position
      arr[5] = y * vScale; //y-position

      if (arr[3] >= blackCutoff && arr[3] <= whiteCutoff) {
        append(spinners, new Spinner(arr));
      }
    }
  }
}

function draw() {

  if (imageDropped) {

    if (backgroundColorEnabled) {
      background(backgroundColor);
    }

    if (imagebackgroundEnabled && imageBGDropped) {
      image(imgBG, width / 2, height / 2, width, height);
    }

    /*
        for (let i = 0; i < spinners.length; i++) {
          spinners[i].drawSpinner();
        }
    */

    for (let Spinner of spinners) {
      Spinner.drawSpinner();
    }
  }

  if (flashingTextEnabled) {
    if (frameCount % 10 < 5) {
      textSize(width / flashingText.length * 2);
      textAlign(CENTER, CENTER);
      textStyle(BOLD);
      stroke(0);
      strokeWeight(5);
      fill(255);
      textFont("Impact");
      text(flashingText, width / 2, height / 2);
    }
  }
  //ffmpeg -r 60 -f image2 -s 1920x1080 -i %04d.png -vcodec libx264 -crf 1 -pix_fmt yuv420p test.mp4
  if (exportCalled) {
    framesToExport = gui4.getValue("Number of Frames");
    if (drawFromScratch) {
      background(backgroundColor);
      changeDrawFromScratch();
    }
    saveCanvas(nf(counter, 4, 0), 'png');
    counter++;
    if (counter == framesToExport) {
      exportCalled = false;
      counter = 0;
    }
  }

  /*
  stroke(255);
  fill(255);
    if (imageDropped && frameRate() > maxFR) {
      if (frameCount % 60 === 0) {
        maxFR = frameRate();
      }
    }
    text(maxFR, 16, 16);
    */
}
