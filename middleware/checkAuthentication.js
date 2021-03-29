const { unauthorizedError } = require("../models/customError");
const Token = require("../models/token");
const User = require("../models/user");

const requestIp = require('request-ip');

const authErrorMsg = "check auth = unauthorized access to system please login or register first"

const checkAuthentication = async (req, res, next) => {


  try {

    console.log("req ip address: ");
    console.log(req.clientIp);


    const token = req.cookies.session;
    if (!token) {
      throw unauthorizedError.details(authErrorMsg);
    }
    let tokenFetched = await Token.findOne({ _id: token, ip: req.clientIp }).catch((err) => {
      throw unauthorizedError.details(authErrorMsg);
    });

    if (!tokenFetched) { console.log("unautorized access"); throw unauthorizedError.details(authErrorMsg); };

    let user = await User.findOne({ _id: tokenFetched.userId })
      .catch(err => {
        console.log(err);
        throw unauthorizedError.details(authErrorMsg);
      });

    req.user = user;
    //req.user.ip = ip;
    req.user.token = tokenFetched; // req.user.token.ip;
    next();
  } catch (error) {
    next(error);
  }

};

module.exports = checkAuthentication;



  // Token.findOne({ _id: token }, (err, token) => {
  //   console.log(token)
  //   if (err || !token) {
  //     res.statusCode = 401;
  //     res.send('Unauthorized');
  //   } else {
  //     User.findOne({ _id: token.userId }, (err, user) => {
  //       req.user = user;
  //       next();
  //     })
  //   }
  // });

