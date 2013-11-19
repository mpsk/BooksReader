define(['plugins/router'], function (router) {

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
            // FB registration and login

        }
    }

    function activate() {

        router.map([
            { route: '', moduleId: 'viewmodels/library', title: 'Library' }
            // { route: 'create', moduleId: 'viewmodels/createTask' },
            // { route: 'task/:id', moduleId: 'viewmodels/task' }
        ]).buildNavigationModel();
        
        return router.activate();
    }

    return {
        activate: activate,
        router: router,
        sidebar: self.sidebar,
        login: self.login
    };

})