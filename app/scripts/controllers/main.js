'use strict';

/**
 * @ngdoc function
 * @name songtabcreatorApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the songtabcreatorApp
 */
angular.module('songtabcreatorApp')
  .controller('MainCtrl', function ($scope) {
    $scope.name = 'Schuyler';
	$scope.last = 'Lawrence';

    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma',
      'bpp,',
      'yaya'
    ];
  });
