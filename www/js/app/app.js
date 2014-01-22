angular.module('ngMemory', [])

.controller('MainCtrl', function($scope, cordovaService){

	$scope.greeting = 'Apache Cordova';

	$scope.received = false;

	cordovaService.$ready
		.then(function(device){
			$scope.received = true;
			$scope.greeting = 'You are on ' + device.platform + ' ' + device.version;
			console.log('deviceready');
		});

})

.service('cordovaService', function($window, $q) {

    // Source https://github.com/mgcrea/angular-cordova/blob/master/src/angular-cordova.js

    var deferredReady = $q.defer();
    this.$ready = deferredReady.promise;

    document.addEventListener('deviceready', function() {
      deferredReady.resolve($window.device);
    });

})

;