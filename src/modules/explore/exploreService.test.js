const exploreService = require('./exploreService');
const { ORIENTATION } = require('./constants');
const e = require('express');

const getExplore = (plateauX = 1, plateauY = 2, numRovers = 1, movements = ['M', 'M', 'M']) => ({
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
    const explore = getExplore(10, 5);

    const result = exploreService.explore(explore);

    const expected = [{
      x: 0,
      y: 3,
      orientation: ORIENTATION.North
    }];
    expect(result).toEqual(expected);
  });

  it('should deploy 2 Rovers and walk', () => {
    const explore = getExplore(10, 5, 2);

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
      orientation: ORIENTATION.West
    }];
    expect(result).toEqual(expected);
  });

  it('should return the same Rover position when it have been deployed outside of the plateau', () => {
    const explore = getExplore(5, 10);
    explore.rovers[0].position.x = 6;

    const result = exploreService.explore(explore);

    const expected = [{
      x: 6,
      y: 0,
      orientation: ORIENTATION.North
    }];
    expect(result).toEqual(expected);
  });

  it('should return the last Rover position when one moviment is not recognized', () => {
    const explore = getExplore(1, 2, 1, ['J']);

    const result = exploreService.explore(explore);

    const expected = [{
      x: 0,
      y: 0,
      orientation: ORIENTATION.North
    }];
    expect(result).toEqual(expected);
  });
});