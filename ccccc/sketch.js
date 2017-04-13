var w = 1200;
var h = 800;

var draw = SVG('drawing').size(w, h);

draw.rect(w, h).fill({ color: '#000' });

var colors = ['#f60', '#f06', '#06f', '#202020', '#282828', '#303030', '#383838'];

_.times(50, function (i) {
  var j = i + 2;

  var d = i / 5;

  draw
    .group()
    .move(w/2, h/2)
    .rotate(i * 30 + 60 * Math.random())
    .path(
      `m-${j*d} -${j*d} ` +
      `a ${j*d} ${j*d} 0 0 1 ${j*(2*d)} ${j*(2*d)} ` +
      `l-${d} -${d}` +
      `a ${j*d - d} ${j*d - d} 0 0 0 -${j*(2*d)-(2*d)} -${j*(2*d)-(2*d)} ` +
      `z`
    )
    .fill(_.sample(colors));
});
