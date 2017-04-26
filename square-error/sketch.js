var w = 700;
var h = 700;

var draw = SVG('drawing').size(w, h);

var tot = 10;
_.times(tot, function (x) {
  _.times(tot, function (y) {
    var dx1 = ((Math.random() - 0.5) * x * 20 / (tot - 1));
    var dx2 = ((Math.random() - 0.5) * x * 20 / (tot - 1));
    var dx3 = ((Math.random() - 0.5) * x * 20 / (tot - 1));
    var dx4 = ((Math.random() - 0.5) * x * 20 / (tot - 1));

    var dy1 = ((Math.random() - 0.5) * y * 20 / (tot - 1));
    var dy2 = ((Math.random() - 0.5) * y * 20 / (tot - 1));
    var dy3 = ((Math.random() - 0.5) * y * 20 / (tot - 1));
    var dy4 = ((Math.random() - 0.5) * y * 20 / (tot - 1));

    draw
      .polygon([[dx1, dy1], [dx2+40, dy2], [dx3+40, dy3+40], [dx4, dy4+40]])
      .stroke({ color: '#f30', width: 2 })
      .fill('none')
      .move(60 + x*60, 60 + y*60);
  });
});
