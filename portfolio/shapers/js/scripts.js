$(document).ready(function(){
    var swiper = new Swiper('.swiper-container', {
        direction: 'vertical',
        initialSlide: 1,
        slidesPerView: 1,
        height: 360,
        width: 470,
        autoplay: 3000,
        autoplayDisableOnInteraction: false,
        speed: 1000
    });
    
    $('#showPopup').on('click', function(){
       $('#ctaPopup').fadeIn(500); 
    });
    
    $('#closeBtn, .page-case-popup-overlay').on('click', function(){
       $('#ctaPopup').fadeOut(500); 
    });

    $('#menu-btn').on('click', function(){
        $(this).toggleClass('active');
        $('#menu-wrap').toggleClass('active');
    });
    
    if($('body').not('.main-page').length > 0){
        $(window).scroll(function () {
            if (window.scrollY > 75) {
                $('.navigation-top').addClass('active');
            }
            else {
                $('.navigation-top').removeClass('active');
            }
        });
    }
    
    $('.shapers, .shape-projects').on('click', function(){
       $('body').toggleClass('active'); 
       $('.shapers').toggleClass('active'); 
       $('.shape-projects').toggleClass('active'); 
    });
    
    $('.arrow-top-link, .arrow-down-link').not('.arrow-down-link-smooth').on('click', function(){
        var elementClick = $(this).attr("href");
        var destination;
        if($('body.main-page').length > 0){
            destination = $(elementClick).offset().top;
        }else {
            destination = $(elementClick).offset().top - 60;
        }
        $('html,body').animate({ scrollTop: destination }, 1000 );
        return false;
    });
    
    var windowWidth = $(window).width();
    
    smoothScroll();
    
    if($('body.main-page').length > 0){
        $(window).resize(function() {
            if($(window).width() < 992 && windowWidth < 992){
                return false;
            }else if($(window).width() > 992 && windowWidth > 992){
                return false;
            }else if($(window).width() != windowWidth){
                location.reload();
            }else return false;
        });
    }
    
    function smoothScroll(){
        if($(window).width() > 992){

            var navigation = $('#menu-wrap, .navigation-top, .navigation_page-number, .navigation_social');

            var anchors = [];
            var isAnimating  = false;
            var currentAnchor = 0;
            var sectionSvg;
            var sectionShapers;

            var bodyMainPage = $('body.main-page')
            var sections = $('body.main-page > section[id]');
            var navNumberLink = $('body.main-page .page-number-link');
            var arrowDownLink = $('body.main-page #arrowDown');

            function fadeOutNavigation(){
                navigation.fadeOut(300);
            }
            function fadeInNavigation(){
                navigation.delay(300).fadeIn(500);
            }
            
            function ainmateSvg(delay){
                $('section .animated-svg').removeClass('active');
                setTimeout(function(){
                    $('body.main-page').find(sectionSvg).addClass('active');
                }, delay);
            }
            
            function ainmateShapers(delay){
                $('.shapers').addClass('small');
                setTimeout(function(){
                    $(sectionShapers).removeClass('small');
                }, delay);
            }

            function updateAnchors() {
                anchors = [];
                for(var i = 0; i < sections.length; i++){
                    anchors.push($(sections[i]).offset().top);

                    if($(sections[i]).offset().top == $(window).scrollTop() && $(window).scrollTop() != 0){
                        
                        var currentWindow = $(sections[i]).attr('id');
                        var currentLink = $(".page-number-link[href^='#"+currentWindow+"']");

                        var n = navNumberLink.index(currentLink);
                        currentAnchor = (navNumberLink.length - 1) - n;
                        navNumberLink.removeClass('active');
                        currentLink.addClass('active');
                        
                        var firstWindowHash = $(navNumberLink[navNumberLink.length - 1]).attr('href');
                        var nextWindowHash = $(navNumberLink[n - 1]).attr('href');
                        
                        if(currentAnchor >= navNumberLink.length - 1){
                            arrowDownLink.addClass('active');
                            arrowDownLink.attr('href', firstWindowHash);
                        }else {
                            arrowDownLink.attr('href', nextWindowHash); 
                        }
                        
                        sectionSvg = '.' + currentWindow + '-svg';
                        sectionShapers = '#' + currentWindow + '-shapers';

                        ainmateSvg(0);
                        ainmateShapers(0);
                    }
                }
            }
            
            $('.carousel-svg').addClass('active');
            $('#carousel-shapers').removeClass('small');

            bodyMainPage.on('click', ('.page-number-link, #arrowDown'), function(){

                if($(this).not('#arrowDown').hasClass('active')){
                    return false;
                }
                
                if(isAnimating == true) {
                    return false;
                }
                isAnimating  = true;

                $('#menu-btn').removeClass('active');
                $('#menu-wrap').removeClass('active');
                
                navNumberLink.removeClass('active');
                
                if($(this).hasClass('arrow-down-link.active')){
                    currentAnchor = navNumberLink.length - 1;
                    $(navNumberLink[(navNumberLink.length - 1) - currentAnchor]).addClass('active');
                }else if($(this).hasClass('arrow-down-link')){
                    if(currentAnchor < navNumberLink.length - 1){
                        currentAnchor = currentAnchor + 1;
                        $(navNumberLink[(navNumberLink.length - 1) - currentAnchor]).addClass('active');
                    }else {
                        currentAnchor = 0;
                        $(navNumberLink[(navNumberLink.length - 1) - currentAnchor]).addClass('active');
                    }
                }else {
                    var n = navNumberLink.index(this);
                    currentAnchor = (navNumberLink.length - 1) - n;
                }

                $(this).not('#arrowDown').addClass('active');

                var elementClick = $(this).attr("href");
                var destination = $(elementClick).offset().top;

                sectionSvg = '.' + elementClick.slice(1) + '-svg';
                sectionShapers = elementClick + '-shapers';
                
                if((anchors.length - 2) - currentAnchor == -1){
                    arrowDownLink.attr('href', $(navNumberLink[anchors.length - 1]).attr('href'));
                    setTimeout(function(){arrowDownLink.addClass('active')}, 2000);
                }else {
                    arrowDownLink.attr('href', $(navNumberLink[(anchors.length - 2) - currentAnchor]).attr('href'));
                    setTimeout(function(){arrowDownLink.removeClass('active')}, 2000);
                }
                
                ainmateSvg(2000);
                ainmateShapers(2000);
                
                fadeOutNavigation();
                $('html, body.main-page').delay(1100).animate({scrollTop: destination}, 750, 'swing', function(){
                    fadeInNavigation();
                    isAnimating  = false;
                });
                return false;
            });
            
            var mousewheelevt = (/Firefox/i.test(navigator.userAgent)) ? "DOMMouseScroll" : "mousewheel";
            
            bodyMainPage.on(mousewheelevt, function(e){
                e.preventDefault();
                e.stopPropagation();
                
                var scrollEvent;
                var browser = '';

                
                switch(mousewheelevt) {
                  case 'mousewheel':
                    scrollEvent = e.originalEvent.wheelDelta;
                    browser = 'chrome';
                    break;
                  case 'DOMMouseScroll':
                    scrollEvent = e.originalEvent.detail;
                    browser = 'firefox';
                    break;
                  default:
                    scrollEvent = e.originalEvent.wheelDelta;
                    break;
                }
                
                $('#menu-btn').removeClass('active');
                $('#menu-wrap').removeClass('active');

                if(isAnimating == true) {
                    return false;
                }
                isAnimating  = true;
                
                if(browser == 'chrome' && scrollEvent > 0 && currentAnchor > 0 || browser == 'firefox' && scrollEvent < 0 && currentAnchor > 0) {
                    currentAnchor--;
                    fadeOutNavigation();
                    navNumberLink.removeClass('active');
                    $(navNumberLink[(anchors.length - 1) - currentAnchor]).addClass('active');
                }else if(browser == 'chrome' && scrollEvent < 0 && currentAnchor < (anchors.length - 1) || browser == 'firefox' && scrollEvent > 0 && currentAnchor < (anchors.length - 1)){
                    currentAnchor++;
                    fadeOutNavigation();
                    navNumberLink.removeClass('active');
                    $(navNumberLink[(anchors.length - 1) - currentAnchor]).addClass('active');
                    
                }else {
                    isAnimating  = false;
                    return false;
                }
                
                sectionSvg = '.' + $(navNumberLink[(anchors.length - 1) - currentAnchor]).attr('href').slice(1) + '-svg';
                sectionShapers = $(navNumberLink[(anchors.length - 1) - currentAnchor]).attr('href') + '-shapers';
                
                if((anchors.length - 2) - currentAnchor == -1){
                    arrowDownLink.attr('href', $(navNumberLink[anchors.length - 1]).attr('href'));
                    setTimeout(function(){arrowDownLink.addClass('active')}, 2000);
                }else {
                    arrowDownLink.attr('href', $(navNumberLink[(anchors.length - 2) - currentAnchor]).attr('href'));
                    setTimeout(function(){arrowDownLink.removeClass('active')}, 2000);
                }
                
                ainmateSvg(2000);
                ainmateShapers(2000);
                

                $('html, body.main-page').delay(1100).animate({scrollTop: parseInt(anchors[currentAnchor])}, 750, 'swing', function(){
                    fadeInNavigation();
                    isAnimating  = false;
                });
            });

            updateAnchors();

            $(window).resize(function() {
                if($('body.main-page').length > 0){
                    $('html, body.main-page').animate({scrollTop: 0}, 750, 'swing')
                    currentAnchor = 0;
                    navNumberLink.removeClass('active');
                    $(navNumberLink[(anchors.length - 1)]).addClass('active');
                    $('.shapers').addClass('small');
                    $('.animated-svg').removeClass('active');
                    
                    var secondLink = $(navNumberLink[(navNumberLink.length - 2)]).attr('href');
                    arrowDownLink.removeClass('active');
                    arrowDownLink.attr('href', secondLink);
                    
                    setTimeout(function(){
                        $('#carousel-shapers').removeClass('small');
                        $('.carousel-svg').addClass('active');  
                    }, 0);
                    
                    updateAnchors();
                }
            });
        }
    }
});
