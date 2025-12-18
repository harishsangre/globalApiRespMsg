const httpStatus = require("./httpStatus");

function success(res, message = "Success", data = null) {
  return res.status(httpStatus.OK).json({
    success: true,
    message,
    data,
    error: null
  });
}

function created(res, message = "Created", data = null) {
  return res.status(httpStatus.CREATED).json({
    success: true,
    message,
    data,
    error: null
  });
}

function noContent(res) {
  return res.status(httpStatus.NO_CONTENT).send();
}

function paginated(res, message, data, pagination) {
  return res.status(httpStatus.OK).json({
    success: true,
    message,
    data,
    pagination,
    error: null
  });
}

function partialSuccess(res, message, data, failed) {
  return res.status(httpStatus.PARTIAL_SUCCESS).json({
    success: false,
    message,
    data,
    failed
  });
}

module.exports = { success, created, noContent, paginated, partialSuccess };