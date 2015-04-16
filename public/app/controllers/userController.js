angular.module('userController', ['userService'])


.controller('UserController', function(User) {


	var vm = this;

	
	User.all()
		.success(function(data) {
			vm.users = data;
		})


})


.controller('UserCreateController', function(User, $location, $window) {

	var vm = this;

	vm.signupUser = function() {
		vm.message = '';

		User.create(vm.userData)
			.then(function(response) {
				vm.userData = {};
				vm.message = response.data.message;

				$window.localStorage.setItem('token', response.data.token);
				$location.path('/');
			})
	}

})

.controller('AllUsersController', function(users, socketio) {

	var vm = this;

	vm.users = users.data;

	socketio.on('user', function(data) {
			vm.users.push(data);
	});



});