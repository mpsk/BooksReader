﻿define(['plugins/router', 'service/facebook', 'service/rest', 'service/user'], function (router, facebook, rest, user) {

    var REST = rest;

    var profile = {
        fbId: ko.observable(),
        username: ko.observable(),
        name: ko.observable(),
        btnText: ko.observable(),
        txtLogin: ko.observable()
    };

    // var currentBook = ko.observable(user.curBookName);

    var shell = {
        sidebar: function(vm, ev){
            var btn = ev.target;
            var $sidebar = $('.sidebar.menu');

            $sidebar.sidebar({
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
                .sidebar('attach events', '.sidebar a.item', 'toggle')
                .sidebar('toggle');
        },

        login: function(){

            if (profile.fbId()) {
                FB.logout(function(data){
                    if(data.status === 'unknown'){
                        profile.btnText('Login');
                        profile.txtLogin('');
                    } 
                    else{
                       // 'WTF?'
                    }  
                    profile.fbId('');
                    user.name('');
                });

            } else {
                FB.login(function(data){
                   // self.getCurrentUser(data);
                    shell.getCurrentUser(data);
                });
            }

        },

        getCurrentUser: function(data){
           
            facebook.getUserInfo(data).then(function(response) {
                console.warn(response);                
               if (response.id) {

                    profile.txtLogin(response.first_name);
                    profile.btnText('Logout');                    
                    profile.fbId(response.id);
                    profile.name(response.name);
                    profile.username(response.username);

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
        },

        toContents: function(){
            router.navigate('#contents/'+user.curBookName, false);
        }
    }

    function activate() {
        router.map([
            { route: '',            moduleId: 'viewmodels/library',     title: 'Library' },
            { route: 'profile',     moduleId: 'viewmodels/profile',     title: 'Profile' },
            { route: 'words',       moduleId: 'viewmodels/words',       title: 'Words'   },
            { route: 'book/:id',    moduleId: 'viewmodels/book',        title: 'Reading' },
            { route: 'book/:id/contents',    moduleId: 'viewmodels/contents',    title: 'Contents'},
            // { route: 'contents',    moduleId: 'viewmodels/contents',    title: 'Contents'},
            { route: 'settings',    moduleId: 'viewmodels/settings',    title: 'Settings'}
            // { route: 'create', moduleId: 'viewmodels/createTask' },
            // { route: 'task/:id', moduleId: 'viewmodels/task' }

        ]).buildNavigationModel();

        FB.init({appId: '176984692495321', status: true, cookie: false, xfbml: true});
        FB.getLoginStatus(function(data) {
            shell.getCurrentUser(data);
        });

        return router.activate();
        
    }   

    return {
        activate: activate,
        router: router,
        sidebar: shell.sidebar,
        login: shell.login,
        profile: profile,
        user: user,
        toContents: shell.toContents
        // currentBook: currentBook
    };

})