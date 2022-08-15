const { ORIENTATION } = require('./constants');
const roverService = require('./roverService');

const getPosition = (x, y, ort) => ({
  x: x,
  y: y,
  orientation: ort
});

describe('roverService', () => {
  describe('newRover', () => {
    it('should create a new Rover object', () => {
      const initLine = '0 0 N';

      const result = roverService.newRover(initLine);

      const expected = {
        x: 0,
        y: 0,
        orientation: 'N'
      };
      expect(result).toEqual(expected);
    });

    it('should ignore an empty Rover initial line', () => {
      const initLine = '   ';

      const result = roverService.newRover(initLine);

      expect(result).toBeUndefined();
    });

    it('should throw a \'Initial rover position cannot be empty\' error', () => {
      const result = () => roverService.newRover();

      expect(result).toThrow(Error);
      expect(result).toThrow('Initial rover position cannot be empty');
    });

    it('should throw a \'Invalid number of args in Rover Position: 2\' error', () => {
      const initLine = '0 0';

      const result = () => roverService.newRover(initLine);

      expect(result).toThrow(Error);
      expect(result).toThrow('Invalid number of args in Rover Position: 2');
    });

    it('should throw a \'The X position of Rover must be greater than 0\' error', () => {
      const initLine = '-14 0 N';

      const result = () => roverService.newRover(initLine);

      expect(result).toThrow(Error);
      expect(result).toThrow('The X position of Rover must be greater than 0');
    });

    it('should throw a \'The Y position of Rover must be greater than 0\' error', () => {
      const initLine = '5 -9 N';

      const result = () => roverService.newRover(initLine);

      expect(result).toThrow(Error);
      expect(result).toThrow('The Y position of Rover must be greater than 0');
    });
  });

  describe('walk', () => {
    it('should walk 1 position to North', () => {
      const position = getPosition(0, 0, ORIENTATION.North);

      const result = roverService.walk(position);

      const expected = getPosition(0, 1, ORIENTATION.North);
      expect(result).toEqual(expected);
    });

    it('should walk 1 position to East', () => {
      const position = getPosition(0, 0, ORIENTATION.East);

      const result = roverService.walk(position);

      const expected = getPosition(1, 0, ORIENTATION.East);
      expect(result).toEqual(expected);
    });

    it('should walk 1 position to South', () => {
      const position = getPosition(0, 1, ORIENTATION.South);

      const result = roverService.walk(position);

      const expected = getPosition(0, 0, ORIENTATION.South);
      expect(result).toEqual(expected);
    });

    it('should walk 1 position to West', () => {
      const position = getPosition(1, 0, ORIENTATION.West);

      const result = roverService.walk(position);

      const expected = getPosition(0, 0, ORIENTATION.West);
      expect(result).toEqual(expected);
    });

    it('should throw a \'Movement X is invalid\' error', () => {
      const position = getPosition(0, 0, 'X');

      const result = () => roverService.walk(position);

      expect(result).toThrow(Error);
      expect(result).toThrow('Movement X is invalid');
    });
  });
});
