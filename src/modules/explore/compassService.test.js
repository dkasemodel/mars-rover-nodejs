const { ORIENTATION, MOVEMENTS } = require('./constants');
const compassService = require('./compassService');
const { move } = require('.');

describe('compass', () => {
  it('should return North when received West and movement is Right', () => {
    const orientation = ORIENTATION.West;
    const movement = MOVEMENTS.Right;

    const result = compassService.calculateDirection(orientation, movement);

    expect(result).toEqual(ORIENTATION.North);
  });

  it('should return East when received North and movement is Right', () => {
    const orientation = ORIENTATION.North;
    const movement = MOVEMENTS.Right;

    const result = compassService.calculateDirection(orientation, movement);

    expect(result).toEqual(ORIENTATION.East);
  });

  it('should return South when received West and movement is Left', () => {
    const orientation = ORIENTATION.West;
    const movement = MOVEMENTS.Left;

    const result = compassService.calculateDirection(orientation, movement);

    expect(result).toEqual(ORIENTATION.South);
  });

  it('should return West when received North and movement is Left', () => {
    const orientation = ORIENTATION.North;
    const movement = MOVEMENTS.Left;

    const result = compassService.calculateDirection(orientation, movement);

    expect(result).toEqual(ORIENTATION.West);
  });

  it('should throw a \'Orientation must be informed\' when no one was informed', () => {
    const result = () => compassService.calculateDirection();

    expect(result).toThrow(Error);
    expect(result).toThrow('Orientation must be informed');
  });

  it('should throw a \'Movement must be informed\' when no one was informed', () => {
    const orientation = ORIENTATION.North;

    const result = () => compassService.calculateDirection(orientation);

    expect(result).toThrow(Error);
    expect(result).toThrow('Movement must be informed');
  });

  it('should throw a \'The orientation \'X\' is invalid\' error', () => {
    const orientation = 'X';
    const movement = MOVEMENTS.Left;

    const result = () => compassService.calculateDirection(orientation, movement);

    expect(result).toThrow(Error);
    expect(result).toThrow('The orientation \'X\' is invalid');
  });

  it('should throw a \'Movement A is invalid\' error', () => {
    const orientation = ORIENTATION.East;
    const movement = 'A';

    const result = () => compassService.calculateDirection(orientation, movement);

    expect(result).toThrow(Error);
    expect(result).toThrow('Movement A is invalid');
  });

  it('should throw a \'Movement M is invalid\' error when send move command to compass', () => {
    const orientation = ORIENTATION.East;
    const movement = MOVEMENTS.Walk;

    const result = () => compassService.calculateDirection(orientation, movement);

    expect(result).toThrow(Error);
    expect(result).toThrow('Movement M is invalid');
  });
});
