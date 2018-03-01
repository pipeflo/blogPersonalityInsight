(function(){
	'use strict';

	angular.module('myApp.Config', ['ngRoute'])

	.config(['$routeProvider', function($routeProvider) {
	  $routeProvider
	  .when('/blogs', {
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

		ConfigService.getBlogs()
        .success(function(data){
            //console.log("BLOGS:::", data);
            $scope.blogs = data;
        }).error(function(status){
            alert('Se presentó un error al iniciar sesión ' + status);
        });

        $scope.procesar = function() {
            console.log("Procesando con Watson");
            $http({
				url : 'api/v1/watson/personalidad'
				, method : 'POST'
				, data: { texto : $scope.select }
			})
			.success(function(data) {
				$scope.personalidad = JSON.parse(data);
                // console.log('Succes Personalidad: ', $scope.personalidad.tree);
                $scope.chart = new PersonalitySunburstChart('sunburstChartContainer');
                $scope.chart.show($scope.personalidad.tree, 'assets/img/dog.png');
                $scope.showResult = true;

			})
			.error(function(data){
				console.log('Errors: ', data);
			})
        }

        $scope.isActive = function (viewLocation) {
            return $location.path().indexOf(viewLocation) == 0;
        };
	}

    function CommunityService($http, $window){
        var communityService = {};

        communityService.getBlogs = function() {
            return $http.get('/api/v1/communities/' + JSON.parse($window.localStorage.getItem('infoComunidad')).source.resourceId + '/blogs')
            .success(function(data) {
                console.log("DATA Blogs:::", data);
                return data;
            }).error(function(status){
                console.log("No trajo Blogs error ", status);
                alert(status);
            });
        };

        return communityService;
    }

	BlogsController['$inject'] = ['$scope', '$http', '$window', 'CommunityService'];
    CommunityService['$inject'] = ['$http', '$window'];

}());
