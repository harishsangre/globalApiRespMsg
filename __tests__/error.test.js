const error = require('../src/error');
const httpStatus = require('../src/httpStatus');

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
  return res;
}

describe('error.js', () => {
  test('badRequest()', () => {
    const res = createMockRes();
    error.badRequest(res, 'Bad', 'err');
    expect(res.statusCode).toBe(httpStatus.BAD_REQUEST);
    expect(res.body).toEqual({ success: false, message: 'Bad', data: null, error: 'err' });
  });
  test('unauthorized()', () => {
    const res = createMockRes();
    error.unauthorized(res);
    expect(res.statusCode).toBe(httpStatus.UNAUTHORIZED);
    expect(res.body).toEqual({ success: false, message: 'Unauthorized', data: null, error: null });
  });
  test('forbidden()', () => {
    const res = createMockRes();
    error.forbidden(res);
    expect(res.statusCode).toBe(httpStatus.FORBIDDEN);
    expect(res.body).toEqual({ success: false, message: 'Forbidden', data: null, error: null });
  });
  test('notFound()', () => {
    const res = createMockRes();
    error.notFound(res);
    expect(res.statusCode).toBe(httpStatus.NOT_FOUND);
    expect(res.body).toEqual({ success: false, message: 'Not Found', data: null, error: null });
  });
  test('conflict()', () => {
    const res = createMockRes();
    error.conflict(res, 'Conflict', 'err');
    expect(res.statusCode).toBe(httpStatus.CONFLICT);
    expect(res.body).toEqual({ success: false, message: 'Conflict', data: null, error: 'err' });
  });
  test('validation()', () => {
    const res = createMockRes();
    error.validation(res, 'validation error');
    expect(res.statusCode).toBe(httpStatus.VALIDATION_ERROR);
    expect(res.body).toEqual({ success: false, message: 'Validation Failed', data: null, error: 'validation error' });
  });
  test('tooManyRequests()', () => {
    const res = createMockRes();
    error.tooManyRequests(res);
    expect(res.statusCode).toBe(httpStatus.TOO_MANY_REQUESTS);
    expect(res.body).toEqual({ success: false, message: 'Too Many Requests', data: null, error: null });
  });
  test('serviceUnavailable()', () => {
    const res = createMockRes();
    error.serviceUnavailable(res);
    expect(res.statusCode).toBe(httpStatus.SERVICE_UNAVAILABLE);
    expect(res.body).toEqual({ success: false, message: 'Service Unavailable', data: null, error: null });
  });
  test('internal()', () => {
    const res = createMockRes();
    error.internal(res);
    expect(res.statusCode).toBe(httpStatus.INTERNAL_SERVER_ERROR);
    expect(res.body).toEqual({ success: false, message: 'Internal Server Error', data: null, error: null });
  });
});
