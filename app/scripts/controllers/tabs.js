'use strict';

angular.module('songtabcreatorApp').controller('TabCtrl', function ($scope, ChordDictionary, CurrentTab, PrintTab, Strings) {

  $scope.tabOptions = CurrentTab.options;
  $scope.tabRows    = CurrentTab.tablature;
  $scope.saveToText = PrintTab;
  var strings = Strings.strings;

  $scope.clearRow = function() {
    this.row.cells = {};
  };

  $scope.deleteRow = function(index) {
    $scope.tabRows.splice(index,1);
  };

  $scope.shiftLeft = function() {
    shiftRow(-1);
  };

  $scope.shiftRight = function() {
    shiftRow(1);
  };

  function updateEditRow(index) {
    $scope.editRow = $scope.tabRows[index];      
  }
  updateEditRow(0);

  $scope.activeEditRow = function() {
    updateEditRow(this.$index);
  };

  $scope.addTabRow = function() {
    $scope.tabRows.push({ cells: {}, lyrics: '' });
    updateEditRow($scope.tabRows.length - 1);
  };

  $scope.highlightView = function(color) {
    var view = angular.element.find('.tab-view .active-row ul.chord')[this.column-1];
    view.style.background = color;
  };

  var capitalizeChordName = function() {
    $scope.editRow.cells['chords-'+this.column] = $scope.editRow.cells['chords-' + this.column][0].toUpperCase() + $scope.editRow.cells['chords-' + this.column].slice(1);
  };

  function downString(string) {
    return string !== 'E' ? strings[strings.indexOf(string) + 1] : string;
  }

  function upString(string) {
    return string !== 'chords' ? strings[strings.indexOf(string) - 1] : string;
  }

  function shiftRow(num) {
    angular.forEach($scope.editRow.cells, function(note, cell) {
      var el   = cell.split('-');
      var guitarString = el[0];
      var index = parseInt(el[1]);

      var validMove = num > -1 ? index < $scope.tabOptions.columnCount : index > 1;
      var newCell = $scope.editRow.cells[guitarString + '-' + (index+num)];
      if (validMove && newCell === undefined) {
        $scope.editRow.cells[guitarString + '-' + (index+num)] = note;
        delete $scope.editRow.cells[cell];
      }
    });
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

        // Tab right
        if (code === 9 && index < $scope.tabOptions.columnCount) {
          angular.element.find('.tablature-editor input[name="' + guitarString + '-' + (index + parseInt($scope.tabOptions.tab)) + '"')[0].focus();
        }
        // Left arrow
        if (code === 39 && index < $scope.tabOptions.columnCount) {
          angular.element.find('.tablature-editor input[name="' + guitarString + '-' + (index + 1) + '"')[0].focus();
        }
        // Shift-Tab left
        if ((event.shiftKey && code === 9) && index > 1) {
          angular.element.find('.tablature-editor input[name="' + guitarString + '-' + (index - parseInt($scope.tabOptions.tab)) + '"')[0].focus();
        }
         // Right arrow
        if (code === 37 && index > 1) {
          angular.element.find('.tablature-editor input[name="' + guitarString + '-' + (index - 1) + '"')[0].focus();
        }
        // Return or down arrow pressed move 1 box down
        if (code === 13 || code === 40) {
          angular.element.find('.tablature-editor input[name="' + downString(guitarString) + '-' + index + '"')[0].focus();
        }
        // Shift-Return or up arrow pressed move 1 box up
        if ((event.shiftKey && code === 13) || code === 38) {
          angular.element.find('.tablature-editor input[name="' + upString(guitarString) + '-' + index + '"')[0].focus();
        }
      }
  };

  var defineStringNotes = function(stringNotes) {
    if (stringNotes) {
      $scope.editRow.cells['e-'+this.column] = stringNotes[5];
      $scope.editRow.cells['b-'+this.column] = stringNotes[4];
      $scope.editRow.cells['g-'+this.column] = stringNotes[3];
      $scope.editRow.cells['d-'+this.column] = stringNotes[2];
      $scope.editRow.cells['a-'+this.column] = stringNotes[1];
      $scope.editRow.cells['E-'+this.column] = stringNotes[0];
    } else {
      $scope.editRow.cells['e-'+this.column] = '';
      $scope.editRow.cells['b-'+this.column] = '';
      $scope.editRow.cells['g-'+this.column] = '';
      $scope.editRow.cells['d-'+this.column] = '';
      $scope.editRow.cells['a-'+this.column] = '';
      $scope.editRow.cells['E-'+this.column] = '';
    }
  };

  $scope.lookupChord = function() {

    // Delete column if no Chord name
    if ($scope.editRow.cells['chords-'+this.column] === '') {
      defineStringNotes.call(this);
      return;
    }

    // Don't allow number to start Chord name
    if (!isNaN($scope.editRow.cells['chords-'+this.column])) {
      $scope.editRow.cells['chords-'+this.column] = '';
      return;
    }

    capitalizeChordName.call(this);

    var stringNotes = ChordDictionary[$scope.editRow.cells['chords-'+this.column]];
    if (stringNotes !== undefined) {
      defineStringNotes.call(this, stringNotes);
    } else {
      // If not Chord match delete column
      defineStringNotes.call(this);
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
