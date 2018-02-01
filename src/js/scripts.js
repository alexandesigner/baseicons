/*
* alexandesigner - Base Icons v0.2.0
*/

(function() {
  var iconset, _i, _len, _ref;

  _ref = document.getElementsByClassName('iconset');
  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    iconset = _ref[_i];
    iconset.addEventListener('click', function(event) {
      if (event.target.tagName === 'INPUT') {
        return event.target.select();
      }
    });
  }

}).call(this);
