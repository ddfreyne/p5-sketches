var w = 900;
var h = 900;

var draw = SVG('drawing').size(w, h);

draw.rect(w, h).fill({ color: '#000' });

var colorScale = chroma.scale(['#000', '#000', '#f09']).mode('lab');

var interp = function (a, b, f) {
  return a * (1 - f) + b * f;
}

var s = 800;

var count = 80;
_.times(count + 1, function (i) {
  var f = i / count;
  console.log(f);

  draw
    .polygon([
      [0, interp(0, s, f)],
      [interp(0, s, f), s],
      [s, interp(s, 0, f)],
      [interp(s, 0, f), 0]
    ])
    .stroke({ color: colorScale(f).hex(), width: 5 })
    .fill('none')
    .move(w/2 - s/2, h/2 - s/2);
});
