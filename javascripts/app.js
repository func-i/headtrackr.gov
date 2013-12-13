var videoInput = $('#inputVideo')[0];
var canvasInput = $('#inputCanvas')[0];

var htracker = new headtrackr.Tracker();
htracker.init(videoInput, canvasInput);
htracker.start();

var defaultHeadMiddle = {
  top: 12.0,
  left: 0.0
};

var defaultHeadBounds = {
  top: 14.0,
  left: 8.0
};

var defaultRotationAngleBounds = {
  top: 45,
  left: 60
};

$(function() {

  var windowWidth  = $(window).innerWidth();
  var windowHeight = $(window).innerHeight();
  var xMiddle      = (windowWidth / 2);
  var yMiddle      = (windowHeight / 2);

  document.addEventListener('headtrackingEvent', function (ev) {
    $('li').each(function() {
      var elemPosition = $(this).offset();
      var elemLeft = elemPosition.left;
      var elemTop = elemPosition.top;

      var xElemOffset = (elemLeft - xMiddle) / windowWidth;
      var yElemOffset = (elemTop - yMiddle) / windowHeight;

      var headLeft = ev.x;
      var headTop = ev.y;

      var xHeadOffset, yHeadOffset;

      if (headLeft > defaultHeadBounds.left) {
        xHeadOffset = 1.0;
      } else if (headLeft < -defaultHeadBounds.left) {
        xHeadOffset = -1.0;
      } else {
        xHeadOffset = (headLeft - defaultHeadMiddle.left) / defaultHeadBounds.left;
      }

      if (headTop > defaultHeadBounds.top) {
        yHeadOffset = 1.0;
      } else if (headTop < -defaultHeadBounds.top) {
        yHeadOffset = -1.0;
      } else {
        yHeadOffset = (headTop - defaultHeadMiddle.top) / defaultHeadBounds.top;
      }

      var leftRotationAngle = (xHeadOffset - xElemOffset) * (defaultRotationAngleBounds.left / 2);
      var topRotationAngle = (yHeadOffset - yElemOffset) * (defaultRotationAngleBounds.top / 2);

      $(this).css('webkitTransform', "rotateX("+topRotationAngle+"deg) rotateY("+leftRotationAngle+"deg)");
    });
  });
});