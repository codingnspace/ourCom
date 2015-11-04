(function() {
	'use strict';
	angular.module('app')
	.controller('EditPostController', EditPostController);

	function EditPostController(HomeFactory,UserFactory,$state,$stateParams) {
		var vm = this;
		vm.user = {};
    vm.status = UserFactory.status;

vm.epost ={};
    HomeFactory.getPost( $stateParams.id).then(function(res){
      vm.epost =res;
    });


 vm.updatePost = function(){
      HomeFactory.updatePost(vm.epost).then(function(){
        $state.go('Neighborhood');
      });
    };

  };


})();
