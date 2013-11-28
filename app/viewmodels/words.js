define(['durandal/system', 'service/user'], function(system, user) {

    var selectBook = ko.observable();
    //var availableBooks = ko.observableArray( user.books );
    var availableWords = ko.observableArray( ['123123'] );
    var filter = ko.observable();

    var filteredWords = ko.computed(function () {
        return ko.utils.arrayFilter(availableWords(), function (words1) {
        	//var result = words1.indexOf(filter()) != -1 || !self.filter();       
            //return result;
        });
      });

    return {
       selectBook: selectBook,
       filter: filter
    };
})