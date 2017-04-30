var w = 900;
var h = 900;

var draw = SVG('drawing').size(w, h).group().move(50, 50);

var tot = 65;
var off = 13;

var scale = chroma.scale(['#eee', '#000', '#000', '#f09', '#000', '#666', '#eee', '#fff']);

_.times(tot, function (x) {
  var f = x/(tot+1);
  var angle = f * 2 * Math.PI;

  draw
    .circle(800 - x*off, 800 - x*off)
    .stroke({ color: scale(f).hex(), width: 1.5 })
    .fill('none')
    .move(
      x*off/2 + Math.sin(angle) * 30,
      x*off/2 + (Math.cos(Math.PI + angle) + 1) * 30
    );
});
