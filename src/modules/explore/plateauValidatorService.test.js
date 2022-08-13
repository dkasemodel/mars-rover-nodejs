const plateauValidatorService = require('./plateauValidatorService');

describe('plateauValidatorService', () => {
  it('should create a rectangular plateau', () => {
    const line = '10 5';

    const result = plateauValidatorService.validateAndGetPlateauData(line);

    const expected = line.split(' ');
    expect(result).toEqual(expected);
  });

  it('should throw a \'No plateau data was found\' error', () => {
    const result = () => { plateauValidatorService.validateAndGetPlateauData() };

    expect(result).toThrow(Error);
    expect(result).toThrow('No plateau data was found');
  });

  it('should throw a \'Plateau data has length 3 diff than 2\' error', () => {
    const line = '1 2 3';

    const result = () => { plateauValidatorService.validateAndGetPlateauData(line) };

    expect(result).toThrow(Error);
    expect(result).toThrow('Plateau data has length 3 diff than 2');
  });

  it('should throw a \'Some plateau coordinate is not a number\' error when Y value is not a number', () => {
    const line = '1 A';

    const result = () => { plateauValidatorService.validateAndGetPlateauData(line) };

    expect(result).toThrow(Error);
    expect(result).toThrow('Some plateau coordinate is not a number');
  });

  it('should throw a \'Some plateau coordinate is not a number\' error when X value is not a number', () => {
    const line = 'A 1';

    const result = () => { plateauValidatorService.validateAndGetPlateauData(line) };

    expect(result).toThrow(Error);
    expect(result).toThrow('Some plateau coordinate is not a number');
  });

  it('should throw a \'Plateau must be a rectangle\' error', () => {
    const line = '5 5';

    const result = () => { plateauValidatorService.validateAndGetPlateauData(line) };

    expect(result).toThrow(Error);
    expect(result).toThrow('Plateau must be a rectangle');
  });

  it('should throw a \'Plateau size must be greater than 0 (zero)\' error', () => {
    const line = '0 -1';

    const result = () => { plateauValidatorService.validateAndGetPlateauData(line) };

    expect(result).toThrow(Error);
    expect(result).toThrow('Plateau size must be greater than 0 (zero)');
  });
});
