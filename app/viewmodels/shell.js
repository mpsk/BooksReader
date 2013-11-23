define(['plugins/router', 'service/facebook', 'service/rest'], function (router, facebook, rest) {

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
                });

            } else {
                FB.login(function(data){
                    self.getCurrentUser(data);
                });
            }

        },

        translate: function() {
             console.log( 'try translate '+ShowSelection() );
           $.ajax({
              url:"https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20131122T210759Z.34245b798456966b.bd525e7d279824e390146aed4b68eb514b238876&text=Better%20late%20than%20never&lang=ru",
              success: function(data){
                //var obj = jQuery.parseJSON(data);
                //alert( data.text );
                console.log( data.text );
              }
            });     
         },

        getCurrentUser: function(data){
            facebook.getUserInfo(data).then(function(response) {
                console.warn(response);
                if (response.id) {
                    profile.btnText(response.first_name);
                    profile.fbId(response.id);
                    profile.name(response.name);
                    profile.username(response.username);

                    var user = {
                        fbId: response.id,
                        name: response.name,
                        username: response.username
                    };

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
            { route: '', moduleId: 'viewmodels/library', title: 'Library' }
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

    function ShowSelection(){

      var textComponent = document.getElementById('book_content');
      var selectedText;
      // IE version
      if (document.selection != undefined)
      {
        textComponent.focus();
        var sel = document.selection.createRange();
        selectedText = sel.text;
      }
      // Mozilla version
      else if (textComponent.selectionStart != undefined)
      {
        var startPos = textComponent.selectionStart;
        var endPos = textComponent.selectionEnd;
        selectedText = textComponent.value.substring(startPos, endPos)
      }
      return selectedText;
    }
     

    return {
        activate: activate,
        router: router,
        sidebar: self.sidebar,
        login: self.login,
        profile: profile,
        ShowSelection: ShowSelection
    };

})