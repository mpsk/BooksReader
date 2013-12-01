define(['service/user','service/rest'], function(user, rest) {

    // var user_name = ko.observable(user.name());


     function activate() {


        /*rest.getUserAvatar().then(function(answer) {
            console.info('activate', answer);
            $('#userinfo').append(answer);
        });*/
        setTimeout(function(){
            var result="<IMG src='http://graph.facebook.com/"+user.fbId+"/picture?type=large'>"; 
            $('#userinfo').append(result);
        },1000);

        //var result = rest.getUserAvatar();
        //console.info(result);
        //alert(result);
        //$('#userinfo').append(facebook.makecard(25, 'https://graph.facebook.com/'+value.id+'/picture', value.name, value.id));

        //http://profile.ak.fbcdn.net/hprofile-ak-ash3/195591_100002657183599_345740511_n.jpg
    //     var dfd = $.Deferred();

    //     //dfd.resolve(response);
    //     setTimeout(function() {
    //         console.info(user.name());
    //         user_name(user.name());
    //     }, 2000);

    
     }

    return {
        activate: activate,
        nameName: user.name,
        books_count: user.books.length,
        words_count: user.words.length
    };
})