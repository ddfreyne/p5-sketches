var w = 900;
var h = 900;

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

var project = function (pt) {
  var fov = 500;

	var scale = fov/(fov + pt.z);
	var x2d = pt.x * scale;
	var y2d = pt.y * scale;

  return { x: x2d, y: y2d, z: pt.z };
}

var transform = function (pt, mat) {
  var res = math.multiply([pt.x, pt.y, pt.z, 1], mat).toArray();
  return { x: res[0], y: res[1], z: res[2] };
}

/////

var mat1 = gen_mat_rotx(0.0);
var mat2 = gen_mat_roty(0.6);
var mat3 = gen_mat_rotz(0.0);
var mat = math.multiply(math.multiply(mat1, mat2), mat3);

var coords_world = [
  { x:   0, y:   0, z:  100 },
  { x: 400, y:   0, z:  100 },
  { x: 400, y: 400, z:  100 },
  { x:   0, y: 400, z:  100 },
  { x:   0, y:   0, z:  100 },
  null,

  { x:   0, y:   0, z:  200 },
  { x: 400, y:   0, z:  200 },
  { x: 400, y: 400, z:  200 },
  { x:   0, y: 400, z:  200 },
  { x:   0, y:   0, z:  200 },
  null,

  { x:   0, y:   0, z:  300 },
  { x: 400, y:   0, z:  300 },
  { x: 400, y: 400, z:  300 },
  { x:   0, y: 400, z:  300 },
  { x:   0, y:   0, z:  300 },
  null,

  { x:   0, y:   0, z:  400 },
  { x: 400, y:   0, z:  400 },
  { x: 400, y: 400, z:  400 },
  { x:   0, y: 400, z:  400 },
  { x:   0, y:   0, z:  400 },
  null,

  { x:   0, y:   0, z:  500 },
  { x: 400, y:   0, z:  500 },
  { x: 400, y: 400, z:  500 },
  { x:   0, y: 400, z:  500 },
  { x:   0, y:   0, z:  500 },
  null,

  { x:   0, y:   0, z:  600 },
  { x: 400, y:   0, z:  600 },
  { x: 400, y: 400, z:  600 },
  { x:   0, y: 400, z:  600 },
  { x:   0, y:   0, z:  600 },
  null,

  { x:   0, y:   0, z:  700 },
  { x: 400, y:   0, z:  700 },
  { x: 400, y: 400, z:  700 },
  { x:   0, y: 400, z:  700 },
  { x:   0, y:   0, z:  700 },
  null,

  { x:   0, y:   0, z:  800 },
  { x: 400, y:   0, z:  800 },
  { x: 400, y: 400, z:  800 },
  { x:   0, y: 400, z:  800 },
  { x:   0, y:   0, z:  800 },
  null,

  { x:   0, y:   0, z:  900 },
  { x: 400, y:   0, z:  900 },
  { x: 400, y: 400, z:  900 },
  { x:   0, y: 400, z:  900 },
  { x:   0, y:   0, z:  900 },
  null,

  { x:   0, y:   0, z: 1000 },
  { x: 400, y:   0, z: 1000 },
  { x: 400, y: 400, z: 1000 },
  { x:   0, y: 400, z: 1000 },
  { x:   0, y:   0, z: 1000 },
  null,

  { x:   0, y:   0, z: 1100 },
  { x: 400, y:   0, z: 1100 },
  { x: 400, y: 400, z: 1100 },
  { x:   0, y: 400, z: 1100 },
  { x:   0, y:   0, z: 1100 },
  null,

  { x:   0, y:   0, z: 1200 },
  { x: 200, y:   0, z: 1200 },
  { x: 200, y: 200, z: 1200 },
  { x:   0, y: 200, z: 1200 },
  { x:   0, y:   0, z: 1200 },
  null,

  { x:   0, y:   0, z: 1300 },
  { x: 200, y:   0, z: 1300 },
  { x: 200, y: 200, z: 1300 },
  { x:   0, y: 200, z: 1300 },
  { x:   0, y:   0, z: 1300 },
  null,

  { x:   0, y:   0, z: 1400 },
  { x: 200, y:   0, z: 1400 },
  { x: 200, y: 200, z: 1400 },
  { x:   0, y: 200, z: 1400 },
  { x:   0, y:   0, z: 1400 },
  null,

  { x:   0, y:   0, z: 1500 },
  { x: 200, y:   0, z: 1500 },
  { x: 200, y: 200, z: 1500 },
  { x:   0, y: 200, z: 1500 },
  { x:   0, y:   0, z: 1500 },
  null,

  { x:   0, y:   0, z: 1600 },
  { x: 200, y:   0, z: 1600 },
  { x: 200, y: 200, z: 1600 },
  { x:   0, y: 200, z: 1600 },
  { x:   0, y:   0, z: 1600 },
  null,

  { x:   0, y:   0, z: 1700 },
  { x: 200, y:   0, z: 1700 },
  { x: 200, y: 200, z: 1700 },
  { x:   0, y: 200, z: 1700 },
  { x:   0, y:   0, z: 1700 },
  null,

  { x:   0, y:   0, z: 1800 },
  { x: 200, y:   0, z: 1800 },
  { x: 200, y: 200, z: 1800 },
  { x:   0, y: 200, z: 1800 },
  { x:   0, y:   0, z: 1800 },
  null,

  { x:   0, y:   0, z: 1900 },
  { x: 200, y:   0, z: 1900 },
  { x: 200, y: 200, z: 1900 },
  { x:   0, y: 200, z: 1900 },
  { x:   0, y:   0, z: 1900 },
  null,

  { x:   0, y:   0, z: 2000 },
  { x: 200, y:   0, z: 2000 },
  { x: 200, y: 200, z: 2000 },
  { x:   0, y: 200, z: 2000 },
  { x:   0, y:   0, z: 2000 },
  null,

  { x:   0, y:   0, z: 2100 },
  { x: 200, y:   0, z: 2100 },
  { x: 200, y: 200, z: 2100 },
  { x:   0, y: 200, z: 2100 },
  { x:   0, y:   0, z: 2100 },
  null,

  { x:   0, y:   0, z: 2200 },
  { x: 200, y:   0, z: 2200 },
  { x: 200, y: 200, z: 2200 },
  { x:   0, y: 200, z: 2200 },
  { x:   0, y:   0, z: 2200 },
  null,

  { x:   0, y:   0, z: 2300 },
  { x: 200, y:   0, z: 2300 },
  { x: 200, y: 200, z: 2300 },
  { x:   0, y: 200, z: 2300 },
  { x:   0, y:   0, z: 2300 },
  null,

  { x:   0, y:   0, z: 2400 },
  { x: 200, y:   0, z: 2400 },
  { x: 200, y: 200, z: 2400 },
  { x:   0, y: 200, z: 2400 },
  { x:   0, y:   0, z: 2400 },
  null,

  { x:   0, y:   0, z: 2500 },
  { x: 200, y:   0, z: 2500 },
  { x: 200, y: 200, z: 2500 },
  { x:   0, y: 200, z: 2500 },
  { x:   0, y:   0, z: 2500 },
  null,
]

coords_world = coords_world.map(function (e) {
  return e && { x: e.x * 2 - 200, y: e.y * 2 - 350, z: e.z + 50 };
});

var coords_screen = coords_world.map((p) => p && project(transform(p, mat)));

var g = draw.group().move(500, 400);
var scale = chroma.scale(['#f30', '#fff']);
with_next(coords_screen.reverse(), function (p1, p2) {
  if (p1 && p2) {
    var f1 = p1.z/2300;
    var f2 = p2.z/2300;
    var f = (f1+f2)/2;

    g
      .line(p1.x, p1.y, p2.x, p2.y)
      .stroke({
        width: (1 - f * 0.5) * 2,
        color: scale(f).hex()
      });
  }
})
