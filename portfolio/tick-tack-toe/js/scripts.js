$(document).ready(function () {
    var val;
    var count = 1;
    
    function play(){    
    $("td").on("click", function () {
        if (count % 2 == 0 && $(this).text() == "") {
            val = "O";
            $(this).html(val);
        count++
            checkWin()
        }
        else if ($(this).text() == "") {
            val = "X";
            $(this).html(val);
        count++
        
            checkWin()
        };
    });
    };
    
    $("#restart").on("click", function(){
        $("td").empty();
        $("td").removeClass("win");
        play()
        count = 1;
    })
    
    var td1 = $("#tr1").children(),
        td2 = $("#tr2").children(),
        td3 = $("#tr3").children()
    
    function checkWin(){
        if(td1.text() == "XXX" || td1.text() == "OOO"){
           td1.addClass("win");
           $("td").unbind("click");
        }else if (td2.text() == "XXX" || td2.text() == "OOO"){
           td2.addClass("win");
           $("td").unbind("click");
        }else if (td3.text() == "XXX" || td3.text() == "OOO"){
           td3.addClass("win");
           $("td").unbind("click");
        }else if (td1.eq(0).text() + td2.eq(1).text() + td3.eq(2).text() == "XXX" || td1.eq(0).text() + td2.eq(1).text() + td3.eq(2).text() == "OOO"){
            td1.eq(0).addClass("win");
            td2.eq(1).addClass("win");
            td3.eq(2).addClass("win");
            $("td").unbind("click");
        }else if (td3.eq(0).text() + td2.eq(1).text() + td1.eq(2).text() == "XXX" || td3.eq(0).text() + td2.eq(1).text() + td1.eq(2).text() ==  "OOO"){
            td1.eq(2).addClass("win");
            td2.eq(1).addClass("win");
            td3.eq(0).addClass("win");
            $("td").unbind("click");
        }else if (td1.eq(0).text() + td2.eq(0).text() + td3.eq(0).text() == "XXX" || td1.eq(0).text() + td2.eq(0).text() + td3.eq(0).text() == "OOO"){
            td1.eq(0).addClass("win");
            td2.eq(0).addClass("win");
            td3.eq(0).addClass("win");
            $("td").unbind("click");
        }else if (td1.eq(1).text() + td2.eq(1).text() + td3.eq(1).text() == "XXX" || td1.eq(1).text() + td2.eq(1).text() + td3.eq(1).text() == "OOO"){
            td1.eq(1).addClass("win");
            td2.eq(1).addClass("win");
            td3.eq(1).addClass("win");
            $("td").unbind("click");
        }else if (td1.eq(2).text() + td2.eq(2).text() + td3.eq(2).text() == "XXX" || td1.eq(2).text() + td2.eq(2).text() + td3.eq(2).text() == "OOO"){
            td1.eq(2).addClass("win");
            td2.eq(2).addClass("win");
            td3.eq(2).addClass("win");
            $("td").unbind("click");
        }else if (count == 10) {
            $("td").empty();
            setTimeout(function(){
            td1.eq(0).html("N");
            td1.eq(1).html("O");
            }, 300);
            setTimeout(function(){
            td2.eq(0).html("O");
            td2.eq(1).html("N");
            td2.eq(2).html("E");
            }, 800);
            setTimeout(function(){
            td3.eq(0).html("W");
            td3.eq(1).html("O");
            td3.eq(2).html("N");
            }, 1300);
        }
    };
    
    play()
    
});