const { MOVEMENTS } = require('./constants');
const compassService = require('./compassService');
const roverService = require('./roverService');

/**
 * @param {
 *   "plateau": {
 *     "length": Length of the rectangle (Number),
 *     "width": Width of the rectangle (Number)
 *   },
 *   "rovers": [
 *     {
 *       "position": {
 *         "x": Position X of the Rover (Number)
 *         "y": Position Y of the Rover (Number)
 *         "orientation": "Where the Rover is pointed to (Text: N, S, E, W)"
 *       },
 *       "movements": A list of text describing the Rover movements (Ex.: ['L', 'M', 'L', 'M', 'L'])
 *     }
 *   ]
 * } explore 
 */
module.exports.explore = (explore) => {
  const { plateau, rovers } = explore;
  const finalRoversPositions = [];

  const validateRoverPositionInsidePlateau = (roverPosition) => {
    if (roverPosition.x > plateau.length || roverPosition.y > plateau.width ||
      roverPosition.x < 0 || roverPosition.y < 0) {
      throw new Error(`The Rover position is outside of the Plateau. Rover position: ${JSON.stringify(roverPosition)} Plateau: ${JSON.stringify(plateau)}`);
    }
  };

  const isThereAreAnotherRoverOnTheWay = (roverPosition, rover) => {
    const filtered = rovers
      .filter(({ index:anotherIndex, position:anotherPosition }) =>
        anotherIndex !== rover.index &&
        anotherPosition.x === roverPosition.x &&
        anotherPosition.y === roverPosition.y);
    return filtered && filtered.length !== 0;
  };

  const isToRotate = movement => {
    return MOVEMENTS.Right === movement ||
      MOVEMENTS.Left === movement;
  };

  const isToGoAhead = movement => {
    return MOVEMENTS.Walk === movement;
  };

  const move = (actualRoverPosition, movement) => {
    if (isToRotate(movement)) {
      return {
        ...actualRoverPosition,
        orientation: compassService.calculateDirection(actualRoverPosition.orientation, movement)
      }
    } else if (isToGoAhead(movement)) {
      return roverService.walk(actualRoverPosition);
    } else {
      throw new Error(`Movement ${movement} is invalid`);
    }
  };

  const tryToMove = (rover, movement) => {
    const { position:actualRoverPosition } = rover;
    validateRoverPositionInsidePlateau(actualRoverPosition);
    isThereAreAnotherRoverOnTheWay(actualRoverPosition, rover);
    const newPosition = move(actualRoverPosition, movement);
    if (isThereAreAnotherRoverOnTheWay(newPosition, rover)) {
      throw new Error(`There is another rover on the way: ${JSON.stringify(newPosition)}`);
    }
    return newPosition;
  };

  rovers.forEach((rover, roverIndex) => {
    const { movements } = rover;
    rover.index = roverIndex;
    try {
      movements.forEach(movement => {
        const newPosition = tryToMove(rover, movement);
        validateRoverPositionInsidePlateau(newPosition);
        rover.position = newPosition;
      });
    } catch (error) {
      console.log(error);
    }

    const { position:roverFinalposition } = rover;
    finalRoversPositions.push(roverFinalposition);
  });

  return finalRoversPositions;
};