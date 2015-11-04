(function() {
	'use strict';
	angular.module('app')
	.controller('TextController', TextController);

	function TextController(UserFactory,$state) {
		var vm = this;
		var account = false;
		vm.user = {};
    vm.newPost ={};
    vm.status = UserFactory.status;


	}
})();
