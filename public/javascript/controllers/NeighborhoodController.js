(function() {
	'use strict';
	angular.module('app')
	.controller('NeighborhoodController', NeighborhoodController);


	function NeighborhoodController(HomeFactory,UserFactory,$state) {
		var vm = this;
		vm.status = UserFactory.status;


		vm.newPost={};
		// vm.newPost.tags = [];
		// vm.isCollapsed = true;
		// vm.vidisCollapsed = true;
		// vm.eventisCollapsed = true;
		// vm.needisCollapsed =true;
		// vm.offisCollapsed =true;
		vm.posts = {};
		// vm.posts.tags = [];
		vm.getPost = function(){
		HomeFactory.getAllPost().then(function(res){
					vm.posts = res;
				});
			}
				vm.getPost();
				//set equal to a variable so that you can cencel $interval(vm.readMessages,3000, [cycle length])
				setInterval(function(){vm.getPost();}, 1000);
		// HomeFactory.get().then(function(res){
		// 			vm.family = res;
		// 		});
		vm.createPost = function(){

			// console.log(vm.newPost);
		  HomeFactory.createPost(vm.newPost).then(function(res){
				vm.newPost={};
			});
			// console.log("in create function");
			// console.log(vm.newPost.photo1);
			// console.log(vm.newPost);

		// , function(res){
		// 		vm.newBook = res;
		  };

// });

//
//
vm.pic = function(){
	filepicker.setKey("AThbicGgQKOeMZ2rctZ0Cz");

	filepicker.pick({
			mimetype: 'image/*', /* Images only */
			maxSize: 1024 * 1024 * 5, /* 5mb */
			imageMax: [1500, 1500], /* 1500x1500px */
			cropRatio: 1/1, /* Perfect squares */
			services: ['*'] /* All available third-parties */
	}, function(blob){
			// Returned Stuff
			var filename = blob.filename;
			var url = blob.url;
			var id = blob.id;
			var isWriteable = blob.isWriteable;
			var mimetype = blob.mimetype;
			var size = blob.size;

		HomeFactory.sendPic(blob,vm.status._id).then(function(res){
			// console.log(res + "res");

			vm.newPost.photo1 =res;
			$state.go('Neighborhood');
//
		});

});
}


};
})();
