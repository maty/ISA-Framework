// masonry

    var $container = $('#product .row, #nosotros .row, #seo .row, #container');
 
      $container.imagesLoaded(function(){
        $container.masonry({
          itemSelector: '.col, .column',
	      columnWidth: '.col, .column',
        });
      });
