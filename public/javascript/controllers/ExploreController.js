(function() {
	'use strict';
	angular.module('app')
	.controller('ExplorController', ExplorController);


	function ExplorController(HomeFactory,$sce) {
		var vm = this;
		var hasvid = false;

		vm.trustSrc = function(src) {
	return $sce.trustAsResourceUrl(src);
}

    HomeFactory.getAllPost().then(function(res){
          vm.post = res;
					if(vm.post.vidUrl !==null){
						hasvid = true;
					}
        });
	}
})();
