var w = 800;
var h = 800;

var draw = SVG('drawing').size(w, h);

draw.rect(w, h).fill({ color: '#000' });

var scale = chroma.scale(['#f09', '#fc0']).mode('lab');

var drawPolygon = function (y_start, y_end, y_new) {
  var poly = draw.polygon([[400, 0], [0, 400], [800, 800]]).fill('#f09');
  var mask = draw.mask().add(draw.rect(w, y_end - y_start).move(0, y_start).fill('#fff'));
  return poly.maskWith(mask).move(0, y_start - y_new);
};

var count = 40;

var order = _.sortBy(_.range(count), (e) => e + Math.random() * count / 5);
console.log(order);

_.times(count, function (i) {
  var f = i / (count-1);
  var dy = (h/count);
  var j = order[i];
  drawPolygon(j*dy, (j+1)*dy, i*dy).fill(scale(f).hex());
});
