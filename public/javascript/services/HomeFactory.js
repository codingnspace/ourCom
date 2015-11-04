(function() {
	'use strict';
	angular.module('app')
	.factory('HomeFactory', HomeFactory);


	function HomeFactory($http, $q) {
		var o = {};

		o.updatePost = function(newUserInfo){
			var q = $q.defer();

			$http.put('/api/post/'+newUserInfo._id,newUserInfo)
			.then(function(res){
				console.log("madee it to factory, made http req ");

		        q.resolve(res.data);
						// console.log(res.data + "res.data in factory");
		      });
		      return q.promise;
		    };

o.getAllPost = function(){
	var q = $q.defer();
$http.get('/api/post').then(function(res){
	q.resolve(res.data);
});
return q.promise;
};

o.getPost = function(id){
	var q = $q.defer();
$http.get('/api/post/' +id).then(function(res){
	q.resolve(res.data);
});
return q.promise;
};

o.deletePost = function(idofpost){
	var q = $q.defer();
	// console.log("I made it to the factory");
	$http.delete('/api/post/' + idofpost)
	.then(function(){
		q.resolve();
	}); return q.promise;
	};


o.addComment = function(newComment, id) {
	var q = $q.defer();
	console.log(id + "idfactory");
	$http.post('/api/user/' +id + '/comment', newComment,id)
	.then(function(res){
		// console.log("made it to the factory for addreview funct");
		q.resolve(res.data);
	});
	return q.promise;
};
o.sendpPic = function(pic,id){
	var q = $q.defer();
	// console.log("heading to route");
	// console.log(pic);
	$http.put('/api/user/' +id+ '/pic',pic).then(function(res){
		console.log(res.data + "res.data");
	q.resolve(res.data);
});
return q.promise;
}

o.sendPic = function(pic,id){
	var q = $q.defer();
	// console.log("heading to route");
	// console.log(pic);
	$http.put('/api/user/' +id+ '/bkpic',pic).then(function(res){
		console.log(res.data + "res.data");
	q.resolve(res.data);
});
return q.promise;
}

o.getUser = function(id){
	var q = $q.defer();
	console.log("heading to route");
	// console.log(pic);
	$http.get('/api/user/' +id).then(function(res){
	q.resolve(res.data);
});
return q.promise;
};
		o.createPost = function(post){
			var q = $q.defer();
			$http.post('/api/post', post)
			.then(function(){
				console.log("made from the route, in factory now");
				q.resolve();
			});
			return q.promise;
		};
		return o;
	}
})();
