window.onload = function() {
    
    VK.init({
        apiId: 5884209
    });
    
//    if(window.location.href.indexOf('access_token') === -1){
//        window.location.href = 'https://oauth.vk.com/authorize?client_id=5884209&display=popup&redirect_uri=https://igor-peregudov.github.io/portfolio/vk-stats/index.html&scope=groups&response_type=token&v=5.63&state=good';
//    }
    
    
    
    var groupName;
    var groupAvatar;
    var dateBtn = document.getElementsByClassName('date');
    var preloader = document.getElementById('preloader-wrap');
    var percent = document.getElementById('percent');
    
    var likes = document.getElementById('likes'),
        views = document.getElementById('views'),
        reposts = document.getElementById('reposts'),
        comments = document.getElementById('comments'),
        posts = document.getElementById('posts'),
        allday = document.getElementById('allday');
    
    //data переменные
    var flagForFirstIteration = true;
    var data;

    var owner_id; //id группы
    var domain; //короткий адресс группы
    var offsetPost = 0;
    var totalPosts; //Всего постов у группы
    
    var currentPercent;
    
    //Посты по дате
    var wallPostsArray = [];
    var todayPosts = [],
        weekPosts = [],
        monthPosts = [];
    
    var flagForViewToday = true;
    var flagForViewWeek = true;
    var flagForViewMonth = true;
    var flagForViewAllDay = true;
    
    var flagStopAjax = false;
    
    var a = Date.now();
    
    //Регулярочки
    
    var regularNumberId = /vk\.com\/(public|event|club)\d+$/gi;
    
    var searchLink = document.getElementById('searchLink');
    var searchBtn = document.getElementById('searchBtn');
    var appWrap = document.getElementById('app-wrap');
    var closeApp = document.getElementById('close');
    
    searchBtn.addEventListener('click', function() {
        flagStopAjax = false;
        
        var regVK = /vk\.com\//;
        var linkValue = searchLink.value;
        
        if (regVK.test(linkValue)){

            this.setAttribute('disabled', 'disabled');
            appWrap.classList.add('result');
            if(linkValue.search(regularNumberId) !== -1){
                owner_id = '-' + linkValue.replace(/\D/g, '');
                data = {
                    owner_id: owner_id,
                    count: 100,
                    offset: offsetPost,
                    filter: 'owner',
                    v: '5.63',
                    extended: 1
                }
            }else {
                domain = linkValue.replace(/.*vk\.com\//g, '');
                data = {
                    domain: domain,
                    count: 100,
                    offset: offsetPost,
                    filter: 'owner',
                    v: '5.63',
                    extended: 1
                }
            }
            getWallPosts(offsetPost);
        }else {
            alert('Введи нормальную ссылку');
        }
    });
    
    closeApp.addEventListener('click', function() {
        appWrap.classList.remove('result');
        flagStopAjax = true;
        searchBtn.removeAttribute('disabled');
        
        setTimeout('location.reload()', 500);
    });
    
    function getWallPosts(offsetPost){
        if(flagStopAjax) return;
        data.offset = offsetPost;
        VK.Api.call('wall.get', data, function(res) {
            if(res.response && res.response.groups[0].name) {
                
                groupName = res.response.groups[0].name;
                groupAvatar = res.response.groups[0].photo_200;
                
                document.getElementById('groupAvatar').src = groupAvatar;
                document.getElementById('groupName').innerHTML = groupName;
                
//                totalPosts = 1000; //Всего постов в паблике от имени группы
                totalPosts = res.response.count; //Всего постов в паблике от имени группы
                
                if(totalPosts > offsetPost){
                    
                    if(flagForFirstIteration === true){
                        addEventListenerByClass('date', 'click', checkClickDate);
                        
                        flagForFirstIteration = false;
                    }
                    
                    var i;
                    for(i = 0; i < res.response.items.length; i++){
                        wallPostsArray.push(res.response.items[i]); //Массив объектов состоящий из постов группы
                    }
                    
                    wallPostsArray.sort(sortCountDate('date')); //Отсортированный массив постов по дате

                    var todayArrayBefore = iterationArrayLength(todayPosts),    //Стартовая длинна массива
                        weekArrayBefore = iterationArrayLength(weekPosts),
                        monthArrayBefore = iterationArrayLength(monthPosts);
                    
                    for(var j = 0; j < wallPostsArray.length; j++){ // Обработка массива
                        
                        if(wallPostsArray[j].date > postsTime.today()){
                            todayPosts[j] = wallPostsArray[j];
                        }
                        if(wallPostsArray[j].date > postsTime.week()){
                            weekPosts[j] = wallPostsArray[j];
                        }
                        if(wallPostsArray[j].date > postsTime.month()){
                            monthPosts[j] = wallPostsArray[j];
                        }
                    }
                    
                    var todayArrayAfter = iterationArrayLength(todayPosts), //Длинна массиа после обработки
                        weekArrayAfter = iterationArrayLength(weekPosts),
                        monthArrayAfter = iterationArrayLength(monthPosts);
                    
                    
                    if(todayArrayBefore - todayArrayAfter === 0 && flagForViewToday == true){
                        flagForViewToday = false;
                        if(dateBtn.today.classList.contains('active')){
                            filterArrayInEntity(todayPosts);
                            hidePreloader(true);
                        }
                    }
                    if(weekArrayBefore - weekArrayAfter === 0 && flagForViewWeek == true){
                        flagForViewWeek = false;
                        if(dateBtn.week.classList.contains('active')){
                            filterArrayInEntity(weekPosts);
                            hidePreloader(true);
                        }
                    }
                    if(monthArrayBefore - monthArrayAfter === 0 && flagForViewMonth == true){
                        flagForViewMonth = false;
                        if(dateBtn.month.classList.contains('active')){
                            filterArrayInEntity(monthPosts);
                            hidePreloader(true);
                        }
                    }
                    
                    //click дата
                    
                    function checkClickDate(){
                        for(var i = 0; i < dateBtn.length; i++){
                            dateBtn[i].classList.remove('active');
                        }
                        this.classList.add('active');
                        
                        hidePreloader(false);
                        
                        switch(this.id) {
                            case 'today':
                                percent.style.display = 'none';
                                if(!flagForViewToday){
                                    filterArrayInEntity(todayPosts);
                                    hidePreloader(true);
                                }
                                break;
                            case 'week':
                                percent.style.display = 'none';
                                if(!flagForViewWeek){
                                    filterArrayInEntity(weekPosts);
                                    hidePreloader(true);
                                }
                                break;
                            case 'month':
                                percent.style.display = 'none';
                                if(!flagForViewMonth){
                                    filterArrayInEntity(monthPosts);
                                    hidePreloader(true);
                                }
                                break;
                            case 'allday':
                                if(flagForViewAllDay){
                                    percent.style.display = 'block';
                                }else {
                                    filterArrayInEntity(wallPostsArray);
                                    hidePreloader(true);
                                }
                        }
                    }
                    
                    currentPercent = (offsetPost * 100 / totalPosts).toFixed(2) + '%';
                    percent.innerHTML = currentPercent;
                    
                    setTimeout(function(){
                        getWallPosts(offsetPost + 100);
                    }, 0);
                }else if(totalPosts <= offsetPost){
                    var b = Date.now();
                    var res = b - a;
                    console.log(wallPostsArray);
                    console.log( "Скрипт выполнялся <"+ res +"> ms." );
                    
                    filterArrayInEntity(wallPostsArray);
                    hidePreloader(true);
                    flagForViewAllDay = false;
                }

            }else if (res.error){
                console.log(res.error);
            }
        });
    };
    
    function filterArrayInEntity(date) {  //Подсчет сущностей
        var countLikes = 0,
            countComments = 0,
            countRepost = 0,
            countViews = 0,
            countPosts = date.length;

        for(var b = 0; b < date.length; b++){
            countLikes = countLikes + +date[b].likes.count;
            countComments = countComments + +date[b].comments.count;
            countRepost = countRepost + +date[b].reposts.count;
            if(date[b].views){
                countViews = countViews + +date[b].views.count;
            }
        }
        
        countLikes = String(countLikes).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 ');
        countViews = String(countViews).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 ');
        countRepost = String(countRepost).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 ');
        countComments = String(countComments).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 ');
        countPosts = String(countPosts).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 ');

        likes.innerHTML = countLikes;
        views.innerHTML = countViews;
        reposts.innerHTML = countRepost;
        comments.innerHTML = countComments;
        posts.innerHTML = countPosts;
    };
    
    function hidePreloader(flag){
        if(flag === true){
            preloader.classList.remove('active');
        }else {
            preloader.classList.add('active');
        }
        
    }

    function addEventListenerByClass(className, event, fn) {    //Развешиваем обработчик события на всю коллекцию по классу
        var list = document.getElementsByClassName(className);
        for (var i = 0, len = list.length; i < len; i++) {
            list[i].addEventListener(event, fn, false);
        }
    }

    function sortCountEntity(field, count) { // Функция для сортировки массива объектов
        return function (a, b) {
            return b[field][count] - a[field][count];
        }
    };
    function sortCountDate(field, count) { // Функция для сортировки массива объектов по дате
        return function (a, b) {
            return b[field] - a[field];
        }
    };

    var postsTime = { // Функция получения даты: сегодня, неделя назад, месяц, от начала отсчета
        today: function(){
            var now = new Date();
            var today = new Date(now.getFullYear(), now.getMonth(), now.getDate())/1000;
            return today;
        },
        week: function(){
            var now = new Date();
            var today = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7)/1000;
            return today;
        },
        month: function(){
            var now = new Date();
            var today = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 30)/1000;
            return today;
        }
    };
    
    var iterationArrayLength = function(date){  //Проверка длинны массива
          return date.length
    };    
};
