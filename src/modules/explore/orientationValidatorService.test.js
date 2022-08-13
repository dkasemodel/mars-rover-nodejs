const orientationValidatorService = require('./orientationValidatorService');
const { ORIENTATION } = require('./constants');

describe('orientationValidatorService', () => {
  it('should be valid with North', () => {
    const orientation = ORIENTATION.North;

    const result = orientationValidatorService.validate(orientation);

    expect(result).toBe(true);
  });

  it('should be valid with East', () => {
    const orientation = ORIENTATION.East;

    const result = orientationValidatorService.validate(orientation);

    expect(result).toBe(true);
  });

  it('should be valid with South', () => {
    const orientation = ORIENTATION.South;

    const result = orientationValidatorService.validate(orientation);

    expect(result).toBe(true);
  });

  it('should be valid with West', () => {
    const orientation = ORIENTATION.West;

    const result = orientationValidatorService.validate(orientation);

    expect(result).toBe(true);
  });

  it('should thrown a \'The orientation \'X\' is invalid\' error', () => {
    const orientation = 'X';

    const result = () => orientationValidatorService.validate(orientation);

    expect(result).toThrow(Error);
    expect(result).toThrow('The orientation \'X\' is invalid');
  });
});