var w = 1375;
var h = 800;

var draw = SVG('drawing').size(w, h)

var gradient = draw.gradient('linear', function (stop) {
  stop.at(0, '#f20')
  stop.at(1, '#fa0')
}).from(0, 0).to(1, 1)

draw.rect(w, h).fill(gradient);

var new_len = function () {
  return _.sample([0, 0, 100, 100, 100, 100, 100, 200, 200, 200, 200, 500, 800]);
}

var ell = function (draw, length, color) {
  return draw
    .path(
    'M0 0 ' +
    'a 50 50 0 0 1 100 0 ' +
    'v ' + length + ' ' +
    'a 50 50 0 0 1 -100 0 ' +
    'v -' + length + ' ' +
    'z'
    )
    .fill(color)
}

_.times(17, function (x) {
  var g1 = draw.group().move(25 + x * 80, 0).scale(0.5);

  var start = -200;
  _.times(15, function (i) {
    var len = new_len();
    var color = _.sample(['#222', '#333', '#333', '#333', '#333', '#333', '#444', '#fff']);
    ell(g1, len, color).move(0, start);
    start += len + 150;
  })
});
