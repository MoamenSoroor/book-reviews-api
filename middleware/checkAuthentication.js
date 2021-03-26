const Token = require("../models/token");
const User = require("../models/user");

const checkAuthentication = (req, res, next) => {
  const token = req.cookies.session;
  if (!token) {
    res.statusCode = 401;
    res.send('Unauthorized');
    return;
  }

  Token.findOne({ _id: token }, (err, token) => {
    console.log(token)
    if (err || !token) {
      res.statusCode = 401;
      res.send('Unauthorized');
    } else {
      User.findOne({ _id: token.userId }, (err, user) => {
        req.user = user;
        next();
      })
    }
  });
};

module.exports = checkAuthentication;