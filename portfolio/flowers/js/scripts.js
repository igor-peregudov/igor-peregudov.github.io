$(document).ready(function(){
   var mySwiper = new Swiper('.swiper-container', {
        speed: 400,
        pagination: '.swiper-pagination',
        paginationClickable: true,
        nextButton: '.swiper-next',
        prevButton: '.swiper-prev',
        loop: true
    });
    
    var rate = $('.bouquets_item-rate');
    
    for(var i = 0; i < rate.length; i++){
        rateData = $(rate[i]).data('rate'),
        rateStars = $(rate[i]).siblings('.stars-empty').find('.stars');
        var starsWidth = $(rateStars).width();
        rateStars.width(rateData * starsWidth / 5);
    }
    
    //constructor & cart
    
    function checkSumConstructor(){
        if($('.constructor-page').length > 0){
            var constructorItemCost = $('.constructor-page_content-item-final-price-wrap .constructor-page_content-item-final-price-count');
            var constructorItemCostSum = 0;

            for(var i = 0; i < constructorItemCost.length; i++){
                constructorItemCostSum = constructorItemCostSum + +$(constructorItemCost[i]).text();
            }

            $('.steps-panel .steps-panel_cost-all-cost').text(constructorItemCostSum);
        }
    }
    
    $('.delete-item').on('click', function(){
       $(this).closest('.constructor-page_content-item-wrap').remove();
        checkSumConstructor();
    });
    
    checkSumConstructor();
    
    $('body').on('click', '.plus, .minus', function(){
        var flowersCount = $(this).siblings('.bouquets_item-buy-item-count-data');
        var flowersCost = $(this).closest('.bouquets_item-buy-item').siblings('.bouquets_item-buy-money').find('.bouquets_item-buy-money-count');
        
        
        if($(this).attr('name') == 'plus'){
            if(flowersCount.val() < 999){
                flowersCount.val(+flowersCount.val() + 1);
            }else {
                flowersCount.val(999);
            }
        }else if($(this).attr('name') == 'minus'){
            if(flowersCount.val() > 1){
                flowersCount.val(+flowersCount.val() - 1);
            }else {
                flowersCount.val(1);
            }
        }
        
        flowersCost.text(+flowersCost.data('cost') * flowersCount.val());
        
        if($('.constructor-page').length > 0){
            
            var constructorItemCostAll = $(this).closest('.constructor-page_content-item-cost').siblings('.constructor-page_content-item-final-price').find('.constructor-page_content-item-final-price-count');   
            var constructorItemCost = $(this).closest('.constructor-page_content-item-cost').find('span.cost').data('cost');
            constructorItemCostAll.text(+constructorItemCost * flowersCount.val());
        }
        checkSumConstructor();
    });
    
    $('.bouquets_item-buy-item-count-data').on('input', function(){
        var flowersCount = $(this);
        var flowersCost = $(this).closest('.bouquets_item-buy-item').siblings('.bouquets_item-buy-money').find('.bouquets_item-buy-money-count');
        if(flowersCount.val() > 999){
            flowersCount.val(999)
        }else if(flowersCount.val() < 1){
            flowersCount.val(1);
        }
        
        flowersCost.text(+flowersCost.data('cost') * flowersCount.val());
        
        if($('.constructor-page').length > 0){
            
            var constructorItemCostAll = $(this).closest('.constructor-page_content-item-cost').siblings('.constructor-page_content-item-final-price').find('.constructor-page_content-item-final-price-count');   
            var constructorItemCost = $(this).closest('.constructor-page_content-item-cost').find('span.cost').data('cost');
            constructorItemCostAll.text(+constructorItemCost * flowersCount.val());
        }
        checkSumConstructor();
    });
    
    var title = $('.payment-terms_title span');
    var desc = $('.payment-terms_desc');

    for(var i = 0; i < title.length; i++){
        $(title[i]).attr('data-tab', ''+i+'');
        $(desc[i]).attr('data-tab', ''+i+'');
    }
    
    title.on('click', function(){
        var tabId = $(this).data('tab');
        
        title.removeClass('active');
        desc.removeClass('active');
        
        $('.payment-terms_desc[data-tab='+tabId+']').addClass('active');
        $(this).addClass('active');
    });
    
    var titleUpseil = $('.up-seil_gifts-nav-item');
    var descUpseil = $('.up-seil_gifts-item-wrap');
    
    for(var i = 0; i < titleUpseil.length; i++){
        $(titleUpseil[i]).attr('data-tab', ''+i+'');
        $(descUpseil[i]).attr('data-tab', ''+i+'');
    }
    
    titleUpseil.on('click', function(){
        var tabId = $(this).data('tab');
        
        titleUpseil.removeClass('active');
        descUpseil.removeClass('active');
        
        $('.up-seil_gifts-item-wrap[data-tab='+tabId+']').addClass('active');
        $(this).addClass('active');
    });
    
    if($('.owl-carousel').length > 0 && $('.owl-carousel-hash').length > 0){
        $('.owl-carousel').owlCarousel({
            items:1,
            startPosition: 0
        }).on('dragged.owl.carousel', function(event) {
            var activeItem = $('.owl-carousel .owl-item.active').find('.item-page_gallery-image').data('hash');
            $('.item-page_gallery-prev').removeClass('current');
            $('.item-page_gallery-prev[href="#'+activeItem+'"]').addClass('current');
        });

        $('.owl-carousel-hash').owlCarousel({
            items:4,
            startPosition: 0,
            margin: 7,
            navText: [
            "<i class='icon-left-open'></i>"
            , "<i class='icon-right-open'></i>"]
        });
    }
    
    $($('.owl-carousel-hash .item-page_gallery-prev')[0]).addClass('current');
    
    $('.owl-carousel-hash .item-page_gallery-prev').on('click', function(){
        var that = $(this);
        $('.owl-carousel').on('translate.owl.carousel', function(){
            $('.item-page_gallery-prev').removeClass('current');
            that.addClass('current');
        });
    });

    
    $('.item-page_dropdown-wrap').on('click', function(){
       $(this).parent('.item-page_dropdown').toggleClass('active');
    });
    
    $('.bouquets_item.disabled a').on('click', function(e){
        e.preventDefault();
    });
    
    if($('.steps-panel').length > 0){
        $(window).scroll(function(){
            var footerHeight = $('.footer').innerHeight();
            if(window.scrollY > 100){
                $('.steps-panel').css({
                    'opacity': '1'
                });
            }else {
                $('.steps-panel').css({
                    'opacity': '0'
                });
            }
            if(window.scrollY + $(window).height() > $('.footer').offset().top){
                $('.steps-panel').addClass('nofix').css({
                    'bottom': footerHeight
                });
            }else {
                $('.steps-panel').removeClass('nofix').css({
                    'bottom': '0'
                });
            }
        });
    }
    
    $('.see-more').on('click', function(){
        $(this).addClass('active');
        $('.catalog_filters-checkbox-optionally').addClass('active');
    });

    
    //range
    
    $('body').on('input', 'input[type="range"], #catalog_filters-cost', function(){
        
        var percent = $(this).val() / 100;
        
        setGradient(percent);
    });
    
    function setGradient(num){
        $('input[type="range"]').css({
            'background-image':'-webkit-linear-gradient(left ,#63a15e 0%,#88ad4c '+num+'%,#fff '+num+'%, #fff 100%)'
        });
    }
    
    $('input.catalog_filters-cost-range').on('input', function(){
        $('#catalog_filters-cost').val($('input.catalog_filters-cost-range').val());
    });
    
    $('#catalog_filters-cost').on('input', function(){
        $('input.catalog_filters-cost-range').val($('#catalog_filters-cost').val());
        if($(this).val() > $(this).attr('max')){
            $(this).val($(this).attr('max'));
        }
    });
    
    $('.catalog_found-reset').on('click', function(){
       $('input[type="checkbox"]:checked').prop('checked', false);
        
        var maxVal = $('input.catalog_filters-cost-range').attr('max');
        $('#catalog_filters-cost, input.catalog_filters-cost-range').val(maxVal);
        setGradient(maxVal / 100)
    });
    
    $('.catalog_found-sort').not('.view').on('click', function(){
        $('.catalog_found-sort').not('.view').removeClass('selected');
        $(this).addClass('selected');
        $('.catalog_found-sort.selected.view').text($(this).text());
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
    
    $('.date-icon').on('click', function(){
        $('.datepicker').focus();
    });
    
    $('.datepicker').datepicker({
        autoclose: true,
        language: 'ru'
    });
    
    $('.buyer-wrap-payment .catalog_filters-checkbox input[type="checkbox"]').on('change', function(){
        if($(this).prop('checked')){
            $('.buyer-wrap-payment .catalog_filters-checkbox input[type="checkbox"]').not($(this)).prop('disabled', true);
            $('.buyer_item').not($(this).closest('.buyer_item')).addClass('inactive');
        }else {
            $('.buyer-wrap-payment .catalog_filters-checkbox input[type="checkbox"]').not($(this)).prop('disabled', false);
            $('.buyer_item').removeClass('inactive');
        }
    });
    
    $('.menu').on('click', function(){
       $('.header-mob').toggleClass('active');
    });
    
    $('.filters-btn').on('click', function(){
       $('.catalog_filters-wrap').toggleClass('active');
    });
    
    $('#order').on('click', function(){
       $('#popup-wrap').addClass('active thank'); 
    });
    
    $('.account_content-history-more').on('click', function(){
       $('#popup-wrap').addClass('active more'); 
    });
    
    $('#overlay, #popup-wrap .delete-item').on('click', function(e){
        e.preventDefault();
        e.stopPropagation();
       $('#popup-wrap').removeClass('active thank enter registration more');
    });
    
    $('.show-popup-registration').on('click', function(){
        $('#popup-wrap').removeClass('active enter'); 
        $('#popup-wrap').addClass('active registration'); 
    });
    
    $('.show-popup-enter').on('click', function(){
        $('#popup-wrap').removeClass('active registration'); 
        $('#popup-wrap').addClass('active enter'); 
    });
    
    $('.first-header_enter').on('click', function(){
        $('#popup-wrap').addClass('active enter'); 
    });
    
    //yandex map
    
    if($('#YMaps').length > 0){
        var myMap;
        ymaps.ready(function () {        

            myMap = new ymaps.Map("YMaps", {
                center: [51.769051060298224,55.09077542042966],
                zoom: 12,
                controls: ['zoomControl', 'geolocationControl', 'searchControl']
            });

            myMap.behaviors.disable('scrollZoom'); 

            var myPlacemark = new ymaps.Placemark([51.772474584825595,55.09790840136718], {}, {
                    preset: 'islands#redIcon'
            });

            var myGeoObject = new ymaps.GeoObject({
                geometry: {
                    type: "Polygon",
                    coordinates: [
                        [[51.83990376779454,55.39744123397646],[51.85776460977241,55.41666730819518],[51.947212420996784,55.508522415039046],[51.99301580244596,55.3039020537109],[52.00149274682252,55.32038154589842],[52.02926764909671,55.172233688538874],[51.96444329807523,55.006021362963786],[51.923705405400966,55.048593384448196],[51.888029238267094,54.975808960620036],[51.86167855726651,54.973062378588786],[51.81659143507245,54.90989099187004],[51.794456629810256,54.95520959538569],[51.776570541825286,54.94147668522941],[51.71945774414027,54.96894250554192],[51.68191133974482,55.00739465397941],[51.662272345332255,54.93186364812006],[51.65202251550059,54.9346102301513],[51.63835245077101,55.006021362963786],[51.632370494620986,55.0431002203857],[51.614419867487975,55.029367310229425],[51.593896123489635,55.038980347338786],[51.59047459284815,55.06781945866691],[51.591329999795185,55.109018189135696],[51.60415916112514,55.136484009448154],[51.66825033666929,55.14747033757318],[51.669104270709234,55.176309448901314],[51.683618673907034,55.17493615788569],[51.68447231672077,55.141977173510696],[51.715192684349525,55.132364136401286],[51.74077697847689,55.14060388249507],[51.72031070757856,55.183175903979425],[51.699835121032386,55.18042932194818],[51.68788672619605,55.20514856022944],[51.69471476862944,55.255960327807536],[51.69130087682971,55.309518677416925],[51.698128401602986,55.33698449772943],[51.72798665075279,55.31501184147942],[51.73992440315708,55.358957153979446],[51.787643722512634,55.41526208562003],[51.84892265529819,55.39744123397646]]
                    ],

                }
            }, {
                fillColor: '#ffef42',
                strokeColor: '#ffff00',
                opacity: 0.3,
                strokeWidth: 5
            });

            var myGeoObjectBig = new ymaps.GeoObject({
                geometry: {
                    type: "Polygon",
                    coordinates: [
                        [[51.64007506312203,54.81006915974068],[51.56225073074005,54.88148029255321],[51.54341592970404,54.99134357380319],[51.52885639574183,55.11905963825631],[51.53313909758336,55.41157062458446],[51.62127267671193,55.57224567341258],[51.85744055571007,55.657389716381296],[51.97378735462137,55.63816364216258],[52.066460651573024,55.513545687368506],[52.087376447003656,55.41318743113698],[52.10158363861985,55.315008599624456],[52.08052857616458,55.20240994260238],[52.047718597949,55.09249264147413],[51.941750863881396,54.85079342272412],[51.802338649124785,54.771142543817895],[51.747815999741405,54.76976925280227],[51.70549104181015,54.776567036938545],[51.64657922416645,54.81006915974068]],
                        [[51.83990376779454,55.39744123397646],[51.85776460977241,55.41666730819518],[51.947212420996784,55.508522415039046],[51.99301580244596,55.3039020537109],[52.00149274682252,55.32038154589842],[52.02926764909671,55.172233688538874],[51.96444329807523,55.006021362963786],[51.923705405400966,55.048593384448196],[51.888029238267094,54.975808960620036],[51.86167855726651,54.973062378588786],[51.81659143507245,54.90989099187004],[51.794456629810256,54.95520959538569],[51.776570541825286,54.94147668522941],[51.71945774414027,54.96894250554192],[51.68191133974482,55.00739465397941],[51.662272345332255,54.93186364812006],[51.65202251550059,54.9346102301513],[51.63835245077101,55.006021362963786],[51.632370494620986,55.0431002203857],[51.614419867487975,55.029367310229425],[51.593896123489635,55.038980347338786],[51.59047459284815,55.06781945866691],[51.591329999795185,55.109018189135696],[51.60415916112514,55.136484009448154],[51.66825033666929,55.14747033757318],[51.669104270709234,55.176309448901314],[51.683618673907034,55.17493615788569],[51.68447231672077,55.141977173510696],[51.715192684349525,55.132364136401286],[51.74077697847689,55.14060388249507],[51.72031070757856,55.183175903979425],[51.699835121032386,55.18042932194818],[51.68788672619605,55.20514856022944],[51.69471476862944,55.255960327807536],[51.69130087682971,55.309518677416925],[51.698128401602986,55.33698449772943],[51.72798665075279,55.31501184147942],[51.73992440315708,55.358957153979446],[51.787643722512634,55.41526208562003],[51.84892265529819,55.39744123397646]]
                    ],

                }
            }, {
                fillColor: '#ff3333',
                strokeColor: '#ff3333',
                opacity: 0.2,
                strokeWidth: 5
            });

            myMap.geoObjects.add(myGeoObjectBig);
            myMap.geoObjects.add(myGeoObject);
            myMap.geoObjects.add(myPlacemark);

        });
    }
    
    //password
    
    $('.password').on('click', function(){
        if($(this).prev('input[type="password"]').attr('type') == 'password'){
            $(this).prev('input[type="password"]').attr('type', 'text');
        }else {
            $(this).prev('input[type="text"]').attr('type', 'password');
        }
    });
    
    //bonus
    
    $('.scale-fill-wrap').height($('.bonus-field .scale').height() * $('.bonus-field').data('fill') / 100);
    
    //
    
    $('.account_content-history-remove').on('click', function(){
        if(confirm('Вы действительно хотите удалить?')){
            $(this).closest('.account_content-history').remove();
        }
    });
    
});