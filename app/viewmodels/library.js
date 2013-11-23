define(['durandal/app', 'durandal/system', 'service/rest', 'service/reader'], function (app, system, rest, reader) {

	var REST = rest;
	var books = ko.observableArray();

	var self = {

	    addBook: function(vm, evt){
	    	console.warn(evt);
	    	reader.getFile(evt).then(function(book){
	    		console.warn(book);
	    	});
	    },

	    getLibrary: function(){
			REST.root().then(function(db) {
				console.warn(db);
				books(JSON.stringify(db));
			});
	    }
	    
	};

    return {
        books: books,
        addBook: self.addBook,
        getLibrary: self.getLibrary
    };

});