(function() {
	'use strict';
	angular.module('app', ['ui.router',"ui.bootstrap",'ngMaterial',"ngAnimate",'scDateTime','videosharing-embed','ngVidBg','angularVideoBg'])
	.config(config);
	(function(d, s, id) {
	  var js, fjs = d.getElementsByTagName(s)[0];
	  if (d.getElementById(id)) return;
	  js = d.createElement(s); js.id = id;
	  js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.5";
	  fjs.parentNode.insertBefore(js, fjs);
	}(document, 'script', 'facebook-jssdk'));

	function config($stateProvider, $urlRouterProvider,$httpProvider) {
		$stateProvider.state('Home',{
			url: '/',
			templateUrl: 'views/Home.html'
		}).state('Create',{
			url: '/create',
			templateUrl: 'views/create.html'
		}).state("Register",{
			url: '/register',
			templateUrl: 'views/register.html'
		}).state("Login",{
			url: '/login',
			templateUrl: 'views/login.html'
		}).state('Profile',{
			url: '/profile/:id',
			templateUrl: 'views/profile.html'
		}).state('Edit',{
			url: '/edit/:id',
			templateUrl: 'views/edit.html'
		}).state('CreateProfile',{
			url: '/createprofile',
			templateUrl: 'views/createprofile.html'
		}).state('Neighborhood',{
			url: '/neighborhood',
			templateUrl: 'views/neighborhood.html'
		}).state('Text',{
			url: '/text',
			templateUrl: 'views/text.html'
		}).state('Explore',{
			url: '/explore',
			templateUrl: 'views/explore.html'
		}).state('EditProfile',{
			url: '/edit/:id',
			templateUrl: 'views/editprofile.html'
		}).state('Post',{
			url: '/post/:id',
			templateUrl: 'views/post.html'
		}).state('EPost',{
			url: '/epost/:id',
			templateUrl: 'views/editpost.html'
		});
		$urlRouterProvider.otherwise('/');
		$httpProvider.interceptors.push('Auth');
	}
})();
