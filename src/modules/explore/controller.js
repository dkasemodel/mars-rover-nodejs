const roverService = require('./roverService');
const exploreService = require('./exploreService');
const plateauService = require('./plateauService');

const parseResult = ({ finalRovers }) => {
  return finalRovers
    .map(rover => `${rover.x} ${rover.y} ${rover.orientation}${(rover.message) ? ` ${rover.message}` : ''}`)
    .join('\n');
};

exports.explore = (req, res) => {
  const { files } = req;

  let result = {};
  try {
    const input = files.input.data.toString('utf-8');
    const lines = input.split('\n');
    const plateau = plateauService.createPlateau(lines[0]);

    const rovers = [];
    for (let roverIndex = 1; roverIndex < lines.length; roverIndex += 2) {
      const position = roverService.newRover(lines[roverIndex]);
      if (position) {
        const movements = [...lines[(roverIndex + 1)]];
        rovers.push({
          position,
          movements,
        });
      }
    }

    const finalRovers = exploreService.explore({
      plateau,
      rovers,
    });

    result = parseResult({ finalRovers });
  } catch (error) {
    console.log(`ERROR ${error}`);
    result = error.message;
  }

  res.send(result);
};