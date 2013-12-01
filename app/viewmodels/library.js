define(['durandal/app', 
		'durandal/system',
		'plugins/dialog', 
		'service/rest', 
		'service/reader',
		'service/translator',
        'service/user',
        'service/bookStore'], function (app, system, dialog, rest, reader, translator, user, bookStore) {

	var REST = rest;
	var books = ko.observableArray();
	var cur_book = "some_book";

	var self = {

	    addBook: function(vm, evt){
	    	var file = reader.getInputFile(evt);
	    	REST.uploadBook(file).then(function(response){
	    		console.warn(response);
	    	});
	    },

		getSelectedText: function(vm, evt){
			var text = $.selection();
			if (text.length > 0) {
				translator.translate(text).then(function(data){
					console.warn(data);
					REST.addWord(text, data, user.curBookName);
				});
			}
		},

<<<<<<< HEAD
		getBookContent: function(vm, e){
			console.warn(this, e)
			user.curBookName = this.name;
=======
		getBookPreview: function(vm, e){
			var that = this;
			REST.getFile(user.id, this).then(function(text){
				var preview = reader.getBookPreview(text);
				dialog.showMessage(preview, that.title);
				// dialog.show(vm, 'Title', 'desciption');
				// dialog.show('message', 'title', 'options');
			});
		},

		getBookContent: function(vm, e){
>>>>>>> 0eb6204554084469dc81561ce13b4589c32e0c07
			REST.getFile(user.id, this).then(function(text){

				console.warn(text);
			});
		}
	    
	};

    return {
    	user: user,
        addBook: self.addBook,
        getSelectedText: self.getSelectedText,
        getBookContent: self.getBookContent,
        getBookPreview: self.getBookPreview
    };

});