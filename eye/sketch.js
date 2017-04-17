var w = 900;
var h = 900;

var draw = SVG('drawing').size(w, h);

draw.rect(w, h).fill({ color: '#000' });

var eye_width = 400;
var eye_height = 300;

var iris_radius = 200;
var pupil_radius = 30;

var start_open = false;

var g = draw.group().move(w/2 - eye_width/2, h/2 - eye_height/2);

var gen_path_def = function (is_open) {
  return `M0 ${eye_height/2} q${eye_width/2} ${(is_open ? -1 : 1) * eye_height/2} ${eye_width} 0 q${-eye_width/2} ${eye_height/2} ${-eye_width} 0 z`;
}

var path =
  g
    .path(gen_path_def(start_open))
    .fill('#fff')
    .stroke({ color: '#f06', width: 8, linecap: 'round', linejoin: 'round' })

var mask_path =
  g
    .path(gen_path_def(start_open))
    .fill('#fff')
    .stroke({ color: '#000', width: 8, linecap: 'round', linejoin: 'round' })

var mask =
  g
    .mask()
    .add(mask_path);

var radial = draw.gradient('radial', function(stop) {
	stop.at(0, '#fff')
  stop.at(1, '#0cf')
});

var iris =
  g
    .circle(iris_radius)
    .fill(radial)
    .move(eye_width/2 - iris_radius/2, eye_height/2 - iris_radius/2)
    .maskWith(mask)

var pupil =
  g
    .circle(pupil_radius)
    .fill({ color: '#000' })
    .move(eye_width/2 - pupil_radius/2, eye_height/2 - pupil_radius/2)
    .maskWith(mask)

var ease_eye = function (t) {
  var r = (-Math.cos(t * Math.PI) / 2) + 0.5;
  return 1.0 - r ** 300;
}

path
  .animate({ duration: '2s', ease: ease_eye, reverse: true })
  .plot(gen_path_def(!start_open))
  .loop(true, true);

mask_path
  .animate({ duration: '2s', ease: ease_eye, reverse: true })
  .plot(gen_path_def(!start_open))
  .loop(true, true);

var ease_pupil = function (t) {
  var r = (-Math.cos(t * Math.PI) / 2) + 0.5;
  return (r ** 20 * 2 - 1);
}

iris
  .animate({ duration: '1.5s', ease: ease_pupil, reverse: true })
  .move(eye_width/2 - iris_radius/2 - iris_radius/5, eye_height/2 - iris_radius/2)
  .loop(true, true);

pupil
  .animate({ duration: '1.5s', ease: ease_pupil, reverse: true })
  .move(eye_width/2 - pupil_radius/2 - iris_radius/4 - pupil_radius/5, eye_height/2 - pupil_radius/2)
  .loop(true, true)
