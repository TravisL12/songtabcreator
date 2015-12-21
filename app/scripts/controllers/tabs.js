'use strict';

/**
 * @ngdoc function
 * @name songtabcreatorApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the songtabcreatorApp
 */
angular.module('songtabcreatorApp')
  .controller('TabCtrl', function ($scope, Chords) {
    $scope.Chords = Chords;
    $scope.columnCount = 110;
    $scope.cells = {};

    $scope.highlightView = function(color) {
      var view = angular.element.find('.tab-view ul.chord')[this.column-1];
      view.style.background = color;
    };

    $scope.lookupChord = function() {
      // Capitalize the first letter of the chord
      this.cells['chords'+this.column] = this.cells['chords'+this.column][0].toUpperCase() + this.cells['chords'+this.column].slice(1);
      var matchedChord = Chords[this.cells['chords'+this.column]];
      if (matchedChord !== undefined) {
        this.cells['e'+this.column] = matchedChord[5];
        this.cells['b'+this.column] = matchedChord[4];
        this.cells['g'+this.column] = matchedChord[3];
        this.cells['d'+this.column] = matchedChord[2];
        this.cells['a'+this.column] = matchedChord[1];
        this.cells['E'+this.column] = matchedChord[0];
      }
    };

    $scope.buildArray = function(num) {
      var a = new Array(num);
      for(var i=1; i<=a.length; i++){ 
        a[i-1] = i;
      }
      return a;
    };
  });
