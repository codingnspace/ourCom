(function() {
	'use strict';
	angular.module('app')
	.controller('HomeController', HomeController);


	function HomeController() {
		var vm = this;
		// vm.account =false;
		vm.resources = [
						'http://techslides.com/demos/sample-videos/small.webm',
						'*.ogv',
						'*.mp4',
						'*.swf'
				];
	}
})();
