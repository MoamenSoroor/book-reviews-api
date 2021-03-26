class CustomError {
  statusCode
  message

  constructor(statusCode, message) {
    this.statusCode = statusCode;
    this.message = message;
  }
}

const internalServerError = new CustomError(500, 'internal server error');
module.exports = {
  CustomError,
  internalServerError
};