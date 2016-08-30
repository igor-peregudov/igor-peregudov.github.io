$(window).load(function() {
		$('#status').fadeOut();
		$('#preloader').delay(300).fadeOut('slow');
	});

$("a.fancyimage").fancybox({
    padding: 0
    , helpers: {
        overlay: {
            locked: false
        }
    }
});
$(window).scroll(function () {
    if (window.scrollY > 70) {
        $('.logo-min').show(300);
    }
    else {
        $('.logo-min').hide(300);
    }
});
$(document).ready(function () {
    $('.new-arrival').slick({
        vertical: true
        , verticalSwiping: true
        , adaptiveHeight: true
        , focusOnSelect: false
        , slidesToShow: 4
        , autoplay: true
        , draggable: true
        , autoplaySpeed: 2000
        , responsive: [{
            breakpoint: 768
            , settings: {
                draggable: false
            }
            }]
    });
    $('.single-item-slider-items').slick({
        vertical: true
        , verticalSwiping: true
        , adaptiveHeight: true
        , focusOnSelect: false
        , slidesToShow: 3
        , autoplay: true
        , draggable: true
        , autoplaySpeed: 2000
        , responsive: [{
            breakpoint: 768
            , settings: {
                draggable: false
            }
            }]
    });
    $('.our-partners').slick({
        adaptiveHeight: true
        , infinite: true
        , focusOnSelect: false
        , slidesToShow: 4
        , draggable: true
        , swipeToSlide: true
        , autoplay: true
        , autoplaySpeed: 2000
        , responsive: [{
            breakpoint: 768
            , settings: {
                slidesToShow: 2
                , slidesToScroll: 1
            }
            }]
    });
    $('.our-replies').slick({
        adaptiveHeight: true
        , infinite: true
        , slidesToShow: 6
        , autoplay: false
        , autoplaySpeed: 2000
        , responsive: [{
            breakpoint: 768
            , settings: {
                slidesToShow: 2
                , slidesToScroll: 1
            }
            }]
    });
    $('.category-item-single').slick({
        slidesToShow: 1
    });
});

new WOW() .init();

$('.not-found-link-error-img').hover(
        function() {
            $(this).addClass('animated jello');
        },
        function() {
            $(this).removeClass('animated jello');
        }
    );