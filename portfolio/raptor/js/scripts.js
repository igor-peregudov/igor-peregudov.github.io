// preloader
var hellopreloader = document.getElementById("preloader");function fadeOutnojquery(el){el.style.opacity = 1;var interhellopreloader = setInterval(function(){el.style.opacity = el.style.opacity - 0.05;if (el.style.opacity <=0.05){ clearInterval(interhellopreloader);hellopreloader.style.display = "none";}},16);}window.onload = function(){setTimeout(function(){fadeOutnojquery(hellopreloader);},1000);}

$(document).ready(function () {
    $("#owl-example").owlCarousel({
        items: 4
        , autoplayTimeout: 2000
        , autoplayHoverPause: true
        , loop: true
        , nav: true
        , navText: [
        "<i class='icon icon-left-open-big'></i>"
        , "<i class='icon icon-right-open-big'></i>"]
        , lazyLoad: true
        , margin: -1
        , responsive: {
            0: {
                items: 2
            }
            , 600: {
                items: 3
            }
            , 1000: {
                items: 4
            }
        }
        , autoplay: true
    , });
});

$(document).ready(function() {
    $("[href^='#'").click(function () { 
      var elementClick = $(this).attr("href");
      var destination = $(elementClick).offset().top;
      $('html,body').animate( { scrollTop: destination }, 1000 );
      return false;
    });
  });

new WOW() .init();