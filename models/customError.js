class CustomError {
  statusCode
  message

  constructor(statusCode, message) {
    this.statusCode = statusCode;
    this.message = message;
  }
}

const internalServerError = new CustomError(500, 'internal server error');
const invalidData = new CustomError(400, 'invalid data');
const notFoundError = new CustomError(404, 'not found error');
module.exports = {
  CustomError,
  internalServerError,
  notFoundError
};