const { mockRequest, mockResponse } = require('./util/interceptor');
const controller = require('./controller');
const { ORIENTATION } = require('./constants');

const nasa = '10 5\n0 0 N\nMMRMML';
const nasaWithError = '1 N\n1 2 N\nRM';
const nasaWithInvalidRoverLine = '10 5\n0 0 N\nMMRM\n  \nMM\n';
const nasaInvalidRoverRoute = '10 5\n2 4 N\nLMMMM';

const getRequest = content => ({
  ...mockRequest(),
  files: {
    input: {
      data: Buffer.from(content)
    }
  }
});

describe('controller', () => {
  it('should call controller and run rovers', async () => {
    let req = getRequest(nasa);
    const res = mockResponse();

    await controller.explore(req, res);

    expect(res.send).toHaveBeenCalledTimes(1);
    const expected = '2 2 N';
    expect(res.send).toHaveBeenCalledWith(expected);
  });

  it('should call controller and return an error', async () => {
    let req = getRequest(nasaWithError);
    const res = mockResponse();

    await controller.explore(req, res);

    expect(res.send).toHaveBeenCalledTimes(1);
    const expected = 'Some plateau coordinate is not a number';
    expect(res.send).toHaveBeenCalledWith(expected);
  });

  it('should return a \'Some plateau coordinate is not a number\' error message', async () => {
    let req = getRequest('');
    const res = mockResponse();

    await controller.explore(req, res);

    expect(res.send).toHaveBeenCalledTimes(1);
    expect(res.send).toHaveBeenCalledWith('Some plateau coordinate is not a number');
  });

  it('should ignore an invalid rover line of information', async () => {
    let req = getRequest(nasaWithInvalidRoverLine);
    const res = mockResponse();

    await controller.explore(req, res);

    expect(res.send).toHaveBeenCalledTimes(1);
    expect(res.send).toHaveBeenCalledWith('1 2 E');
  });

  it('should return a result with a error message', async () => {
    let req = getRequest(nasaInvalidRoverRoute);
    const res = mockResponse();

    await controller.explore(req, res);

    expect(res.send).toHaveBeenCalledTimes(1);
    expect(res.send).toHaveBeenCalledWith('0 4 W The Rover position is outside of the Plateau. Rover position: X: -1 Y: 4 Plateau: Length: 10 Width: 5');
  });
});