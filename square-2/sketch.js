var w = 700;
var h = 700;

var draw = SVG('drawing').size(w, h);

var tot = 10;

var scale = chroma.scale(['#fff', '#000']);

var g = draw.group().move(200, 220);

_.times(tot, function (i) {
  var factor = 3;
  var i_f = i * factor;

  var points = [
    [50 + i_f * 5, 0 + i_f * 1],
    [300 - i_f * 1, 0 + i_f * 1],
    [250 - i_f * 5, 250 - i_f * 1],
    [0 + i_f * 1, 250 - i_f * 1],
  ];

  g
    .polygon(points)
    .fill(_.sample(['#fff', '#000']))
    .scale(2);
});
