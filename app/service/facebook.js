
// эту функцию вызваем если пользователь вошел
function loggedin() {
    // показываем кнопку "выйти" и ставим на нее обработчик события
    $('#logout').css('display','block').click(function(){
       FB.logout(function(response){
		alert(1);
            document.location.href = 'http://127.0.0.1';
       });
    });

    // показываем информацию о пользователе
    getUserInfo();
}

// эту функцию вызываем, если пользователь не вошел
function loggedout() {
    $('#login').css('display','block').click(function(){
        FB.login(function(response){
			alert(2);
            document.location.href = 'http://127.0.0.1 ';
        });
    });
}

// эта функция добавляет в карточку интересы пользователя
function getUserLikes(id) {
    FB.api('/'+id+'/likes', function(response){
        _htmlstr = '';
        $.each(response.data, function(index, value){
            _htmlstr += value.name+', ';
        });
        if (_htmlstr) {
            htmlstr = 'Likes: '+_htmlstr;
            $('#card_'+id+' div').html(htmlstr.substring(0, htmlstr.length-2));
        }
    });
}

// эта функция создает HTML код для карточки пользователя
function makecard(margin, img, name, id) {
    htmlstr = '<div class="contactcard" id="card_'+id+'" style="margin-left: '+margin+'px;">';
        htmlstr += '<img src="'+img+'" />';
        htmlstr += '<a href="http://www.facebook.com/'+id+'">'+name+'</a>';
        htmlstr += '<div></div>';
    htmlstr += '</div>';
    return htmlstr;
}

// эта функция выводит карточки всех друзей
function getUserFriends(id) {
    FB.api('/'+id+'/friends', function(response){
        $.each(response.data, function(index, value){
            $('#userinfo').append(makecard(25, 'https://graph.facebook.com/'+value.id+'/picture', value.name, value.id));
            getUserLikes(value.id);
        });
    });
}

// эта функция выводит карточку пользователя
function getUserInfo() {
    FB.api('/me', function(response){
        $('#userinfo').html(makecard(0, 'https://graph.facebook.com/'+response.id+'/picture', response.name, response.id));
        getUserFriends(response.id);
        getUserLikes(response.id);
    });
}

// Когда загрузилась страница, можем работать с DOM
$(document).ready(function(){

    // Инициализируем объект facebook
    FB.init({appId: '653741407981313', status: true, cookie: true, xfbml: true});

    // Проверим вошел ли пользователь
    FB.getLoginStatus(function(response){
       if (response.session) {
           loggedin(); // если да
       } else {
           loggedout(); // если нет
       }
    });

});