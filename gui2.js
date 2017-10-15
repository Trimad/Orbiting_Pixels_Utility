function changeImageEnabled() {
  imageEnabled = !imageEnabled;
}

function changeImageTintEnabled() {
  imageTintEnabled = !imageTintEnabled;
}

function changeBrightnessCutoff() {
  brightnessCutoff = gui2.getValue("Brightness Cutoff");
  redrawImg();
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

function changeShapeWidth() {
  shapeWidth = gui2.getValue("Shape Width");
}

function changeShapeHeight() {
  shapeHeight = gui2.getValue("Shape Height");
}


function changeStrokeEnabled() {
  strokeEnabled = !strokeEnabled;
}