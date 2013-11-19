define(['durandal/system', 'plugins/http'], function (system, http) {
    
	var DB = {
		root: 		"http://localhost:5984/",
		library: 	'http://localhost:5984/bookreader/'
	};

	var self = {
		library: function(){
			var dfd = $.Deferred();

			http.get(DB.library)
				.done(function(data){
					var data = JSON.parse(data);
					dfd.resolve(data);
				})
				.fail(function(data){
					dfd.reject();
				});

			return dfd.promise();
		}
	};

	return self;
});