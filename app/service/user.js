define([], function () {

	var user = {
		id: '',
		rev: '',
		fbId: '',
        fbProfile: '',
		name: ko.observable(''),
        username: ko.observable(''),
        books: ko.observableArray([]),
        words: ko.observableArray([]),
        curBookName: ko.observable(''),
        settings: {
            font_size: 12,
            font_name: ''
        },    
        currentSection: ko.observable('')
    }

    return user;
});