define(['plugins/dialog', 
		'service/rest', 
		'service/reader',
		'service/translator',
        'service/user',
        'service/bookStore'], function (dialog, rest, reader, translator, user, bookStore) {

	var REST = rest;
	var books = ko.observableArray();

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
					REST.addWord(text, data, user.curBookName());
				});
			}
		},

		getBookPreview: function(vm, e){
			var that = this;
			REST.getFile(user.id, this).then(function(text){
				var preview = reader.getBookPreview(text);
				dialog.showMessage(preview, that.title);
			});
		},

		deleteBook: function(){
			console.warn(this);
			var that = this;
			REST.deleteBook(user.id, this).then(function(data){
				if (data.ok) {
					console.warn(data);
				}
			})
		}

	};

    return {
    	user: user,
        addBook: self.addBook,
        getSelectedText: self.getSelectedText,
        getBookPreview: self.getBookPreview,
        deleteBook: self.deleteBook
    };

});