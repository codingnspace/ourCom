(function() {
	'use strict';
	angular.module('app')
	.controller('TextPostController', TextPostController);


	function TextPostController(HomeFactory,UserFactory,$state) {
		var vm = this;
		vm.newPost={};

		vm.video ={
			id:"aw56bVZIvdw",
		}
//'http://techslides.com/demos/sample-videos/small.webm',
	vm.resources = [
					'http://techslides.com/demos/sample-videos/small.webm',
					'*.ogv',
					'*.mp4',
					'*.swf'
			];
console.log("in factory");


}
})();
