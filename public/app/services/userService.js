angular.module('userService', [])


.factory('User', function($http) {

	var userFactory = {};

	userFactory.create = function(userData) {
		return $http.post('/api/signup', userData);
	}

	userFactory.all = function() {
		return $http.get('/api/users');
	}

	userFactory.allUsers = function() {
		return $http.get('/api/users');
	}



	return userFactory;

})

.factory('socketio', function($rootScope) {

	var socket = io.connect();
	return {

		on: function(eventName, callback) {
			socket.on(eventName, function() {
				var args = arguments;
				$rootScope.$apply(function() {
					callback.apply(socket, args);
				});
			});
		},

		emit: function(eventName, data, callback) {
			socket.emit(eventName, data, function() {
				var args = arguments;
				$rootScope.apply(function() {
					if(callback) {
						callback.apply(socket, args);
					}
				});
			});
		}

	};

});