// config

var w = 900;
var h = 900;

var outer_radius = 400;
var inner_radius = 270;

var corner_count = 5;

// reusables

var lerp_scalar = function (a, b, f) {
  return a * f + b * (1 - f);
}

var lerp_pt = function (a, b, f) {
  return [lerp_scalar(a[0], b[0], f), lerp_scalar(a[1], b[1], f)];
}

// code

var draw = SVG('drawing').size(w, h);

draw.rect(w, h).fill({ color: '#000' });

var g = draw
  .group()
  .move(w/2, h/2);

var outer_angles = _.range(corner_count).map((e) => e * Math.PI * 2 / corner_count);
var outer_points_normalized = outer_angles.map((e) => [Math.cos(e), Math.sin(e)]);
var outer_points = outer_points_normalized.map((arr) => arr.map((e) => e * outer_radius));

var inner_angles = _.range(corner_count).map((e) => (0.5 + e) * Math.PI * 2 / corner_count);
var inner_points_normalized = inner_angles.map((e) => [Math.cos(e), Math.sin(e)]);
var inner_points = inner_points_normalized.map((arr) => arr.map((e) => e * inner_radius));

_.times(corner_count, function (i) {
  var cur = outer_points[i];
  console.log('current corner', i, cur);

  var j_mid = (i + corner_count / 2) % corner_count;
  var j_low = (Math.floor(j_mid)) % corner_count;
  var j_high = (Math.ceil(j_mid)) % corner_count;
  console.log('opposite corner', j_low, j_high);

  var opposites = [
    outer_points[j_low],
    inner_points[j_low],
    outer_points[j_high],
  ];
  console.log(opposites);

  var lines_count = 15;
  _.times(lines_count, function(n) {
    var f = n / (lines_count - 1);
    var pt = lerp_pt(opposites[0], opposites[1], f);
    g.line([cur, pt]).stroke({ width: 2, color: '#0ff' });
  });
})
