var w = 900;
var h = 900;

var draw = SVG('drawing').size(w, h);

draw.rect(w, h).fill({ color: '#000' });

var colorScale = chroma.scale(['#000', '#111', '#444', '#0fc', '#06c', '#93c', '#f3c', '#f09', '#f3c', '#f6f', '#fff']).mode('lab');

var interp = function (a, b, f) {
  return a * (1 - f) + b * f;
}

var interp_pt = function(a, b, f) {
  return [interp(a[0], b[0], f), interp(a[1], b[1], f)];
}

var s = 400;

var angles = [0*2, Math.PI/6*2, Math.PI/3*2, Math.PI/2*2, 2*Math.PI/3*2, 5*Math.PI/6*2];
var corners =
  [
    [s * Math.cos(angles[0]), s * Math.sin(angles[0])],
    [s * Math.cos(angles[1]), s * Math.sin(angles[1])],
    [s * Math.cos(angles[2]), s * Math.sin(angles[2])],
    [s * Math.cos(angles[3]), s * Math.sin(angles[3])],
    [s * Math.cos(angles[4]), s * Math.sin(angles[4])],
    [s * Math.cos(angles[5]), s * Math.sin(angles[5])],
  ];

var g = draw.group();

var count = 120;
_.times(count + 1, function (i) {
  var f = i / count;

  console.log(corners[0][0], corners[0][1]);
  g
    .group()
    .move(w/2, h/2)
    .polygon(corners)
    .stroke({ color: colorScale(f).hex(), width: 2 })
    .fill('none')

  corners = [
    interp_pt(corners[0], corners[1], f / 4.5),
    interp_pt(corners[1], corners[2], f / 4.5),
    interp_pt(corners[2], corners[3], f / 4.5),
    interp_pt(corners[3], corners[4], f / 4.5),
    interp_pt(corners[4], corners[5], f / 4.5),
    interp_pt(corners[5], corners[0], f / 4.5),
  ];
});

g.animate(100000, '-').rotate(360).loop()
