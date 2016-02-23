// Initialize collapse button
$('.button-collapse').sideNav({
      menuWidth: 300, // Default is 240
      edge: 'right', // Choose the horizontal origin
      closeOnClick: false // Closes side-nav on <a> clicks, useful for Angular/Meteor
    }
  );

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
     'background' : 'url(../video/Fiesta_Gruppit_en_la_discoteca_Silken.jpg) 100% 0 no-repeat',
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
       BV.show('../video/Fiesta_Gruppit_en_la_discoteca_Silken.mp4', {
       altSource: '../video/Fiesta_Gruppit_en_la_discoteca_Silken.ogg',
       ambient: true
    });
    $('.overlay.overlay--mesh').remove();
    $('#big-video-wrap').prepend('<div class="overlay overlay--mesh"></div>');
  }
 }
 
 videoPlayer();
   $(window).resize(videoPlayer);
 });


// navigation 

 $(window).scroll(function() {
        var t = $(".navbar-fixed");
        window.pageYOffset > 50 ? t.addClass("always-show z-depth-1") : (t.removeClass("always-show z-depth-1"), t.fadeIn()), $(".mobile-nav--opener").hasClass("active");
    });

// datepicker

  $('.datepicker, .datepicker-sidebar').pickadate({
    selectMonths: true, 
    selectYears: 15 
  }); 


 $(document).ready(function() {
// select
    $('select').material_select();

//parallax
 $('.parallax').parallax();    

// comments 
     $( "#more_info" ).on('click',function(){
        $('.comments-container').addClass('comments-container-active');
      });  

    $('.icon_close').on('click',function(){
      $(".comments-container").removeClass('comments-container-active');  
      });

//setHeight
      var e = $(window).height();
          t = e - $(".content-middle .nav-filters").height();
      $(".first-seccion").css("height", t + 32 + "px");

  });  

// search 

  $('.search-form-li').on('click',function(e){
    e.stopPropagation();
    $('.search-form-li').find('#initSearchIcon').addClass('hide');
    $('.search-form-wrap').removeClass('hide').find('input.search').focus();
  });

  $(window).on('click',function(){
    $('.search-form-li').find('#initSearchIcon').removeClass('hide');
    $('.search-form-wrap').addClass('hide');
  }); 




 
