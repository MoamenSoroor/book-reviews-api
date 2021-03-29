class CustomError {
  statusCode
  message

  constructor(statusCode, message, detailsmsg = "") {
    this.statusCode = statusCode;
    this.message = message;
    this.detailsmsg = detailsmsg;
  }

  details(details) {
    const error = new CustomError(this.statusCode, this.message);
    error.detailsmsg = details;
    return error;
  }




}

const internalServerError = new CustomError(500, 'internal server error');
const invalidDataError = new CustomError(400, 'bad request, invalid data error');
const notFoundError = new CustomError(404, 'not found error');
const unauthorizedError = new CustomError(401, 'Unauthorized error');
module.exports = {
  CustomError,
  internalServerError,
  invalidDataError,
  notFoundError,
  unauthorizedError
};