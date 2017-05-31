$(document).ready(function() {
    
    
    // Слайдер aboutAtom
    
    
	$('#main-about--owl').owlCarousel({
        items: 1,
        URLhashListener:true,
        mouseDrag: false
	});
    
    $('#main-about--owl_hash').owlCarousel({
        items: 3,
        nav : true,
        responsive:{
            0:{
                items:2
            },
            480:{
                items:2
            },
            1200:{
                items:3,
                mouseDrag: false
            }
        },
        navText: [
       
        "<i class='icon icon-left-open-big'></i>"
        , "<i class='icon icon-right-open-big'></i>"],
	});
    
    // Слайдер партнеров
    
	$('#owl-carousel').owlCarousel({
        items: 5,
        autoplay: true,
        loop:true, //Зацикливаем слайдер
        margin:50, //Отступ от элемента справа в 50px
        nav:true, 
        smartSpeed:1000, //Время движения слайда
        autoplayTimeout:3000,
        navText: [
        "<i class='icon icon-left-open'></i>"
        , "<i class='icon icon-right-open'></i>"],
        responsive:{ //Адаптивность. Кол-во выводимых элементов при определенной ширине.
                    0:{
                        items:2
                    },
                    768:{
                        items:3
                    },
                    992:{
                        items:5
                    }
                }
	});
    
    
    // Кнопка входа и регистрации
    
    
    var btnRegistration = $('.main-slider__btn');
    var registrationForm = $('.main-slider__registration-wrap');
    var login = $('.head__enter');
    
    btnRegistration.on('click', function(){
        btnRegistration.toggle();
        registrationForm.toggle();
        
        $(document).mousedown(function (e){ 
            
            if (!registrationForm.is(e.target) // если клик был не по нашему блоку
                && registrationForm.has(e.target).length === 0) { // и не по его дочерним элементам
                registrationForm.hide(); // скрываем его
                btnRegistration.show();
            }
        });
    });
    
    login.on('click', function(){
        
        
        var form = $('.head__communications--target'); 
        var btn = $('.head__communications'); 
        
        btn.toggle()
        
        $(form).toggle()
        
        if ($(window).width() < 660) {
            $('.head__logo').hide()
            $('.head__communications--social').css({
                'margin-bottom': 10
            })
        };
        
        $(document).mousedown(function (e){ 
            
            if (!form.is(e.target) // если клик был не по нашему блоку
                && form.has(e.target).length === 0) { // и не по его дочерним элементам
                form.hide(); // скрываем его
                $('.head__communications').show()
                $('.head__logo').show()
            }
        });
        
    });
    
    $(window).on('resize', function (){
        if ($(window).width() < 660 && $('.head__communications--target').is(":visible")) {
            $('.head__logo').hide()
            $('.head__communications--social').css({
                'margin-bottom': 10
            })
        }else if ($(window).width() > 660 && $('.head__communications--target').is(":visible")){
            $('.head__logo').show()
            $('.head__communications--social').css({
                'margin-bottom': 0
            })
        }
    });
    
    // Скрипт "полигон"
    
    var particlesSettings =
        {
          "particles": {
            "number": {
              "value": 80,
              "density": {
                "enable": true,
                "value_area": 800
              }
            },
            "color": {
              "value": "#ffffff"
            },
            "shape": {
              "type": "circle",
              "stroke": {
                "width": 0,
                "color": "#000000"
              },
              "polygon": {
                "nb_sides": 5
              },
              "image": {
                "src": "img/github.svg",
                "width": 100,
                "height": 100
              }
            },
            "opacity": {
              "value": 0.5,
              "random": false,
              "anim": {
                "enable": false,
                "speed": 1,
                "opacity_min": 0.1,
                "sync": false
              }
            },
            "size": {
              "value": 5,
              "random": true,
              "anim": {
                "enable": false,
                "speed": 40,
                "size_min": 0.1,
                "sync": false
              }
            },
            "line_linked": {
              "enable": true,
              "distance": 150,
              "color": "#ffffff",
              "opacity": 0.4,
              "width": 1
            },
            "move": {
              "enable": true,
              "speed": 6,
              "direction": "none",
              "random": false,
              "straight": false,
              "out_mode": "out",
              "attract": {
                "enable": false,
                "rotateX": 600,
                "rotateY": 1200
              }
            }
          },
          "interactivity": {
            "detect_on": "canvas",
            "events": {
              "onhover": {
                "enable": true,
                "mode": "grab"
              },
              "onclick": {
                "enable": false,
                "mode": "push"
              },
              "resize": true
            },
            "modes": {
              "grab": {
                "distance": 400,
                "line_linked": {
                  "opacity": 1
                }
              },
              "bubble": {
                "distance": 400,
                "size": 40,
                "duration": 2,
                "opacity": 8,
                "speed": 3
              },
              "repulse": {
                "distance": 200
              },
              "push": {
                "particles_nb": 4
              },
              "remove": {
                "particles_nb": 2
              }
            }
          },
          "retina_detect": true,
          "config_demo": {
            "hide_card": false,
            "background_color": "#b61924",
            "background_image": "",
            "background_position": "50% 50%",
            "background_repeat": "no-repeat",
            "background_size": "cover"
          }
        };
    
    if ($('#particles-js').length > 0) {
        particlesJS('particles-js', particlesSettings);
    }
    if ($('#particles-js2').length > 0) {
        particlesJS('particles-js2', particlesSettings);
    }
    if ($('#particles-js3').length > 0) {
        particlesJS('particles-js3', particlesSettings);
    }
    
    // main-causes slider
    
     
    $("#owl-demo").owlCarousel({
        nav : true,
        responsive:{
            0:{
                items:1
            },
            768:{
                items:2
            },
            1200:{
                items:3,
                mouseDrag: false
            }
        },
        navText: [
        "<i class='icon icon-left-open'></i>"
        , "<i class='icon icon-right-open'></i>"],
        });
            
    $('[href="#tab2"]').click();   
    $("#owl-demo2").owlCarousel({
        nav : true,
        responsive:{
            0:{
                items:1
            },
            768:{
                items:2
            },
            1200:{
                items:3,
                mouseDrag: false
            }
        },
        navText: [
        "<i class='icon icon-left-open'></i>"
        , "<i class='icon icon-right-open'></i>"],
        });
            
    $('[href="#tab2"]').click();
            
    $("#owl-demo3").owlCarousel({
        nav : true,
        responsive:{
            0:{
                items:1
            },
            768:{
                items:2
            },
            1200:{
                items:3,
                mouseDrag: false
            }
        },
        navText: [
        "<i class='icon icon-left-open'></i>"
        , "<i class='icon icon-right-open'></i>"],
        });
    
    // Центральная картинка в слайдере
    
    $(window).on('resize', function resizeWindow(){
        if ($(window).width() < 1180) {
            $('.item.main-causes__slide--item--active').removeClass('main-causes__slide--item--active');
        };
    })
    
    if ($(window).width() < 1180) {
            $('.item.main-causes__slide--item--active').removeClass('main-causes__slide--item--active');
        };
    
    var navSliderNext = $('.tabbable .owl-next');
    var navSliderPrev = $('.tabbable .owl-prev');
    
    $('.tabbable .owl-next, .tabbable .owl-prev').on('click', function(){
        
        if ($(window).width() > 1180) {
           $('.tab-pane.active .owl-item.active').each(function(index, value){
                $('body').stop();
                var active;
                if (index == 1) {
                    active = $(this).find($('.item'));
                    active.addClass('main-causes__slide--item--active');


                }else if (index == 0 || index == 2){
                    active = $(this).find($('.item'));
                    active.removeClass('main-causes__slide--item--active');
                }
            }); 
        };
    });
    
    // Слайдер о AtomCRM
    
    $('.main-about__slide--item a').on('click', function(){
        $('.main-about__slide--item').removeClass('active')
        $(this).parent().addClass('active')
    })
    
    $(".main-about__slide--item a[href^='#item-1']").click()
    
    // hover таблица
    
    $('.table td').hover(function(){
        var th_num = $(this).index();
        var th_num_2 = $(this).index() - 1;
        $('.table tr').each(function(){
            $(this).children('td').each(function(td_num){
                if(td_num == th_num){
                    $(this).css({
                        'borderColor': '#448aff'
                        
                    }); 
                };
                if(th_num_2 == td_num){
                    $(this).css({
                        'borderRightColor': '#448aff'
                    }); 
                };
            });
        });
    },function(){
        var th_num = $(this).index();
        var th_num_2 = $(this).index() - 1;
        $('.table tr').each(function(){
            $(this).children('td').each(function(td_num){
                if(td_num == th_num){
                    $(this).css({
                        'borderColor': '#f2f0f4'
                    });
                };
                if(th_num_2 == td_num){
                    $(this).css({
                        'borderRightColor': '#f2f0f4'
                    }); 
                };
            });
        });
    });

    // отрисовка svg
    
//    var allProducts = $('.main-about__product svg').drawsvg({
//                        duration: 2000,
//                        callback: function() {
//                        $('.prod-1').fadeIn(500);
//                        $('.prod-2').fadeIn(500);
//                        $('.prod-3').fadeIn(500);
//                        $('.prod-1-bot').fadeIn(500);
//                        $('.prod-3-bot').fadeIn(500);
//                      }
//                    });
//    allProducts.drawsvg('animate');
    
//    var regBot = $('.main-registration__img svg').drawsvg({
//                        duration: 2000
//                    });
//    regBot.drawsvg('animate');
    var svgLoadTop = false;
    var svgLoadBottom = false;
    var svgLoadDiagram = false;
    
    $(window).on('scroll', function(){
        
        
        if (($(window).scrollTop() >= $('.main-about').offset().top - 500) && !svgLoadTop) {
            $('.main-about__product').fadeIn(1000)
            var allProducts = $('.main-about__product svg').drawsvg({
                        duration: 2500
                    });
            allProducts.drawsvg('animate');
            svgLoadTop = true;
        }
        if (($(window).scrollTop() >= $('.main-registration').offset().top - 500) && !svgLoadBottom) {
            $('.main-registration__img').fadeIn(1000)
            var regBottom = $('.main-registration__img svg').drawsvg({
                        duration: 2500
                    });
            regBottom.drawsvg('animate');
            svgLoadBottom = true;
        }
//        if (($(window).scrollTop() >= $('.main-numbers').offset().top - 500) && !svgLoadDiagram) {
//           $('.main-numbers').fadeIn(1000)
//            var regBottom = $('.main-numbers svg').drawsvg({
//                        duration: 2500
//                    });
//            regBottom.drawsvg('animate');
//            svgLoadDiagram = true;
//        }
    })
    
    
    
});