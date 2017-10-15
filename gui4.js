//Type in cmd to change file extension: ren *. *.png

var exportCalled = false;
var counter = 0;
var framesToExport = 64;
var drawFromScratch = false;

function changeExportFrames() {

  exportCalled = !exportCalled;

}

function changeDrawFromScratch() {

  drawFromScratch = !drawFromScratch;

}

function exportFrames() {

  framesToExport = gui4.getValue("Number of Frames");

  if (exportCalled) {
    if (!backgroundColorEnabled) {
      if (drawFromScratch) {
        background(backgroundColor);
        changeDrawFromScratch();
      }
    }

    saveCanvas('frame' + counter, 'png');

    counter++;

    if (counter == framesToExport) {

      exportCalled = false;

      counter = 0;

    }

  }

}