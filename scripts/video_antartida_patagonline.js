/* Requires: html5shiv, jquery, Video.js, Imagesloaded, jQuery UI, BigVideo, Modernizr */

function leadPagesOnLoadFn() {
    function getUrlVars() {
        var vars = {};
        var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) {
            vars[key] = value;
        });
        return vars;
    }
    var url_vars = getUrlVars();
    if (url_vars['leadpages-e']) {
        var elements = document.querySelectorAll('[data-lb-inputemail="true"]');
        for (var i in elements) {
            elements[i].value = decodeURIComponent(url_vars['leadpages-e']);
        }
    }
    if (url_vars['leadpages-fn']) {
        var elements = document.querySelectorAll('[data-lb-inputfirstname="true"]');
        for (var i in elements) {
            elements[i].value = decodeURIComponent(url_vars['leadpages-fn']);
        }
    }
}

function leadPagesFadeInElement(elm, timeout) {
    setTimeout(function() {
        elm.style.opacity = 0;
        elm.style.display = 'block';
        leadPagesChangeOpacity(elm, 1);
    }, timeout);
}

function leadPagesChangeOpacity(elm, toOpacity) {
    var opacity = parseFloat(elm.style.opacity);
    var change = toOpacity - opacity;
    var total = opacity + (change / 2);
    var opacity_value = Math.round(total * Math.pow(10, 3)) / Math.pow(10, 3);
    elm.style.filter = 'alpha(opacity=' + (opacity_value * 100) + ')';
    elm.style.opacity = opacity_value;

    function c() {
        leadPagesChangeOpacity(elm, toOpacity);
    }
    if (change == 0) {
        clearTimeout(timer);
        return;
    }
    timer = setTimeout(c, 100);
};

function leadPagesIsValidEmail(main_form, field_name) {
    if (!main_form.elements.namedItem(field_name)) {
        return true;
    }
    var onEmailError = function() {
        main_form.elements.namedItem(field_name).focus();
        alert('Please enter valid email!');
    }
    var email = main_form.elements.namedItem(field_name).value;
    if (!email) {
        onEmailError();
        return false;
    }
    if (email == main_form.elements.namedItem(field_name).title) {
        onEmailError();
        return false;
    }
    if (!email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {
        onEmailError();
        return false;
    }
    return true;
};
var leadpages_input_data = {
    "'mobile-source'": "http://www.patagonline.com/v/img_mov.jpg",
    "'image-source'": "http://www.patagonline.com/v/img_back.jpg",
    "'video-source'": "http://app.travelideas.es/static/Antarpply.mp4"    
};
var template_data = {
    'video-source': 'http://app.travelideas.es/static/Antarpply.mp4',
    'image-source': 'https://s3.amazonaws.com/template-resources/2.0/video/time-lapse-street.png',
    'mobile-source': 'https://s3.amazonaws.com/template-resources/2.0/video/time-lapse-street.jpg'
};

function sanitize_input_data() {
    var prop, key, data = {};
    for (prop in leadpages_input_data) {
        key = prop.replace(/^\s*\'|\"/, '').replace(/\'|\"\s*$/, '');
        data[key] = leadpages_input_data[prop];
    }
    return data;
}

function get_data(key) {
    var input_data = sanitize_input_data();
    return input_data[key] || template_data[key];
}
$(function() {
    $('input.field').each(function() {
        var self = $(this);
        var title = self.attr('title');
        var value = self.val();
        if (title && !value) {
            self.val(title);
        }
    }).on('focusin', function() {
        var self = $(this);
        var title = self.attr('title');
        var value = self.val();
        if (title && value && value === title) {
            self.val('');
        }
    }).on('focus out', function() {
        var self = $(this);
        var title = self.attr('title');
        var value = self.val();
        if (title && !value) {
            self.val(title);
        }
    });
});

var BV;

$(function() {
    $(document).ready(leadPagesOnLoadFn);
    function showPage() {
        $('#big-video-wrap').css({
            opacity: 0
        });
        $('#big-video-wrap').animate({
            opacity: 1
        }, 2500);
    }
    BV = new $.BigVideo();
    BV.init();
    if (Modernizr.touch) {
        BV.show(get_data('mobile-source'));
        showPage();
    } else {
        BV.show(get_data('video-source'), {
            controls: false,
            doLoop: true,
        });
        BV.getPlayer().ready(function() {
            showPage();
        });
        BV.getPlayer().on('error', function() {
            BV.show(get_data('image-source'));
            showPage();
        });
    }
});
