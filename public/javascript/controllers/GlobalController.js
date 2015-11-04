(function() {
	'use strict';
	angular.module('app')
	.controller('GlobalController', GlobalController);

	function GlobalController(UserFactory,$state) {
		var vm = this;
		var account = false;
		vm.user = {};
    vm.status = UserFactory.status;

    vm.registerUser = function() {
      UserFactory.registerUser(vm.user).then(function() {
        $state.go('CreateProfile');
      });
    };

    vm.loginUser = function() {
      UserFactory.loginUser(vm.user).then(function() {
				$state.go('Profile({id: vm.status._id})');
        // $state.go('Home');
      });
    };

    vm.logout = function() {
      UserFactory.logout();
      $state.go('Home');
    };
	}
})();
