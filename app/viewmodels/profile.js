define(['service/facebook'], function (facebook) {

   
    var profile = {
        user_name: ko.observable(),
        fbId: ko.observable()
    };

   
    function activate() {
      
    }   

    return {
        activate: activate
    };

})