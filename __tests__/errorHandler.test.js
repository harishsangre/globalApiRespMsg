const errorHandler = require('../src/middleware/errorHandler');
const AppError = require('../src/AppError');
const httpStatus = require('../src/httpStatus');

describe('errorHandler middleware', () => {
  test('handles AppError', () => {
    const err = new AppError('fail', httpStatus.BAD_REQUEST);
    const req = {};
    const res = {
      statusCode: null,
      body: null,
      status(code) { this.statusCode = code; return this; },
      json(data) { this.body = data; return this; }
    };
    const next = jest.fn();
    errorHandler(err, req, res, next);
    expect(res.statusCode).toBe(httpStatus.BAD_REQUEST);
    expect(res.body).toMatchObject({
      success: false,
      message: 'fail',
      data: null,
      error: expect.any(Object)
    });
    expect(res.body.error).toHaveProperty('stack');
    expect(res.body.error).toHaveProperty('code', null);
    expect(res.body.error).toHaveProperty('details', null);
  });

  test('handles generic error', () => {
    const err = new Error('fail');
    const req = {};
    const res = {
      statusCode: null,
      body: null,
      status(code) { this.statusCode = code; return this; },
      json(data) { this.body = data; return this; }
    };
    const next = jest.fn();
    errorHandler(err, req, res, next);
    expect(res.statusCode).toBe(httpStatus.INTERNAL_SERVER_ERROR);
    expect(res.body).toMatchObject({
      success: false,
      message: 'fail',
      data: null,
      error: expect.any(Object)
    });
    expect(res.body.error).toHaveProperty('stack');
    expect(res.body.error).toHaveProperty('code', null);
    expect(res.body.error).toHaveProperty('details', null);
  });
});
