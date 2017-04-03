var width_screen = 900;
var height_screen = 300;
var myPoints = [];

function setup() {
  createCanvas(width_screen, height_screen);

  myPoints.push(genPoint());
  myPoints.push(genPoint());
  myPoints.push(genPoint());
  myPoints.push(genPoint());
  myPoints.push(genPoint());
}

var genPoint = function() {
  return {
    x: 800,
    y: random(-300, 300)
  };
}

var myBox = function (point) {
  var distance = sqrt(sq(point.x) + sq(point.y));

  var angle = acos(point.x / distance);
  if (point.y < 0) { angle = -angle; }

  var x_screen = width_screen / 2 - 2 * angle / PI * width_screen;
  var y_screen = height_screen / 2;

  var width = 1/sqrt(distance / 20000);
  var height = 1/sqrt(distance / 800000);

  return {
    distance: distance,
    x: x_screen,
    y: y_screen - 1/sqrt(distance / 80000),
    width: width,
    height: height
  };
}

function draw() {
  clear();

  // Calculate boxes for each point
  var myBoxes = []
  myPoints.forEach(function (myPoint) {
    myBoxes.push(myBox(myPoint));
  });

  // Sort by distance (draw more distant ones first)
  var sortedBoxes = myBoxes.sort(function (a, b) { return b.distance - a.distance; });

  // Draw from center, no outline
  rectMode(CENTER);
  noStroke();

  // Draw each box
  sortedBoxes.forEach(function (myBox) {
    fill(atan(myBox.distance / 500) * 255);
    rect(myBox.x, myBox.y, myBox.width, myBox.height);
  });

  // Generate a new box, maybe
  if (random() < 0.2) {
    myPoints.push(genPoint());
  }

  // Move boxes
  var toRemove = [];
  myPoints.forEach(function (myPoint, i) {
    myPoint.x -= 2;

    // Record now invisible points
    if (myPoint.x < 0) {
      toRemove.push(i);
    }
  });

  // Remove invisible points
  toRemove.sort().reverse().forEach(function (i) {
    myPoints.splice(i, 1);
  });
}
