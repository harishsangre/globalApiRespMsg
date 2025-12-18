const httpStatus = require("../httpStatus");

function errorHandler(err, req, res, next) {
  const isProd = process.env.NODE_ENV === "production";

  return res.status(err.statusCode || httpStatus.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: err.message || "Internal Server Error",
    data: null,
    error: isProd
      ? { code: err.errorCode || null }
      : {
          code: err.errorCode || null,
          details: err.details || null,
          stack: err.stack
        }
  });
}

module.exports = errorHandler;