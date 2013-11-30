define(['service/user'], function(user) {

	var self = {

		selectedBook: ko.observable('my_some_book')/*;
    //    filter: ko.observable();*/
	}
    
    //var availableBooks = ko.observableArray( user.books );
   /* var availableWords = ko.observableArray( ['sfhdfxg123123','asfasf'] );
   */
    setTimeout(function() {
            // console.info(user.words());
            // user_name(user.name());
         }, 2000);/*
    var filteredWords = ko.computed(function () {
        return ko.utils.arrayFilter(availableWords(), function (words1) {
        	var result = words1.indexOf(filter()) != -1 || !filter();       
            return result;
        });
      });*/

    function activate() {
     // console.log('activate '+ user.words());
     } 

    return {
       words: user.words, 
       activate: activate,
       selectedBook: self.selectedBook,
       books: user.books/*,
       filter: filter,
       filteredWords: filteredWords*/
    };
})