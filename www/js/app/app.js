angular.module('ngMemory', ['ui.bootstrap'])

.run(function($window){
	$window.addEventListener('load', function() {
    	FastClick.attach(document.body);
	}, false);
})

.controller('MainCtrl', function($scope, cordovaService, picturesService){

	$scope.greeting = 'Apache Cordova';

	picturesService.readPictures()
		.then(function(pictures){
			var len = pictures.length;
			if (len < 6)
				alert('Lenght is ' + len + '. Go take some pictures :)');

			$scope.entries = pictures;
		});
})

.service('cordovaService', function($window, $q) {

    // Source https://github.com/mgcrea/angular-cordova

    var deferredReady = $q.defer();
    this.$ready = deferredReady.promise;

    document.addEventListener('deviceready', function() {
      deferredReady.resolve($window.device);
    });

})

.factory('picturesService', function($window, $q, cordovaService) {


	function readPictures(fileSystemRoot){
		var deferred = $q.defer();

		fileSystemRoot.getDirectory('DCIM/Camera', {create:false}, function(dirEntry){
			
			// Get a directory reader
			var directoryReader = dirEntry.createReader();

			// Get a list of all the entries in the directory
			directoryReader.readEntries(success,fail);
		});

		function success(entries) {
		    deferred.resolve(entries);
		}

		function fail(error) {
		    deferred.reject("Failed to list directory contents");
		    alert("Failed to list directory contents: " + error.code);
		}
		

		return deferred.promise;
	}

	function getFileSystem() {
	    var deferred = $q.defer();

	    function fail() {
	        var msg = "failed to get filesystem";
	        deferred.reject(msg)
	        console.log(msg);
	    }
	    function gotFS(fileSystem) {
	        deferred.resolve(fileSystem.root);
	        console.log("got filesystem: " + fileSystem.root.fullPath);
	    }
        
        window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;

        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);

        return deferred.promise;
    }



	return {
		getFileSystem: function(){
			return cordovaService.$ready
				.then(getFileSystem);
		},
		readPictures: function(){

			return cordovaService.$ready
				.then(getFileSystem)
				.then(readPictures);
	
		}
	}

})

;