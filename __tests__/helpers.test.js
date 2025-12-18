const { isExpressResponse, asyncHandler } = require('../src/helpers');

describe('helpers.js', () => {
  test('isExpressResponse returns true for mock res', () => {
    const res = { status: () => {}, json: () => {} };
    expect(isExpressResponse(res)).toBe(true);
  });
  test('isExpressResponse returns false for non-res', () => {
    expect(isExpressResponse({})).toBe(false);
    expect(isExpressResponse(null)).toBe(false);
    expect(isExpressResponse(undefined)).toBe(false);
  });

  test('asyncHandler calls fn and catches error', async () => {
    const req = {};
    const res = {};
    let called = false;
    const fn = jest.fn(async () => { called = true; });
    const next = jest.fn();
    await asyncHandler(fn)(req, res, next);
    expect(fn).toHaveBeenCalled();
    expect(called).toBe(true);

    // error case
    const errorFn = jest.fn(async () => { throw new Error('fail'); });
    await asyncHandler(errorFn)(req, res, next);
    expect(next).toHaveBeenCalledWith(expect.any(Error));
  });
});
