function adjustStyle(width) {
    width = parseInt(width);
    if (width < 701) {
        $("#size-stylesheet").attr("href", "/template-meda/css/narrow.css");
    } else if ((width >= 701) && (width < 975)) {
        $("#size-stylesheet").attr("href", "/template-meda/css/medium.css");
    } else {
       $("#size-stylesheet").attr("href", "/template-meda/css/wide.css"); 
    }
}

$(function() {
    adjustStyle($(this).width());
    $(window).resize(function() {
        adjustStyle($(this).width());
    });
});
