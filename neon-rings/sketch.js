var draw = SVG('drawing').size(800, 600)

// background

draw.rect(800, 600).fill({ color: '#111' }).back();

// rainbows

var drawRainbow = function (draw, cx, cy, width, height, ellipseWidth, color) {
  var dx = cx - width / 2;
  var dy = cy - height / 2;
  var group = draw.group().translate(dx, dy);

  var mask = group.group();
  mask.rect(width, height).fill({ color: '#fff' });
  mask.ellipse(width - 2*ellipseWidth, height - 2*ellipseWidth).move(ellipseWidth, ellipseWidth).fill({ color: '#000' });

  var rainbow = group.ellipse(width, height).fill({ color: color });
  return rainbow.maskWith(mask);
}

var group = draw.group().translate(400, 300).group().scale(0.7, 0.4).skew(0, -20);

drawRainbow(group, 0, 0, 1000, 1000, 20,  '#c0f').opacity(0.15);
drawRainbow(group, 0, 0, 900, 900, 20,  '#c0f').opacity(0.5);
drawRainbow(group, 0, 0, 900, 900, 60,  '#c0f').opacity(0.2);
drawRainbow(group, 0, 0, 640, 640, 50,  '#f06').opacity(0.5);
drawRainbow(group, 0, 0, 600, 600, 20,  '#f06');
drawRainbow(group, 0, 0, 500, 500, 10,  '#f60');
drawRainbow(group, 0, 0, 450, 450, 5,   '#0fd');
drawRainbow(group, 0, 0, 445, 445, 25,  '#0fd').opacity(0.3);
drawRainbow(group, 0, 0, 200, 200, 25,  '#0cf');
drawRainbow(group, 0, 0, 250, 250, 45,  '#0cf').opacity(0.3);
