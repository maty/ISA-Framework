/*var topBar = function () {
   $( document.body ).on( function (){

        var initialShowTime = 3000;
        var backtrackDistance = 100;
        var showClassName = 'show';
        var aboveTheFoldClassName = 'above-the-fold';

        var animator = $( '.article' ).data( 'animator' );
        var lastScrollPosition = 0;
        var showReason = null;

        var show = function( reason ){
            showReason = reason;
            $( '.spark-header' ).addClass( showClassName );
        };

        var hide = function(){
            showReason = null;
            $( '.spark-header' ).removeClass( showClassName );
        }        

        // auto hide at startup
        setTimeout( function(){
            $( '.spark-header' ).removeClass( showClassName );
        }, initialShowTime );


        // show the bar on hover
        $( document ).on( 'vmousemove', function( e ){
            if ( e.pageY <= $( '.spark-header' ).height() ){
                show( 'mousemove' );
            } else {
                if ( showReason == 'mousemove' ){
                    hide();
                }
            }
        });

        animator.$element.on( 'article-scroll', function ( e ){
            var viewportHeight = window.innerHeight;
            var newScrollPosition = animator.scrollTop();
            var distanceDelta = newScrollPosition - lastScrollPosition;


            // detect if we're above the fold or not
            if ( newScrollPosition < viewportHeight ){
                $( '.spark-header' ).addClass( aboveTheFoldClassName );
            } else {
                $( '.spark-header' ).removeClass( aboveTheFoldClassName );
            }

            // only show the bar if you scroll back a certain distance
            if ( distanceDelta < 0 ){
                if ( landmarkScrollPosition < 0 ){
                    landmarkScrollPosition = newScrollPosition;
                }

                if ( landmarkScrollPosition - newScrollPosition > backtrackDistance ){
                    $( '.spark-header' ).addClass( showClassName );
                }
            } else if ( distanceDelta > 0 ){
                landmarkScrollPosition = -1;
                $( '.spark-header' ).removeClass( showClassName );
            }

            lastScrollPosition = newScrollPosition;

                    
        });


    });
};
*/

if (document.addEventListener) { 
   document.addEventListener("DOMContentLoaded", inicializar, false);
}

function inicializar(){

        var initialShowTime = 3000;
        var backtrackDistance = 100;
        var showClassName = 'show';
        var aboveTheFoldClassName = 'above-the-fold';
        var animator = $( '.article' ).data( 'animator' );
        var lastScrollPosition = 0;
        var showReason = null;

                        

        var show = function( reason ){
            showReason = reason;
            $( '.spark-header' ).addClass( showClassName );
        };

        var hide = function(){
            showReason = null;
            $( '.spark-header' ).removeClass( showClassName );
        }   	

        // show the bar on hover
        $( document ).on( 'vmousemove', function( e ){
            if ( e.pageY <= $( '.spark-header' ).height() ){
                show( 'mousemove' );
            } else {
                if ( showReason == 'mousemove' ){
                    hide();
                }
            }
        });

        // auto hide at startup
        setTimeout( function(){
            $( '.spark-header' ).removeClass( showClassName );
        }, initialShowTime );


window.onload = function() {

   $( document.body ).on( function (){

        var animator = $( '.article' ).data( 'animator' );

        animator.$element.on( 'article-scroll', function ( e ){
        var aboveTheFoldClassName = 'above-the-fold';

            var viewportHeight = window.innerHeight;
            var newScrollPosition = animator.scrollTop();
            var lastScrollPosition = 0;
            var distanceDelta = newScrollPosition - lastScrollPosition;
                    var showClassName = 'show';




            // detect if we're above the fold or not
            if ( newScrollPosition < viewportHeight ){
                $( '.spark-header' ).addClass( aboveTheFoldClassName );
            } else {
                $( '.spark-header' ).removeClass( aboveTheFoldClassName );
            }

            // only show the bar if you scroll back a certain distance
            if ( distanceDelta < 0 ){
                if ( landmarkScrollPosition < 0 ){
                    landmarkScrollPosition = newScrollPosition;
                }

                if ( landmarkScrollPosition - newScrollPosition > backtrackDistance ){
                    $( '.spark-header' ).addClass( showClassName );
                }
            } else if ( distanceDelta > 0 ){
                landmarkScrollPosition = -1;
                $( '.spark-header' ).removeClass( showClassName );
            }

            lastScrollPosition = newScrollPosition;

                    
        });


    });

}

}   
