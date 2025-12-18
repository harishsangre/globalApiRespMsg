const success = require('../src/success');
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
  res.send = function (data) {
    this.body = data;
    return this;
  };
  return res;
}

describe('success.js', () => {
  test('success()', () => {
    const res = createMockRes();
    success.success(res, 'ok', { foo: 'bar' });
    expect(res.statusCode).toBe(httpStatus.OK);
    expect(res.body).toEqual({ success: true, message: 'ok', data: { foo: 'bar' }, error: null });
  });

  test('created()', () => {
    const res = createMockRes();
    success.created(res, 'created', { foo: 'bar' });
    expect(res.statusCode).toBe(httpStatus.CREATED);
    expect(res.body).toEqual({ success: true, message: 'created', data: { foo: 'bar' }, error: null });
  });

  test('noContent()', () => {
    const res = createMockRes();
    success.noContent(res);
    expect(res.statusCode).toBe(httpStatus.NO_CONTENT);
    expect(res.body).toBeUndefined();
  });

  test('paginated()', () => {
    const res = createMockRes();
    success.paginated(res, 'ok', [1, 2], { page: 1 });
    expect(res.statusCode).toBe(httpStatus.OK);
    expect(res.body).toEqual({ success: true, message: 'ok', data: [1, 2], pagination: { page: 1 }, error: null });
  });

  test('partialSuccess()', () => {
    const res = createMockRes();
    success.partialSuccess(res, 'partial', [1], [2]);
    expect(res.statusCode).toBe(httpStatus.PARTIAL_SUCCESS);
    expect(res.body).toEqual({ success: false, message: 'partial', data: [1], failed: [2] });
  });
});
