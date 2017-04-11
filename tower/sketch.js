var draw = SVG('drawing').size(800, 600)

var group = draw.group().translate(0, 400);

draw.rect(300, 80).fill({ color: '#fff' }).move(-200, 0).rotate(45).back();
draw.rect(300, 80).fill({ color: '#fff' }).move(0, 0).rotate(45).back();
draw.rect(300, 80).fill({ color: '#fff' }).move(200, 0).rotate(45).back();
draw.rect(300, 80).fill({ color: '#fff' }).move(400, 0).rotate(45).back();
draw.rect(300, 80).fill({ color: '#fff' }).move(600, 0).rotate(45).back();

draw.rect(800, 400).fill({ color: '#def' }).back();

group.line(0, 0, 800, 0).stroke({ width: 3, color: '#f06' });

var count = 30;

group
  .polyline([200, 0, 200, -4*(count-1), 500, -12*(count-1), 600, -8*(count-1), 600, 0])
  .stroke('none')
  .fill('#fff');

_.times(30, function (i) {
  group
    .polyline([200, -4*i, 500, -12*i, 600, -8*i])
    .stroke({ width: 3, color: '#f06' })
    .fill('none');
});

/////

var lastTime;

var update = function (ms) {
}

var callback = function (ms) {
  if (lastTime) {
    update((ms-lastTime)/1000);
  }

  lastTime = ms;
  requestAnimationFrame(callback);
}

callback();
