define(['durandal/system', 'plugins/http'], function (system, http) {
   	
   	var location = window.location;

	var DB = {
		root: 		'http://'+location.hostname+':5984/bookreader'	/* "http://localhost:5984/bookreader" */,
		checkUser: 	'http://'+location.hostname+':5984/bookreader/_design/users/_view/all'
	};

	var rest = {

		addUser: function(user){
			var dfd = $.Deferred();

			http.post(DB.root, user)
				.done(function(data){
					console.warn('ADDED NEW USER', data);
					dfd.resolve(data);
				})
				.fail(function(data){
					console.warn('FAIL ADDED NEW USER', data);
					dfd.reject(JSON.parse(data.responseText));
				});

			return dfd.promise();
		},

		checkForUser: function(user){
			var dfd = $.Deferred();

			http.get(DB.checkUser+'?keys=["'+user.fbId+'"]')
				.done(function(result){
					var result = JSON.parse(result);
					console.warn(result);
					if (result.rows.length > 0) {
						dfd.resolve(result.rows[0]);

					} else {
						rest.addUser(user).then(function(response){
							console.warn(response);
							dfd.resolve(response);
						});
					}
				})
				.fail(function(data){
					console.warn('FAIL GET CURRENT USER', data);
					dfd.reject();
				});

			return dfd.promise();
		},

		getCurrentUser: function(user){
			var dfd = $.Deferred();

			rest.checkForUser(user).then(function(data){
				console.warn('NEED to get exist user', data);

				http.get(DB.root+'/'+data.id)
					.done(function(result){
						console.warn('GET CURRENT USER INFO', result);
						dfd.resolve(result);
					})
					.fail(function(result){
						console.warn('FAIL GET CURRENT USER INFO', result);
					});

			});

			return dfd.promise();
		},

		root: function(){
			var dfd = $.Deferred();

			http.get(DB.root)
				.done(function(data){
					var data = JSON.parse(data);
					dfd.resolve(data);
				})
				.fail(function(data){
					dfd.reject(data);
				});

			return dfd.promise();
		}
	};

	return rest;
});