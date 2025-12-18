const httpStatus = require("./httpStatus");

function errorResponse(res, message, statusCode, error = null) {
  return res.status(statusCode).json({
    success: false,
    message,
    data: null,
    error
  });
}

module.exports = {
  badRequest: (res, msg, err) => errorResponse(res, msg || "Bad Request", httpStatus.BAD_REQUEST, err),
  unauthorized: (res, msg) => errorResponse(res, msg || "Unauthorized", httpStatus.UNAUTHORIZED),
  forbidden: (res, msg) => errorResponse(res, msg || "Forbidden", httpStatus.FORBIDDEN),
  notFound: (res, msg) => errorResponse(res, msg || "Not Found", httpStatus.NOT_FOUND),
  conflict: (res, msg, err) => errorResponse(res, msg || "Conflict", httpStatus.CONFLICT, err),
  validation: (res, err) => errorResponse(res, "Validation Failed", httpStatus.VALIDATION_ERROR, err),
  tooManyRequests: (res, msg) => errorResponse(res, msg || "Too Many Requests", httpStatus.TOO_MANY_REQUESTS),
  serviceUnavailable: (res, msg) => errorResponse(res, msg || "Service Unavailable", httpStatus.SERVICE_UNAVAILABLE),
  internal: (res, msg) => errorResponse(res, msg || "Internal Server Error", httpStatus.INTERNAL_SERVER_ERROR)
};