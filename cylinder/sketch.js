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

var coords_world = [
  { x: 100 * Math.cos(Math.PI * 0.0), y: 200, z: 100 * Math.sin(Math.PI * 0.0) },
  { x: 100 * Math.cos(Math.PI * 0.1), y: 200, z: 100 * Math.sin(Math.PI * 0.1) },
  { x: 100 * Math.cos(Math.PI * 0.2), y: 200, z: 100 * Math.sin(Math.PI * 0.2) },
  { x: 100 * Math.cos(Math.PI * 0.3), y: 200, z: 100 * Math.sin(Math.PI * 0.3) },
  { x: 100 * Math.cos(Math.PI * 0.4), y: 200, z: 100 * Math.sin(Math.PI * 0.4) },
  { x: 100 * Math.cos(Math.PI * 0.5), y: 200, z: 100 * Math.sin(Math.PI * 0.5) },
  { x: 100 * Math.cos(Math.PI * 0.6), y: 200, z: 100 * Math.sin(Math.PI * 0.6) },
  { x: 100 * Math.cos(Math.PI * 0.7), y: 200, z: 100 * Math.sin(Math.PI * 0.7) },
  { x: 100 * Math.cos(Math.PI * 0.8), y: 200, z: 100 * Math.sin(Math.PI * 0.8) },
  { x: 100 * Math.cos(Math.PI * 0.9), y: 200, z: 100 * Math.sin(Math.PI * 0.9) },
  { x: 100 * Math.cos(Math.PI * 1.0), y: 200, z: 100 * Math.sin(Math.PI * 1.0) },
  { x: 100 * Math.cos(Math.PI * 1.1), y: 200, z: 100 * Math.sin(Math.PI * 1.1) },
  { x: 100 * Math.cos(Math.PI * 1.2), y: 200, z: 100 * Math.sin(Math.PI * 1.2) },
  { x: 100 * Math.cos(Math.PI * 1.3), y: 200, z: 100 * Math.sin(Math.PI * 1.3) },
  { x: 100 * Math.cos(Math.PI * 1.4), y: 200, z: 100 * Math.sin(Math.PI * 1.4) },
  { x: 100 * Math.cos(Math.PI * 1.5), y: 200, z: 100 * Math.sin(Math.PI * 1.5) },
  { x: 100 * Math.cos(Math.PI * 1.6), y: 200, z: 100 * Math.sin(Math.PI * 1.6) },
  { x: 100 * Math.cos(Math.PI * 1.7), y: 200, z: 100 * Math.sin(Math.PI * 1.7) },
  { x: 100 * Math.cos(Math.PI * 1.8), y: 200, z: 100 * Math.sin(Math.PI * 1.8) },
  { x: 100 * Math.cos(Math.PI * 1.9), y: 200, z: 100 * Math.sin(Math.PI * 1.9) },
  { x: 100 * Math.cos(Math.PI * 0.0), y: 200, z: 100 * Math.sin(Math.PI * 0.0) },

  { x: 100 * Math.cos(Math.PI * 0.0), y: 200, z: 100 * Math.sin(Math.PI * 0.0) },
  { x: 100 * Math.cos(Math.PI * 0.0), y: 0, z: 100 * Math.sin(Math.PI * 0.0) },
  null,
  { x: 100 * Math.cos(Math.PI * 0.1), y: 200, z: 100 * Math.sin(Math.PI * 0.1) },
  { x: 100 * Math.cos(Math.PI * 0.1), y: 0, z: 100 * Math.sin(Math.PI * 0.1) },
  null,
  { x: 100 * Math.cos(Math.PI * 0.2), y: 200, z: 100 * Math.sin(Math.PI * 0.2) },
  { x: 100 * Math.cos(Math.PI * 0.2), y: 0, z: 100 * Math.sin(Math.PI * 0.2) },
  null,
  { x: 100 * Math.cos(Math.PI * 0.3), y: 200, z: 100 * Math.sin(Math.PI * 0.3) },
  { x: 100 * Math.cos(Math.PI * 0.3), y: 0, z: 100 * Math.sin(Math.PI * 0.3) },
  null,
  { x: 100 * Math.cos(Math.PI * 0.4), y: 200, z: 100 * Math.sin(Math.PI * 0.4) },
  { x: 100 * Math.cos(Math.PI * 0.4), y: 0, z: 100 * Math.sin(Math.PI * 0.4) },
  null,
  { x: 100 * Math.cos(Math.PI * 0.5), y: 200, z: 100 * Math.sin(Math.PI * 0.5) },
  { x: 100 * Math.cos(Math.PI * 0.5), y: 0, z: 100 * Math.sin(Math.PI * 0.5) },
  null,
  { x: 100 * Math.cos(Math.PI * 0.6), y: 200, z: 100 * Math.sin(Math.PI * 0.6) },
  { x: 100 * Math.cos(Math.PI * 0.6), y: 0, z: 100 * Math.sin(Math.PI * 0.6) },
  null,
  { x: 100 * Math.cos(Math.PI * 0.7), y: 200, z: 100 * Math.sin(Math.PI * 0.7) },
  { x: 100 * Math.cos(Math.PI * 0.7), y: 0, z: 100 * Math.sin(Math.PI * 0.7) },
  null,
  { x: 100 * Math.cos(Math.PI * 0.8), y: 200, z: 100 * Math.sin(Math.PI * 0.8) },
  { x: 100 * Math.cos(Math.PI * 0.8), y: 0, z: 100 * Math.sin(Math.PI * 0.8) },
  null,
  { x: 100 * Math.cos(Math.PI * 0.9), y: 200, z: 100 * Math.sin(Math.PI * 0.9) },
  { x: 100 * Math.cos(Math.PI * 0.9), y: 0, z: 100 * Math.sin(Math.PI * 0.9) },
  null,
  { x: 100 * Math.cos(Math.PI * 1.0), y: 200, z: 100 * Math.sin(Math.PI * 1.0) },
  { x: 100 * Math.cos(Math.PI * 1.0), y: 0, z: 100 * Math.sin(Math.PI * 1.0) },
  null,
  { x: 100 * Math.cos(Math.PI * 1.1), y: 200, z: 100 * Math.sin(Math.PI * 1.1) },
  { x: 100 * Math.cos(Math.PI * 1.1), y: 0, z: 100 * Math.sin(Math.PI * 1.1) },
  null,
  { x: 100 * Math.cos(Math.PI * 1.2), y: 200, z: 100 * Math.sin(Math.PI * 1.2) },
  { x: 100 * Math.cos(Math.PI * 1.2), y: 0, z: 100 * Math.sin(Math.PI * 1.2) },
  null,
  { x: 100 * Math.cos(Math.PI * 1.3), y: 200, z: 100 * Math.sin(Math.PI * 1.3) },
  { x: 100 * Math.cos(Math.PI * 1.3), y: 0, z: 100 * Math.sin(Math.PI * 1.3) },
  null,
  { x: 100 * Math.cos(Math.PI * 1.4), y: 200, z: 100 * Math.sin(Math.PI * 1.4) },
  { x: 100 * Math.cos(Math.PI * 1.4), y: 0, z: 100 * Math.sin(Math.PI * 1.4) },
  null,
  { x: 100 * Math.cos(Math.PI * 1.5), y: 200, z: 100 * Math.sin(Math.PI * 1.5) },
  { x: 100 * Math.cos(Math.PI * 1.5), y: 0, z: 100 * Math.sin(Math.PI * 1.5) },
  null,
  { x: 100 * Math.cos(Math.PI * 1.6), y: 200, z: 100 * Math.sin(Math.PI * 1.6) },
  { x: 100 * Math.cos(Math.PI * 1.6), y: 0, z: 100 * Math.sin(Math.PI * 1.6) },
  null,
  { x: 100 * Math.cos(Math.PI * 1.7), y: 200, z: 100 * Math.sin(Math.PI * 1.7) },
  { x: 100 * Math.cos(Math.PI * 1.7), y: 0, z: 100 * Math.sin(Math.PI * 1.7) },
  null,
  { x: 100 * Math.cos(Math.PI * 1.8), y: 200, z: 100 * Math.sin(Math.PI * 1.8) },
  { x: 100 * Math.cos(Math.PI * 1.8), y: 0, z: 100 * Math.sin(Math.PI * 1.8) },
  null,
  { x: 100 * Math.cos(Math.PI * 1.9), y: 200, z: 100 * Math.sin(Math.PI * 1.9) },
  { x: 100 * Math.cos(Math.PI * 1.9), y: 0, z: 100 * Math.sin(Math.PI * 1.9) },
  null,
  { x: 100 * Math.cos(Math.PI * 0.0), y: 200, z: 100 * Math.sin(Math.PI * 0.0) },
  { x: 100 * Math.cos(Math.PI * 0.0), y: 0, z: 100 * Math.sin(Math.PI * 0.0) },
  null,

  { x: 100 * Math.cos(Math.PI * 0.0), y: 0, z: 100 * Math.sin(Math.PI * 0.0) },
  { x: 100 * Math.cos(Math.PI * 0.1), y: 0, z: 100 * Math.sin(Math.PI * 0.1) },
  { x: 100 * Math.cos(Math.PI * 0.2), y: 0, z: 100 * Math.sin(Math.PI * 0.2) },
  { x: 100 * Math.cos(Math.PI * 0.3), y: 0, z: 100 * Math.sin(Math.PI * 0.3) },
  { x: 100 * Math.cos(Math.PI * 0.4), y: 0, z: 100 * Math.sin(Math.PI * 0.4) },
  { x: 100 * Math.cos(Math.PI * 0.5), y: 0, z: 100 * Math.sin(Math.PI * 0.5) },
  { x: 100 * Math.cos(Math.PI * 0.6), y: 0, z: 100 * Math.sin(Math.PI * 0.6) },
  { x: 100 * Math.cos(Math.PI * 0.7), y: 0, z: 100 * Math.sin(Math.PI * 0.7) },
  { x: 100 * Math.cos(Math.PI * 0.8), y: 0, z: 100 * Math.sin(Math.PI * 0.8) },
  { x: 100 * Math.cos(Math.PI * 0.9), y: 0, z: 100 * Math.sin(Math.PI * 0.9) },
  { x: 100 * Math.cos(Math.PI * 1.0), y: 0, z: 100 * Math.sin(Math.PI * 1.0) },
  { x: 100 * Math.cos(Math.PI * 1.1), y: 0, z: 100 * Math.sin(Math.PI * 1.1) },
  { x: 100 * Math.cos(Math.PI * 1.2), y: 0, z: 100 * Math.sin(Math.PI * 1.2) },
  { x: 100 * Math.cos(Math.PI * 1.3), y: 0, z: 100 * Math.sin(Math.PI * 1.3) },
  { x: 100 * Math.cos(Math.PI * 1.4), y: 0, z: 100 * Math.sin(Math.PI * 1.4) },
  { x: 100 * Math.cos(Math.PI * 1.5), y: 0, z: 100 * Math.sin(Math.PI * 1.5) },
  { x: 100 * Math.cos(Math.PI * 1.6), y: 0, z: 100 * Math.sin(Math.PI * 1.6) },
  { x: 100 * Math.cos(Math.PI * 1.7), y: 0, z: 100 * Math.sin(Math.PI * 1.7) },
  { x: 100 * Math.cos(Math.PI * 1.8), y: 0, z: 100 * Math.sin(Math.PI * 1.8) },
  { x: 100 * Math.cos(Math.PI * 1.9), y: 0, z: 100 * Math.sin(Math.PI * 1.9) },
  { x: 100 * Math.cos(Math.PI * 0.0), y: 0, z: 100 * Math.sin(Math.PI * 0.0) },
]

coords_world = coords_world.map(function (e) {
  return e && { x: e.x * 3, y: e.y - 100, z: e.z * 3 };
});

var g = draw.group().move(450, 450);

///

var render = function (coords_world, rotx, roty, rotz, lines) {
  var mat1 = gen_mat_rotx(rotx);
  var mat2 = gen_mat_roty(roty);
  var mat3 = gen_mat_rotz(rotz);
  var mat = math.multiply(math.multiply(mat3, mat2), mat1);

  var coords_screen = coords_world.map((p) => p && project(transform(p, mat)));

  var lines = lines || [];
  var i = 0;
  with_next(coords_screen.reverse(), function (p1, p2) {
    if (p1 && p2) {
      var f1 = (p1.z + 300)/1000;
      var f2 = (p2.z + 300)/1000;
      var f = (f1+f2)/2;

      if (lines[i]) {
        lines[i]
          .plot(p1.x, p1.y, p2.x, p2.y)
          .stroke({
            width: Math.pow((1 - f), 2) * 5,
          })
      } else {
        lines.push(
          g
            .line(p1.x, p1.y, p2.x, p2.y)
            .stroke({
              width: Math.pow((1 - f), 2) * 5,
              color: '#f06',
              linecap: 'round',
            })
        )
      }

      i += 1;
    }
  });
}

///

var lines = [];
render(coords_world, 0.0, 0.0, 0.0, lines);

var update = function (ms, msTot) {
  render(coords_world, Math.PI/2 + msTot/10000, msTot/800, 0.0, lines);
};

var lastTime;

var callback = function (ms) {
  if (lastTime) {
    update((ms-lastTime)/1000, ms);
  }

  lastTime = ms;
  requestAnimationFrame(callback);
}

callback();
