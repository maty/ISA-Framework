$(document).on('ready', inicio);

function inicio(){
    $('.btn-stripe').on('click', function(e){
        e.preventDefault();
        $('.stripe-button-el').click();
    });
	$('.personaje-dropdown').each(function(){
		$(this).dropdown();
	});
	$('#foto_dedicatoria').on('change', subirFotoDedicatoria);
    $('#subir-foto-btn').on('click', function(){
        $('#foto_dedicatoria').click();
    });

    $('.next_step').on('click', function(){
        $(this).parent().parent().find('[type="submit"]').trigger('click');
    });

    $('.campos_complejos_radio div').on('click', function(){
        $(this).parent().find('div').each(function(){
            $(this).find('img').removeClass('active');
        });
        $(this).find('img').addClass('active');
    });

    $('#aplicar_codigo_promocional').on('click', aplicarDescuento);

    //$('#pais_comprador').dropdown();
    //$('#pais_envio').dropdown();
    
    /*setTimeout(function(){
        $('#email-modal').modal('show');
    }, 15000);*/
    
    $('#locale_switcher_select').dropdown({onOptionSelect: cambiarPais});

    if($('input[name=locale]').length > 0){
        $('#locale_switcher > .cd-dropdown > span').addClass($('input[name=locale]').val());
        $('#locale_switcher .cd-dropdown li[data-value="'+$('input[name=locale]').val()+'"]').hide();
        $('<div id="yo-soy-flecha"><i class="fa fa-sort-desc"></i></div>').appendTo('#locale_switcher > .cd-dropdown .'+$('input[name=locale]').val());
    }

    if($('.real-field > .complex-field .cd-dropdown').length > 0){
        console.log("SI");
        $('.real-field > .complex-field').each(function(){
            $('<i class="fa fa-sort-desc"></i>').appendTo($(this).find('.cd-dropdown > span'));
        });
    }

    $('#simple-menu').sidr();

    if($('.section').length>0){
        $('#fullpage').fullpage({
            css3: false,
            anchors: ['inicio', 'nuestros_libros', 'como_funciona', 'contacto'],
            menu: '#menu',
            autoScrolling: false
        });
    }


    if($('.info_nene img').length>0){
        $('.info_nene img').each(function(){
            titulo = $(this).prop('title');
            console.log(titulo);
            $(this).after('<p class="super-titulo">'+titulo+'</p>');
        });
    }
}


function cambiarPais(){
    setTimeout(function() {
        $('#locale_switcher').submit();
    }, 500);
}

/**
 * Función para subir la foto vía AJAX, para que se vea directamente 
 * sin tener que recargar la página. IE9+ 
 */
function subirFotoDedicatoria(e){
    if(supportFormData()){
        $('.fase4 .foto .imagen').css('background-image', 'none');
        $("<img src='/static/img/preload.gif' class='preload-dedicatoria' />").appendTo('.imagen');
        e.preventDefault();
        var formData = new FormData($('#form-dedicatoria')[0]);
        var csrftoken = getCookie('csrftoken');
        $.ajax({
            type: 'POST',
            url: $('#form-dedicatoria').prop('action'),
            data: formData,
            contentType: false,
            processData: false,
            crossDomain: false, 
            beforeSend: function(xhr, settings) {
                if (!csrfSafeMethod(settings.type)) {
                    xhr.setRequestHeader("X-CSRFToken", csrftoken);
                }
            },
            success: function(data) {
            	console.log(data);
                if($.trim(data) == '0'){
                    alert("No se ha podido subir la foto.");
                }else if($.trim(data) == '1'){
                	alert("No");
                }else{
                    $("<img src='/media/dedicatoria/"+$.trim(data)+"' class='preview-dedicatoria' />").appendTo('.imagen');
                    window.location.href = $('#recortar-foto').prop('href');
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
    			alert(xhr.status + " - " + thrownError);
    	    }
        });
    }else{
        alert("El navegador no es compatible. Descarga una nueva versión o Google Chrome.");
    }

}




function aplicarDescuento(e){
    e.preventDefault();
    var formData = $('.bono_promocional input').val();
    var csrftoken = getCookie('csrftoken');
    $.ajax({
        type: 'POST',
        url: '/aplicar-descuento/' + formData,
        data: formData,
        contentType: "application/x-www-form-urlencoded",
        processData: false,
        crossDomain: false, 
        beforeSend: function(xhr, settings){
            if(!csrfSafeMethod(settings.type)){
                xhr.setRequestHeader("X-CSRFToken", csrftoken);
            }
        },
        success: function(data) {
            console.log(data);
            if(data.descuento == "0"){
                alert(data.mensage);
            }else{
                precio_libro = $('.precio_libro .result h6').text();
                precio_libro = texto2Money(precio_libro);
                descuento_num = calcularDescuento(precio_libro, data.descuento);
                descuento = money2Texto(descuento_num);
                $('<div class="precio_descuento"> <div class="tag"><h6>Descuento</h6></div> <div class="result"><h6> -'+descuento+'</h6></div> </div>').insertAfter('.factura .precio_envio');
                
                precio_libro_final = precio_libro - descuento_num
                envio = texto2Money($('.precio_envio .result h6').text());
                precio_con_envio = precio_libro_final + envio

                console.log("Precio con envio: " + precio_con_envio);

                precio_final = precio_con_envio;
                $('.precio_total .result h6').text(money2Texto(precio_final));

            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert(xhr.status + " - " + thrownError);
        }
    });

}


function texto2Money(cantidad){
    var precio = cantidad
    precio = precio.replace('€', '');
    precio = precio.replace('$', '');
    precio = precio.replace('₤', '');
    precio = precio.replace('¥', '');
    precio = precio.replace('¢', '');
    precio = precio.replace('£', '');
    var value = parseFloat(precio.replace(",", "."));
    return value;
}


function money2Texto(cantidad){
    precio = cantidad + "";
    precio = precio.replace(".", ",");
    return precio + $('#moneda_usando').val();
}


function calcularDescuento(cantidad, porcentaje){
    total = (cantidad * parseInt(porcentaje)) / 100
    total = total.toFixed(2);
    return total;
}

/**
 * Función para ver el soporte de FormData.
 */
function supportFormData() {
    return !! window.FormData;
}

/**************************************************************
 * Funciones para enviar el token CSRF junto a la peticion AJAX
 * Una vez puestas estas funciones, en la petición AJAX hemos de
 * incluir crossDomain: false, y el beforeSend.
 * https://docs.djangoproject.com/en/dev/ref/contrib/csrf/#ajax
 **************************************************************/

 function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

function csrfSafeMethod(method) {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}


$(window).on("resize", function(event){
    if($('body').hasClass('sidr-open') && $(window).width() >= 768) {
        $.sidr('close');
    }
});