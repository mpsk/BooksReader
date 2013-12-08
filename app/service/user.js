define([], function () {

	var user = {
		id: '',
		rev: '',
		fbId: '',
		name: ko.observable(''),
        username: ko.observable(''),
        books: ko.observableArray([]),
        words: ko.observableArray([]),
        // FIXME: Should not be here (current book name);
        // And rewrite curBookName and section to one object
        curBookName: ko.observable(''),
        currentSection: ko.observable('')
    }

    return user;
});