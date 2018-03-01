(function(){
	'use strict';

	angular.module('myApp.Config', ['ngRoute'])

	.config(['$routeProvider', function($routeProvider) {
	  $routeProvider
	  .when('/config', {
	    templateUrl: 'modules/config/views/index.html',
	    controller: 'ConfigController',
        activetab: 'config'
	  })
	  ;
	}])
	.controller('ConfigController', ConfigController)
  .factory('ConfigService', ConfigService)
	;

	function ConfigController($scope, $http, $window, ConfigService){
    //console.log("Info Comunidad", $window.localStorage.getItem('infoComunidad'));
    $scope.$on('$viewContentLoaded', function(){
      console.log("Entró a Controlador Config");
      //console.log("Info Comunidad", $window.localStorage.getItem('infoComunidad'));
      $scope.comunidad = JSON.parse($window.localStorage.getItem('infoComunidad')).source.resourceName;
    });

    $scope.configure = function() {
      console.log("Creating Extension");
      ConfigService.createExtension()
        .success(function(data){
          $scope.result = data;
        }).error(function(status){
          alert('An error happened creating the extension: ' + status);
        });
    }

    $scope.isActive = function (viewLocation) {
        return $location.path().indexOf(viewLocation) == 0;
    };
	}

    function ConfigService($http, $window){
        var configService = {};

        configService.createExtension = function() {
            return $http.get('/api/v1/config')
            .success(function(data) {
                console.log("DATA Config:::", data);
                if(data.creo){
                    alert("The community extension was created, you can close this window now!");
                } else {
                  alert("There was an error configuring the community extension. Message:" + body);
                }
                return data;
            }).error(function(status){
                console.log("Did not configure the extension ", status);
                alert(status);
            });
        };

        return configService;
    }

		ConfigController['$inject'] = ['$scope', '$http', '$window', 'ConfigService'];
    ConfigService['$inject'] = ['$http', '$window'];

}());
