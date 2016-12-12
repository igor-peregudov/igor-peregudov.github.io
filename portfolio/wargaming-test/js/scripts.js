$(document).ready(function () {
    
    // Calculator start
	$("#standard").attr("checked","checked");

	var self = this;
	var sliderResult = $("#slider-result");
	var slider = $(".slider");
	var battlesMinVal = 0;
	var battlesMaxVal = 300;
    
	sliderResult.keyup(function(){
		slider.slider({
		value: parseInt(sliderResult.val())
		});
		validate();
		resetResult();
        });


	$(".complictation").on("click", function(){
                resetResult();
	});
            

	slider.slider({
	        animate: true,
	        range: "min",
	        value: 0,
	        min: battlesMinVal,
	        max: battlesMaxVal,
	        
	        //Получаем значение и выводим его на странице
	        slide: function (event, ui) {
	            sliderResult.val(ui.value);
	            resetResult();
	        }
	});
    
    
    function validate(){        
        var currentValue = parseInt(sliderResult.val());
        if (currentValue > battlesMaxVal){
           sliderResult.val(battlesMaxVal);
        }else if (currentValue < battlesMinVal){
            sliderResult.val(battlesMinVal);
        }
    };
    
    function resetResult(){
        $("#exp-result").html( Math.round($( "input:checked" ).val() * sliderResult.val()) );
    };
    
    
    function proverka(input) {
        input.value = input.value.replace(/[^\d,]/g);
    };
    
    // Calculator end
    
    // emergence start
    
    var tank = $(".experience-tanks__item");
    var tankRow = $(".experience-tanks-row");
    var calc = $(".exp");
    
    tank.mouseenter(function(){
        var positionLeft = $(this).position().left;
        var positionTop = $(this).position().top;
        var tankRowWidth = tankRow.width();
        var tankRowHeight = tankRow.height();
        var tankWidth = tank.width();
        var tankHeight = tank.height();
        var triangle = $(".exp__triangle");
        var triangleBot = $(".exp__triangle--bot");
        
        
        
                
        if ($(window).width() > 768){
            
            
            calc.css({
                "display": "inline-block"
            });


            triangle.css({
                left: tankWidth / 2
            })

            triangleBot.css({
                left: tankWidth / 2
            })
            
            if (tankRowHeight / 2 == positionTop || tankRowHeight / 2 < positionTop){
            
            $(".exp__triangle").hide();
            $(".exp__triangle--bot").show();
            
            if ( positionLeft + tankWidth / 2 < tankRowWidth / 2 && positionLeft + tankWidth > tankRowWidth / 2){
            calc.css({
                "top": positionTop - calc.height() - 100,
                "left": tankRowWidth / 2 - calc.width() / 2
            });
            triangleBot.css({
                left: calc.width() / 2
            })
        } else if ( tankRowWidth - tankWidth < positionLeft + tankWidth ) {
            calc.css({
                "top": positionTop - calc.height() - 100,
                "left": tankRowWidth - calc.width() - 73
            });

            triangleBot.css({
                left: calc.width() - tankWidth / 2 / 2
            })
        } else {
            calc.css({
                "top": positionTop - calc.height() - 100,
                "left": positionLeft
            });
          }  
        } else {
            $(".exp__triangle").show();
            $(".exp__triangle--bot").hide();
            
            if ( positionLeft + tankWidth / 2 < tankRowWidth / 2 && positionLeft + tankWidth > tankRowWidth / 2){
            calc.css({
                "top": positionTop + tankHeight + 50,
                "left": tankRowWidth / 2 - calc.width() / 2
            });
            triangle.css({
                left: calc.width() / 2
            })
        } else if ( tankRowWidth - tankWidth < positionLeft + tankWidth ) {
            calc.css({
                "top": positionTop + tankHeight + 50,
                "left": tankRowWidth - calc.width() - 73
            });

            triangle.css({
                left: calc.width() - tankWidth / 2 / 2
            })
        } else calc.css({
            "top": positionTop + tankHeight + 50,
            "left": positionLeft
          });      
        }}
    });
    
    
    $(document).mouseup(function (e){
		
		if (!calc.is(e.target)
		    && calc.has(e.target).length === 0) {
			calc.hide();
		}
	});
    
    if ($(window).width() < 768) {
        tank.on("click", function(){
            var positionTop = $(this).position().top;
            
            calc.css({
                "display": "block",
                "top": positionTop + $(this).height() + 30
            })
            
        })
    };
    
});