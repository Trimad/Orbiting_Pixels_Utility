function changeOrbitPhases() {
  orbitPhases = gui3.getValue("Orbit Phases");
  redrawImg();
}

function changeOrbitRadius() {
  orbitRadius = gui3.getValue("Orbit Radius");
  //Does not require redrawing the canvas
}

function changeOrbitVelocity() {
  orbitVelocity = gui3.getValue("Orbit Velocity");
  //Does not require redrawing the canvas
}



function changeDebug() {
  debug = !debug;
}