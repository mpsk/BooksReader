define(['durandal/system', 
		'plugins/http',
		'service/reader',
		'service/user', 
		'service/bookStore',
		'service/options'], function (system, http, reader, user, bookStore, options) {

   	var location = window.location;

	var DB = {
		root: 		'http://'+location.hostname+':5984/bookreader'	/* "http://localhost:5984/bookreader" */,
		checkUser: 	'http://'+location.hostname+':5984/bookreader/_design/users/_view/all'
	};

	var rest = {

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
					
					bookStore.id = data.id+'_books';

					dfd.resolve(data);

					rest.addUserBookStore(bookStore.id).then(function(resp) {
						bookStore.rev = resp.rev;
					});

				})
				.fail(function(data){
					console.warn('FAIL ADDED NEW USER', data);
					dfd.reject(JSON.parse(data.responseText));
				});

			return dfd.promise();
		},

		addUserBookStore: function(bookStoreId){
			var dfd = $.Deferred();

			$.ajax({
				url: DB.root+'/'+bookStoreId,
				type: 'PUT',
				dataType: "json",
				data:"{}",
				complete: function(resp){
					dfd.resolve(resp.responseJSON);
				}
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
						user.fbId = result.fbId;
						user.words(result.words || []);
						user.books(result.books || []);
						console.log(result.settings);
						options.font_size(result.settings.font_size);
						options.font_name(result.settings.font_name);
						
						bookStore.id = data.id+'_books';
						
						rest.getCurrentUserBookStore(bookStore.id).then(function(resp){
							// user.books(resp || []);
						});
				

						dfd.resolve(result);

					})
					.fail(function(result){
						console.warn('FAIL GET CURRENT USER INFO', result);
					});

			});

			return dfd.promise();
		},

		getCurrentUserBookStore: function(bookStoreId){
			var dfd = $.Deferred();

			http.get(DB.root+'/'+bookStoreId)
					.done(function(result){
						var result = JSON.parse(result);
						console.warn('GET CURRENT USER BOOKSTORE INFO', result);

						bookStore.id = result._id;
						bookStore.rev = result._rev;

						var books = [];
						if (result._attachments) {
							$.each(result._attachments, function(name, book){
								books.push({
									name: name,
									size: book.length
								});
							});
						}

						dfd.resolve(books);

					})
					.fail(function(result){
						console.warn('FAIL GET CURRENT USER BOOKSTORE INFO', result);
					});

			return dfd.promise();
		},

		deleteBook: function(userId, book){
			var dfd = $.Deferred();

			$.ajax({
				url: DB.root+'/'+userId+'_books/'+book.name+'?rev='+bookStore.rev,
				type: 'DELETE',
				complete: function(result){
					var result = JSON.parse(result.responseText);
					if (result.ok) {
						bookStore.rev = result.rev;
						user.books.remove(book);
						rest.updateUser(user);
					}
					dfd.resolve(result);
				}
			});

			return dfd.promise();
		},

		getFile: function(userId, book){
			var dfd = $.Deferred();

			var bookName = book.name || book;

			http.get(DB.root+'/'+userId+'_books/'+bookName)
				.done(function(data){
					dfd.resolve(data);
					// console.warn(data);
				})
				.fail(function(resp){
					console.error('FAIL TO GET FILE', resp);
				});

			return dfd.promise();			
		},

		// TODO: Need to use one request to update any user info
		updateUser: function(user){

			delete user.__moduleId__;
			user.settings.font_size = options.font_size();
			user.settings.font_name = options.font_name();

			$.ajax({
				url: DB.root+'/'+user.id+'?rev='+user.rev,
				type: 'PUT',
				dataType: "json",
				data: ko.toJSON(user),
				complete: function(data){
					console.warn(data);
					if (data.responseJSON.ok) {
						user.rev = data.responseJSON.rev;
					}
				}
			});
		},

		uploadBook: function(file){
			var dfd = $.Deferred();

			// TODO: Add checking for supported types
			var type = (function(){
				if (file.type.length > 0) {
					return file.type;
				} else {
					if (file.name.indexOf('.fb2') > 0) {
						return 'application/octet-stream'
					} 
				}
			})();
			
			reader.getBookInfo(file).then(function(bookInfo){
				console.warn(bookInfo);

				var xhr = new XMLHttpRequest();
				xhr.open('PUT', DB.root+'/'+bookStore.id+'/'+file.name+'?rev='+bookStore.rev);
				xhr.onload = function(data){
					var result = JSON.parse(data.target.response);
					bookStore.rev = result.rev;

					user.books.push({
						cover: bookInfo.cover,
						title: bookInfo.title,
						author: bookInfo.author,
						name: file.name,
						size: file.size
					});

					rest.updateUser(user);
					dfd.resolve(result);

				};
				xhr.onerror  = function(data){
					console.warn(data);
					dfd.reject(data);
				};
				xhr.send(file);

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
		},

		addWord: function(my_word, my_translate, my_book){

			delete user.__moduleId__;

			console.log(user);
			var word = {
				text: my_word,
				translate: my_translate,
				book: my_book
			};
			user.words.push(word);
			rest.updateUser(user);
		}
		/*,
		getWords: function(bookStoreId){
			var dfd = $.Deferred();

			http.get(DB.root)
					.done(function(result){
						var result = JSON.parse(result);
						console.log('GET WORDS', result);
						//bookStore.id = result._id;
						//bookStore.rev = result._rev;
						
						var words = [];
						

						dfd.resolve(words);

					})
					.fail(function(result){
						console.warn('FAIL GET WORDS', result);
					});

			return dfd.promise();
		},*/
	};

	return rest;
});