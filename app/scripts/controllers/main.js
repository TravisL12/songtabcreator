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
    $scope.showName = false;

    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma',
      'bpp,',
      'yaya'
    ];

    $scope.multipleWord = function(word, multiple) {
      var finalWords = [];
      multiple = multiple || 2;
      for (var i = 0; i < multiple; i++) {
        finalWords.push(word);
      }

      return finalWords.join(' ');
    };
  });
