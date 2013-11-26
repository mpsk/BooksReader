define(['plugins/router', 'service/facebook', 'service/rest', 'service/user'], function (router, facebook, rest, user) {

    var REST = rest;

    var profile = {
        fbId: ko.observable(),
        username: ko.observable(),
        name: ko.observable(),
        btnText: ko.observable()
    };

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

            if (profile.fbId()) {
                FB.logout(function(data){
                    data.status === 'unknown' ? profile.btnText('Login') : 'WTF?'
                    profile.fbId('');
                    user.name('');
                });

            } else {
                FB.login(function(data){
                    self.getCurrentUser(data);
                });
            }

        },

        getCurrentUser: function(data){
            facebook.getUserInfo(data).then(function(response) {
                console.warn(response);
                if (response.id) {

                    profile.btnText(response.first_name);
                    profile.fbId(response.id);
                    profile.name(response.name);
                    profile.username(response.username);

                    // var user = {
                    //     fbId: response.id,
                    //     name: response.name,
                    //     username: response.username
                    // };

                    user.fbId = response.id;
                    user.name(response.name);
                    user.username(response.username);

                    REST.getCurrentUser(user).then(function(answer) {
                        console.warn('WELLCOME SCREEN or User Library', answer);
                    });

                } else {
                    profile.btnText('Login');
                }
            });
        }
    }

    function activate() {

        router.map([
            { route: '', moduleId: 'viewmodels/library', title: 'Library' },
            { route: 'profile', moduleId: 'viewmodels/profile', title: 'Profile' },
            { route: 'words', moduleId: 'viewmodels/words', title: 'Words' }
            // { route: 'create', moduleId: 'viewmodels/createTask' },
            // { route: 'task/:id', moduleId: 'viewmodels/task' }
        ]).buildNavigationModel();

        return router.activate().then(function(data){
            // FB.init({appId: '653741407981313', status: true, cookie: true, xfbml: true});
            FB.init({appId: '176984692495321', status: true, cookie: false, xfbml: true});
            FB.getLoginStatus(function(data) {
                self.getCurrentUser(data);
            });
        });
    }   

    return {
        activate: activate,
        router: router,
        sidebar: self.sidebar,
        login: self.login,
        profile: profile
    };

})