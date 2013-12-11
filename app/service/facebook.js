define(['plugins/http', 'service/user'], function (http, user) {
    
    var facebook = {

        // эта функция добавляет в карточку интересы пользователя
        getUserLikes: function(id) {
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
        },

        // эта функция создает HTML код для карточки пользователя
        makecard: function(margin, img, name, id) {
            htmlstr = '<div class="contactcard" id="card_'+id+'" style="margin-left: '+margin+'px;">';
                htmlstr += '<img src="'+img+'" />';
                htmlstr += '<a href="http://www.facebook.com/'+id+'">'+name+'</a>';
                htmlstr += '<div></div>';
            htmlstr += '</div>';
            return htmlstr;
        },

        // эта функция выводит карточки всех друзей
        getUserFriends: function(id) {
            FB.api('/'+id+'/friends', function(response){
                $.each(response.data, function(index, value){
                    // $('#userinfo').append(facebook.makecard(25, 'https://graph.facebook.com/'+value.id+'/picture', value.name, value.id));
                    facebook.getUserLikes(value.id);
                });
            });
        },

        // эта функция выводит карточку пользователя
        getUserInfo: function(data) {
            var dfd = $.Deferred();

            // var OFFLINE = {"id":"100000405491053","name":"Mykola Piskovyi","first_name":"Mykola","last_name":"Piskovyi","link":"https://www.facebook.com/m.piskovyi","username":"m.piskovyi","quotes":"Power wears out those who dont have it.\r\n(c) GodFarther","education":[{"school":{"id":"108057582556190","name":"Kiev Polytechnic Institute"},"year":{"id":"142963519060927","name":"2010"},"concentration":[{"id":"196351893724096","name":"Radio Engineering"}],"type":"College"}],"gender":"male","timezone":2,"locale":"ru_RU","languages":[{"id":"112047618813812","name":"English"},{"id":"115447225136484","name":"Українська"},{"id":"112624162082677","name":"Russian"}],"verified":true,"updated_time":"2013-11-22T23:52:37+0000"};
            // dfd.resolve(OFFLINE);

            
            if (data.status === 'connected') {
                FB.api('/me', function(response){
                    dfd.resolve(response);
                });               
            } else {
                dfd.resolve(data);
            }
            

            return dfd.promise();
        },
        getUserAvatar: function(){
            var dfd = $.Deferred();
            console.log('getUserAvatar');
            http.get("http://graph.facebook.com/"+user.fbId+"/picture?type=large")
                .done(function(result){
                    dfd.resolve(result);

                })
                .fail(function(result){
                    console.warn('FAIL GET USER AVATAR', result);
                });

            return dfd.promise();
        }

    };

    return facebook;
});