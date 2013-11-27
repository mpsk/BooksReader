define(['durandal/system', 'plugins/http', 'service/user'], function (system, http, user) {

   	var location = window.location;

	var DB = {
		root: 		'http://'+location.hostname+':5984/bookreader'	/* "http://localhost:5984/bookreader" */,
		checkUser: 	'http://'+location.hostname+':5984/bookreader/_design/users/_view/all',
		loadBook: 	'http://'+location.hostname+':5984/bookreader',
		addWord: 	'http://'+location.hostname+':5984/bookreader'
	};

	var rest = {

		addUser: function(user){
			var dfd = $.Deferred();

			delete user.id;
			delete user.rev;
			delete user.__moduleId__;

			http.post(DB.root, user)
				.done(function(data){
					console.warn('ADDED NEW USER', data);
					
					user.id = data.id;
					user.rev = data.rev;
					
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
						var result = JSON.parse(result);
						console.warn('GET CURRENT USER INFO', result);
						
						user.id = result._id;
						user.rev = result._rev;

						if (result._attachments) {
							$.each(result._attachments, function(name, book){
								user.books.push({
									name: name,
									size: book.length
								});
							});
						}

						dfd.resolve(result);

					})
					.fail(function(result){
						console.warn('FAIL GET CURRENT USER INFO', result);
					});

			});

			return dfd.promise();
		},

		getFile: function(userId, book){
			var dfd = $.Deferred();

			http.get(DB.root+'/'+userId+'/'+book.name)
				.done(function(data){
					dfd.resolve(data);
					// console.warn(data);
				})
				.fail(function(resp){
					console.error('FAIL TO GET FILE', resp);
				});

			return dfd.promise();			
		},

		updateUser: function(user, data){
			$.ajax({
				url: DB.root+'/'+user.id+'/'+file.name+'?rev='+user.rev,
				type: 'PUT',
				dataType: "json",
				headers: {
					'Content-Type': type
				},
				data: [ko.toJSON(file)],
				complete: function(data){
					user.rev = data.responseJSON.rev;
					console.warn(data);
				}
			});
		},

		loadBook: function(file){

			console.warn(file);

			var type = (function(){
				if (file.type.length > 0) {
					return file.type;
				} else {
					if (file.name.indexOf('.fb2') > 0) {
						return 'application/octet-stream'
					} 
				}
			})();

			var xhr = new XMLHttpRequest();
			xhr.open('PUT', DB.root+'/'+user.id+'/'+file.name+'?rev='+user.rev);
			xhr.send(file);

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
		},

		addWord: function(word){

			var dfd = $.Deferred();
			
			http.post(DB.root, word)
				.done(function(data){					
					
					console.log('word added');
					dfd.resolve(data);
				})
				.fail(function(data){
					dfd.reject();
				});

			return dfd.promise();

		}
	};

	return rest;
});