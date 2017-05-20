var w = 1000;
var h = 600;

var draw = SVG('drawing').size(w, h);

// ground + sky

draw.rect(1000, 400).fill('#666').move(0, 300);
draw.rect(1000, 300).fill('#ccc').move(0, 0);

var tot = 10;
_.times(tot, function (i) {
  draw.rect(400, 70).fill('#fff').move(-270 + i * 190, 0).rotate(140);
});

// top

var g = draw.group().move(0, -95);

var tot = 100;
_.times(tot, function (i) {

  g.circle(6).move(12.5 + i * 20, 120).fill('#000');
  g.circle(9).move(i * 20, 110).fill('#000');
  g.circle(13).move(7.5 + i * 20, 100).fill('#000');
  g.circle(17).move(-5 + i * 20, 85).fill('#000');
});

// bottom

var g = draw.group().move(0, 465);

var tot = 100;
_.times(tot, function (i) {

  g.circle(6).move(12.5 + i * 20, 90).fill('#000');
  g.circle(9).move(i * 20, 100).fill('#000');
  g.circle(13).move(7.5 + i * 20, 110).fill('#000');
  g.circle(17).move(-5 + i * 20, 125).fill('#000');
});
