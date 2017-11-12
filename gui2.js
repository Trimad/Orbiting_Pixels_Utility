function changeImageEnabled() {
  imageEnabled = !imageEnabled;
}

function changeImageTintEnabled() {
  imageTintEnabled = !imageTintEnabled;
}

function changeBlackCutoff() {
  blackCutoff = gui2.getValue("Black Cutoff");
  convertPixelsToObjects();
}


function changeWhiteCutoff() {
  whiteCutoff = gui2.getValue("White Cutoff");
  convertPixelsToObjects();
}

function changeLineEnabled() {
  lineEnabled = !lineEnabled;
}

function changeLineWeight() {
  lineWeight = gui2.getValue("Line Weight");
}

function changeShapeEnabled() {
  shapeEnabled = !shapeEnabled;
  shape = gui2.getValue("Shape").value;
}

function changeShape() {
  shape = gui2.getValue("Shape").value;
}

function changeShapeSize() {
  shapeSize = gui2.getValue("Shape Size");
}

function changeStrokeEnabled() {
  strokeEnabled = !strokeEnabled;
}
