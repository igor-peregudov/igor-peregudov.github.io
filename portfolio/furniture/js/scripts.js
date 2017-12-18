//$(window).on('load', function() {
//    $('#status').fadeOut();
//    $('#preloader').delay(300).fadeOut('slow');
//});


$(document).ready(function(){
    
    
    $("#cta form").submit(function(e) {
//        e.preventDefault();
    $.ajax({
        type: "GET",
        context: this,
        url: "../mail.php",
        data: $(this).serialize(),
        error: function() {
            console.log("Ошибка!");
        },
        success: function() {
            $('.form__popup').addClass('active').delay(2000).queue(function(){
                $(this).removeClass('active');
                $.dequeue(this);
            });
        }
    });
        return false;
    });
    
    var swiper = new Swiper('.philosophy__slider', {
        pagination: {
            clickable: true
        },
        navigation: {
            nextEl: '.philosophy-button-next',
            prevEl: '.philosophy-button-prev',
        },
        //        loop: true,
        simulateTouch: false
    });
    
    var settingsPopup = {
        delegate: 'a',
        type: 'image',
        tLoading: 'Загрузка...',
        mainClass: 'mfp-img-mobile',
        closeBtnInside: false,
        closeOnContentClick: true,
        gallery: {
            enabled: true,
            preload: [0,1],
            tCounter: '<span class="mfp-counter">%curr% из %total%</span>',
            tNext: 'Следующая фотография',
            tPrev: 'Предыдущая фотография',
        },
        tClose: false,
    };
    
    $('.portfolio__img__slider.active .portfolio__img__wrap .swiper-wrapper').magnificPopup(settingsPopup);
    $('.sert__img').magnificPopup(settingsPopup);
    
    var settingsSlider = {
        spaceBetween: 30,
        slidesPerView: 3.5,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            768: {
                spaceBetween: 15,
              slidesPerView: 1
            },
            990: {
                
                spaceBetween: 15,
                slidesPerView: 2.17
            },
            1200: {
                slidesPerView: 2.35,
                spaceBetween: 30
            }
        }
    };
    
        $('.menu').on('click', function(e){            
            if ($(window).width() <= 991 && e.target.className == 'menu' || e.target.className == 'menu active') {
                $(this).toggleClass('active');
            }
        })
    
    var swiperPortfolio = new Swiper('.portfolio__img__slider.active .portfolio__img__wrap', settingsSlider);
    
    for (var i = 0, len = $('.portfolio__list ul li').length; i < len; i++) {
        $($('.portfolio__list ul li')[i]).attr('data-tab', i)
        $($('.portfolio__img__slider')[i]).attr('data-tab', i)
    }
    
    $('.portfolio__list ul li').on('click', function(){
        var id = $(this).data('tab');
        $('.portfolio__list ul li').removeClass('active');
        $(this).addClass('active')
        $('.portfolio__img__slider').removeClass('active');
        $('.portfolio__img__slider[data-tab='+id+']').addClass('active');
        
        $.magnificPopup.instance.popupsCache = {};
        
        $('.portfolio__img__slider.active .portfolio__img__wrap .swiper-wrapper').magnificPopup(settingsPopup);
        swiperPortfolio.destroy();
        swiperPortfolio = new Swiper('.portfolio__img__slider.active .portfolio__img__wrap', settingsSlider);
    })
    $( window ).resize(function() {
        swiperPortfolio.destroy();
        swiperPortfolio = new Swiper('.portfolio__img__slider.active .portfolio__img__wrap', settingsSlider);
        if ($(window).width() >= 991) {
            $('.menu').removeClass('active');
        }
    });
    
    $('#menu__wrap a, a.main-screen__btn').on('click', function (e) {
		e.preventDefault();
		var id  = $(this).attr('href'),
			top = $(id).offset().top;
		
		$('body,html').animate({scrollTop: top}, 1000);
	});
});