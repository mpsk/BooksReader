define(['service/user'], function (user) {

   
   var user_name = ko.observable('please login');

   
    function activate() {
   	  var dfd = $.Deferred();

   	   //dfd.resolve(response);
      setTimeout(function(){
 			console.info(user.name);
		user_name(user.name);
      },100);
      
   
    }   

    return {
        activate: activate,
        user_name: user_name
    };

})