const { success, badRequest, httpStatus, AppError } = require('../src');

function createMockRes() {
  const res = {};
  res.statusCode = null;
  res.body = null;
  res.status = function (code) {
    this.statusCode = code;
    return this;
  };
  res.json = function (data) {
    this.body = data;
    return this;
  };
  res.send = function (data) {
    this.body = data;
    return this;
  };
  return res;
}

describe('API Response Kit', () => {
  test('success() returns correct structure', () => {
    const res = createMockRes();
    success(res, 'OK', { foo: 'bar' });
    expect(res.statusCode).toBe(httpStatus.OK);
    expect(res.body).toEqual({
      success: true,
      message: 'OK',
      data: { foo: 'bar' },
      error: null
    });
  });

  test('badRequest() returns correct structure', () => {
    const res = createMockRes();
    badRequest(res, 'Bad Request', 'Invalid input');
    expect(res.statusCode).toBe(httpStatus.BAD_REQUEST);
    expect(res.body).toEqual({
      success: false,
      message: 'Bad Request',
      data: null,
      error: 'Invalid input'
    });
  });

  test('AppError creates error instance', () => {
    const err = new AppError('Not Found', httpStatus.NOT_FOUND);
    expect(err).toBeInstanceOf(Error);
    expect(err.message).toBe('Not Found');
    expect(err.statusCode).toBe(httpStatus.NOT_FOUND);
  });
});
