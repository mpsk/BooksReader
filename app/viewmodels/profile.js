define(['service/facebook'], function (facebook) {

   
    var profile = {
        fbId: ko.observable(),
        username: ko.observable(),
        name: ko.observable(),
        btnText: ko.observable()
    };

   
    function activate() {
      
    }   

    return {
        activate: activate
    };

})