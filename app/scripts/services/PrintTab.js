'use strict';

angular.module('songtabcreatorApp').factory('PrintTab', function (CurrentTab, Strings) {

    var strings = Strings.strings;

    function titleCenter () {
        var spaces = parseInt((CurrentTab.options.columnCount - CurrentTab.options.title.length) / 2);
        return new Array(spaces).join(' ');
    }

    return function () {
        var output = ['\n' + titleCenter() + CurrentTab.options.title + '\n\n'];
        angular.forEach(CurrentTab.tablature, function(row) {
            for (var i in strings) {
                var stringOutput = new Array(CurrentTab.options.columnCount);

                // Set blank to ' ' if iterating the named chords row (first row)
                var blank = i === 0 ? ' ' : '-';

                for (var j = 1; j < CurrentTab.options.columnCount; j++) {
                    var cell = row.cells[strings[i] + '-' + j] || blank;

                    // Check that array index isn't already set
                    if (stringOutput[j-1] === undefined) {
                        var split = cell.toString().split('');

                        // Iterate through muli length notes (i.e. 'Cm', '14', 'Bb7')
                        for (var k in split) {
                            stringOutput[j-1 + parseInt(k)] = split[k];
                        }

                    }
                }
                output.push(stringOutput.join(''));
            }
            output.push(row.lyrics + '\n');
        });
        output = output.join('\r\n');

        var downloadLink  = document.createElement('a');
        var downloadBlob  = new Blob([output], {type: 'text/plain'});
        downloadLink.href = window.URL.createObjectURL(downloadBlob);
        downloadLink.download = CurrentTab.options.title + '.txt';
        document.body.appendChild(downloadLink);
        downloadLink.click();
    };

});
