$("a.fancyimage").fancybox({
    padding: 0,
    helpers: {
        overlay: {
            locked: false
        }
    }
}); 

$(window).load(function() {
		$('#status').fadeOut();
		$('#preloader').delay(300).fadeOut('slow');
	});

$(document).ready(function(){
    $('a[href*=#]').bind("click", function(e){
        var anchor = $(this);
    $('html, body').stop().animate({
        scrollTop: $(anchor.attr('href')).offset().top-50
    }, 1000);
        e.preventDefault();
    });
        return false;

});

$(".portfolio-collapse").click(function() {
    $(this).hide();
})

$(function() {
    $(window).scroll(function() {
        if($(this).scrollTop() != 0) {
            $('#scroll-up').fadeIn();
        } else {
            $('#scroll-up').fadeOut();
        }
    });
    
    new WOW() .init();
});