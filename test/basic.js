var test = require('tape');
var iiSlider = require('../app/src/js/iiSlider.js')();

test('test opt', function(t) {
  t.plan(5);
  t.ok(iiSlider);
  t.ok(iiSlider.setup);
  t.ok(iiSlider.makeup);
  t.ok(iiSlider.build);
  t.ok(iiSlider.auto);
})


