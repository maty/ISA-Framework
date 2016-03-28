// Initialize collapse button
$('.button-collapse').sideNav({
      menuWidth: 300, // Default is 240
      edge: 'right', // Choose the horizontal origin
      closeOnClick: false // Closes side-nav on <a> clicks, useful for Angular/Meteor
    }
  );


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
      //var e = $(window).height();
          //t = e - $(".content-middle .nav-filters").height();
      //$(".first-seccion").css("height", t + 32 + "px");
      //$(".first-seccion").css("height", e + "px");

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

// detect cssfilters 

Modernizr.addTest('cssfilters', function() {
    el = document.createElement('div');
    el.style.cssText = Modernizr._prefixes.join('filter' + ':blur(5px); ');
    return !!el.style.length && ((document.documentMode === undefined || document.documentMode > 9));
});




 
