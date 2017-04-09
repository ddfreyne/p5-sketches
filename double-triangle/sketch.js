var interp = function (a, b, f) {
  return a * f + b * (1 - f);
}

var interp_pt = function (a, b, f) {
  return { x: interp(a.x, b.x, f), y: interp(a.y, b.y, f) };
}

var sample = function (arr) {
  var r = Math.random();
  return arr[Math.floor(r * arr.length)];
}

/////

var draw = SVG('drawing').size(900, 750)

var group = draw.group().scale(50);

var points = [[0, 0], [1, 0], [1, 1], [0, 1], [0, 0], [1, 0], [1, 1]];

var colors_light = ['#fcfcfc', '#f8f8f8', '#f4f4f4', '#f0f0f0'];
var colors_med   = ['#dcdcdc', '#d8d8d8', '#d4d4d4', '#d0d0d0'];
var colors_dark  = ['#989898', '#9f9f9f', '#a8a8a8', '#afafaf'];

_.range(40).forEach(function (x) {
  _.range(40).forEach(function (y) {
    var start = sample([0, 1, 2, 3]);

    group
      .polygon(_(points).drop(start).take(3))
      .translate(x / 2 - 0.25, y / 2 - 0.25)
      .scale(0.5)
      .attr({ fill: sample(colors_light) });
  });
});

_.range(20).forEach(function (x) {
  _.range(20).forEach(function (y) {
    var start = sample([0, 1, 2, 3]);

    group
      .polygon(_(points).drop(start).take(3))
      .translate(x, y)
      .attr({ fill: sample(colors_med) });
  });
});

_.range(10).forEach(function (x) {
  _.range(10).forEach(function (y) {
    var start = sample([0, 1, 2, 3]);

    group
      .polygon(_(points).drop(start).take(3))
      .translate(1 + x * 3, 1 + y * 3)
      .scale(3)
      .attr({ fill: sample(colors_dark) });
  });
});

var points = [
  [[0, 0], [1, 0], [0, 1]],
  [[1, 1], [1, 0], [0, 1]],
]

_.range(2).forEach(function (x) {
  group
    .polygon(points[x])
    .translate(7 + x * 3, 7)
    .scale(9)
    .attr({ fill: '#f60', opacity: '0.8' })
});

/////

var lastTime;

var update = function (ms) {
}

var callback = function (ms) {
  if (lastTime) {
    update((ms-lastTime)/1000);
  }

  lastTime = ms;
  requestAnimationFrame(callback);
}

callback();
