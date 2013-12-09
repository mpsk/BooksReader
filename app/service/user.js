define([], function () {

	var user = {
		id: '',
		rev: '',
		fbId: '',
		name: ko.observable(''),
        username: ko.observable(''),
        books: ko.observableArray([]),
        words: ko.observableArray([]),
        settings: {
            font_size: 12,
            font_name: ''
        },    
        currentSection: ko.observable('')
    }

    return user;
});