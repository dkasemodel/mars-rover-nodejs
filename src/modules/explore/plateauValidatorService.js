const { PLATEAU_COORDINATES_POS } = require('./constants');

const validatePlateauSize = data => {
  const length = data[PLATEAU_COORDINATES_POS.x];
  const width = data[PLATEAU_COORDINATES_POS.y];
  if (length === width) {
    throw new Error('Plateau must be a rectangle');
  }
  if (length < 0 || width < 0) {
    throw new Error('Plateau size must be greater than 0 (zero)');
  }
};

const validatePlateauData = data => {
  if (data.length > 2) {
    throw new Error(`Plateau data has length ${data.length} diff than 2`);
  }
  const numData = data.map(coordinate => isNaN(coordinate)).filter(coordinate => !coordinate);
  if (numData === undefined || numData.length < 2) {
    throw new Error('Some plateau coordinate is not a number');
  }
  validatePlateauSize(data);
};

const validateAndGetPlateauData = plateauLine => {
  if (plateauLine === undefined) {
    throw new Error('No plateau data was found');
  }
  const data = plateauLine.trim().split(' ');
  validatePlateauData(data);
  return data;
};

module.exports = {
  validateAndGetPlateauData: plateauLine => validateAndGetPlateauData(plateauLine),
};
