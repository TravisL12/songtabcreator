'use strict';

describe('Factory: Chords', function () {

  // load the service's module
  beforeEach(module('songtabcreatorApp'));

  // instantiate service
  var Chords;
  beforeEach(inject(function (_Chords_) {
    Chords = _Chords_;
  }));

  it('should do something', function () {
    expect(!!Chords).toBe(true);
  });

});
