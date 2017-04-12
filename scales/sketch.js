var draw = SVG('drawing').size(1000, 800)

var group = draw.group().move(0, 0);

var gradients = ['#f60', '#f09', '#0cf', '#333', '#333', '#222', '#333', '#222', '#333', '#222', '#333'].map(function (color) {
  return draw.gradient('linear', function(stop) {
    stop.at(0, '#000')
    stop.at(1.0, color)
  }).from(0, 0).to(0, 1);
});

_.times(20, function (y) {
  var g = group.group().move(y % 2 === 0 ? -50 : 0, -50);
  var yy = 19 - y;

  _.times(11, function (x) {
    g
      .group()
      .move(100*x, 50*yy)
      .circle(100)
      .attr({ fill: _.sample(gradients) });
  });
});
