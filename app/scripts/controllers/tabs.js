'use strict';

angular.module('songtabcreatorApp')
  .controller('TabCtrl', function ($scope, Chords) {

    // Import the Chord library from /app/scripts/services/chords.js
    // You'll see that I load the "Chords" service above where I define the .controller (line 4)
    // this sort of loading is called Dependency injection
    $scope.Chords = Chords;

    // This is a constant variable that defines how many columns the tablature will have
    $scope.columnCount = 100;

    // This object defines what notes are on which tablature line. You'll see that it is an array of objects.
    // Using an array allows ng-repeat to just iterate through each of the objects and draw them as they exist.
    // Thus, when the $scope.addTabRow() function is called, we just add a new object to this array.
    $scope.tabRows = [
      { cells: {}, lyrics: 'Lyrics go here!' }
    ];

    $scope.clearRow = function() {
      $scope.tabRows[this.$index].cells = {};
    };

    function shiftRow(cells, num) {
      angular.forEach(cells, function(note, cell) {
        var el   = cell.split('-');
        var guitarString = el[0];
        var index = parseInt(el[1]);

        var validMove = num > -1 ? index < $scope.columnCount : index > 1;
        var newCell = cells[guitarString + '-' + (index+num)];
        if (validMove && newCell === undefined) {
          cells[guitarString + '-' + (index+num)] = note;
          delete cells[cell];
        }
      });
    }

    $scope.shiftLeft = function() {
      shiftRow(this.row.cells, -1);
    };

    $scope.shiftRight = function() {
      shiftRow(this.row.cells, 1);
    };

    // To determine which tablature row we are currently editing, I use the variable $scope.editRow
    // to define the currently editable row. I made this a function so that we just have to worry about 
    // what index in $scope.tabRows we want to select and then the editable row gets updated.
    function updateEditRow(index) {
      $scope.editRow = $scope.tabRows[index];      
    }
    // We call updateEditRow() on load and set the index to 0, which is defined by the first tab object in
    // $scope.tabRows
    updateEditRow(0);

    // Updates the currently editable row
    $scope.activeEditRow = function() {
      updateEditRow(this.$index);
    };

    // Pushes a new object onto the $scope.tabRows and then ng-repeat will update the view with the new
    // tablature row. You'll also see when you create a new row that we automatically select it as the
    // currently editable row by calling updateEditRow()
    $scope.addTabRow = function() {
      $scope.tabRows.push({ cells: {}, lyrics: 'Lyrics go here!' });
      updateEditRow($scope.tabRows.length - 1);
    };

    // I typically don't like doing much CSS editing with javascript (prefer doing it in CSS directly).
    // Though using CSS :hover calls generally is easiest for HTML elements that are nested inside elements
    // like with a <ul><li></li></ul> sort of thing (the <li> is nested inside the <ul>).
    $scope.highlightView = function(color) {
      var view = angular.element.find('.tab-view .active-row ul.chord')[this.column-1];
      view.style.background = color;
    };

    // Iterate through the strings
    var strings = ['chords','e','b','g','d','a','E'];
    function downString(string) {
      if (string !== 'E') {
        return strings[strings.indexOf(string) + 1];
      } else {
        return string;
      }
    }

    // Iterate through the strings
    function upString(string) {
      if (string !== 'chords') {
        return strings[strings.indexOf(string) - 1];
      } else {
        return string;
      }
    }

    $scope.navigateTab = function(event) {
      var code = event.keyCode;
      var el   = event.target.name.split('-');
      var guitarString = el[0];
      var index = parseInt(el[1]);

      // Navigate by keyCodes: tab (9), return (13), arrows: left(37), up(38), right(39), down(40)
      var navKeyCodes = [9, 13, 37, 38, 39, 40];
      if (navKeyCodes.indexOf(code) !== -1) {
        event.preventDefault();

        // Tab or right arrow pressed move 1 box to the right
        if ((code === 9 || code === 39) && index < $scope.columnCount) {
          angular.element.find('.editor input[name="' + guitarString + '-' + (index+1) + '"')[0].focus();
        }
        // Shift-Tab or left arrow pressed move 1 box to left
        if (((event.shiftKey && code === 9) || code === 37) && index > 1) {
          angular.element.find('.editor input[name="' + guitarString + '-' + (index-1) + '"')[0].focus();
        }
        // Return or down arrow pressed move 1 box down
        if (code === 13 || code === 40) {
          angular.element.find('.editor input[name="' + downString(guitarString) + '-' + index + '"')[0].focus();
        }

        // Shift-Return or up arrow pressed move 1 box up
        if ((event.shiftKey && code === 13) || code === 38) {
          angular.element.find('.editor input[name="' + upString(guitarString) + '-' + index + '"')[0].focus();
        }

      }
    };

    // This is how we check if the entered Letter Chord matches inside of the Chord.js service.
    // Basically, we check the value entered and if we find a match we update the whole chord array
    $scope.lookupChord = function() {
      // Capitalize the first letter of the chord
      if ($scope.editRow.cells['chords-'+this.column] === '') {
        $scope.editRow.cells['e-'+this.column] = '';
        $scope.editRow.cells['b-'+this.column] = '';
        $scope.editRow.cells['g-'+this.column] = '';
        $scope.editRow.cells['d-'+this.column] = '';
        $scope.editRow.cells['a-'+this.column] = '';
        $scope.editRow.cells['E-'+this.column] = '';
        return;
      }
      $scope.editRow.cells['chords-'+this.column] = $scope.editRow.cells['chords-'+this.column][0].toUpperCase() + $scope.editRow.cells['chords-'+this.column].slice(1);
      var matchedChord = Chords[$scope.editRow.cells['chords-'+this.column]];
      if (matchedChord !== undefined) {
        $scope.editRow.cells['e-'+this.column] = matchedChord[5];
        $scope.editRow.cells['b-'+this.column] = matchedChord[4];
        $scope.editRow.cells['g-'+this.column] = matchedChord[3];
        $scope.editRow.cells['d-'+this.column] = matchedChord[2];
        $scope.editRow.cells['a-'+this.column] = matchedChord[1];
        $scope.editRow.cells['E-'+this.column] = matchedChord[0];
      }
    };

    // This is just a hacky way of creating an array of value num
    // example: num = 10  :=>  [1,2,3,4,5,6,7,8,9,10];
    $scope.buildArray = function(num) {
      var a = new Array(num);
      for(var i=1; i<=a.length; i++){ 
        a[i-1] = i;
      }
      return a;
    };
  });
