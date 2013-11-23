define(['plugins/router', 'service/facebook'], function (router, facebook) {

    var user = {
        id: ko.observable(),
        first_name: ko.observable(),
        username: ko.observable(),
        photo: ko.observable(),
        btnText: ko.observable()
    };

    var loginBtn = ko.observable();

    var self = {
        sidebar: function(e, ev){
            var btn = ev.target;

            $('.sidebar.menu')
                .sidebar({
                    overlay: true,
                    onShow: function(){
                        var height = $('.container .menu').height();
                        $(this).css('top', height+'px');
                        $(btn).closest('a').addClass('active');
                    },
                    onHide: function(){
                        $(btn).closest('a').removeClass('active');  
                    }
                })
                .sidebar('toggle');
        },

        login: function(){

            if (user.id()) {
                FB.logout(function(data){
                    data.status === 'unknown' ? user.btnText('Login') : ''
                });
            } else {
                FB.login(function(data){
                    facebook.getUserInfo(data).then(function(response){
                        user.btnText(response.first_name);
                        user.id(response.id);
                        user.username(response.username);
                    });
                });
            }

        }
    }

    function activate() {

        router.map([
            { route: '', moduleId: 'viewmodels/library', title: 'Library' }
            // { route: 'create', moduleId: 'viewmodels/createTask' },
            // { route: 'task/:id', moduleId: 'viewmodels/task' }
        ]).buildNavigationModel();

        // FB.init({appId: '653741407981313', status: true, cookie: true, xfbml: true});
        FB.init({appId: '176984692495321', status: true, cookie: false, xfbml: true});

        FB.getLoginStatus(function(data){
            facebook.getUserInfo(data).then(function(response){
                console.warn(response);
                if (response.id) {
                    user.btnText(response.first_name);
                    user.id(response.id);
                    user.username(response.username);
                } else {
                    user.btnText('Login');
                }
            });
        });
        
        return router.activate();
    }

    return {
        activate: activate,
        router: router,
        sidebar: self.sidebar,
        login: self.login,
        user: user
    };

})