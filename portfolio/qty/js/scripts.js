jQuery(document).ready(function($) {
  $('.ai').viewportChecker({
      classToAdd: 'ai-animate',
      from: 0,
      offset: 0,
      callbackFunction: function(elem, action){
		$(".ai-per").spincrement({
            to: 70,
            duration: 1700
        });
	},
  });
    $('.ps').viewportChecker({
      classToAdd: 'ps-animate',
        from: 0,
        offset: 0,
        callbackFunction: function(elem, action){
		$(".ps-per").spincrement({
            to: 85,
            duration: 1850 
        });
	},
  });
    $('.ux').viewportChecker({
      classToAdd: 'ux-animate',
        from: 0,
        offset: 0,
        callbackFunction: function(elem, action){
		$(".ux-per").spincrement({
            to: 75,
            duration: 1750 
        });
	},
  });
});

$("body").on('click', '[href*="#"]', function(e){
  var fixed_offset = 100;
  $('html,body').stop().animate({ scrollTop: $(this.hash).offset().top}, 1000);
  e.preventDefault();
});

$(function() {
    $(window).scroll(function() {
        if($(this).scrollTop() != 0) {
            $('#scroll-up').fadeIn();
        } else {
            $('#scroll-up').fadeOut();
        }
    });
    
});