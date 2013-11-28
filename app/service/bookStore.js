define(['service/user'], function (user) {
    
	/*
	*	book = {name:'', size:''}
	*	name - book.name
	*	size - book.size in DB
	*/

	var bookStore = {
		id: user.id || '',
		rev: ''
	};

    return bookStore;
});