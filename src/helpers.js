function isExpressResponse(res) {
  if (!res) return false;
  return typeof res.status === "function" && typeof res.json === "function";
}

function asyncHandler(fn) {
  return function (req, res, next) {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

module.exports = { isExpressResponse, asyncHandler };