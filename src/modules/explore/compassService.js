const { ORIENTATION_LIST, MOVEMENTS } = require('./constants');
const orientationValidatorService = require('./orientationValidatorService');

const validateData = (orientation, movement) => {
  if (!orientation) {
    throw new Error('Orientation must be informed');
  }
  if (!movement) {
    throw new Error('Movement must be informed');
  }
  orientationValidatorService.validate(orientation);
};

module.exports.calculateDirection = (orientation, movement) => {
  validateData(orientation, movement);
  let next;
  for (let pos = 0; pos < ORIENTATION_LIST.length; pos++) {
    const ort = ORIENTATION_LIST[pos];
    if (ort === orientation) {
      if (movement === MOVEMENTS.Right) {
        next = pos + 1;
        if (next >= ORIENTATION_LIST.length) {
          next = 0;
        }
      } else if (movement === MOVEMENTS.Left) {
        next = pos - 1;
        if (next < 0) {
          next = ORIENTATION_LIST.length - 1;
        }
      } else {
        throw new Error(`Movement ${movement} is invalid`);
      }
    }
  }
  return ORIENTATION_LIST[next];
};
