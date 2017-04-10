var draw = SVG('drawing').size(1000, 800)

var group = draw.group().scale(50);

var rect_tl = [[0, 0], [1, 0], [1, 1], [0, 1]];
var rect_cc = [[-0.5, -0.5], [0.5, -0.5], [0.5, 0.5], [-0.5, 0.5]];

// ground
group
  .polygon([[0, 0], [1, 0], [1, 1], [0, 1]])
  .translate(0, 8)
  .scale(20, 8, 0, 0)
  .attr({ fill: '#def' });

// window frame
var window_wall =
  group
    .group()
    .translate(8, 4)
    .scale(5);
window_wall
  .polygon(rect_cc)
  .scale(0.9, 1.1)
  .attr({ fill: '#345' });

// window glass
var window_wall_glass =
  window_wall
    .group()
    .translate(-0.40, -0.50);
window_wall_glass
  .group()
  .translate(0.05, 0.05)
  .polygon(rect_tl)
  .scale(0.30, 0.40, 0, 0)
  .attr({ fill: '#def' });
window_wall_glass
  .group()
  .translate(0.45, 0.05)
  .polygon(rect_tl)
  .scale(0.30, 0.40, 0, 0)
  .attr({ fill: '#def' });
window_wall_glass
  .group()
  .translate(0.05, 0.55)
  .polygon(rect_tl)
  .scale(0.30, 0.40, 0, 0)
  .attr({ fill: '#def' });
window_wall_glass
  .group()
  .translate(0.45, 0.55)
  .polygon(rect_tl)
  .scale(0.30, 0.40, 0, 0)
  .attr({ fill: '#def' });

// Inverse shadow
var inverse_shadow =
  group
    .group()
    .translate(7, 9)
    .scale(5)
    .skew(25, 0)
inverse_shadow
  .group()
  .translate(0.05, 0.05)
  .polygon(rect_tl)
  .scale(0.30, 0.40, 0, 0)
  .attr({ fill: '#fff' });
inverse_shadow
  .group()
  .translate(0.45, 0.05)
  .polygon(rect_tl)
  .scale(0.30, 0.40, 0, 0)
  .attr({ fill: '#fff' });
inverse_shadow
  .group()
  .translate(0.05, 0.55)
  .polygon(rect_tl)
  .scale(0.30, 0.40, 0, 0)
  .attr({ fill: '#fff' });
inverse_shadow
  .group()
  .translate(0.45, 0.55)
  .polygon(rect_tl)
  .scale(0.30, 0.40, 0, 0)
  .attr({ fill: '#fff' });

/////

var lastTime;

var update = function (ms) {
  var f = Math.sin(Math.PI / 2 - 0.2 + lastTime / 5000);
  inverse_shadow.translate(6 + f, 9);
  inverse_shadow.skew(f * 25, 0);
}

var callback = function (ms) {
  if (lastTime) {
    update((ms-lastTime)/1000);
  }

  lastTime = ms;
  requestAnimationFrame(callback);
}

callback();
