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
        console.log($height);
    });
});