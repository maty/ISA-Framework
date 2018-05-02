
(function($) {

   var $ = jQuery;
   $("a[href='#anchor']").click(function (e) {
     $('html,body').animate({
       scrollTop: $("#anchor").offset().top
     }, '500', 'swing' );
     return false;
   });

})(jQuery);
