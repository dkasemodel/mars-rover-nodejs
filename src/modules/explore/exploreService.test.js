const exploreService = require('./exploreService');
const { ORIENTATION } = require('./constants');

const getExplore = ({ plateauX = 1, plateauY = 2, numRovers = 1, movements = ['M', 'M', 'M'] }) => ({
  plateau: {
    length: plateauX,
    width: plateauY,
  },
  rovers: [...new Array(numRovers)]
    .map((_item, index) => ({
      position: {
        x: index,
        y: index,
        orientation: ORIENTATION.North
      },
      movements
    }))
});

const getExploreWithTwoRoversInSamePosition = () => ({
  plateau: {
    length: 10,
    width: 5
  },
  rovers: [{
    position: {
      x: 0,
      y: 0,
      orientation: ORIENTATION.North
    },
    movements: ['M']
  },{
    position: {
      x: 1,
      y: 0,
      orientation: ORIENTATION.East
    },
    movements: ['L', 'M', 'L', 'M']
  }]
});

describe('exploreService', () => {
  it('should deploy a Rover and walk', () => {
    const explore = getExplore({ plateauX: 10, plateauY: 5 });

    const result = exploreService.explore(explore);

    const expected = [{
      x: 0,
      y: 3,
      orientation: ORIENTATION.North
    }];
    expect(result).toEqual(expected);
  });

  it('should deploy 2 Rovers and walk', () => {
    const explore = getExplore({ plateauX: 10, plateauY: 5, numRovers: 2 });

    const result = exploreService.explore(explore);

    const expected = [{
      x: 0,
      y: 3,
      orientation: ORIENTATION.North
    },{
      x: 1,
      y: 4,
      orientation: ORIENTATION.North
    }];
    expect(result).toEqual(expected);
  });

  it('should return the last movement of the Rover when there is another on the way', () => {
    const explore = getExploreWithTwoRoversInSamePosition();

    const result = exploreService.explore(explore);

    const expected = [{
      x: 0,
      y: 1,
      orientation: ORIENTATION.North
    },{
      x: 1,
      y: 1,
      orientation: ORIENTATION.West,
      message: 'There is another rover on the way: X: 0 Y: 1'
    }];
    expect(result).toEqual(expected);
  });

  it('should return the same Rover position when it have been deployed outside of the plateau', () => {
    const explore = getExplore({ plateauX: 5, plateauY: 10 });
    explore.rovers[0].position.x = 5;

    const result = exploreService.explore(explore);

    const expected = [{
      x: 5,
      y: 0,
      orientation: ORIENTATION.North,
      message: 'The Rover position is outside of the Plateau. Rover position: X: 5 Y: 0 Plateau: Length: 5 Width: 10'
    }];
    expect(result).toEqual(expected);
  });

  it('should return the last Rover position when one moviment is not recognized', () => {
    const explore = getExplore({ movements: ['J'] });

    const result = exploreService.explore(explore);

    const expected = [{
      x: 0,
      y: 0,
      orientation: ORIENTATION.North,
      message: 'Movement J is invalid'
    }];
    expect(result).toEqual(expected);
  });

  it('should return the last position of the Rover with the message that Rover tried to movie outside of the plateau', () => {
    const explore = getExplore({ movements: ['M', 'M', 'M'] });

    const result = exploreService.explore(explore);

    const expected = [{
      x: 0,
      y: 1,
      orientation: ORIENTATION.North,
      message: 'The Rover position is outside of the Plateau. Rover position: X: 0 Y: 2 Plateau: Length: 1 Width: 2'
    }];
    expect(result).toEqual(expected);
  });
});