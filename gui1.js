function imgChosen(file) {

  var temp = URL.createObjectURL(gui1.getValue("Image Chooser"));
  gui1.setValue("Image", temp);
  img = loadImage(temp, convertPixelsToObjects);
  convertPixelsToObjects();

  imageDropped = true;

}

function imgBGChosen(file) {

  var temp = URL.createObjectURL(gui1.getValue("Background Chooser"));
  gui1.setValue("Background Image", temp);

  imgBG = loadImage(temp);
  imageBGDropped = true;

}

function changeBackgroundImageEnabled() {
  imagebackgroundEnabled = !imagebackgroundEnabled;
}

function changeBackgroundColorEnabled() {
  backgroundColorEnabled = !backgroundColorEnabled;
}

function changeBackgroundColor() {
  backgroundColor = gui1.getValue("Background Color");
}

function changeVScale() {
  vScale = gui1.getValue("Scale");
  convertPixelsToObjects();
}

function changeFlashingTextEnabled() {
  flashingTextEnabled = !flashingTextEnabled;
}

function changeFlashingText() {
  flashingText = gui1.getValue("Flashing Text");
}
