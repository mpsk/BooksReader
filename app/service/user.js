define([], function () {
    
	/*
	*	book = {name:'', size:''}
	*	name - book.name
	*	size - book.size in DB
	*/

	var user = {
		id: '',
		rev: '',
		fbId: '',
		name: ko.observable(''),
        username: ko.observable(''),
        books: ko.observableArray([]),
        books_count: 1,
        words: ko.observableArray([])
        words_count: 2
	};

    return user;
});