function changeOrbitPhases() {
  orbitPhases = gui3.getValue("Orbit Phases");
  convertPixelsToObjects();
}

function changeOrbitRadius() {
  orbitRadius = gui3.getValue("Orbit Radius");
  //Does not require redrawing the canvas
}

function changeOrbitVelocity() {
  orbitVelocity = gui3.getValue("Orbit Velocity");
  //Does not require redrawing the canvas
}

function changeMotion() {
  convertPixelsToObjects();
  motion = gui3.getValue("Motion Type").value;
}

function changeDebug() {
  debug = !debug;
}
