$(document).ready(function(){
    
    $(window).scroll(function () {
        if (window.scrollY > 15) {
            $('.header-top').addClass('header-top-scroll');
        }
        else {
            $('.header-top').removeClass('header-top-scroll');
        }
    });
    
    $("#main-carousel").owlCarousel({
      items: 1,
      loop: true,
      itemClass: "carousel-wrap",
      dots: true,
      nav:true,
      navText: [

        "<i class='icon icon-left-open-big'></i>"
        , "<i class='icon icon-right-open-big'></i>"],
      autoplayTimeout:3000,
      autoplay:true
    });

    $("#response_carousel").owlCarousel({
        items: 3,
        margin: 30,
        loop: true,
        itemClass: "carousel-wrap",
        responsive: {
            0: {
                items: 1
            }
            , 992: {
                items: 3
            }
        },
        autoplayTimeout:5000,
        autoplay:true,
        dots: false,
        nav:false,
        autoplayHoverPause: true
    });
    
    $.fn.datepicker.dates['ru'] = {
        days: ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"],
        daysShort: ["Вск", "Пнд", "Втр", "Срд", "Чтв", "Птн", "Суб"],
        daysMin: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
        months: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
        monthsShort: ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"],
        today: "Сегодня",
        clear: "Очистить",
        format: "dd.mm.yyyy",
        weekStart: 1,
        monthsTitle: "Месяцы"
    };
    
    if($(window).width() > 768){
        $('#calculator-date').datepicker({
            autoclose: true,
            language: 'ru',
            startDate: 'format'
        });
    }

    
    $("#calculator-form, #cta-form").submit(function(e) {
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
                $('#modal-popup').fadeIn(200);
            }
        });
        return false;
    });
    
    $('#modal-popup, #modal-popup .icon-cancel-1').on('click', function(){
        $('#modal-popup').fadeOut(500);
    })
    
    var mobileMenu = $('.mobile-menu_btn');
    
    if(mobileMenu.length > 0){
        $(".mobile-menu_btn").on('click', function(){
            mobileMenu.toggleClass('mobile-menu_btn--open');
        });
    }
    
    $("a[href^='#']").click(function () {
        var elementClick = $(this).attr("href");
        var destination = $(elementClick).offset().top - 60;
        $('html,body').animate({ scrollTop: destination }, 1000 );
        return false;
    });
});