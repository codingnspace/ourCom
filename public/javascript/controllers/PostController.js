(function() {
	'use strict';
	angular.module('app')
	.controller('PostController', PostController);

	function PostController(HomeFactory,UserFactory,$state,$stateParams) {
		var vm = this;
    vm.user = {};
		vm.users = {};
		vm.newComment ={};
    vm.id = $stateParams.id;
    vm.status = UserFactory.status;
    HomeFactory.getPost(vm.id).then(function(res){
      vm.post =res;
      console.log(vm.status._id +"id");
    })



	}
})();
