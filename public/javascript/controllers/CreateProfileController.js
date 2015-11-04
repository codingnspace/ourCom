(function() {
	'use strict';
	angular.module('app')
	.controller('CreateProfileController', CreateProfileController);


	function CreateProfileController(HomeFactory,UserFactory,$state) {
		var vm = this;
		vm.status = UserFactory.status;

		vm.user = {};
		vm.user._id = vm.status._id;
    vm.art = ["Artists", "Crafts","Cultural Events","Food","Museums","Music"];
    vm.causes = ["Advocacy and Human Rights", "Animals","Arts and Culture","Children and Youth","Community","Computers and Tech","Education and Literacy","Employment","Faith Based","Health and Medicine","Homeless and Housing","Hunger","Immigrants and Refugees","LGBT","Race and Ethnicity","Seniors","Veterans"];
    vm.education  = ["Elementary School","Middle School","High School","College Prep","Trade School","Hugher Education"];
    vm.outdoors = ["Basketball","Biking","Camping","Football","Gardening","Soccer","Tennis"];
    vm.politics = ["Democrate","Elections","Independent","Politicians","Repuplican","Town Halls"];
    vm.religion = ["Buddhism","Christianity","Hinduism","Indigenous Religions","Islam","Judaism"];
    vm.user.tags = [];

    vm.toggle = function (item, list) {
   var idx = list.indexOf(item);
   if (idx > -1) list.splice(idx, 1);
   else list.push(item);
 };
 vm.exists = function (item, list) {
   return list.indexOf(item) > -1;
 };

 vm.updateUser = function(){
	 console.log(vm.user._id);
      UserFactory.updateUser(vm.user).then(function(){
        console.log("Made it back to the controller for editing");
        $state.go('Neighborhood');
      });
    };


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

        console.log(blob);
        $state.go("Neighborhood");
  });
};
}
})();
