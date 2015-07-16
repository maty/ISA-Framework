function adjustStyle(width) {
    width = parseInt(width);
    if (width < 701) {
        $("#size-stylesheet").attr("href", "http://app.travelideas.es/template-inlegis/css/narrow.css");
    } else if ((width >= 701) && (width < 975)) {
        $("#size-stylesheet").attr("href", "http://app.travelideas.es/template-inlegis/css/medium.css");
    } else {
       $("#size-stylesheet").attr("href", "http://app.travelideas.es/template-inlegis/css/wide.css"); 
    }
}

$(function() {
    adjustStyle($(this).width());
    $(window).resize(function() {
        adjustStyle($(this).width());
    });
});
