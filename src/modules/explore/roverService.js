const { ROVER_POSISITION_INDEX, ORIENTATION } = require('./constants');
const orientationValidatorService = require('./orientationValidatorService');

const isValidLine = line => {
  if (line === undefined) {
    throw new Error('Initial rover position cannot be empty');
  }
  if (line.trim() === '') {
    return false;
  }
  const pos = line.trim().split(' ');
  if (pos.length !== 3) {
    throw new Error(`Invalid number of args in Rover Position: ${pos.length}`);
  }
  const x = parseInt(pos[ROVER_POSISITION_INDEX.x]);
  const y = parseInt(pos[ROVER_POSISITION_INDEX.y]);
  const ort = pos[ROVER_POSISITION_INDEX.orientation];
  if (x < 0) {
    throw new Error('The X position of Rover must be greater than 0');
  }
  if (y < 0) {
    throw new Error('The Y position of Rover must be greater than 0');
  }
  orientationValidatorService.validate(ort);
  return true;
};

module.exports.newRover = (initPosLine) => {
  if (isValidLine(initPosLine)) {
    const lineArr = initPosLine.split(' ');
    return {
      x: parseInt(lineArr[ROVER_POSISITION_INDEX.x]),
      y: parseInt(lineArr[ROVER_POSISITION_INDEX.y]),
      orientation: lineArr[ROVER_POSISITION_INDEX.orientation]
    };
  }
};

module.exports.walk = (position) => {
  const { orientation } = position;
  let newPosition;
  switch (orientation) {
    case ORIENTATION.North:
      newPosition = {
        ...position,
        y: position.y + 1
      };
      break;

    case ORIENTATION.East:
      newPosition = {
        ...position,
        x: position.x + 1
      };
      break;

    case ORIENTATION.South:
      newPosition = {
        ...position,
        y: position.y - 1
      }
      break;

    case ORIENTATION.West:
      newPosition = {
        ...position,
        x: position.x - 1
      };
      break;
    
    default:
      throw new Error(`Movement ${orientation} is invalid`);
  }
  return newPosition;
};
