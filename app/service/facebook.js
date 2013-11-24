define([], function () {
    
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
            if (data.status === 'connected') {
                FB.api('/me', function(response){

                    dfd.resolve(response);

                    // $('#userinfo').html(facebook.makecard(0, 'https://graph.facebook.com/'+response.id+'/picture', response.name, response.id));
                    // facebook.getUserFriends(response.id);
                    // facebook.getUserLikes(response.id);
                });               
            } else {
                dfd.resolve(data);
            }

            return dfd.promise();
        }

    };

    return facebook;
});