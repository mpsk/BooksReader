define(['durandal/app', 
		'durandal/system', 
		'service/rest', 
		'service/reader',
		'service/translator'], function (app, system, rest, reader, translator) {

	var REST = rest;
	var books = ko.observableArray();

	var self = {

	    addBook: function(vm, evt){
	    	console.warn(evt);
	    	reader.getFile(evt).then(function(file){
	    		console.warn(file);
	    		REST.loadBook(file);
	    	});
	    },

	    getLibrary: function(){
			REST.root().then(function(db) {
				console.warn(db);
				books(JSON.stringify(db));
			});
	    },

		getSelectedText: function(vm, evt){
			var text = $.selection();
			if (text.length > 0) {
				translator.translate(text).then(function(data){
					console.warn(data);
				});
			}
		}
	    
	};

    return {
        books: books,
        addBook: self.addBook,
        getLibrary: self.getLibrary,
        getSelectedText: self.getSelectedText
    };

});