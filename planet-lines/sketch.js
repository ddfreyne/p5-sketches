var w = 1200;
var h = 800;

var draw = SVG('drawing').size(w, h);

_.times(40, function (i) {
  var r = i * 20;

  draw
    .circle(r*2)
    .stroke({ color: '#f06', width: 5 })
    .fill('none')
    .move(w/2 - r, h/2 - r);

  var angle = Math.random() * 2 * 3.1415;

  var mini_r = 10;
  draw
    .circle(mini_r)
    .stroke({ color: '#f06', width: 5 })
    .fill('#fff')
    .move(w/2 + Math.sin(angle) * r - mini_r/2, h/2 + Math.cos(angle) * r - mini_r/2);
});
