const plateauService = require('./plateauService');

describe('plateauService', () => {
  it('should create a plateau', () => {
    const line = '10 5';

    const result = plateauService.createPlateau(line);

    expect(result).toEqual({
      length: 10,
      width: 5
    });
  });
});