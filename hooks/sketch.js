var draw = SVG('drawing').size(800, 400)

var group = draw.group().scale(50);

var drawTire = function (x, y, radius, scale_x, dist, color) {
  var group = draw.group().translate(dist, 0).group().scale(scale_x, 1)

  var maskGroup = group.group();
  var outerMask = maskGroup.ellipse(radius, radius).move(x, y).fill({ color: '#fff' });
  var innerMask = maskGroup.ellipse(radius * 0.9, radius * 0.9).move(x, y).fill({ color: '#000' });

  group.ellipse(radius, radius).move(x, y).fill({ color: color }).maskWith(maskGroup);
}

var rect = draw.rect(draw.width(), draw.height()).fill({ color: '#000' });

var colorScale = chroma.scale().domain([-0.5, 11]);
_.times(10, function (i) {
  drawTire(300, 100, 200, 0.5, (9 - i) * 40, colorScale(i).hex());
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
