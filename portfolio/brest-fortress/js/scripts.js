$(document).ready(function(){
          $('.owl-carousel').owlCarousel({
              items: 1,
              URLhashListener:true,
              autoplay: true,
              autoplayTimeout: 3000,
              autoplayHoverPause: true
          });
        $('.owl-carousel-nav').owlCarousel({
            autoWidth: true,
            margin: 5,
            nav: true,
            navText: [$('.owl-carousel-nav').data('prev'), $('.owl-carousel-nav').data('next')],
            slideBy: 3
          });
    $('.heroes__content__items img').on('click', function(){
        var id = $(this).data('tab');
        
        var title = $('#title-' + id).text();
        var desc = $('#desc-' + id).text();
        
        $('#popup .popup__content > img').attr('src', 'img/' + id +'.jpg');
        $('#popup .popup__content .popup__content__title').text(title);
        $('#popup .popup__content .popup__content__desc').text(desc);
        
        $('#popup').css({
            'display': 'flex'
        })
    })
    $('#popup').on('click', function(e){
        if (e.target.id == 'popup' || e.target.id == 'close') {
            $('#popup').hide();
        }
    })
});