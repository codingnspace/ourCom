(function() {
	'use strict';
	angular.module('app')
	.controller('ProfileController', ProfileController);

	function ProfileController(HomeFactory,UserFactory,$state,$stateParams) {
		var vm = this;

		vm.isUser = true;
    vm.user = {};
		vm.users = {};
		vm.newComment ={};
		vm.isCollapsed = true;
    vm.id = $stateParams.id;
    vm.status = UserFactory.status;

vm.getUser = function(){
    HomeFactory.getUser(vm.id).then(function(res){
      vm.users =res;
      console.log(vm.status._id +"id");
    });
	}
	vm.getUser();
	setInterval(function(){vm.getUser();}, 1000);


if($stateParams.id != vm.status._id){
	vm.isUser = false;
}

vm.deletePost = function(post){
	HomeFactory.deletePost(post._id).
	then(function(){
		// console.log("Made it back to controller. about to splice!");
		vm.users.allPost.splice(vm.users.allPost.indexOf(post),1);
	});
}

vm.addComment = function(){
	HomeFactory.addComment(vm.newComment, vm.status._id)
	.then(function(res){
		vm.users.comments.push(res);

	});
};

    // var followCount = vm.user.foll

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

        HomeFactory.sendpPic(blob,vm.status._id).then(function(res){
          console.log(res + "res");

          vm.users.profilePic =res;
          console.log(vm.users.profilePic +"vm.users2");

        });

    });
  };

	vm.bkpic = function(){
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
				console.log(res + "res");

				vm.users.backgroundPic =res;
				console.log(vm.users.backgroundPic +"vm.users2");

			});

	});
};

	}
})();
