// preloader
$(window).load(function () {
    $('#status').fadeOut();
    $('#preloader').delay(300).fadeOut('slow');
});

// slowscroll
$(document).ready(function(){
    $('a[href*=#]').bind("click", function(e){
        var anchor = $(this);
    $('html, body').stop().animate({
        scrollTop: $(anchor.attr('href')).offset().top
    }, 1000);
        e.preventDefault();
    });
        return false;

});



$(function () {
    $(window).scroll(function () {
        if ($(this).scrollTop() != 0) {
            $('#scroll-up').fadeIn();
        }
        else {
            $('#scroll-up').fadeOut();
        }
    });
});
new WOW().init();