var interp = function (a, b, f) {
  return a * f + b * (1 - f);
}

var interp_pt = function (a, b, f) {
  return { x: interp(a.x, b.x, f), y: interp(a.y, b.y, f) };
}

/////

var draw = SVG('drawing').size(1200, 800)

var points = [
  { x: -0.5, y: -0.5 },
  { x: -0.5, y:  0.5 },
  { x:  0.5, y:  0.5 },
  { x:  0.5, y: -0.5 },
]

var group = draw.group().scale(30, 10).translate(draw.width() / 2 - 100, draw.height() / 2 + 200).skew(45, -45);

var xs = [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
var ys = [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

var colors = chroma.scale(['#f60', '#0cc', 'white']).domain([0, xs.length * ys.length]);

xs.forEach(function (x, i_x) {
  ys.forEach(function (y, i_y) {
    var d = ((i_x + i_y * 0.9) / 5.0) ** 1.8;

    group
      .polygon(points.map((p) => [p.x, p.y]))
      .transform({ x: x + d ** 0.9, y: y - d })
      .attr({ fill: colors(i_x + xs.length * i_y).hex() });
  });
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
