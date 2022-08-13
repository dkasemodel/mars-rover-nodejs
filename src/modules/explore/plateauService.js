const plateauValidatorService = require('./plateauValidatorService');
const { PLATEAU_COORDINATES_POS } = require('./constants');

const createPlateau = plateauLine => {
  const data = plateauValidatorService.validateAndGetPlateauData(plateauLine);
  return {
    length: parseInt(data[PLATEAU_COORDINATES_POS.x]),
    width: parseInt(data[PLATEAU_COORDINATES_POS.y])
  };
};

module.exports = {
  createPlateau: plateauLine => createPlateau(plateauLine),
};
