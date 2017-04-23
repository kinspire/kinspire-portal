var setHeight = function () {
    var bgHeight = $("#portal-background").height();
    $("#portal-content")
        .css("max-height", bgHeight)
        .css("min-height", bgHeight);
};

$(window).on("load", setHeight).on("resize", setHeight);
