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
    $scope.tabRows = [
      { cells: {}, lyrics: 'Lyrics go here!' }
    ];

    $scope.highlightView = function(color) {
      var view = angular.element.find('.tab-view ul.chord')[this.column-1];
      view.style.background = color;
    };

    $scope.lookupChord = function() {
      // Capitalize the first letter of the chord
      this.row.cells['chords'+this.column] = this.row.cells['chords'+this.column][0].toUpperCase() + this.row.cells['chords'+this.column].slice(1);
      var matchedChord = Chords[this.row.cells['chords'+this.column]];
      if (matchedChord !== undefined) {
        this.row.cells['e'+this.column] = matchedChord[5];
        this.row.cells['b'+this.column] = matchedChord[4];
        this.row.cells['g'+this.column] = matchedChord[3];
        this.row.cells['d'+this.column] = matchedChord[2];
        this.row.cells['a'+this.column] = matchedChord[1];
        this.row.cells['E'+this.column] = matchedChord[0];
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
