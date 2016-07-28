$(document).ready(main);

var contador = 1;

function main (){
    $('.menu_bar').click(function(){
        $("nav").toggleClass("open-nav");
        if (contador == 1){
            $('nav').animate({
                height: '320px'
            });
            contador = 0;
        } else {
            contador = 1;
            $('nav').animate({
                height: '60px'
            });
        };
        
    });
};

