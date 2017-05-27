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
      [1, 0, 0, 0],
      [0, cos(a), -sin(a), 0],
      [0, sin(a), cos(a), 0],
      [0, 0, 0, 1],
    ]
  );
};

var gen_mat_roty = function (a) {
  var cos = Math.cos;
  var sin = Math.sin;

  return math.matrix(
    [
      [cos(a), 0, sin(a), 0],
      [0, 1, 0, 0],
      [-sin(a), 0, cos(a), 0],
      [0, 0, 0, 1],
    ]
  );
};

var gen_mat_rotz = function (a) {
  var cos = Math.cos;
  var sin = Math.sin;

  return math.matrix(
    [
      [cos(a), -sin(a), 0, 0],
      [sin(a), cos(a), 0, 0],
      [0, 0, 1, 0],
      [0, 0, 0, 1],
    ]
  );
};

var project = function (pt) {
  var fov = 1500;

  var scale = fov / (fov + pt.z);
  var x2d = pt.x * scale;
  var y2d = pt.y * scale;

  return { x: x2d, y: y2d, z: pt.z };
}

var transform = function (pt, mat) {
  var res = math.multiply([pt.x, pt.y, pt.z, 1], mat).toArray();
  return { x: res[0], y: res[1], z: res[2] };
}

/////

var polygons_world =
  _.map(_.range(200, 10000, 200), (function (z) {
    return _.range(-5000, 5000, 100).map(function (x, i) {
      return { x: x, y: 200, z: z + (i % 2 == 0 ? 100 : -100) };
    })
  })).reverse();

polygons_world = polygons_world.map(function (polygon) {
  return polygon.map(function (e) {
    return e && { x: e.x - 500, y: e.y + 100, z: e.z - 500 };
  });
})

var g = draw.group().move(450, 300);

///

var mat1 = gen_mat_rotx(-0.08);
var mat2 = gen_mat_roty(0.3);
var mat3 = gen_mat_rotz(0.0);
var mat = math.multiply(math.multiply(mat3, mat2), mat1);

polygons_world.forEach(function (coords_world, i) {
  var coords_screen = coords_world.map((p) => p && project(transform(p, mat)));

  var polygon_coords = coords_screen.map(function (e) {
    return [e.x, e.y];
  })

  var x_start = _.min(polygon_coords.map((e) => e[0]));
  var x_end = _.max(polygon_coords.map((e) => e[0]));
  polygon_coords.unshift([x_start, h]);
  polygon_coords.push([x_end, h]);

  g.polygon(polygon_coords).fill(i % 2 == 0 ? '#000' : '#fff');
});

var a = [
  { x: -1000, y: -1000, z: 5000 },
  { x: -1000, y: 200, z: 5000 },
  { x: 5000, y: 200, z: 5000 },
  { x: 5000, y: -1000, z: 5000 },
].map((e) => project(transform(e, mat))).map((e) => [e.x, e.y]);
g.polygon(a).fill('#af1133');

var a = [
  { x: 2000, y: -1000, z: 100 },
  { x: 2000, y: 200, z: 100 },
  { x: 2000, y: 200, z: 5000 },
  { x: 2000, y: -1000, z: 5000 },
].map((e) => project(transform(e, mat))).map((e) => [e.x, e.y]);
g.polygon(a).fill('#a81133');
