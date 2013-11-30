define(['service/user'], function(user) {

	var self = {
		selectBook: ko.observable('sdgs');
    filter: ko.observable();
	}
    
    //var availableBooks = ko.observableArray( user.books );
   /* var availableWords = ko.observableArray( ['sfhdfxg123123','asfasf'] );
   

    var filteredWords = ko.computed(function () {
        return ko.utils.arrayFilter(availableWords(), function (words1) {
        	var result = words1.indexOf(filter()) != -1 || !filter();       
            return result;
        });
      });*/

    return {
       selectBook: self.selectBook,
       filter: filter/*,
       filteredWords: filteredWords*/
    };
})