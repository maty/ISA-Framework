$('.dropdown-menu').find('form').click(function (e) {
    e.stopPropagation();
  });

$('.carousel').carousel({
  pause: true,
  interval: false
});
//Fix z-index youtube video embedding
$(document).ready(function (){
    $('iframe').each(function(){
        var url = $(this).attr("src");
        $(this).attr("src",url+"?wmode=transparent");
    });


$('iframe').each(function() {
  var url = $(this).attr("src");
  if ($(this).attr("src").indexOf("?") > 0) {
    $(this).attr({
      "src" : url + "&wmode=transparent",
      "wmode" : "Opaque"
    });
  }
  else {
    $(this).attr({
      "src" : url + "?wmode=transparent",
      "wmode" : "Opaque"
    });
  }
});

});

//adding a class to the open accordion
    $('.panel').on('show.bs.collapse', function () {
         $(this).find(".panel-title").addClass('active');
    });

    $('.panel').on('hide.bs.collapse', function () {
         $(this).find(".panel-title").removeClass('active');
    });

//carousel video stop

var $myCarousel = $("#slideshow");
$myCarousel.on("slide.bs.carousel", function (event) {
  var $currentSlide = $myCarousel.find(".active iframe.vimeoplayer");

  // exit if there's no iframe, i.e. if this is just an image and not a video player
  if ($currentSlide.length) { 
    // pass that iframe into Froogaloop, and call api("pause") on it.
    var playerV = Froogaloop($currentSlide[0]);
    playerV.api("pause"); 
  }
  else{
      var $currentSlide = $myCarousel.find(".active .ytplayer");
      if (!$currentSlide.length) { 
          return; 
      }
      var frame_id = $currentSlide.attr("id");
      callPlayer(frame_id,"pauseVideo");
  }
});

function callPlayer(frame_id, func, args) {
    if (window.jQuery && frame_id instanceof jQuery) frame_id = frame_id.get(0).id;
    var iframe = document.getElementById(frame_id);
    if (iframe && iframe.tagName.toUpperCase() != 'IFRAME') {
        iframe = iframe.getElementsByTagName('iframe')[0];
    }
    if (iframe) {
        // Frame exists, 
        iframe.contentWindow.postMessage(JSON.stringify({
            "event": "command",
            "func": func,
            "args": args || [],
            "id": frame_id
        }), "*");
    }
}


