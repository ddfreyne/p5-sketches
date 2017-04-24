var w = 800;
var h = 800;

var draw = SVG('drawing').size(w, h);

draw.rect(w, h).fill({ color: '#333' });

var slice = function (obj, y_start, y_end, num) {
  var slices = _.range(num).map(function (i) {
    var height = y_end - y_start;
    var dy = height / num;
    var new_y_start = i * dy;
    var new_y_end = (i+1) * dy;

    var maskRect =
      draw
        .rect(w, dy)
        .move(0, y_start + new_y_start)
        .fill('#fff');

    var mask = draw.mask().add(maskRect);
    var orig = obj.clone();
    orig.maskWith(mask);
    return orig;
  });

  obj.remove();

  return slices;
}

var scale_top = chroma.scale(['#930', '#f60']).mode('lab');
slice(draw.rect(w, h/2), 0, 400, 20).map(function (e, i, arr) {
  var f1 = 1 / arr.length;
  var f = i / (arr.length - 1 + 4);

  var x = f + 4 * Math.random() * f1;
  e.fill(scale_top(x).hex());
});

var scale_bottom = chroma.scale(['#f09', '#006']).mode('lab');
slice(draw.rect(w, h/2).move(0, 400), 400, 800, 20).map(function (e, i, arr) {
  var f1 = 1 / arr.length;
  var f = i / (arr.length - 1 + 4);

  var x = f + 4 * Math.random() * f1;
  e.fill(scale_bottom(x).hex());
});

var sun = draw.group().circle(100).fill('#fff').move(500 + 20, 250);

var scale_sun_reflected = chroma.scale(['#c9f', '#96f']).mode('lab');
var sun_reflected = draw.group().circle(100).fill('#fff');
slice(sun_reflected, 450, 550, 10).map(function (e, i, arr) {
  var f1 = 1 / arr.length;
  var f = i / (arr.length - 1 + 1);

  var x = f + 4 * Math.random() * f1;
  e.move(500 + Math.random() * 20, 450).fill(scale_sun_reflected(x).hex());
});
