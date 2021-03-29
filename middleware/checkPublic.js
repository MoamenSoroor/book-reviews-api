const { unauthorizedError } = require("../models/customError");
const Token = require("../models/token");
const User = require("../models/user");

const requestIp = require('request-ip');

const authErrorMsg = "check auth = unauthorized access to system please login or register first"

const checkPublic = async (req, res, next) => {


  try {
    const token = req.cookies.session;
    if (!token) {
      throw unauthorizedError.details(authErrorMsg);
    }

    next();
  } catch (error) {
    next(error);
  }

};

module.exports = checkPublic;

