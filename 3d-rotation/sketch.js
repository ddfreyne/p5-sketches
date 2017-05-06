var w = 800;
var h = 800;

var draw = SVG('drawing').size(w, h);

var with_next = function (arr, fn) {
  _.forEach(_.zip(arr, _.drop(arr, 1)), (pair) => fn(pair[0], pair[1]));
}

var gen_mat_rotx = function (a) {
  var cos = Math.cos;
  var sin = Math.sin;

  return math.matrix(
    [
      [ 1,       0,       0,       0],
      [ 0,       cos(a), -sin(a),  0],
      [ 0,       sin(a),  cos(a),  0],
      [ 0,       0,       0,       1],
    ]
  );
};

var gen_mat_roty = function (a) {
  var cos = Math.cos;
  var sin = Math.sin;

  return math.matrix(
    [
      [ cos(a),  0,       sin(a),  0],
      [ 0,       1,       0,       0],
      [-sin(a),  0,       cos(a),  0],
      [ 0,       0,       0,       1],
    ]
  );
};

var gen_mat_rotz = function (a) {
  var cos = Math.cos;
  var sin = Math.sin;

  return math.matrix(
    [
      [ cos(a), -sin(a),  0,       0],
      [ sin(a),  cos(a),  0,       0],
      [ 0,       0,       1,       0],
      [ 0,       0,       0,       1],
    ]
  );
};

var project = function (pt, mat) {
  var res = math.multiply([pt.x, pt.y, pt.z, 1], mat).toArray();
  return { x: res[0], y: res[1] };
}

/////

var mat1 = gen_mat_rotx(0.9);
var mat2 = gen_mat_roty(0.5);
var mat3 = gen_mat_rotz(-0.3);
var mat = math.multiply(math.multiply(mat1, mat2), mat3);

var coords_world = [
  { x:   0, y:   0, z:   0 },
  { x: 200, y:   0, z:   0 },
  { x: 200, y: 200, z:   0 },
  { x: 200, y: 200, z: 200 },
  { x: 200, y:   0, z: 200 },
  { x:   0, y:   0, z: 200 },
  { x:   0, y: 200, z: 200 },
  { x:   0, y: 200, z:   0 },
  { x:   0, y:   0, z:   0 },
]

var coords_screen = coords_world.map((p) => project(p, mat));

var lines = [];
var g = draw.group().move(400, 400);

var i = 0;
with_next(coords_screen, function (p1, p2) {
  if (p2) {
    lines.push([i, g.line(p1.x, p1.y, p2.x, p2.y).stroke({ width: 2, color: '#f90' })]);
  }
  i += 1;
})

var start = null;

function step (timestamp) {
  if (!start) {
    start = timestamp;
  }

  var ms_elapsed = timestamp - start;

  var mat1 = gen_mat_rotx(ms_elapsed / 1700);
  var mat2 = gen_mat_roty(ms_elapsed / 1500);
  var mat3 = gen_mat_rotz(-ms_elapsed / 1300);
  var mat = math.multiply(math.multiply(mat1, mat2), mat3);

  var coords_screen = coords_world.map((p) => project(p, mat));

  lines.forEach(function (l) {
    var idx = l[0];
    var line = l[1];

    var p1 = coords_screen[idx];
    var p2 = coords_screen[idx+1];

    line.plot(p1.x, p1.y, p2.x, p2.y);
  })

  window.requestAnimationFrame(step);
}

window.requestAnimationFrame(step);
