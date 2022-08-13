const { mockRequest, mockResponse } = require('./util/interceptor');
const controller = require('./controller');
const { ORIENTATION } = require('./constants');

const nasa = '10 5\n0 0 N\nMMRMML';
const nasaWithError = '1 N\n1 2 N\nRM';

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

    expect(res.json).toHaveBeenCalledTimes(1);
    const expected = {
      finalRovers: [{
        x: 2,
        y: 2,
        orientation: ORIENTATION.North
      }]
    };
    expect(res.json).toHaveBeenCalledWith(expected);
  });

  it('should call controller and return an error', async () => {
    let req = getRequest(nasaWithError);
    const res = mockResponse();

    await controller.explore(req, res);

    expect(res.json).toHaveBeenCalledTimes(1);
    const expected = {
      message: 'Some plateau coordinate is not a number'
    };
    expect(res.json).toHaveBeenCalledWith(expected);
  });
});