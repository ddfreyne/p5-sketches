var draw = SVG('drawing').size(800, 400)

var group = draw.group().scale(50);

var drawTire = function (x, y, radius, scale_x, dist, color, inner) {
  var group = draw.group().translate(dist, 0).group().scale(scale_x, 1)

  var maskGroup = group.group();
  var outerMask = maskGroup
    .ellipse(radius, radius)
    .move(x, y)
    .fill({ color: '#fff' });
  var innerMask = maskGroup
    .ellipse(radius * inner, radius * inner)
    .move(x  + radius / 2 - radius * inner / 2, y + radius / 2 - radius * inner / 2)
    .fill({ color: '#000' });

  group.ellipse(radius, radius).move(x, y).fill({ color: color }).maskWith(maskGroup);
}

var count = 5;
_.times(count, function (i) {
  var j = count - 1 - i;
  drawTire(150, 100, 200, 0.5, j ** 1.2 * 105, '#000', 0.10 + j / count);
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
