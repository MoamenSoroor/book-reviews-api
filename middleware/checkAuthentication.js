const Token = require("../models/token");
const User = require("../models/user");

const checkAuthentication = async (req, res, next) => {
  const token = req.cookies.session;
  if (!token) {
    res.statusCode = 401;
    res.send('Unauthorized1');
    return;
  }

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



  let tokenFetched = await Token.findOne({ _id: token }).catch((err) => {
    console.log(token);
    res.statusCode = 401;
    res.send('Unauthorized');
  });

  if (tokenFetched) {
    let user = await User.findOne({ _id: tokenFetched.userId }).catch(err => {
      res.statusCode = 401;
      res.send('Unauthorized2');
    });
    req.user = user;
    next();
  }
  else {
    res.statusCode = 401;
    res.send('Unauthorized3');
  }












};

module.exports = checkAuthentication;