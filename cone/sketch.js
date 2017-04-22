var w = 750;
var h = 750;

var draw = SVG('drawing').size(w, h);

draw.rect(w, h).fill({ color: '#000' });

var edgeCount = 23;
var ell_w = 200;
var ell_h = 200;
var cone_h = 300;

var dy = h/2 - cone_h;
var g = draw.group().move(w/2, dy);

var start_for = function (dt) {
  return { x: 0, y: cone_h + Math.cos(dt / 1000) * cone_h };
}

var end_for = function (i, edgeCount, dt) {
  var pureAngle = 2 * i / edgeCount * Math.PI;
  var angle = pureAngle + dt / 700;

  var mod = Math.cos(dt / 1000 + Math.PI / 2);
  var ell_h_mod = ell_h * mod;

  return {
    x: Math.cos(angle) * ell_w,
    y: cone_h + Math.sin(angle) * ell_h_mod,
    color: '#f09',
    opacity: 1,
  };
};

var edges = _.range(0, edgeCount).map(function (i) {
  var start = start_for(0);
  var end = end_for(i, edgeCount, 0);
  return g.line(start.x, start.y, end.x, end.y).stroke({ color: end.color, opacity: end.opacity, width: 2 });
});

var update = function (ms, msTot) {
  var start = start_for(msTot);
  edges.forEach(function (edge, i) {
    var end = end_for(i, edgeCount, msTot);
    edge.plot(start.x, start.y, end.x, end.y).stroke({ color: end.color, opacity: end.opacity, width: 2 });
  });
}

var lastTime;

var callback = function (ms) {
  if (lastTime) {
    update((ms-lastTime)/1000, ms);
  }

  lastTime = ms;
  requestAnimationFrame(callback);
}

callback();
