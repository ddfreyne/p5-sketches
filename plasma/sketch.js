var w = 750;
var h = 750;

var draw = SVG('drawing').size(w, h);

draw.rect(w, h).fill({ color: '#000' });

var worldSize = 29;
var world = _.range(0, worldSize).map((_) => new Array(worldSize).fill(0));

var colorScale = chroma.scale(['#000', '#444', '#0fc', '#06c', '#93c', '#f3c', '#f09', '#f3c', '#f6f', '#fff']).mode('lab');

world.forEach(function (line, iy) {
  line.forEach(function (e, ix) {
    world[ix][iy] = {
      val: 0.1,
      r1: 0.2,
      r2: 0,
    };
  })
})

var g = draw.group().move(20, 20);

var sq_s = 20;
var spacing = 5;

world.forEach(function (line, iy) {
  line.forEach(function (e, ix) {
    world[ix][iy].shape = g
      .rect(
        sq_s * world[ix][iy].val,
        sq_s * world[ix][iy].val
      )
      .move(
        (1 - world[ix][iy].val) * sq_s * 0.5 + ix * (sq_s + spacing),
        (1 - world[ix][iy].val) * sq_s * 0.5 + iy * (sq_s + spacing)
      )
      .fill('none')
      .stroke({ color: '#000', width: 2 });
  });
});

var update = function (ms, msTot) {
  world.forEach(function (line, iy) {
    line.forEach(function (e, ix) {
      world[ix][iy].r1 += _.random(-0.2, 0.2, true);
    });
  });

  world.forEach(function (line, iy) {
    line.forEach(function (e, ix) {
      var avg = 0;
      var count = 0;

      if (ix > 0) {
        avg += world[ix-1][iy].r1;
        count += 1;
      }

      if (iy > 0) {
        avg += world[ix][iy-1].r1;
        count += 1;
      }

      if (ix < worldSize - 1) {
        avg += world[ix+1][iy].r1;
        count += 1;
      }

      if (iy < worldSize - 1) {
        avg += world[ix][iy+1].r1;
        count += 1;
      }

      avg += world[ix][iy].r1;

      world[ix][iy].r2 = avg / (1 + count);
    });
  });

  world.forEach(function (line, iy) {
    line.forEach(function (e, ix) {
      world[ix][iy].r1 = world[ix][iy].r2;
    });
  });

  world.forEach(function (line, iy) {
    line.forEach(function (e, ix) {
      world[ix][iy].val = _.clamp(world[ix][iy].r2, 0, 1.5);

      world[ix][iy].shape.size(
        sq_s * world[ix][iy].val,
        sq_s * world[ix][iy].val
      );

      world[ix][iy].shape.stroke({ color: colorScale(world[ix][iy].r2).hex() });

      world[ix][iy].shape.move(
        (1 - world[ix][iy].val) * sq_s * 0.5 + ix * (sq_s + spacing),
        (1 - world[ix][iy].val) * sq_s * 0.5 + iy * (sq_s + spacing)
      );
    });
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
