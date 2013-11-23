define(['plugins/router', 'service/facebook'], function (router, facebook) {

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
            FB.login(function(response){
                console.warn(response);
            });
            // facebook.loggedin();
            // FB.getLoginStatus(function(response) {
            //     console.warn(response);
            //     if (response.session) {
            //         facebook.loggedin(); // если да
            //     } else {
            //         facebook.loggedout(); // если нет
            //     }
            // });
        },
        logout: function(){
            FB.logout(function(response){
                console.warn(response);
            });
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

        // Проверим вошел ли пользователь
        // FB.getLoginStatus(function(response){
        //     console.warn(response);
        //    if (response.session) {
        //        facebook.loggedin(); // если да
        //    } else {
        //        facebook.loggedout(); // если нет
        //    }
        // });
        
        return router.activate();
    }

    return {
        activate: activate,
        router: router,
        sidebar: self.sidebar,
        login: self.login
    };

})