var interp = function (a, b, f) {
  return a * f + b * (1 - f);
}

var interp_pt = function (a, b, f) {
  return { x: interp(a.x, b.x, f), y: interp(a.y, b.y, f) };
}

var draw = SVG('drawing').size(800, 800)

var tr_left  = { x: -1, y: 1 };
var tr_right = { x:  1, y: 1 };

var tr_top1  = { x: 0, y: -0.8660254037844387 };
var tr_top2  = interp_pt(tr_top1, tr_left, 0.75);
var tr_top3  = interp_pt(tr_top1, tr_left, 0.50);
var tr_top4  = interp_pt(tr_top1, tr_left, 0.25);

var colors = chroma.bezier(['#f60', '#fc0']).scale().colors(4);

var group = draw.group().scale(300).translate(draw.width() / 2, draw.height() / 2);

var path1 = group
  .polygon([tr_left.x, tr_left.y, tr_right.x, tr_right.y, tr_top1.x, tr_top1.y])
  .attr({ fill: colors[0] });

var path2 = group
  .polygon([tr_left.x, tr_left.y, tr_right.x, tr_right.y, tr_top2.x, tr_top2.y])
  .attr({ fill: colors[1] });

var path3 = group
  .polygon([tr_left.x, tr_left.y, tr_right.x, tr_right.y, tr_top3.x, tr_top3.y])
  .attr({ fill: colors[2] });

var path4 = group
  .polygon([tr_left.x, tr_left.y, tr_right.x, tr_right.y, tr_top4.x, tr_top4.y])
  .attr({ fill: colors[3] });

/////

var lastTime;

var update = function (ms) {
  var f = (Math.sin(lastTime / 1550) ** 4 / 2 + 1.0) / 2 + 0.5;
  var new_pt = interp_pt(tr_top1, tr_left, f / 2 + 0.25);
  path2.plot([tr_left.x, tr_left.y, tr_right.x, tr_right.y, new_pt.x, new_pt.y]);

  var f = (Math.sin(lastTime / 1400) ** 4 / 2 + 1.0) / 2 + 0.5;
  var new_pt = interp_pt(tr_top1, tr_left, f / 2 + 0);
  path3.plot([tr_left.x, tr_left.y, tr_right.x, tr_right.y, new_pt.x, new_pt.y]);

  var f = (Math.sin(lastTime / 1300) ** 4 / 2 + 1.0) / 2 + 0.5;
  var new_pt = interp_pt(tr_top1, tr_left, f / 2 - 0.25);
  path4.plot([tr_left.x, tr_left.y, tr_right.x, tr_right.y, new_pt.x, new_pt.y]);
}

var callback = function (ms) {
  if (lastTime) {
    update((ms-lastTime)/1000);
  }

  lastTime = ms;
  requestAnimationFrame(callback);
}

callback();
