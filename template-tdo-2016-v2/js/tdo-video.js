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





 
