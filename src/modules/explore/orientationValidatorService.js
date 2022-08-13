const { ORIENTATION_LIST } = require('./constants');

module.exports.validate = orientation => {
  const ort = ORIENTATION_LIST.filter(ort => ort === orientation);
  if (!ort || ort.length < 1) {
    throw new Error(`The orientation '${orientation}' is invalid`);
  }
  return true;
};
