//calculate height

//Initial load of page
//$(document).ready(sizeContent);
$(document).ready();

//Every resize of window
//$(window).resize(sizeContent);

//Dynamically assign height
/*function sizeContent() {
    var newHeight = $("html").height() + "px";
    var newHeightint = $("html").height() - 500 + "px";
    $(".sidebar-box-gral").css("min-height", newHeightint);
}
*/
//BG video functionality
 
 $(function() {
   BV = new $.BigVideo({ useFlashForFirefox: false });
   BV.init();
   
   var Opera = (navigator.userAgent.match(/Opera|OPR\//) ? true : false);
   
   function operaVideoLoader() {
     $('html').addClass('opera');
     videoFallbackStyles();
   }
   
   function videoFallbackStyles() {
     $('#big-video-vid').hide();
     $('html').css({
     'background-color' : 'transparent'
   });
     $('#big-video-wrap').css({
     'background' : 'url(../tdo/video/Fiesta_Gruppit_en_la_discoteca_Silken.jpg) 100% 0 no-repeat',
     'background-attachment' : 'fixed',
     'background-size' : 'cover'
   });
 }
 
 // Control Player
 function videoPlayer() {
   if ( $(window).width() <= 1024 && Modernizr.touch ) {
   videoFallbackStyles();
   } else if(Opera) {
   operaVideoLoader();
   } else {
       BV.show('../tdo/video/Fiesta_Gruppit_en_la_discoteca_Silken.mp4', {
       altSource: '../tdo/video/Fiesta_Gruppit_en_la_discoteca_Silken.ogg',
       ambient: true
    });
    $('.overlay.overlay--mesh').remove();
    $('#big-video-wrap').prepend('<div class="overlay overlay--mesh"></div>');
  }
 }
 
 videoPlayer();
   $(window).resize(videoPlayer);
 });
 
 //Search header
  $('.mg-search-box-trigger').click(function () {
    var sbox = $(this).next();

    // $(this).toggleClass('mg-sb-active');
    $(this).find('i').toggleClass('fa-times');
    sbox.toggleClass('mg-sb-active');

    return false;
  });

//Datepicker

  $('.input-group.mg-check-in').datepicker({
    startDate: "dateToday",
    autoclose: true
  });

  $('.input-group.mg-check-in').on('hide', function (e) {


    if (e.dates.length) {
      var strDate = e.date;
      strDate.setDate(strDate.getDate() + 1);

      // $('.mg-check-out').datepicker('clearDates');
      $('.mg-check-out').datepicker('setStartDate', strDate);
    }

    $(e.currentTarget).removeClass('focus');
    
  });

  $('.input-group.mg-check-in').on('show', function (e) {

    $(e.currentTarget).addClass('focus');
    
  });

  $('.input-group.mg-check-out').on('show', function (e) {

    $(e.currentTarget).addClass('focus');
    
  });

  $('.input-group.mg-check-out').on('hide', function (e) {

    $(e.currentTarget).removeClass('focus');
    
  });

  $('.input-group.mg-check-in').on('changeDate', function (e) {

    if (e.dates.length) {
      var inDate = e.date,
        outDate = $('.mg-check-out').datepicker('getDate');

      if (outDate && inDate >= outDate) {
        $('.mg-check-out').datepicker('clearDates');
      }

    } else {
      $('.mg-check-out').datepicker('clearDates');
    }
  });

  $('.input-group.mg-check-out').datepicker({
    startDate: "dateToday",
    autoclose: true
  });


    // move form search  
      var mq = window.matchMedia( "(max-width: 767px)" );
      if (mq.matches) {
            $(function() {
              $("#mg-search-box-cont").appendTo("#searchOnly");
            });  
      }
      else {
        $(function() {
              $("#mg-search-box-cont").appendTo("#searchAll");
        });  
      }        

      $(window).resize(function() {
          var width = $(document).width();
          if (width < 767) {
            $(function() {
              $("#mg-search-box-cont").appendTo("#searchOnly");
            });  
          }
          else {
            $(function() {
              $("#mg-search-box-cont").appendTo("#searchAll");
            });  
          }        
      });
