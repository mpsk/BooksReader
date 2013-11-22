define(['durandal/app', 'durandal/system', 'service/rest', 'service/reader'], function (app, system, rest, reader) {

	var REST = rest;
	var books = ko.observableArray();

	var self = {

	    addBook: function(evt){
	    	reader.getFile(evt).then(function(book){
	    		console.warn(book);
	    	});
	    },

	    getLibrary: function(){
			REST.library().then(function(library) {
				console.warn(library);
				books(JSON.stringify(library));
			});
	    },

	    applyEvents: function(){
	    	$('.library #file').on('change', self.addBook);
	    }
	};


	function activate (arg){
		// TODO: Fix according to Durandal events.
		setTimeout(function(){
			self.applyEvents();
		}, 100);
	};

    return {
    	activate: activate,
        books: books,
        addBook: self.addBook,
        getLibrary: self.getLibrary
    };

});