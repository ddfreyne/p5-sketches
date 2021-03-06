var draw = SVG('drawing').size(1000, 800)

draw.rect(1000, 800).fill({ color: '#333' });

draw
  .path(
    'M300 0 ' +
    'v 300 ' +
    'a 50 50 0 1 0 100 0 ' +
    'v -100 ' +
    'a 50 50 0 1 1 100 0 ' +
    'v 300 ' +
    'a 50 50 0 1 0 100 0 ' +
    'v -50 ' +
    'a 50 50 0 0 1 50 -50 ' +
    'a 50 50 0 0 0 50 -50 ' +
    'V0 ' +
    'z'
  )
  .fill('#f06')

draw
  .path(
    'M300 500 ' +
    'a 50 50 0 0 1 100 0 ' +
    'v 100 ' +
    'a 50 50 0 0 1 -100 0 ' +
    'v -100 ' +
    'z'
  )
  .fill('#f06')
