var videoInput = $('#inputVideo')[0];
var canvasInput = $('#inputCanvas')[0];

var htracker = new headtrackr.Tracker();
htracker.init(videoInput, canvasInput);
htracker.start();

var defaultHeadMiddle = {
  top: 13.0,
  left: 0.0
};

var defaultHeadBounds = {
  top: 2.0,
  left: 8.0
};

var defaultRotationAngleBounds = {
  top: 45,
  left: 60
};

var defaultShadowDistance = 10;

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

      var xElemOffset = (elemLeft - xMiddle) / xMiddle;
      var yElemOffset = (yMiddle - elemTop) / yMiddle;

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

      if (headTop > (defaultHeadMiddle.top + defaultHeadBounds.top)) {
        yHeadOffset = 1.0;
      } else if (headTop < (defaultHeadMiddle.top - defaultHeadBounds.top)) {
        yHeadOffset = -1.0;
      } else {
        yHeadOffset = (headTop - defaultHeadMiddle.top) / defaultHeadBounds.top;
      }

      var leftRotationAngle = Math.round((xHeadOffset - xElemOffset) * (defaultRotationAngleBounds.left / 2));
      var topRotationAngle = Math.round((yHeadOffset - yElemOffset) * (defaultRotationAngleBounds.top / 2));

      var leftShadow = Math.round(xHeadOffset * -defaultShadowDistance);
      var topShadow = Math.round(yHeadOffset * defaultShadowDistance);

      $(this).css('webkitTransform', "rotateX("+topRotationAngle+"deg) rotateY("+leftRotationAngle+"deg)");
      $(this).children('i').css('textShadow', leftShadow+"px "+topShadow+"px 10px rgba(20, 20, 20, 1)");
    });
  });
});