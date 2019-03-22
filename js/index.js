$(document).ready(function () {
    $(window).scroll(function () {
        var $height = $(window).scrollTop();
        if ($height > 5) {
            $('nav').addClass('nav-scrolled');
            $(".logo.white").hide();
            $(".logo.red").show();
        } else {
            $('nav').removeClass('nav-scrolled');
            $(".logo.white").show();
            $(".logo.red").hide();
        }
    });

    var e = document.getElementById("surveyFrame");
    if (e != null) {
        alert(e.contentWindow.document.body.innerHTML);
    }
    console.log(e);

    var f = $("#surveyFrame").contents().find("body").html();
    console.log(f);
});